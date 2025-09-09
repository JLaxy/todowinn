import 'express';
import { JwtPayload } from 'src/auth/auth.types';

declare module 'express' {
  interface Request {
    member?: JwtPayload;
    cookies?: {
      token?: string;
      [key: string]: string | undefined;
    };
  }
}
