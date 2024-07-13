import { Schema, model } from 'mongoose';

const todoSchema = new Schema({
  name: { type: String, required: true, maxlength: 250 },
  description: { type: String, required: true, maxlength: 450 },
  username: { type: String, required: true, maxlength: 50 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
  completedAt: { type: Date },
});

export const Todo = model('Todo', todoSchema);
