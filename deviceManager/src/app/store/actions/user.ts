import { User } from './../models/user';
import { Action } from '@ngrx/store';

export const USERSIGNUP = '[Auth] Signup';
export const USERSIGNIN = '[Auth] Signin';

export class UserSignupAction implements Action {
  type = USERSIGNUP;
  constructor(public payload?: User) {
    console.log('ACTION => ', this.type, payload);
  }
}

export class UserSigninAction implements Action {
  type = USERSIGNIN;
  constructor(public payload?: User) {
    console.log('ACTION ==> ', this.type, payload);
  }
}
