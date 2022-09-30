import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Param,
  Put,
} from '@nestjs/common';
import { TodoModelService } from './todo-model.service';
import { TodoCreateDto } from './todo-dto.dto';

@Controller('/todo')
export class TodoControllerController {
  constructor(private readonly todoModelService: TodoModelService) {}

  @Post('/')
  create(@Body() input: TodoCreateDto) {
    return this.todoModelService.create(input);
  }

  @Put('/:id')
  update(@Body() input: TodoCreateDto, @Param('id') id: string) {
    return this.todoModelService.update(id, input);
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.todoModelService.delete(id);
  }

  @Get('/')
  get() {
    return this.todoModelService.get();
  }

  @Get('/:id')
  getOne(@Param('id') id: string) {
    return this.todoModelService.getOne(id);
  }
}
