import jwt from "jsonwebtoken";
import { AUTH } from "@/constants/auth";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET!;

const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET!;

export interface TokenPayload {
  userId: string;
  sessionId: string;
  token?: string;
}

export function generateAccessToken(payload: TokenPayload) {
  return jwt.sign(payload, ACCESS_TOKEN_SECRET, {
    expiresIn: AUTH.ACCESS_TOKEN_EXPIRES_IN,
  });
}

export function generateRefreshToken(payload: TokenPayload) {
  return jwt.sign(payload, REFRESH_TOKEN_SECRET, {
    expiresIn: AUTH.REFRESH_TOKEN_EXPIRES_IN,
  });
}

export function verifyAccessToken(token: string): TokenPayload {
  return jwt.verify(token, ACCESS_TOKEN_SECRET) as TokenPayload;
}

export function verifyRefreshToken(token: string): TokenPayload {
  return jwt.verify(token, REFRESH_TOKEN_SECRET) as TokenPayload;
}
