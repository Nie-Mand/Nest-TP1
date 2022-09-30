import { Module } from '@nestjs/common';
import { PremierModule } from './premier/premier.module';
import { TodoModuleModule } from './todo/todo-module.module';
import { TodoControllerController } from './todo/todo-controller.controller';
import { TodoModelService } from './todo/todo-model.service';

@Module({
  imports: [PremierModule, TodoModuleModule],
  controllers: [TodoControllerController],
  providers: [TodoModelService],
})
export class AppModule {}
