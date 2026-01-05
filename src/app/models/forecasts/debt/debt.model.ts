import {Forecast} from "../forecast.model";
import {Money} from "../../money/money.model";

export interface Debt extends Forecast {

  purchasePrice: Money;

  depositPercentage: number;

  deposit:Money;

  monthlyRepayment:Money;

  totalAmountPaid:Money;

  loanAmount:Money;

  totalInterestOnLoan:Money;
}
