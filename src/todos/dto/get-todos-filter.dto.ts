import { TodoStatus } from '../todo.model';

export class GetTodosFilterDto {
  search: string;
  status: TodoStatus;
}
