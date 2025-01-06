import dotenv from "dotenv";
dotenv.config();

export const port = process.env.PORT;
export const jwt_secret = process.env.JWT_SECRET;
export const api_key = process.env.API_KEY;

export const REDIS_HOST = process.env.REDIS_HOST;
export const REDIS_PORT = process.env.REDIS_PORT;
