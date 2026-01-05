import {Forecast} from "../forecast.model";
import {Money} from "../../money/money.model";

export interface Investment extends Forecast {

  initialAmount: Money;

  monthlyContribution: Money;

  amountAtEndOfTerm: Money;
}
