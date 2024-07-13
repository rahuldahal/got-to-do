import express from 'express';
import { validate } from '../middlewares/validateResource.middleware';
import { createTaskSchema } from '../validations/todo.validation';
import {
  createTaskHandler,
  deleteTaskHandler,
  getTasksHandler,
  updateTaskHandler,
} from '../controllers/todo.controller';

const router = express.Router();

router.get('/', getTasksHandler);
router.patch('/:id', updateTaskHandler);
router.delete('/:id', deleteTaskHandler);
router.post('/', validate(createTaskSchema), createTaskHandler);

export default router;
