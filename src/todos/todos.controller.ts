import { Body, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { Controller } from '@nestjs/common';

import { TodosService } from './todos.service';
import { Todo, TodoStatus } from './todo.model';
import { CreateTodoDto } from './dto/create-todo.dto';
import { GetTodosFilterDto } from './dto/get-todos-filter.dto';

@Controller('todos')
export class TodosController {
  constructor(private todosService: TodosService) {}

  @Get()
  getTodos(@Query() getTodosFilterDto: GetTodosFilterDto): Todo[] {
    if (Object.keys(getTodosFilterDto).length) {
      return this.todosService.getTodosWithFilter(getTodosFilterDto);
    }

    return this.todosService.getAllTodos();
  }

  @Get('/:id')
  getTodoById(@Param('id') id: string): Todo {
    return this.todosService.getTodoById(id);
  }

  @Post()
  createTodo(@Body() createTodoDto: CreateTodoDto): Todo {
    return this.todosService.createTodo(createTodoDto);
  }

  @Patch('/:id/status')
  updateTodoStatus(
    @Param('id') id: string,
    @Body('status') status: TodoStatus
  ): Todo {
    return this.todosService.updateTodoStatus(id, status);
  }

  @Delete('/:id')
  deleteTodo(@Param('id') id: string): void {
    return this.todosService.deleteTodo(id);
  }
}
