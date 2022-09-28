import { ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication.service';
import { Todo } from 'src/app/domain/todo';
import { TodoService } from 'src/app/todo.service';
import { MatTableDataSource } from '@angular/material/table'
import { Observable } from 'rxjs/internal/Observable';
import { MatDialog } from '@angular/material/dialog';
import { EditTodoDialogComponent } from '../edit-todo-dialog/edit-todo-dialog.component';


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit, OnDestroy {

  @Input() todo!: Todo;

  // @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public obs!: Observable<any>;
  public id!: number;
  public todos$!: Todo[];
  public dataSource: MatTableDataSource<Todo> = new MatTableDataSource<Todo>(this.todos$);
  // public task: Todo | null = null;

  constructor(private route: ActivatedRoute,
    private authService: AuthenticationService,
    private todoService: TodoService,
    private changeDetectorRef: ChangeDetectorRef,
    private dialog: MatDialog) {
      this.id = route.snapshot.params['type'];
      todoService.todos$.subscribe((todos: Array<Todo>) => {
        //first call is reached with user = undefined
        if (!!todos[0]) { console.log(todos[0].todo) 
          this.todo = todos[0];
        }
      })
  }

  ngOnInit(): void {
    this.changeDetectorRef.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.obs = this.dataSource.connect();
    // console.log(this.todos);
  }

  ngOnDestroy(): void {
    if (this.dataSource) { 
      this.dataSource.disconnect(); 
    }
  }

  addTodo(todo: string) {
    this.todoService.addTodo(todo);
  }

  changeStatus(todo: Todo) {
    this.todos$[this.todos$.indexOf(todo)].completed = !this.todos$[this.todos$.indexOf(todo)].completed;
    // console.log(this.todoService.todos);
  }

  removeTodo(todo: Todo) {
    this.todoService.removeTodo(todo);
    // console.log(this.todoService.todos);
  }

  editTodo(todo: Todo) {
    let dialogRef = this.dialog.open(EditTodoDialogComponent, {
      width: '700px',
      data: todo
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.todoService.updateTodo(this.todos$.indexOf(todo), result);
      }
    })
  }

}
