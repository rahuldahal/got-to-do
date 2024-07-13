import { Todo } from '../models/todo.model';
import { Error as MongooseError } from 'mongoose';
import { CreateTaskDTO, UpdateTaskDTO } from '../DTO/todo.dto';

async function createTask(data: CreateTaskDTO) {
  const todo = new Todo(data);

  try {
    await todo.save();
    return todo;
  } catch (error: MongooseError | any) {
    return error;
  }
}

async function getTasks(username: string | undefined) {
  try {
    const todos = await Todo.find({ username });
    return todos;
  } catch (error: MongooseError | any) {
    return error;
  }
}

async function updateTask(
  username: string | undefined,
  id: string,
  newData: UpdateTaskDTO,
) {
  try {
    const task = await Todo.findByIdAndUpdate(
      { username, id },
      { ...newData, updatedAt: new Date() },
      { new: true },
    );

    return task;
  } catch (error: MongooseError | any) {
    return error;
  }
}

async function deleteTask(username: string | undefined, id: string) {
  try {
    const task = await Todo.findByIdAndDelete({ username, id });
    return task;
  } catch (error: MongooseError | any) {
    return error;
  }
}

export { createTask, getTasks, updateTask, deleteTask };
