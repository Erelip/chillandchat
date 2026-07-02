import { Module } from "@nestjs/common";
import { UserRepository } from "../../core/interfaces/user.repository.interface";
import { CreateUsers } from "../../core/usecases/create-user";
import { GetUsers } from "../../core/usecases/get-users";
import { UserController } from "./user.controller";
import { SharedModule } from "../modules/shared.module";
import { PersistenceModule } from "../modules/persistence.module";
import { IdGenerator } from "../../core/interfaces/uuid-generator.interface";
import { UpdateUsers } from "../../core/usecases/update-user";
import { FileStorage } from "../../core/interfaces/file-storage.interface";

@Module({
  imports: [SharedModule, PersistenceModule],
  providers: [
    {
      provide: GetUsers,
      useFactory: (userRepository: UserRepository) => {
        return new GetUsers(userRepository);
      },
      inject: [UserRepository],
    },
    {
      provide: CreateUsers,
      useFactory: (
        userRepository: UserRepository,
        generator: IdGenerator,
      ) => {
        return new CreateUsers(userRepository, generator);
      },
      inject: [UserRepository, IdGenerator],
    },
    {
      provide: UpdateUsers,
      useFactory: (
        userRepository: UserRepository,
        fileStorage: FileStorage,
        generator: IdGenerator
      ) => {
        return new UpdateUsers(userRepository, fileStorage, generator);
      },
      inject: [UserRepository, FileStorage, IdGenerator]
    }
  ],
  exports: [GetUsers, CreateUsers, UpdateUsers],
  controllers: [UserController],
})
export class UsersModule {}