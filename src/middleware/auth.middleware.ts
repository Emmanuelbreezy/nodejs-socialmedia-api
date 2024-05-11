import { Request, Response, NextFunction } from "express";
import { ValidateSignature } from "../utils";

export const AuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const validate = await ValidateSignature(req, res);
    if (validate) {
      next();
    } else {
      res.status(400).json({
        message: "Not authorized",
        status: "error",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
      status: "error",
    });
  }
};
