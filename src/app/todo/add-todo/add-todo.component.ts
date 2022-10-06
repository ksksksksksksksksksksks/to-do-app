import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/authentication.service';
import { TodoService } from 'src/app/todo.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent {

  public form: FormGroup;

  constructor(private todoService: TodoService,
    private authService: AuthenticationService) {
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

  addTodo(todo: string) {
    this.todoService.addTodo(todo, this.authService.id);
    this.form.reset();
  }
}
