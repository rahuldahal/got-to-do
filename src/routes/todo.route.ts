import express from 'express';
import { createTaskSchema } from '../validations/todo.validation';
import { validate } from '../middlewares/validateResource.middleware';
import {
  createTaskHandler,
  getTasksHandler,
} from '../controllers/todo.controller';

const router = express.Router();

router.get('/', getTasksHandler);
router.post('/', validate(createTaskSchema), createTaskHandler);

export default router;
