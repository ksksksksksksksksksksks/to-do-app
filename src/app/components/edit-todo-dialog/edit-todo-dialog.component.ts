import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TodoListComponent } from '../todo-list/todo-list.component';

@Component({
  selector: 'app-edit-todo-dialog',
  templateUrl: './edit-todo-dialog.component.html',
  styleUrls: ['./edit-todo-dialog.component.scss']
})
export class EditTodoDialogComponent {

  constructor(public dialogRef: MatDialogRef<TodoListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  updateTodo(updatedTodo: string) {
    this.dialogRef.close(updatedTodo);
  }

  close() {
    this.dialogRef.close('');
  }
}
