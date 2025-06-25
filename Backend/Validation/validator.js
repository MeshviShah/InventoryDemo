import { response } from '../Interceptor/index.js';
import { messages } from '../Util/index.js';
import { validationResult } from 'express-validator';

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return response(res, {
      statusCode: 400,
      message: messages.general.VALIDATION_ERROR,
      error: errors.array(),
    });
  } else {
    return next();
  }
};