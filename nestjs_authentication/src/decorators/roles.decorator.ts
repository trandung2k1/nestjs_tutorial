// import { Reflector } from '@nestjs/core';
// export const Roles = Reflector.createDecorator<string[]>();
// const roles = ['admin', 'client'];
import { SetMetadata } from '@nestjs/common';
export const Roles = (roles: string[]) => SetMetadata('roles', roles);
