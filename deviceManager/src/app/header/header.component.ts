import { User } from './../store/models/user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userLogged: User;

  constructor() { }

  ngOnInit() {
  }

  logout(){

  }

}
