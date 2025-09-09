import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

// @CurrentUser decorator; used to extract member ID from token
export const CurrentUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    // Extract payload
    const user = request.member; // injected by AuthGuard
    // Return member_id
    return user ? user?.sub : undefined;
  },
);
