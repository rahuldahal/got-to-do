import { object, string, TypeOf } from 'zod';
import { ISODateTimeRegex } from '../constants';
import { validationErrors } from '../constants/errorMessages';
import { UpdateTaskDTO } from '../DTO/todo.dto';

function isISODateTime(value: unknown): value is string {
  if (typeof value !== 'string') return false;
  return ISODateTimeRegex.test(value);
}

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

export function validateUpdateTaskBody(body: UpdateTaskDTO) {
  const { name, description, completedAt } = body;

  if (!(name || description || completedAt)) {
    throw new Error(
      'At least one of "name", "description", or "completedAt" must be provided.',
    );
  }

  let isTypeValid = false;
  if (
    (typeof name === 'string' || typeof name === 'undefined') &&
    (typeof description === 'string' || typeof description === 'undefined') &&
    (typeof completedAt === 'undefined' || isISODateTime(completedAt))
  ) {
    isTypeValid = true;
  }

  if (isTypeValid === false) {
    throw new Error('Type of the field is invalid.');
  }
}

export type CreateTaskInput = TypeOf<typeof createTaskSchema>;
