import { Request, Response } from 'express';
import { createTaskService } from '../services';
import { Error as MongooseError } from 'mongoose';

export async function createTask(req: Request, res: Response) {
  const { name, description } = req.body;

  if (!name || !description) {
    return res.sendStatus(400);
  }

  try {
    const createdTodo = await createTaskService({ name, description });
    return res.status(201).json(createdTodo);
  } catch (error: MongooseError | any) {
    if (error instanceof MongooseError.ValidationError) {
      return res.status(400).json({ error: error.message });
    }
    return res.status(500).json({ error: error.message });
  }
}
