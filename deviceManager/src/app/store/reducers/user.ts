import { UserSignupAction } from './../actions/user';
import { State } from './index';
import { User } from './../models/user';
import * as UserAction from '../actions/user';
import { Action } from '@ngrx/store';

export function reducer(state: State = null , action: Action) {
  console.log('action.type ==> ', action.type);
  switch (action.type) {
    case UserAction.USERSIGNUP:
      return handleUser(state, action);
    case UserAction.USERSIGNIN:
      return signInUser(state, action);
    default:
      return state;
  }
}

function handleUser(state: State = null, action: UserAction.UserSignupAction) {
  console.log('SE ESTA REGISTRANDO UN NUEVO USUARIO');
  return action.payload != null;
}
function signInUser(state: State = null, action: UserAction.UserSigninAction) {
  console.log('SE ESTA LOGEANDO UN USUARIO VIEJO');

}
