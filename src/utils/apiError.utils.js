export class apiError extends Error {
  statusCode;
  status;
  isOperational;
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = statusCode?.toString()?.startsWith("4") ? "failed" : "sucess";

    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}
