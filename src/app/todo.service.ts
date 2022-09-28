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
  public todos$ = this.todos.asObservable();

  constructor(private http: HttpClient,
    private authService: AuthenticationService,) {
      this.http.get<any>(`https://dummyjson.com/todos/user/${this.authService.id}`).subscribe( res => {
      this.todos.next(res.todos);
      console.log(this.todos);
    });
  }

  // public get todos$(): Observable<Todo[]>  {
  //   return this.todos.asObservable();
  // }

  getTodos(): Observable<Todo[]> {
    return this.todos$;
  }

  addTodo(todo: string) {
    if (todo === '') return;
    let todos = new Array<Todo>();
    todos.push({
      id: 0,
      todo: todo,
      completed: false
    });
    this.todos.next(todos);
  }

  removeTodo(todo: Todo) {
    // this.todos.splice(this.todos.indexOf(todo), 1);
  }

  updateTodo(index: number, updatedTodo: Todo) {
    // this.todos[index] = updatedTodo;
  }

}


  // getTodos(id: number) : Observable<any> {
  //   return this.http.get<any>(`https://dummyjson.com/todos/user/${id}`);
  // }