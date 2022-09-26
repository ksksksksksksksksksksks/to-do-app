import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication.service';
import { Todo } from 'src/app/domain/todo';
import { TodoService } from 'src/app/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  public id!: number;
  public todos!: Todo[];

  constructor(private route: ActivatedRoute,
    private authService: AuthenticationService,
    private todoService: TodoService) {
    this.id = route.snapshot.params['type'];
    this.todos = this.todoService.getTodos(this.authService.id);
    console.log(this.todos);
  }

  ngOnInit(): void {
  }

}
