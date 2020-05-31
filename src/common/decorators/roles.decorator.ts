import { SetMetadata } from '@nestjs/common';

// 自定义装饰器
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);