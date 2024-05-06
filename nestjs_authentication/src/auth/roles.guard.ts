import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
// import { Roles } from 'src/decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // const roles = this.reflector.get(Roles, context.getHandler());
    const roles = this.reflector.getAllAndOverride<any>('roles', [
      context.getHandler(),
      context.getClass(),
    ]) as string[];
    const request = context.switchToHttp().getRequest();
    const user = request?.user;
    if (roles[0] === user.roles[0]) {
      return true;
    }
    return false;
  }
}
