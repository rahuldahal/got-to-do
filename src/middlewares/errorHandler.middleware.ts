import log from '../utils/logger';
import createError from 'http-errors';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (res.headersSent) {
    return next(err);
  }

  log.error(`Error processing ${req.method} ${req.url}`);
  log.error(`Params:`, req.params);
  log.error(`Query:`, req.query);
  log.error(`Headers:`, req.headers);
  log.error(err.stack);

  if (err instanceof createError.HttpError) {
    const { statusCode, message } = err;
    return res.status(statusCode).json({ error: message });
  }

  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ error: ReasonPhrases.INTERNAL_SERVER_ERROR });
};
