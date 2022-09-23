import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthorizationService {
    id!: number;
     
    constructor() {
    }

    login(name: string, password: string ) : Observable<any> {
        fetch('https://dummyjson.com/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({  
                username: name,
                password: password,
            })
        })
        .then(res => res.json())
        .then(res => {
            for (var key in res) {
                if (key === 'id') {
                    this.id = res[key];
                    console.log(this.id);
                }
            }
        })
        return of(this.id);
    }
    
}