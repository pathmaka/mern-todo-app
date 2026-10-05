const express = require('express');
const cors = require('cors');
const todos = require('./routes/todos');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/todos', todos);

app.use((req, res) => res.status(404).json({ error: 'Not found' }));

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const status = err.status || (err instanceof SyntaxError ? 400 : 500);
  if (status === 500) console.error(err);
  res.status(status).json({ error: status === 500 ? 'Something went wrong' : err.message });
});

module.exports = app;
