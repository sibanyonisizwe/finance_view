import {Money} from "../money/money.model";

export interface Income {
  incomeNum: string;
  salary: Money;
  bonus: Money;
  interestReceived: Money;
  dividend: Money;
  capitalGain: Money;
  totalIncome: Money;
  netSalary: Money;
  totalTaxableIncome: Money;
  taxableSalary: Money;
  taxableBonus: Money;
  taxableInterestReceived: Money;
  taxableDividend: Money;
  taxableCapitalGain: Money;
}
