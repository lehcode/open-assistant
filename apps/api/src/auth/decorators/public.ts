import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_PATH='isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_PATH, true);
