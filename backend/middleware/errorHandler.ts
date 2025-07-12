import { Request, Response, NextFunction } from "express";
import {
  ApiError,
  handleApiError,
  handleError,
  handleValidationError,
  handleNotFoundError,
  handleUnauthorizedError,
  handleForbiddenError,
  handleMethodNotAllowedError,
  handleInternalServerError,
} from "../utils/ApiError";
import { ValidationError } from "sequelize";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
    if (err instanceof ApiError) {
      return handleApiError(err, res);
    }
    if (err instanceof ValidationError) {
      return handleValidationError(err, res);
    }
    if (err.name === "NotFoundError") {
      return handleNotFoundError(res, err.message);
    }
    if (err.name === "UnauthorizedError") {
      return handleUnauthorizedError(res, err.message);
    }
    if (err.name === "ForbiddenError") {
      return handleForbiddenError(res, err.message);
    }
    if (err.name === "MethodNotAllowedError") {
      return handleMethodNotAllowedError(res, err.message);
    }
    if (err.name === "InternalServerError") {
      return handleInternalServerError(res, err.message);
    }
    // Fallback for any other errors
    console.error("Unhandled error:", err);
    return handleError(err, res);
};
