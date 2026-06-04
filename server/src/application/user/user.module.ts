import { Module } from "@nestjs/common";
import { PrismaService } from "../../adapters/prisma/prisma.service";
import { PrismaUserRepository } from "../../adapters/prisma/repositories/user.prisma.repository";
import { UserRepository } from "../../core/interfaces/user.repository.interface";
import { CreateUsers } from "../../core/usecases/createUser";
import { GetUsers } from "../../core/usecases/getUsers";

@Module({
  providers: [
    PrismaService,
    GetUsers,
    CreateUsers,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
  ],
  exports: [GetUsers, CreateUsers], // both must be exported
})
export class UsersModule {}