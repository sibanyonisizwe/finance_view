import {Money} from "../money/money.model";

export interface ForecastRow {

  term: number;

  openingBalance: Money;

  closingBalance: Money;

  deposit: Money;

  interestAmount: Money;

  interestAsPercentageOfDeposit: number;

  interestRate: number;

  randomDeposit: Money;

  randomWithdrawal: Money;
}
