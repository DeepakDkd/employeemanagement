class ApiError extends Error {
  statusCode: number;
  message: string;
  data: any;
  success: boolean;
  errors: any[];
  constructor(
    statusCode: number,
    message: string,
    errors: any[] = [],
    stack?: string
  ) {
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.message = message;
    this.success = false;
    this.errors = errors || []; // Initialize errors as an empty array if not provided
    this.stack = stack || new Error().stack; // Capture the stack trace if not provided
    this.name = this.constructor.name; // Set the error name to the class name
    // Ensure the prototype chain is set correctly for custom errors
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }

    Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
  }
}

export { ApiError };

export const handleApiError = (err: ApiError, res: any) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  const errors = err.errors || [];

  console.error(`Error: ${message}`, { statusCode, errors, stack: err.stack });

  res.status(statusCode).json({
    success: false,
    message,
    data: null,
    errors,
  });
};
export const handleError = (err: Error, res: any) => {
  console.error(`Error: ${err.message}`, { stack: err.stack });

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
    data: null,
    errors: [err.message],
  });
};
export const handleValidationError = (err: any, res: any) => {
  console.error(`Validation Error: ${err.message}`, { stack: err.stack });

  res.status(400).json({
    success: false,
    message: "Validation Error",
    data: null,
    errors: err.errors || [err.message],
  });
};
export const handleNotFoundError = (
  res: any,
  message: string = "Resource not found"
) => {
  res.status(404).json({
    success: false,
    message,
    data: null,
    errors: [],
  });
};
export const handleUnauthorizedError = (
  res: any,
  message: string = "Unauthorized"
) => {
  res.status(401).json({
    success: false,
    message,
    data: null,
    errors: [],
  });
};
export const handleForbiddenError = (
  res: any,
  message: string = "Forbidden"
) => {
  res.status(403).json({
    success: false,
    message,
    data: null,
    errors: [],
  });
};
export const handleMethodNotAllowedError = (
  res: any,
  message: string = "Method Not Allowed"
) => {
  res.status(405).json({
    success: false,
    message,
    data: null,
    errors: [],
  });
};
export const handleInternalServerError = (
  res: any,
  message: string = "Internal Server Error"
) => {
  res.status(500).json({
    success: false,
    message,
    data: null,
    errors: [],
  });
};
