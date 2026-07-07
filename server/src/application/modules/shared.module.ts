import { Module } from "@nestjs/common";
import { Generator } from "../../core/interfaces/generator.interface";
import { IdGenerator } from "../../infrastructure/generator/id.generator";
import { FileStorage } from "../../core/interfaces/file-storage.interface";
import { LocalStorage } from "../../infrastructure/storage/local-storage/local-storage";
import { ChatGateway } from "../../infrastructure/websocket/chat.gateway";
import { ChatEvents } from "../../core/interfaces/chat-events.interface";

@Module({
  providers: [
    {
      provide: Generator,
      useClass: IdGenerator,
    },
    {
      provide: FileStorage,
      useClass: LocalStorage,
    },
    {
      provide: ChatEvents,
      useClass: ChatGateway
    }
  ],
  exports: [Generator, FileStorage, ChatEvents],
})
export class SharedModule {}