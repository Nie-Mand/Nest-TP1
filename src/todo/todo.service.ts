import { Injectable, NotFoundException } from '@nestjs/common';
import { Status, Todo } from 'src/@types/enums';
import { v4 } from 'uuid';
import { TodoCreateDto, TodoUpdateDto } from './todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
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

  async get(page?: number, text?: string, status?: Status) {
    const pageSize = 3;

    let where = {};

    if (text && status) {
      where = [
        {
          name: Like(`%${text}%`),
          status,
        },
        {
          description: Like(`%${text}%`),
          status,
        },
      ];
    } else if (text) {
      where = [
        {
          name: Like(`%${text}%`),
        },
        {
          description: Like(`%${text}%`),
        },
      ];
    } else if (status) {
      where = {
        status,
      };
    }

    const allData = await this.todos.count();

    const data = await this.todos.find({
      where,
      order: {
        createdAt: 'DESC',
      },
      take: pageSize,
      skip: page ? (Number(page) - 1) * pageSize : 0,
    });

    return {
      data,
      page: Number(page) || 1,
      pageSize,
      totalPages: Math.ceil(allData / pageSize),
    };
  }

  async update(id: string, _todo: TodoUpdateDto) {
    const todo = await this.todos.findOne({
      where: {
        id,
      },
    });

    if (!todo) {
      throw new NotFoundException('Todo not found');
    }

    if (_todo.name) todo.name = _todo.name;
    if (_todo.description) todo.description = _todo.description;
    if (_todo.status) todo.status = _todo.status;

    return this.todos.save(todo);
  }

  async getOne(id: string) {
    const todo = await this.todos.findOne({
      where: {
        id,
      },
    });

    if (!todo) {
      throw new NotFoundException('Todo not found');
    }

    return todo;
  }

  async delete(id: string) {
    const todo = await this.todos.findOne({
      where: {
        id,
      },
    });

    if (!todo) {
      throw new NotFoundException('Todo not found');
    }

    todo.softRemove();
  }

  restore(id: string) {
    return this.todos.restore({
      id,
    });
  }

  todosCountByStatus() {
    return this.todos
      .createQueryBuilder('todo')
      .select('todo.status', 'status')
      .addSelect('COUNT(*)', 'count')
      .groupBy('todo.status')
      .getRawMany();
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
    const index = this.__todos.findIndex((todo) => todo.id === id);
    this.__todos.splice(index, 1);
    return true;
  }

  __getOne(id: string) {
    return this.__todos.find((todo) => todo.id === id);
  }
}
