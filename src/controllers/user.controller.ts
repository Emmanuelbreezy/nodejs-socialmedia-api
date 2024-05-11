import { NextFunction, Request, Response } from "express";
import User from "../models/User.model";
import { CustomError } from "../middleware";

export const getUserByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    console.log(userId);
    const user = await User.findOne({ _id: userId });
    if (!user) {
      throw new CustomError("User not found", 404);
    }
    const { password: _, ...data } = user._doc;
    res.status(200).json({
      message: "User fetch successfully",
      data: data,
    });
  } catch (err) {
    next(err);
  }
};
