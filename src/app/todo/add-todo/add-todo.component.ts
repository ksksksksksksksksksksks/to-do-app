import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddTodoComponent {

  @Output() newTodoEvent = new EventEmitter<string>();
  public form: FormGroup;

  constructor() {
      this.form = new FormGroup({
        newTodo: new FormControl('', [
          Validators.required,
          Validators.maxLength(200)
        ]) 
      });
    }

  get newTodo() {    
    return this.form.get('newTodo');
  }  

  addNewTodo(value: string) {
    this.newTodoEvent.emit(value);
  }
}