import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { User } from './domain/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public id!: number;
  private userSubject!: BehaviorSubject<User>;
  public user: Observable<User>;
     
  constructor(private http: HttpClient, 
    private router: Router) { 
      this.userSubject = new BehaviorSubject<User>(
        JSON.parse(<string>localStorage.getItem('currentUser'))
      );
      this.user = this.userSubject.asObservable();
    }

  public get userValue(): User {
    return this.userSubject.value;
  }

  login(name: string, password: string ) {
    return this.http.post<any>('https://dummyjson.com/auth/login', {username: name, password}).pipe( map (({id}) => {
      let user: User = {
        name: name,
        token: id,
      };
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.userSubject.next(user);
      this.id = user.token;
      return user;
    }));
  }

    logout() {
        localStorage.removeItem('currentUser');
        this.userSubject.next(null!);
    }  
}