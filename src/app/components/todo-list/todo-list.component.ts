import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { Todo } from 'src/app/domain/todo';
import { TodoService } from 'src/app/todo.service';
import { MatTableDataSource } from '@angular/material/table'
import { Observable } from 'rxjs/internal/Observable';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EditTodoDialogComponent } from '../edit-todo-dialog/edit-todo-dialog.component';
import { User } from 'src/app/domain/user';
import { AuthenticationService } from 'src/app/authentication.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent implements OnInit, OnDestroy {

  @Input() todo!: Todo;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public id!: number;
  public currentUser$!: User;
  public todos!: Todo[]; 
  public todoList!: Observable<Todo[]>;
  public dataSource!: MatTableDataSource<Todo>;

  constructor(private route: ActivatedRoute,
    private authService: AuthenticationService,
    private todoService: TodoService,
    private changeDetectorRef: ChangeDetectorRef,
    public matDialog: MatDialog) {
      this.id = route.snapshot.params['type'];
      this.authService.user.subscribe(user => {
        this.currentUser$ = user;
      });
  }

  ngOnInit(): void {

    this.todoService.todos$.subscribe(todos => {
      this.dataSource = new MatTableDataSource<Todo>(todos);
      this.todos = todos;
      this.dataSource.paginator = this.paginator;
      this.todoList = this.dataSource.connect();
      this.changeDetectorRef.detectChanges();
    });
    
    // console.log(this.todos$);
    console.log(this.todoList);
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
    this.todoService.changeStatus(todo);
  }

  removeTodo(todo: Todo) {
    this.todoService.removeTodo(todo);
  }

  editTodo(todo: Todo) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = "edit-todo";
    dialogConfig.height = "window.screen.height";
    dialogConfig.width = "window.screen.height";
    dialogConfig.data = todo;
    const modalDialog = this.matDialog.open(EditTodoDialogComponent, dialogConfig);
    modalDialog.afterClosed().subscribe(updatedTodo => {
      if (updatedTodo !== ''){
        this.todoService.updateTodo(todo, updatedTodo);
      }
    });
  }
}
