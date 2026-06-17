import { Module } from "@nestjs/common";
import { PrismaUserRepository } from "../../adapters/prisma/repositories/user.prisma.repository";
import { UserRepository } from "../../core/interfaces/user.repository.interface";
import { CreateUsers } from "../../core/usecases/create-user";
import { GetUsers } from "../../core/usecases/get-users";
import { UserController } from "./user.consoller";
import { IdGenerator } from "../../core/interfaces/uuid-generator.interface";
import { UuidGenerator } from "../../adapters/generator/uuid.generator";

@Module({
  providers: [
    GetUsers,
    CreateUsers,
    {
      provide: IdGenerator,
      useClass: UuidGenerator,
    },
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
  ],
  exports: [GetUsers, CreateUsers, UserRepository],
  controllers: [UserController]
})
export class UsersModule {}