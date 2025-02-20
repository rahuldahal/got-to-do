import log from './logger';
import mongoose from 'mongoose';
import { env } from '../config';

async function connect() {
  const MONGO_ATLAS_URL = env.MONGO_ATLAS_URL as string;

  try {
    await mongoose.connect(MONGO_ATLAS_URL);
    log.info('Connected to the database!');
  } catch (error) {
    log.error(error);
    process.exit(1);
  }
}

export default connect;
