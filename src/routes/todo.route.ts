import express from 'express';
import { createTaskSchema } from '../validations/todo.validation';
import { authorize } from '../middlewares/authorization.middleware';
import { validate } from '../middlewares/validateResource.middleware';
import {
  createTaskHandler,
  deleteTaskHandler,
  getTasksHandler,
  updateTaskHandler,
} from '../controllers/todo.controller';

const router = express.Router();

router.get('/', authorize, getTasksHandler);
router.patch('/:id', authorize, updateTaskHandler);
router.delete('/:id', authorize, deleteTaskHandler);
router.post('/', validate(createTaskSchema), createTaskHandler);

export default router;
