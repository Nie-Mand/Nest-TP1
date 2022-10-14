import { Module } from '@nestjs/common';
import { DatabaseModule } from './config/db';
import { TodoModule } from './todo/todo.module';
import { TodoController } from './todo/todo.controller';
import { TodoService } from './todo/todo.service';

@Module({
  imports: [TodoModule, DatabaseModule],
  controllers: [TodoController],
  providers: [TodoService],
})
export class AppModule {}
