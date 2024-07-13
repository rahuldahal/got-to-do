import express, { NextFunction, Request, Response } from 'express';
import routes from '../routes/todo.route';
import { errorHandler } from '../middlewares/errorHandler.middleware';

function createServer() {
  const app = express();

  app.use(express.json());
  app.use('/todos', routes);

  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    errorHandler(err, req, res, next);
  });

  return app;
}

export default createServer;
