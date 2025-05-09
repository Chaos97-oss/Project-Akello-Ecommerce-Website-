class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true; // distinguish operational errors vs programming bugs
    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
//used for lodging errors for cleaner and scalable code
