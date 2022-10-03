import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { AuthenticationService } from 'src/app/authentication.service';
import { first } from 'rxjs/internal/operators/first';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {

  public form: FormGroup;

  constructor(private router: Router,
    private authService: AuthenticationService) { 
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)  
    });
  }

  login() {
    this.authService.login(this.form.value.name, this.form.value.password).pipe(first()).subscribe({
      next: (user) => {
        this.router.navigateByUrl(`todo-list/users/${user.token}`);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
} 
