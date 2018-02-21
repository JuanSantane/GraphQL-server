import { HttpClient } from '@angular/common/http';
import { Currency } from '../models/currency';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { map } from 'async';

@Injectable()
export class UserService {
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

  constructor(private apollo: Apollo) {
    console.log('######################################################');
    this.getAllUsers().subscribe(result => {
      console.log(result);
    });
  }

  getAllUsers(): Observable<any> {
     return this.apollo
      .watchQuery<any>({
        query: this.gqlQuery
      }).valueChanges;
      // .subscribe(response => {
      //   const result = response.data[this.queryMethod];
      //   console.log(result);
      //   return result;
      // });
  }
}
