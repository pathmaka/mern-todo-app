const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 120 },
    description: { type: String, trim: true, maxlength: 500, default: '' },
    done: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Todo', todoSchema);
