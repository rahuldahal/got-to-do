import { Request, Response } from 'express';

export async function createTask(req: Request, res: Response) {
  res.status(201).json({ message: 'Task created' });
}
