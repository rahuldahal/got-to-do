import { OBJECT_ID_REGEX } from '../constants';
import { StatusCodes } from 'http-status-codes';
import { Error as MongooseError } from 'mongoose';
import { NextFunction, Request, Response } from 'express';
import { createTask, getTasks, updateTask } from '../services';
import {
  CreateTaskInput,
  validateUpdateTaskBody,
} from '../validations/todo.validation';

export async function createTaskHandler(
  req: Request<{}, {}, CreateTaskInput['body']>,
  res: Response,
  next: NextFunction,
) {
  const { name, description } = req.body;

  try {
    const createdTodo = await createTask({ name, description });
    return res.status(StatusCodes.CREATED).json(createdTodo);
  } catch (error: MongooseError | any) {
    if (error instanceof MongooseError.ValidationError) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }

    return next(error);
  }
}

export async function getTasksHandler(
  _: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const tasks = await getTasks();
    return res.status(StatusCodes.OK).json(tasks);
  } catch (error: MongooseError | any) {
    return next(error);
  }
}

export async function updateTaskHandler(
  req: Request<{ id: string }, {}>,
  res: Response,
  next: NextFunction,
) {
  const { params } = req;
  if (params === undefined) {
    return res.status(StatusCodes.BAD_REQUEST).end();
  }

  const { id } = params;
  if (!id.match(OBJECT_ID_REGEX)) {
    return res.status(StatusCodes.BAD_REQUEST).end();
  }

  const { name, description, completedAt } = req.body;

  try {
    validateUpdateTaskBody({ name, description, completedAt });
    const task = await updateTask(id, { name, description, completedAt });

    if (!task) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'Task not found' });
    }

    return res.status(StatusCodes.OK).json(task);
  } catch (error: MongooseError | any) {
    return next(error);
  }
}
