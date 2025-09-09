import 'express';
import { JwtPayload } from 'src/auth/auth.types';

// Extend Request class; to avoid ESLint errors
declare module 'express' {
  interface Request {
    member?: JwtPayload;
    cookies?: {
      token?: string;
      [key: string]: string | undefined;
    };
  }
}
