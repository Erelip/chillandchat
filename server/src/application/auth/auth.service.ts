import { Injectable, UnauthorizedException } from '@nestjs/common';
import { GetUsers } from '../../core/usecases/getUsers';
import { JwtService } from '@nestjs/jwt';
import { CreateUsers } from '../../core/usecases/createUser';

type LoginInput = {
    username: string;
    password: string;
};

type RegisterInput = {
    username: string;
    email: string;
    password: string;
};

type AuthOutput = {
    accessToken: string;
};

type SignInData = {
    id: string;
    username: string;
};

@Injectable()
export class AuthService {

    constructor(private readonly getUsers: GetUsers, private readonly createUsers: CreateUsers, private readonly jwtService: JwtService) {}

    async authenticate(input: LoginInput) : Promise<AuthOutput | null> {
        const user = await this.validateUser(input);
        if (!user) throw new UnauthorizedException('Invalid credentials');
        
        return this.signIn(user);
    }

    async register(input: RegisterInput) : Promise<AuthOutput | null> {
        const user = await this.createUsers.createUser(input);
        if (!user) throw new UnauthorizedException('Already exists');

        return this.signIn(user);
    }

    async validateUser(input: LoginInput) : Promise<SignInData | null> {
        const user = await this.getUsers.getUserByUsername(input.username);
        if (!user) {
            return null;
        }

        if (user.password !== input.password) return null;

        return {
            id: user.id,
            username: user.username,
        };
    }

    async signIn(user: SignInData) : Promise<AuthOutput> {
        const payload = { username: user.username, sub: user.id };
        return {
            accessToken: await this.jwtService.signAsync(payload),
        };
    }

}
