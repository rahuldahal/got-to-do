import express from 'express';
import { createTaskHandler } from '../controllers/todo.controller';
import { validate } from '../middlewares/validateResource.middleware';
import { createTaskSchema } from '../validations/todo.validation';

const router = express.Router();

router.post('/', validate(createTaskSchema), createTaskHandler);

export default router;
