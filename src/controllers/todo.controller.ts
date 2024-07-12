import { Request, Response } from 'express';
import { Todo } from '../models/todo.model';
import { Error as MongooseError } from 'mongoose';

export async function createTask(req: Request, res: Response) {
  const { name, description } = req.body;

  if (!name || !description) {
    return res.sendStatus(400);
  }

  const todo = new Todo({
    name,
    description,
  });

  try {
    await todo.save();
    return res.status(201).json(todo);
  } catch (error: MongooseError | any) {
    if (error instanceof MongooseError.ValidationError) {
      return res.status(400).json({ error: error.message });
    }
    return res.status(500).json({ error: error.message });
  }
}
