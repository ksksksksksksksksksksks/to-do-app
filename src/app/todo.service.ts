import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from './domain/todo';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  todos: Todo[] = [];

  constructor(private http: HttpClient,
    private authService: AuthenticationService,) {
      this.http.get<any>(`https://dummyjson.com/todos/user/${this.authService.id}`).subscribe( res => {
      this.todos = res['todos'];
      console.log(this.todos);
    });
  }

  getTodos(): Todo[] {
    return this.todos;
  }

  addTodo(todo: string) {
    if (todo === '') return;
    this.todos.push({
      id: 0,
      todo: todo,
      completed: false
    })
  }

  removeTodo(todo: Todo) {
    this.todos.splice(this.todos.indexOf(todo), 1);
  }

}


  // getTodos(id: number) : Observable<any> {
  //   return this.http.get<any>(`https://dummyjson.com/todos/user/${id}`);
  // }