class ApiError extends Error {
  constructor(status, error, message = "something went wrong", stack) {
    super(message);
    this.status = status;
    this.error = error;
    this.data = null;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(stack);
    }
  }
}

export { ApiError };
