import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { TodoCreateDto } from './todo-dto.dto';
@Injectable()
export class TodoModelService {
  todos: Todo[] = [];

  create(todo: TodoCreateDto) {
    const newTodo: Todo = {
      ...todo,
      id: v4(),
      createdAt: new Date(),
      status: Status.ACTIVE,
    };
    this.todos.push(newTodo);
    return newTodo;
  }

  get() {
    return this.todos;
  }

  update(id: string, todo: TodoCreateDto) {
    const index = this.todos.findIndex((todo) => todo.id === id);
    this.todos[index] = {
      ...this.todos[index],
      ...todo,
    };
    return this.todos[index];
  }

  delete(id: string) {
    const index = this.todos.findIndex((todo) => todo.id === id);
    this.todos.splice(index, 1);
    return true;
  }

  getOne(id: string) {
    return this.todos.find((todo) => todo.id === id);
  }
}

export enum Status {
  ACTIVE = 'ACTIVE',
  DONE = 'DONE',
  WAITING = 'WAITING',
}

export interface Todo {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  status: Status;
}
