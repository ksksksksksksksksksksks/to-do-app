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

  public get todos$(): Observable<Todo[]>  {
    return this.todos.asObservable();
  }

  addTodo(todo: string, userId: number) {
    if (todo === '') return;
    this.http.post(`https://dummyjson.com/todos/add`, { 
        todo: todo, 
        completed: false, 
        userId: userId 
      })
    .subscribe((newTodo) => {
      const todos = this.todos.value.slice();
      todos.push(<Todo>newTodo);
      this.todos.next(todos);
      console.log('Add successful');
    });
  }

  changeStatus(todo: Todo) {
    this.http.put(`https://dummyjson.com/todos/${todo.id}`, {
        completed: !todo.completed
      })
    .subscribe((updatedTodo) => {
      const todos = this.todos.value.slice();
      todos[todos.indexOf(todo)].completed = (<Todo>updatedTodo).completed;
      this.todos.next(todos);
      console.log('Change status successful');
    });
  }

  removeTodo(todo: Todo) {
    this.http.delete(`https://dummyjson.com/todos/${todo.id}`).subscribe(() => {
      const todos = this.todos.value.slice();
      todos.splice(todos.indexOf(todo), 1);
      this.todos.next(todos);
      console.log('Delete successful');
    });
    
  }

  updateTodo(todo: Todo, updatedTodo: string) {
    this.http.put(`https://dummyjson.com/todos/${todo.id}`, {
        todo: updatedTodo
      })
    .subscribe((updatedTodo) => {
      const todos = this.todos.value.slice();
      todos[todos.indexOf(todo)].todo = (<Todo>updatedTodo).todo;
      this.todos.next(todos);
      console.log('Update successful');
    });    
    console.log(this.todos);
  }
}
