import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Todo } from './domain/todo';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private todos = new BehaviorSubject<Todo[]>([]);

  constructor(private http: HttpClient,
    private authService: AuthenticationService,) {
      this.http.get<any>(`https://dummyjson.com/todos/user/${this.authService.id}`).subscribe(res => {
        this.todos.next(res.todos);
        // console.log(this.todos);
      });
  }

  public get todos$(): Observable<Todo[]>  {
    return this.todos.asObservable();
  }

  addTodo(todo: string) {
    if (todo === '') return;
    let todos = this.todos.getValue();
    todos.push({
      id: 0,
      todo: todo,
      completed: false
    });
    this.todos.next(todos);
  }

  changeStatus(todo: Todo) {
    let todos = this.todos.getValue();
    todos[todos.indexOf(todo)].completed = !todos[todos.indexOf(todo)].completed;
    this.todos.next(todos);
    console.log(this.todos.getValue());
  }

  removeTodo(todo: Todo) {
    let todos = this.todos.getValue();
    todos.splice(todos.indexOf(todo), 1);
    this.todos.next(todos);
    console.log(this.todos.getValue());
  }

  updateTodo(todo: Todo, updatedTodo: string) {
    let todos = this.todos.getValue();
    todos[todos.indexOf(todo)].todo = updatedTodo;
    this.todos.next(todos);
    console.log(this.todos.getValue());
  }
}