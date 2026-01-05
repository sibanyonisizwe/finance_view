import {Money} from "../money/money.model";

export interface TaxTableRow {
  low:Money;

  high:Money;

  percentage:number;

  taxableIncome:Money;

  totalIncomeLeft:Money;

  taxPayable:Money;
}
