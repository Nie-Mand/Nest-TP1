import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Param,
  Put,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoCreateDto, TodoUpdateDto } from './todo.dto';

@Controller('/todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post('/')
  create(@Body() input: TodoCreateDto) {
    return this.todoService.create(input);
  }

  @Put('/:id')
  update(@Body() input: TodoUpdateDto, @Param('id') id: string) {
    return this.todoService.update(id, input);
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.todoService.delete(id);
  }

  @Get('/')
  get() {
    return this.todoService.get();
  }

  @Get('/:id')
  getOne(@Param('id') id: string) {
    return this.todoService.getOne(id);
  }
}
