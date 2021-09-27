import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { User } from 'src/app/interface/user';
import { checkUser, getUser } from 'src/app/utils/checkUser';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  username = 'tony@hotmail.com';
  password = '1234';

  dataBase: User[] = [
    {email: 'tony@hotmail.com', password: '1234'}
  ];

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

  register = async (newUser: User) => new Promise((resolve) => {
    setTimeout(()=> {
      if(!checkUser(this.dataBase, newUser)) {
        this.dataBase.push(newUser);
        resolve(true);
      } else {
        resolve(false);
      }
    }, 3000);
  });
}
