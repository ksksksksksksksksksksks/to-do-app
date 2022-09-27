import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
  public todos: Todo[] = this.todoService.todos;
  // public task: Todo | null = null;

  constructor(private route: ActivatedRoute,
    private authService: AuthenticationService,
    private todoService: TodoService) {
      this.id = route.snapshot.params['type'];
      this.todos = this.todoService.getTodos();
  }

  ngOnInit(): void {
    this.todos = this.todoService.getTodos();
    console.log(this.todos);
  }

  // ngOnInit(): void {
  //   this.todoService.getTodos(this.authService.id).subscribe( res => {
  //     this.todos = res['todos'];
  //     console.log(this.todos);
  //   });
  // }

  removeTodo(todo: Todo) {
    this.todoService.removeTodo(todo);
    console.log(this.todoService.todos);
  }

  addTodo(title: string) {
    this.todoService.addTodo(title);
  }

  completeTodo(todo: Todo): void {
  }

  toggle(todo: Todo) {
    this.todos[this.todos.indexOf(todo)].completed = !this.todos[this.todos.indexOf(todo)].completed;
  }

}
