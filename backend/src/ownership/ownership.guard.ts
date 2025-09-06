import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { OwnershipService } from './ownership.service';
import { ResourceType } from 'src/common/types/resource.types';

export function OwnershipGuard(resource: ResourceType, resourceId: string) {
  @Injectable()
  class OwnGuard implements CanActivate {
    constructor(public readonly ownershipService: OwnershipService) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
      // Extracts request
      const req = context.switchToHttp().getRequest<Request>();
      // Retrieves resourceId
      const id = Number(req.params[resourceId]);

      // Check if resourceId is valid number
      if (isNaN(id)) {
        throw new BadRequestException(`Invalid parameter!`);
      }

      // Retrieve member_id
      const userId = req.member?.sub;

      // Checks if token has a valid payload
      if (!userId) {
        throw new UnauthorizedException('Invalid token payload');
      }

      // Validate ownership
      await this.validateOwnership(resource, userId, id);

      return true;
    }

    // Tries to validate ownership; will throw exception if invalid
    async validateOwnership(
      resource: ResourceType,
      userId: number,
      id: number,
    ) {
      switch (resource) {
        case ResourceType.PROJECT:
          await this.ownershipService.verifyProjectOwner(userId, id);
          break;
        case ResourceType.TASK:
          await this.ownershipService.verifyTaskOwner(userId, id);
          break;
        case ResourceType.MEMBER:
          this.ownershipService.verifyMemberOwner(userId, id);
          break;
      }
    }
  }

  return OwnGuard;
}
