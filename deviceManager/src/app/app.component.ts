import { Component, OnInit } from '@angular/core';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  // Query without parameters
  queryType = 'query';
  queryMethod = 'getAllUsers';
  fields = 'username password email';

  gqlQuery = gql` ${this.queryType} {
    ${this.queryMethod}{
       ${this.fields}
    }
  }`;
  // Query with parameters
  _queryType = 'query';


  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.apollo
      .watchQuery<any>({
        query: this.gqlQuery
      })
      .valueChanges.subscribe(response => {
        const result = response.data[this.queryMethod];
        console.log(result);
      });
  }
}
