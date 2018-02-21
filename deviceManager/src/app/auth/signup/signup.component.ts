import { UserSignupAction } from './../../store/actions/user';
import { Store } from '@ngrx/store';
import { UserService } from './../../store/services/user.service';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { User } from '../../store/models/user';
import { Subscription } from 'rxjs/Subscription';
import * as reducersRoot from '../../store/reducers';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  logged = false;
  submited = false;
  messageToUser = '';
  timerSubscription: Subscription;

  signinForm: FormGroup = new FormGroup({
    userData: new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
    })
  });

  constructor(
    public store: Store<reducersRoot.State>,
    private location: Location,
    private authService: UserService
  ) {}

  ngOnInit() {
    // this.timerSubscription = this.authService
    //   .getTimer()
    //   .subscribe(r => console.log(r));

    this.store.subscribe(r => console.log(r) );
  }
  ngOnDestroy(): void {
    // this.timerSubscription.unsubscribe();
  }
  onSubmit() {
    const userData = this.signinForm.getRawValue().userData;

    const user = new User(userData.username, userData.password);
    console.log(user);
    // this.authService.signup();
    this.store.dispatch(new UserSignupAction(user));
  }
  goBack() {
    this.location.back();
  }
}
