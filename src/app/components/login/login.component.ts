import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { AuthenticationService } from 'src/app/authentication.service';
import { first } from 'rxjs/internal/operators/first';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public form: FormGroup;
  public error = '';

  constructor(private router: Router,
    private authService: AuthenticationService) { 
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)  
    });
  }

  ngOnInit(): void {
  }

  login() {
  //   const value = this.form.value;
    
  //   if (value.name && value.password) {
  //     this.authService.login(value.name, value.password)
  //       .subscribe(
  //         res => {
  //           console.log('Login Succesful, id = ', res);
  //           if (typeof(res) === 'number') {
  //             this.router.navigateByUrl(`todo-list/users/${res}`);
  //           }
  //         }
  //     );
  //   }
  }

  onSubmit() {
    this.authService
      .login(this.form.value.name, this.form.value.password)
      .pipe(first())
      .subscribe({
        next: () => {
          this.router.navigate(['']);
        },
        error: (error) => {
          this.error = error;
        },
    });
  }
} 
