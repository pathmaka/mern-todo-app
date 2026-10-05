const express = require('express');
const mongoose = require('mongoose');
const Todo = require('../models/Todo');

const router = express.Router();

const httpError = (status, message) => Object.assign(new Error(message), { status });

// Reject malformed ids before hitting the database.
router.param('id', (req, res, next, id) =>
  mongoose.isValidObjectId(id) ? next() : next(httpError(400, 'Invalid todo id'))
);

// Pick and validate the editable fields from a request body.
function parseBody({ title, description }) {
  if (typeof title !== 'string' || !title.trim()) throw httpError(400, 'Title is required');
  if (title.trim().length > 120) throw httpError(400, 'Title must be 120 characters or fewer');
  if (description != null && (typeof description !== 'string' || description.length > 500))
    throw httpError(400, 'Description must be text of 500 characters or fewer');
  return { title, description: description ?? '' };
}

const found = (todo) => todo ?? Promise.reject(httpError(404, 'Todo not found'));

// Wrap async handlers so rejected promises reach the error handler.
const wrap = (fn) => (req, res, next) => Promise.resolve(fn(req, res)).catch(next);

router.get('/', wrap(async (req, res) => res.json(await Todo.find().sort({ createdAt: -1 }))));

router.post('/', wrap(async (req, res) => res.status(201).json(await Todo.create(parseBody(req.body)))));

router.put('/:id', wrap(async (req, res) => {
  const todo = await Todo.findByIdAndUpdate(req.params.id, parseBody(req.body), { new: true });
  res.json(await found(todo));
}));

router.patch('/:id/done', wrap(async (req, res) => {
  const todo = await found(await Todo.findById(req.params.id));
  todo.done = !todo.done;
  res.json(await todo.save());
}));

router.delete('/:id', wrap(async (req, res) => {
  await found(await Todo.findByIdAndDelete(req.params.id));
  res.status(204).end();
}));

module.exports = router;
