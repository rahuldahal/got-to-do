import express from 'express';
import routes from '../routes/todo.route';

function createServer() {
  const app = express();

  app.use(express.json());
  app.use('/todos', routes);

  return app;
}

export default createServer;
