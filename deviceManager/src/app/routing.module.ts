import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AboutComponent } from './about/about.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { patch } from 'webdriver-js-extender';
import { AppComponent } from './app.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';

const appRoutes: Routes = [
  {path: '', redirectTo: 'devices', pathMatch: 'full' },
  // { path: 'devices', component: DevicesComponent },
  // { path: 'devices/edit/:id', component: EditDeviceComponent, canDeactivate: [CanDeactivateGuard] },
  // { path: 'devices/new', component: NewDeviceComponent, canActivate: [AuthGuard] },
  { path: 'auth/signin', component: SigninComponent },
  { path: 'auth/signup', component: SignupComponent },
  { path: 'about', component: AboutComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'home', component: HomeComponent },
  // { path: 'devices/:id', component: DeviceDetailComponent },
  { path: '**', component: PageNotFoundComponent }
  // { path: 'devices', component: DevicesComponent, children: [
  //   {path: ':name', component: DeviceDetailComponent }
  // ] },
  // { path: 'about', component: DeviceComponent }
];

@NgModule({

  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]

})

export class AppRoutingModule {

}
