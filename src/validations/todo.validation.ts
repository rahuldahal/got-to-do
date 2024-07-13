import { object, string, TypeOf } from 'zod';
import { validationErrors } from '../constants/errorMessages';

export const createTaskSchema = object({
  body: object({
    name: string({
      required_error: validationErrors.fieldIsRequired('name'),
    }),
    description: string({
      required_error: validationErrors.fieldIsRequired('description'),
    }),
  }),
});

export type CreateTaskInput = TypeOf<typeof createTaskSchema>;
