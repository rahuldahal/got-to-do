import db from './utils/db';
import { env } from './config';
import log from './utils/logger';
import createServer from './utils/server';

const PORT = env.PORT;

const app = createServer();

app.listen(PORT, async () => {
  await db();
  log.info(`App is running at http://localhost:${PORT}`);
});
