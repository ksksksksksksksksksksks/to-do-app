import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TodoListComponent } from '../todo-list/todo-list.component';

@Component({
  selector: 'app-edit-todo-dialog',
  templateUrl: './edit-todo-dialog.component.html',
  styleUrls: ['./edit-todo-dialog.component.scss']
})
export class EditTodoDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<TodoListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 

    }

  ngOnInit(): void {
  }

  updateTodo(updatedTodo: string) {
    this.dialogRef.close(updatedTodo);
  }

  close() {
    this.dialogRef.close('');
  } 

}
