import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from './domain/todo';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  todos!: Todo[];

  constructor(private http: HttpClient,
    private authService: AuthenticationService,) { }

  getTodos(id: number) : Observable<any> {
    return this.http.get<any>(`https://dummyjson.com/todos/user/${id}`)
  }
}
