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
      });
  }

  public get todos$(): Observable<Todo[]> {
    return this.todos.asObservable();
  }

  addTodo(todo: string, userId: number) {
    this.http.post(`https://dummyjson.com/todos/add`, { 
        todo: todo, 
        completed: false, 
        userId: userId
      })
    .subscribe((newTodo) => {
      const todos = this.todos.value.slice();
      todos.push(<Todo>newTodo);
      todos[todos.indexOf(<Todo>newTodo)].fakeApi = true;
      this.todos.next(todos);
      console.log('Add successful');
    });
  }

  changeStatus(todo: Todo) {
    const todos = this.todos.value.slice();
    if (todos[todos.indexOf(todo)].fakeApi) {
      todos[todos.indexOf(todo)].completed = !todo.completed;
      this.todos.next(todos);
      console.log('Change status successful');
    }
    else {
      this.http.put(`https://dummyjson.com/todos/${todo.id}`, {
          completed: !todo.completed
        })
      .subscribe((updatedTodo) => {
        todos[todos.indexOf(todo)].completed = (<Todo>updatedTodo).completed;
        this.todos.next(todos);
        console.log('Change status successful');
      });
    }  
  }

  removeTodo(todo: Todo) {
    const todos = this.todos.value.slice();
    if (todos[todos.indexOf(todo)].fakeApi) {
      todos.splice(todos.indexOf(todo), 1);
      this.todos.next(todos);
      console.log('Delete successful');
    }
    else {
      this.http.delete(`https://dummyjson.com/todos/${todo.id}`).subscribe(() => {
        todos.splice(todos.indexOf(todo), 1);
        this.todos.next(todos);
        console.log('Delete successful');
      });
    }
  }

  updateTodo(todo: Todo, updatedTodo: string) {
    const todos = this.todos.value.slice();
    if (todos[todos.indexOf(todo)].fakeApi) {
      todos[todos.indexOf(todo)].todo = updatedTodo;
      this.todos.next(todos);
      console.log('Update successful');
    }
    else {
      this.http.put(`https://dummyjson.com/todos/${todo.id}`, {
        todo: updatedTodo
      })
      .subscribe((updatedTodo) => {
        todos[todos.indexOf(todo)].todo = (<Todo>updatedTodo).todo;
        this.todos.next(todos);
        console.log('Update successful');
      });
    }
  }
}
