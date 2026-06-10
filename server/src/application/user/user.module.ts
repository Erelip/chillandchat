import { Module } from "@nestjs/common";
import { PrismaUserRepository } from "../../adapters/prisma/repositories/user.prisma.repository";
import { UserRepository } from "../../core/interfaces/user.repository.interface";
import { CreateUsers } from "../../core/usecases/create-user";
import { GetUsers } from "../../core/usecases/get-users";
import { UserController } from "./user.consoller";

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
  controllers: [UserController]
})
export class UsersModule {}