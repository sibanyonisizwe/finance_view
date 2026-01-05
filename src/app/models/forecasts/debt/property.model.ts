import {Debt} from "./debt.model";
import {Money} from "../../money/money.model";

export interface Property extends Debt {
  requiredCash: Money;
  legalFees:Money;
  transferCost:Money;
  bondCost:Money;
}
