import { injectable, inject } from 'inversify';
import { TodoInterfaceService } from '../interfaces/todoInterface.service';
import { Todo } from '../../models/Todo.model';
import { ResponseModel } from '../../models/Response.model';
import IDENTIFIERS from '../../identifiers';
import { TodoInterfaceRepository } from '../../repositories/interface/todoInterface.repository';

@injectable()
export class TodoService implements TodoInterfaceService {
  constructor(
    @inject(IDENTIFIERS.TodoRepository)
    private varTodoRepository: TodoInterfaceRepository,
  ) {}

  public async addTodo(todo: Todo): Promise<any> {
    const res = new ResponseModel();
    let newTodo: Todo = new Todo();

    newTodo = { ...newTodo };
    newTodo = Object.assign(newTodo, todo);

    const result = await this.varTodoRepository.addTodo(newTodo);

    res.setSuccessResponseAndDataWithMessage(result, 'New todo added!', true);

    return res;
  }

  public async getTodos(): Promise<any> {
    const result = await this.varTodoRepository.getTodos();
    const res = new ResponseModel();

    if (!result || result.length === 0) {
      res.setSuccessResponse('No todo found!', false);
    } else {
      res.setSuccessResponseAndData(result, true);
    }

    return res;
  }

  public async getTodosByDone(done: boolean): Promise<any> {
    const result = await this.varTodoRepository.getTodosByDone(done);
    let obj = {};
    const res = new ResponseModel();

    if (!result || result.length === 0) {
      res.setSuccessResponse('No todo found!', false);
    } else {
      res.setSuccessResponseAndData(result, true);
    }

    return obj;
  }

  public async deleteTodo(id: string): Promise<any> {
    const res = new ResponseModel();
    const result = await this.varTodoRepository.deleteTodo(id);

    res.setSuccessResponseAndDataWithMessage(result, 'Todo deleted!', true);

    return res;
  }

  public async getTodo(id: string): Promise<any> {
    const result = await this.varTodoRepository.getTodo(id);
    const res = new ResponseModel();

    if (!result) {
      res.setSuccessResponse('No todo found!', false);
    } else {
      res.setSuccessResponseAndData(result, true);
    }

    return res;
  }

  public async updateTodo(id: string, todo: Todo): Promise<any> {
    const result = await this.varTodoRepository.updateTodo(id, todo);
    const res = new ResponseModel();

    res.setSuccessResponseAndDataWithMessage(result, 'Todo updated!', true);

    return res;
  }
}
