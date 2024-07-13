import jwt from 'jsonwebtoken';
import { env } from '../config';
import logger from '../utils/logger';
import { StatusCodes } from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';

export interface CustomRequest extends Request {
  username?: string;
}

export async function authorize(
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(StatusCodes.UNAUTHORIZED).end();
  }

  const JWT_SECRET = env.JWT_SECRET as string;

  try {
    const { username } = jwt.verify(token, JWT_SECRET) as {
      username: string;
    };

    req.username = username;
    next();
  } catch (error: any) {
    switch (error.name) {
      case 'TokenExpiredError':
        logger.error('JWT has expired');
        break;
      case 'JsonWebTokenError':
        logger.error('Invalid JWT:', error.message);
        break;
      default:
        logger.error('JWT verification failed:', error.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
    }

    return res.status(StatusCodes.UNAUTHORIZED).end();
  }
}
