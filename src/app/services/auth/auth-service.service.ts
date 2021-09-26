import { Injectable } from '@angular/core';
import { User } from 'src/app/interface/user';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  username = 'tony@hotmail.com';
  password = '1234';

  constructor() { }


  login = async (user: User) => new Promise((resolve) => {
      setTimeout(()=> {
        if( user.email === this.username && user.password === this.password) {
          resolve(true);
        } else {
          resolve(false);
        }
      }, 3000);
    });
}
