import { Request, Response, NextFunction } from "express";

class CustomError extends Error {
  status: number;

  constructor(message: string, status = 500) {
    super(message);
    this.name = this.constructor.name;
    this.status = status;
    Error.captureStackTrace(this, this.constructor);
  }
}

const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    return res.status(err.status).json({
      message: err.message,
      status: err.status,
    });
  }

  return res.status(500).json({
    message: "Internal server error",
    status: "error",
  });
};

export { CustomError, errorMiddleware };
