import { messages } from "../Util/index.js";

const error = (err, req, res, next) => {
  console.error('Error:', err);

  const statusCode = err.statusCode || 500;
  const message = err.message || messages.general.INTERNAL_SERVER_ERROR;

  return res.status(statusCode).json({
    status: statusCode,
    message,
    data: null,
    count: null,
    error: err.errors || null
  });
};

export { error };
