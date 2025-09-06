// src/types/express.d.ts

import { JwtPayload } from 'src/auth/auth.types';

declare module 'express-serve-static-core' {
  interface Request {
    member?: JwtPayload; // optional, since not all requests have it
  }
}
