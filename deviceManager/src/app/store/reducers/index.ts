import { User } from './../models/user';
import * as fromAmount from './amount';
import * as fromCurrency from './currency';
import * as fromUser from './user';
import { Currency } from './../models/currency';

export const reducers = {
    amount: fromAmount.reducer,
    currencies: fromCurrency.reducer,
    userlogged: fromUser.reducer
};

export interface State {
    amount: number;
    currencies: Currency[];
    userlogged: User;
}

export const getAmountState = (state: State) => {
  console.log('getAmountState ==> ', state.amount);
  return state.amount;
};

export const getCurrnecyRates = (state: State) => {
  console.log('getCurrnecyRates ==> ', state.currencies);
  return state.currencies;
};


