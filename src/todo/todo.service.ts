import { BadRequestException, Injectable } from '@nestjs/common';
import { Status, Todo } from 'src/@types/enums';
import { v4 } from 'uuid';
import { TodoCreateDto, TodoUpdateDto } from './todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoEntity } from 'src/models/todo.model';
@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private readonly todos: Repository<TodoEntity>,
  ) {}

  create(todo: TodoCreateDto) {
    const newTodo = this.todos.create(todo);
    return this.todos.save(newTodo);
  }

  get() {
    return this.todos.find();
  }

  async update(id: string, _todo: TodoUpdateDto) {
    const todo = await this.todos.findOne({
      where: {
        id,
      },
    });

    if (!todo) {
      throw new BadRequestException('Todo not found');
    }

    if (_todo.name) todo.name = _todo.name;
    if (_todo.description) todo.description = _todo.description;
    if (_todo.status) todo.status = _todo.status;

    return this.todos.save(todo);
  }

  getOne(id: string) {
    return this.todos.findOne({
      where: {
        id,
      },
    });
  }

  delete(id: string) {
    return this.todos.softDelete({
      id,
    });
  }

  // OLD VERSION
  __todos: Todo[] = [];
  __create(todo: TodoCreateDto) {
    const newTodo: Todo = {
      ...todo,
      id: v4(),
      createdAt: new Date(),
      status: Status.ACTIVE,
    };
    this.__todos.push(newTodo);
    return newTodo;
  }

  __get() {
    return this.__todos;
  }

  __update(id: string, todo: TodoCreateDto) {
    const index = this.__todos.findIndex((todo) => todo.id === id);
    this.__todos[index] = {
      ...this.__todos[index],
      ...todo,
    };
    return this.__todos[index];
  }

  __delete(id: string) {
    //   const index = this.__todos.findIndex((todo) => todo.id === id);
    //   this.__todos.splice(index, 1);
    //   return true;
  }

  __getOne(id: string) {
    return this.__todos.find((todo) => todo.id === id);
  }
}
