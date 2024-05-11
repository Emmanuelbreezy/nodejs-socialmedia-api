import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { JWTUserDto, JWTUserPayloadDto } from "../dto";
import { JWT_SECRET } from "../config";

export const GenerateSignature = (payload: JWTUserPayloadDto) => {
  const sign = jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
  return sign;
};

export const ValidateSignature = async (req: Request, res: Response) => {
  const token = req.cookies.token;
  if (token) {
    jwt.verify(token, JWT_SECRET, {}, async (err, data) => {
      if (err) {
        res.status(404).json(err);
      }
      const payload = data as JWTUserDto;
      req.user = {
        _id: payload._id,
      };
    });
    return true;
  }
  return false;
};
