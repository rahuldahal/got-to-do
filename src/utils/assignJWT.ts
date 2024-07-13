import jwt from 'jsonwebtoken';
import { env } from '../config';

interface JWTPayload {
  username: string;
}

export function generateJwtToken(payload: JWTPayload): string {
  const JWT_SECRET = env.JWT_SECRET as string;
  const token = jwt.sign(payload, JWT_SECRET); //TODO: add expiration for this sample
  return token;
}
