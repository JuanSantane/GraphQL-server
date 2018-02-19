import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  sections = [
    { name: 'dashboard', route: 'about', icon: 'dashboard' },
    { name: 'user', route: 'home', icon: 'person' },
    { name: 'table', route: 'dashboard', icon: 'content_paste' },
    { name: 'Typography', route: '/dashboard', icon: 'library_books' },
    { name: 'maps', route: '/dashboard', icon: 'location_on' },
    { name: 'notifications', route: '/dashboard', icon: 'notifications' },
    { name: 'user', route: '/dashboard', icon: 'person' },
    { name: 'dashboard', route: 'about', icon: 'dashboard' },
    { name: 'user', route: 'home', icon: 'person' },
    { name: 'table', route: 'dashboard', icon: 'content_paste' },
    { name: 'Typography', route: '/dashboard', icon: 'library_books' },
    { name: 'maps', route: '/dashboard', icon: 'location_on' },
    { name: 'notifications', route: '/dashboard', icon: 'notifications' },
    { name: 'user', route: '/dashboard', icon: 'person' }
  ];

  open = true;


  constructor() { }

  ngOnInit() {
  }

}
