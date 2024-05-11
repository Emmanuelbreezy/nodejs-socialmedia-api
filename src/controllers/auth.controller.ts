import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import User, { IUserDoc } from "../models/User.model";
import { JWTUserDto, LoginUserDto } from "../dto";
import { GenerateSignature } from "../utils";
import { CustomError } from "../middleware";

export const registerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.find({ $or: [{ username }, { email }] });
    if (existingUser) {
      throw new CustomError("Username or email already exists", 400);
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hashSync(password, salt);

    const newUser = new User({ ...req.body, password: hashedPassword });
    const user = await newUser.save();
    res.status(201).json({
      message: "User created successfully",
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { usernameOrEmail, password } = <LoginUserDto>req.body;
    let existingUser: IUserDoc | null = null;

    if (usernameOrEmail.includes("@")) {
      existingUser = await User.findOne({ email: usernameOrEmail });
    } else {
      existingUser = await User.findOne({ username: usernameOrEmail });
    }

    if (!existingUser) {
      throw new CustomError("User not found", 404);
    }

    const matchPassword = await bcrypt.compare(
      password,
      existingUser!.password
    );

    if (!matchPassword) {
      throw new CustomError("Username or password does not exist", 401);
    }

    const { password: _, ...data } = existingUser._doc;
    const token = GenerateSignature({ _id: existingUser._id });

    res
      .cookie("token", token, {
        maxAge: 86400000,
        // httpOnly: true,
        // secure: true,
        // sameSite: "strict",
        // domain: ".example.com",
      })
      .status(200)
      .json({
        message: "User logged in successfully",
        data: data,
      });
  } catch (err) {
    next(err);
  }
};

export const logoutController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res
      .clearCookie("token", { sameSite: "none", secure: true })
      .status(200)
      .json({
        message: "User logged out",
      });
  } catch (err) {
    next(err);
  }
};

export const refetchController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { _id } = req.user as JWTUserDto;
    const user = await User.findOne({ _id });
    res.status(200).json({
      message: "User fetch successfully",
      data: user,
    });
  } catch (err) {
    next(err);
  }
};
