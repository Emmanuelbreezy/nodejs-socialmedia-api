import { JWTUserDto } from "../dto";

declare global {
  namespace Express {
    interface Request {
      user?: JWTUserDto;
    }
  }
}
