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

    async authenticate(input: LoginInput) : Promise<string | null> {
        const user = await this.validateUser(input);
        if (!user) throw new UnauthorizedException('Invalid credentials');
        
        return this.signIn(user);
    }

    async register(command: CreateUserCommand) : Promise<string | null> {
        const user = await this.createUsers.createUser(command);
        if (!user) throw new UnauthorizedException('Already exists');

        return this.signIn(user);
    }

    async validateUser(input: LoginInput) : Promise<User | null> {
        const user = await this.getUsers.getUserByUsername(input.username);
        if (!user) return null;

        const isValid = await comparePassword(input.password, user.password);
        if (!isValid) return null;

        return user;
    }

    async signIn(user: User) : Promise<string> {
        const payload = { username: user.username, sub: user.id };
        return await this.jwtService.signAsync(payload);
    }

}
