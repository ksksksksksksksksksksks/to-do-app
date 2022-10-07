import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Todo } from 'src/app/domain/todo';
import { TodoService } from 'src/app/todo.service';
import { MatTableDataSource } from '@angular/material/table'
import { Observable } from 'rxjs/internal/Observable';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EditTodoDialogComponent } from '../edit-todo-dialog/edit-todo-dialog.component';
import { AuthenticationService } from 'src/app/authentication.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent implements OnInit, OnDestroy {

  @Input() todo!: Todo;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public todos!: Todo[]; 
  public todoList$!: Observable<Todo[]>;
  public dataSource!: MatTableDataSource<Todo>;
  public currentPageSize!: number;

  constructor(private todoService: TodoService,
    private authService: AuthenticationService,
    private changeDetectorRef: ChangeDetectorRef,
    public matDialog: MatDialog) { }

  ngOnInit(): void {
    this.todoService.todos$.subscribe(todos => {
      this.dataSource = new MatTableDataSource<Todo>(todos);
      this.todos = todos;
      this.dataSource.paginator = this.paginator;
      this.todoList$ = this.dataSource.connect();
      this.changeDetectorRef.detectChanges();
      this.currentPageSize = this.paginator.pageSize;
    });
  }

  ngOnDestroy(): void {
    if (this.dataSource) { 
      this.dataSource.disconnect(); 
    }
  }

  changeStatus(todo: Todo) {
    this.todoService.changeStatus(todo);
  }

  removeTodo(todo: Todo) {
    this.todoService.removeTodo(todo);
  }

  addTodo(newTodo: string) {
    this.todoService.addTodo(newTodo, this.authService.id);
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
      this.todoService.updateTodo(todo, updatedTodo);
    });
  }

  getPaginatorData(event: PageEvent): PageEvent {
    if (this.paginator.pageSize !== this.currentPageSize) {
      this.paginator.firstPage();
      this.currentPageSize = this.paginator.pageSize;
    }
    return event;
  }
}
