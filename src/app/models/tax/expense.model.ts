import {Money} from "../money/money.model";

export interface Expense {
  retirementFunding: Money;
  travelAllowance: Money;
  totalExpenses: Money;
  taxDeductibleRetirementFunding: Money;
  taxDeductibleTravelAllowance: Money;
  totalTaxDeductibleExpenses: Money;
  maxRetirementFunding: Money;
}
