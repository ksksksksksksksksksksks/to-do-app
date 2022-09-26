import { Injectable } from '@angular/core';
import { Todo } from './domain/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  todos!: Todo[];

  constructor() { }

  getTodos(id: number): Todo[] {
    fetch(`https://dummyjson.com/todos/user/${id}`)
    .then(res => res.json())
    .then(res => {
      for (var key in res) {
          if (key === 'todos') {
              this.todos = res[key];
          }
      }
    });
    return(this.todos);
  }
}
