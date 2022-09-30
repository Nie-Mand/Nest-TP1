import { Module } from '@nestjs/common';
import { TodoControllerController } from './todo-controller.controller';
import { TodoModelService } from './todo-model.service';

@Module({
  controllers: [TodoControllerController],
  providers: [TodoModelService],
})
export class TodoModuleModule {}
