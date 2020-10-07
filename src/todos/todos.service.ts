import { Injectable } from '@nestjs/common';
import * as uuid from 'uuid/v1';

import { Todo, TodoStatus } from './todo.model';
import { CreateTodoDto } from './dto/create-todo.dto';
import { GetTodosFilterDto } from './dto/get-todos-filter.dto';

@Injectable()
export class TodosService {
  private todos: Todo[] = [];

  getAllTodos(): Todo[] {
    return this.todos;
  }

  getTodosWithFilter(getTodosFilterDto: GetTodosFilterDto): Todo[] {
    const { status, search } = getTodosFilterDto;

    let todos = this.getAllTodos();
    if (status) {
      todos = todos.filter((todo) => todo.status === status);
    }

    if (search) {
      todos = todos.filter(
        (todo) =>
          todo.title.includes(search) || todo.description.includes(search)
      );
    }

    return todos;
  }

  getTodoById(id: string): Todo {
    return this.todos.find((todo) => todo.id === id);
  }

  createTodo(createTodoDto: CreateTodoDto): Todo {
    const { title, description } = createTodoDto;

    const todos: Todo = {
      id: uuid(),
      title,
      description,
      status: TodoStatus.OPEN,
    };

    this.todos.push(todos);

    return todos;
  }

  updateTodoStatus(id: string, status: TodoStatus): Todo {
    const todo = this.getTodoById(id);
    todo.status = status;

    return todo;
  }

  deleteTodo(id: string): void {
    this.todos = this.todos.filter((todo) => todo.id !== id);
  }
}
