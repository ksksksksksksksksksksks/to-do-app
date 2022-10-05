import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TodoListComponent } from '../todo-list/todo-list.component';

@Component({
  selector: 'app-edit-todo-dialog',
  templateUrl: './edit-todo-dialog.component.html',
  styleUrls: ['./edit-todo-dialog.component.scss']
})
export class EditTodoDialogComponent {

  public form: FormGroup;

  constructor(public dialogRef: MatDialogRef<TodoListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
      this.form = new FormGroup({
        updatedTodo: new FormControl('', [
          Validators.required,
          Validators.maxLength(200)
        ]) 
      });
      console.log(this.data.todo);
    }

  updateTodo(updatedTodo: string) {
    this.dialogRef.close(updatedTodo);
  }

  close() {
    this.dialogRef.close('');
  }
}
