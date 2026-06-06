import { Module } from "@nestjs/common";
import { PrismaService } from "../../adapters/prisma/prisma.service";
import { PrismaUserRepository } from "../../adapters/prisma/repositories/user.prisma.repository";
import { UserRepository } from "../../core/interfaces/user.repository.interface";
import { CreateUsers } from "../../core/usecases/create-user";
import { GetUsers } from "../../core/usecases/get-users";

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
  exports: [GetUsers, CreateUsers, UserRepository], // both must be exported
})
export class UsersModule {}