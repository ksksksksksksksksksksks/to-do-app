import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { AuthorizationService } from 'src/app/authorization.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public form: FormGroup;
  public id!: number;

  constructor(private router: Router,
    private authService: AuthorizationService) { 
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)  
    });
  }

  ngOnInit(): void {
  }

  login() {
    const value = this.form.value;
    
    if (value.name && value.password) {
      this.authService.login(value.name, value.password)
        .subscribe(
          () => {
            console.log("User is logged in");
            //this.router.navigateByUrl(`users/${id}/todo`);
          }
      );
  }

  }
  // users/{{this.id}}/todo
}
