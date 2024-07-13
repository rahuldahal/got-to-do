import { CreateTaskDTO } from '../DTO/todo.dto';
import { Todo } from '../models/todo.model';
import { Error as MongooseError } from 'mongoose';

async function createTask(data: CreateTaskDTO) {
  const todo = new Todo(data);

  try {
    await todo.save();
    return todo;
  } catch (error: MongooseError | any) {
    error;
  }
}

export { createTask };
