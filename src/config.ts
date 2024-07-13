import 'dotenv/config';

export const env = {
  PORT: process.env.PORT,
  MONGO_ATLAS_URL: process.env.MONGO_ATLAS_URL,
  JWT_SECRET: process.env.JWT_SECRET,
};
