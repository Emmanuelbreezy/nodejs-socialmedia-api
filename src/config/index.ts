import "dotenv/config";

export const JWT_SECRET = process.env.JWT_SECRET as string;
export const JWT_EXPIRES = process.env.JWT_EXPIRES as string;
