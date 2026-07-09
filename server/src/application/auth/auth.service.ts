import { Injectable, UnauthorizedException } from '@nestjs/common';
import { GetUsers } from '../../core/usecases/get-users';
import { JwtService } from '@nestjs/jwt';
import { CreateUsers } from '../../core/usecases/create-user';
import { comparePassword } from '../../core/utils/password';
import { LoginInput } from '../dto/auth.dto'
import { User } from '../../core/entities/users.entity';
import { CreateUserCommand } from '../../core/models/create-user.command';


@Injectable()
export class AuthService {

    constructor(private readonly getUsers: GetUsers, private readonly createUsers: CreateUsers, private readonly jwtService: JwtService) {}

    async authenticate(input: LoginInput) : Promise<{accessToken: string, refreshToken: string}> {
        const user = await this.validateUser(input);
        if (!user) throw new UnauthorizedException('Invalid credentials');

        return {
            accessToken: await this.signAccessToken(user),
            refreshToken: await this.signRefreshToken(user),
        };
    }

    async register(command: CreateUserCommand) : Promise<{accessToken: string, refreshToken: string}> {
        const user = await this.createUsers.createUser(command);
        if (!user) throw new UnauthorizedException('Already exists');

        return {
            accessToken: await this.signAccessToken(user),
            refreshToken: await this.signRefreshToken(user),
        };
    }

    async validateUser(input: LoginInput) : Promise<User | null> {
        const user = await this.getUsers.getUserByUsername(input.username);
        if (!user) return null;

        const isValid = await comparePassword(input.password, user.password);
        if (!isValid) return null;

        return user;
    }

    async signAccessToken(user: User) : Promise<string> {
        const payload = { username: user.username, sub: user.id };
        return this.jwtService.signAsync(
            payload,
            { expiresIn: '15m' },
        );
    }

    async signRefreshToken(user: User) : Promise<string> {
        const payload = { username: user.username, sub: user.id };
        return this.jwtService.signAsync(
            payload,
            { expiresIn: '7d' },
        );
    }


    async refreshToken(refreshToken: string) : Promise<string> {
        try {
    		const payload = await this.jwtService.verify(refreshToken);

            return this.jwtService.signAsync(
                { username: payload.username, sub: payload.sub },
                { expiresIn: '15m' },
            );
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }
    }


}
