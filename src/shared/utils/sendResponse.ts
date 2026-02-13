import { ZodType } from 'zod';
import { Response } from 'express';

export function sendResponse<T>(
  res: Response,
  schema: ZodType<T>,
  data: unknown,
  status = 200
) {
  const parsed = schema.parse(data);
  return res.status(status).json(parsed);
}
