import {ForecastRow} from "./forecast-row.model";
import {Money} from "../money/money.model";

export interface Forecast {
  type:string;

  forecastNum: string;

  forecastName: string;

  term: number;

  interestRate: number;

  eventList: any[];

  forecastRows: ForecastRow[];

  terms: number[];

  closingBalances: number[];

  interestGrowth: number[];

  monthlyAmountGrowth: number[];

  withdrawals: number[];

  deposits: number[];

  interestRates: number[];

  totalInterest: Money;

  totalContribution: Money;

  monthlyAmounts: number[];
}
