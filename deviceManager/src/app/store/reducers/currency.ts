import { Currency } from './../models/currency';
import * as currency from '../actions/currency';

export function reducer(state = [], action: currency.CurrenciesUpdatedAction) {
    console.log('action.type ==> ', action.type );
    switch (action.type) {
        case currency.CURRENCIESUPDATED:
          return action.payload;
        default:
            return state;
    }
}
