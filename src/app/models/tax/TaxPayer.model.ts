import {Money} from "../money/money.model";
import {Income} from "./income.model";
import {Expense} from "./expense.model";
import {TaxTableRow} from "./tax-table-row.model";


export interface TaxPayer {
  id: number;
  taxPayerNum: string;
  name: string;
  age: number;
  medicalCredits:Money;
  nettTaxableIncome: Money;
  taxPayable: Money;
  nettTaxPayable: Money;
  rebates: Money;
  income: Income;
  expense: Expense;
  taxTableRows:TaxTableRow[];
  averageTaxRate:number;
  marginalTaxRate:number;
}
