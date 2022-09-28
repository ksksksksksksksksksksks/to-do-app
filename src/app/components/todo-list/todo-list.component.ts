import { ChangeDetectorRef, Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication.service';
import { Todo } from 'src/app/domain/todo';
import { TodoService } from 'src/app/todo.service';
import { MatTableDataSource } from '@angular/material/table'
import { Observable } from 'rxjs/internal/Observable';


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit, OnDestroy {

  // @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public obs!: Observable<any>;
  public id!: number;
  public todos: Todo[] = this.todoService.todos;
  public dataSource: MatTableDataSource<Todo> = new MatTableDataSource<Todo>(this.todos);
  // public task: Todo | null = null;

  constructor(private route: ActivatedRoute,
    private authService: AuthenticationService,
    private todoService: TodoService,
    private changeDetectorRef: ChangeDetectorRef) {
      this.id = route.snapshot.params['type'];
  }

  ngOnInit(): void {
    this.todos = this.todoService.getTodos();
    this.changeDetectorRef.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.obs = this.dataSource.connect();
    console.log(this.todos);
  }

  ngOnDestroy(): void {
    if (this.dataSource) { 
      this.dataSource.disconnect(); 
    }
  }

  // ngOnInit(): void {
  //   this.todoService.getTodos(this.authService.id).subscribe( res => {
  //     this.todos = res['todos'];
  //     console.log(this.todos);
  //   });
  // }

  addTodo(todo: string) {
    this.todoService.addTodo(todo);
  }

  changeStatus(todo: Todo) {
    this.todos[this.todos.indexOf(todo)].completed = !this.todos[this.todos.indexOf(todo)].completed;
    console.log(this.todoService.todos);
  }

  removeTodo(todo: Todo) {
    this.todoService.removeTodo(todo);
    console.log(this.todoService.todos);
  }

}
