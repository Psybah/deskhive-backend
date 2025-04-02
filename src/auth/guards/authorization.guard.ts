import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { ROLE_KEY } from "../decorators/role.decorator";

@Injectable()
export class AuthorizationGuard implements CanActivate {
    constructor (private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

        const request = context.switchToHttp().getRequest();

        const requiredRole = this.reflector.getAllAndOverride(ROLE_KEY, [
            context.getHandler(),
            context.getClass()
        ]);

        // passport-jwt strategy adds user to request object
        const userRole = request.user.role;

        // checks if the user has the required role
        if (requiredRole === userRole || (Array.isArray(requiredRole) && requiredRole.includes(userRole))) {
            return true;
        } else {
            throw new ForbiddenException('You do not have permission to access this resource');
        }
    }
}