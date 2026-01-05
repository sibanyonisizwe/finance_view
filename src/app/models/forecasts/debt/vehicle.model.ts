import {Debt} from "./debt.model";
import {Money} from "../../money/money.model";

export interface Vehicle extends Debt {
  balloonPercentage: number;
  requiredCash: Money;
  initiationFee:Money;
  balloonPayment:Money;
}
