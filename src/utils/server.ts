import express from 'express';

function createServer() {
  const app = express();

  app.use((_, res) => res.sendStatus(200));
  return app;
}

export default createServer;
