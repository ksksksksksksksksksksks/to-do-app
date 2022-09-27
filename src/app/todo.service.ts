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

  removeTodo(todo: Todo) {
    this.todos.splice(this.todos.indexOf(todo), 1);
  }

  addTodo(title: string) {
    if (title === '') return;
    this.todos.push({
      id: 0,
      todo: title,
      completed: false
    })
  }
}


  // getTodos(id: number) : Observable<any> {
  //   return this.http.get<any>(`https://dummyjson.com/todos/user/${id}`);
  // }