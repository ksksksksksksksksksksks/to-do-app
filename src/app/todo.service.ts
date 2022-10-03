import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Todo } from './domain/todo';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';

function getId(id: number) {
  return id += 1;
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private todos = new BehaviorSubject<Todo[]>([]);
  public maxId!: number;

  constructor(private http: HttpClient,
    private authService: AuthenticationService,) {
      this.http.get<any>(`https://dummyjson.com/todos/user/${this.authService.id}`).subscribe(res => {
        this.todos.next(res.todos);
      });
      this.http.get<any>(`https://dummyjson.com/todos`).subscribe(res => {
        this.maxId = res.total;
      });
  }

  public get todos$(): Observable<Todo[]>  {
    return this.todos.asObservable();
  }

  addTodo(todo: string, userId: number) {
    if (todo === '') return;
    let todos = this.todos.getValue();
    let body = {
      id: getId(this.maxId),
      todo: todo,
      completed: false,
      userId: userId
    };
    this.http.post(`https://dummyjson.com/todos/add`, body).subscribe(() => {
      console.log('Add successful');
    });
    todos.push(body);
    this.todos.next(todos);
    this.maxId = body.id;
  }

  changeStatus(todo: Todo) {
    let todos = this.todos.getValue();
    this.http.put(`https://dummyjson.com/todos/${todo.id}`, {
        completed: !todo.completed
      })
    .subscribe(() => {
      console.log('Change status successful');
    });
    todo.completed = !todo.completed;
    this.todos.next(todos);
  }

  removeTodo(todo: Todo) {
    let todos = this.todos.getValue();
    this.http.delete(`https://dummyjson.com/todos/${todo.id}`).subscribe(() => {
      console.log('Delete successful');
    });
    todos.splice(todos.indexOf(todo), 1);
    this.todos.next(todos);
  }

  updateTodo(todo: Todo, updatedTodo: string) {
    let todos = this.todos.getValue();
    this.http.put(`https://dummyjson.com/todos/${todo.id}`, {
      todo: updatedTodo
      })
    .subscribe(() => {
      console.log('Update successful');
    });
    todo.todo = updatedTodo;
    this.todos.next(todos);
  }
}
