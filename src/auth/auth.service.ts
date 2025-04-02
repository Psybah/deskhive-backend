import { Injectable, NotFoundException, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService
    ) {}

    // logic to verify user login credentials
    async validateUser(email: string, password: string) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: email
            }
        });

        if (!user) {
            throw new UnauthorizedException("Invalid credentials");
        }

        if (!user.isVerified) {
            throw new UnprocessableEntityException("Email not verified");
        }

        if (bcrypt.compareSync(password, user.password)) {
            delete user.password;
            return {
                user:{
                    ...user,
                },
                accessToken: this.jwtService.sign({ ...user, type: 'access' }),
                refreshToken: this.jwtService.sign({ ...user, type: 'refresh' }, { expiresIn: process.env.JWT_REFRESH_EXPIRATION }),
            }
        }

        throw new UnauthorizedException("Invalid credentials");
    }

    // generate new access token using refresh token

    async refresh(refreshToken: string) {
        const payload = this.jwtService.verify(refreshToken);

        const user = await this.prisma.user.findUnique({
            where: {
                email: payload.email
            }
        });

        if (!user) {
            throw new NotFoundException("User not found");
        }

        delete user.password;
        return {
            accessToken: this.jwtService.sign({ ...user, type: 'access' }),
        }
    }
}
