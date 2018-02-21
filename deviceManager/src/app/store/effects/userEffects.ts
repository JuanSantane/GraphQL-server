import { CurrenciesUpdatedAction } from './../actions/currency';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';

import * as currency from '../actions/currency';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { UserService } from '../services/user.service';

@Injectable()
export class UserEffects {
    constructor(
        private userService: UserService,
        private actions$: Actions
    ) {}

    @Effect()
    update$: Observable<Action> = this.actions$
        .ofType(currency.CURRENCIESUPDATE)
        .switchMap(() =>
            this.userService
                .getAllUsers()
                .map(data => new CurrenciesUpdatedAction(data))
        );
}
