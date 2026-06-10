import { Injectable } from '@nestjs/common';
import { GetUsers } from '../../core/usecases/get-users';
import { User } from '../../core/entities/users.entity';


@Injectable()
export class AuthService {

    constructor(private readonly getUsers: GetUsers) {}

    async getAllUsers() : Promise<User[] | null> {
        return await this.getUsers.getAllUsers();
    }

}
