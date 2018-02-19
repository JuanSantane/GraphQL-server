import { Component, ChangeDetectionStrategy,  OnInit } from '@angular/core';
import { AmountChangeAction } from '../actions/amount';
import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers';
import { Currency } from '../models/currency';
import { CurrenciesUpdateAction } from '../actions/currency';

import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutComponent implements OnInit {

  public amount$: Observable<number>;
  public currencyRates$: Observable<Currency[]>;

  constructor(public store: Store<fromRoot.State>) {
    this.amount$ = this.store.select(fromRoot.getAmountState);
    this.currencyRates$ = this.store.select(fromRoot.getCurrnecyRates);
  }

  ngOnInit() {
    this.store.dispatch(new CurrenciesUpdateAction());
  }

  onAmountChange(amount: string) {
    const number = parseFloat(amount);
    console.log(number);
    if (!isNaN(number)) {
      this.store.dispatch(new AmountChangeAction(number));
    }
}

}
