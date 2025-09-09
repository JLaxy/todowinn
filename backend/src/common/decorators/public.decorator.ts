import { SetMetadata } from '@nestjs/common';

// @Public token; allows authguard to skip checking for token since endpoint is marked as public
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
