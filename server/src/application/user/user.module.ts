import { Module } from "@nestjs/common";
import { PrismaUserRepository } from "../../adapters/prisma/repositories/user.prisma.repository";
import { UserRepository } from "../../core/interfaces/user.repository.interface";
import { CreateUsers } from "../../core/usecases/create-user";
import { GetUsers } from "../../core/usecases/get-users";

@Module({
  providers: [
    GetUsers,
    CreateUsers,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
  ],
  exports: [GetUsers, CreateUsers, UserRepository],
})
export class UsersModule {}