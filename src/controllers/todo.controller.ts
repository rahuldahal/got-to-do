import { createTask } from '../services';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Error as MongooseError } from 'mongoose';
import { CreateTaskInput } from '../validations/todo.validation';

export async function createTaskHandler(
  req: Request<{}, {}, CreateTaskInput['body']>,
  res: Response,
) {
  const { name, description } = req.body;

  try {
    const createdTodo = await createTask({ name, description });
    return res.status(StatusCodes.CREATED).json(createdTodo);
  } catch (error: MongooseError | any) {
    if (error instanceof MongooseError.ValidationError) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
}
