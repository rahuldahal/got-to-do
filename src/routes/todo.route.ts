import express from 'express';
import { createTask } from '../controllers/todo.controller';

const router = express.Router();

router.post('/', createTask);

export default router;
