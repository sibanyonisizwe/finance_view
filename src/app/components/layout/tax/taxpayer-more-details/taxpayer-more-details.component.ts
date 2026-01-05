import {Component, OnInit} from '@angular/core';
import {TaxPayer} from "../../../../models/tax/TaxPayer.model";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Observable, Subscription} from "rxjs";
import {TaxpayerService} from "../../../../services/taxpayer/taxpayer.service";
import {Income} from "../../../../models/tax/income.model";
import {Expense} from "../../../../models/tax/expense.model";
import {Chart} from "chart.js";
import {ToastrService} from "ngx-toastr";
import {CurrencyPipe} from "@angular/common";
import {CustomValidator} from "../../../validation/custom-validator";
import {Utility} from "../../../utils/utility";

@Component({
  selector: 'app-taxpayer-more-details',
  templateUrl: './taxpayer-more-details.component.html',
  styleUrls: ['./taxpayer-more-details.component.css']
})
export class TaxpayerMoreDetailsComponent implements OnInit {

  disableTaxChartBreakdown: boolean = false;

  disableTaxBreakdown: boolean = false;

  disableIncomeAndExpense: boolean = true;

  taxPayerForm: FormGroup;

  taxpayer: TaxPayer;

  taxpayer$: Observable<TaxPayer>

  private subscriptions: Subscription[] = [];

  incomeForm: FormGroup;

  income: Income;

  expenseForm: FormGroup;

  expense: Expense;

  chart: Chart;

  pieChartData: number[] = [];

  pieChartLabels: string[] = [];

  taxTableDisplay: string = "none";

  loadingScreenDisplay: string = "block";

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private service: TaxpayerService, private toast: ToastrService, private currencyPipe: CurrencyPipe) {
  }

  ngOnInit(): void {
    this.createTaxPayerForm();
    this.createIncomeForm();
    this.createExpenseForm();
    this.refreshTaxPayer();
    this.updateValueChanges();
  }

  refreshTaxPayer() {
    this.taxpayer$ = this.service.getTaxPayer(this.route.snapshot.params["taxPayerNum"]);
    let subscription = this.taxpayer$.subscribe((data: TaxPayer) => {
      this.loadingScreenDisplay = "none";
      this.taxpayer = data;
      this.taxPayerForm.patchValue({
        name: this.taxpayer.name
      });
      this.taxPayerForm.patchValue({
        age: this.taxpayer.age
      });
      this.taxPayerForm.patchValue({
        medicalCredits: this.taxpayer.medicalCredits.value
      });
      this.income = this.taxpayer.income;
      this.incomeForm.patchValue({salary: this.income.salary.value});
      this.incomeForm.patchValue({bonus: this.income.bonus.value});
      this.incomeForm.patchValue({interestReceived: this.income.interestReceived.value});
      this.incomeForm.patchValue({dividend: this.income.dividend.value});
      this.incomeForm.patchValue({capitalGain: this.income.capitalGain.value});
      this.expense = this.taxpayer.expense;
      this.expenseForm.patchValue({
        retirementFunding: this.expense.retirementFunding.value
      });
      this.expenseForm.patchValue({
        travelAllowance: this.expense.travelAllowance.value
      });
      this.createPie();
      this.createChart();
    });
    this.subscriptions.push(subscription);
  }

  showIncomeAndExpense() {
    document.getElementById('tax-breakdown').style.display = "none";
    document.getElementById('income-expense-forms').style.display = "block";
    this.disableTaxBreakdown = false;
    this.disableIncomeAndExpense = true;
  }

  showTaxBreakdown() {
    document.getElementById('tax-breakdown').style.display = "block";
    document.getElementById('income-expense-forms').style.display = "none";
    this.disableTaxBreakdown = true;
    this.disableIncomeAndExpense = false;
  }

  updateTaxPayer(): void {
    let rightAmount = Utility.currencyStringToNumber(this.taxPayerForm.value.medicalCredits);
    this.taxPayerForm.value.medicalCredits = rightAmount;

    this.taxpayer.age = this.taxPayerForm.value.age;
    this.taxpayer.name = this.taxPayerForm.value.name;
    this.taxpayer.medicalCredits.value = this.taxPayerForm.value.medicalCredits;
    this.subscriptions.push(this.service.updateTaxPayer(this.taxpayer).subscribe(() => {
      this.taxPayerUpdateAlert();
      this.showIncomeAndExpense();
      this.refreshTaxPayer();
    }));
  }

  taxPayerUpdateAlert() {
    this.toast.success("Tax Payer Updated Successfully!", "", {
      positionClass: 'toast-top-center',
    });
  }

  incomeAndExpenseUpdateAlert() {
    this.toast.success("Income and Expense Updated Successfully!", "", {
      positionClass: 'toast-top-center',
    });
  }

  updateIncomeAndExpense() {
    this.income.salary.value = this.stringToNumber(this.incomeForm.value.salary);
    this.income.bonus.value = this.stringToNumber(this.incomeForm.value.bonus);
    this.income.interestReceived.value = this.stringToNumber(this.incomeForm.value.interestReceived);
    this.income.dividend.value = this.stringToNumber(this.incomeForm.value.dividend);
    this.income.capitalGain.value = this.stringToNumber(this.incomeForm.value.capitalGain);
    this.subscriptions.push(this.service.updateIncome(this.income, this.route.snapshot.params["taxPayerNum"]).subscribe(() => {
      this.expense.retirementFunding.value = this.stringToNumber(this.expenseForm.value.retirementFunding);
      this.expense.travelAllowance.value = this.stringToNumber(this.expenseForm.value.travelAllowance);
      this.subscriptions.push(this.service.updateExpense(this.expense, this.route.snapshot.params["taxPayerNum"]).subscribe(() => {
        this.incomeAndExpenseUpdateAlert();
        this.showIncomeAndExpense();
        this.refreshTaxPayer();
      }));
    }));
  }

  createTaxPayerForm() {
    this.taxPayerForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('\\b([A-ZÀ-ÿ][-,a-z. \']+[ ]*)+')]],
      age: [0, [Validators.required, Validators.min(1)]],
      medicalCredits: [0, [Validators.required, CustomValidator.min(0)]],
    })
  }

  createIncomeForm(): void {
    this.incomeForm = this.fb.group({
      salary: ['', [Validators.required, Validators.min(0)]],
      bonus: ['', [Validators.required, Validators.min(0)]],
      interestReceived: ['', [Validators.required, Validators.min(0)]],
      dividend: ['', [Validators.required, Validators.min(0)]],
      capitalGain: ['', [Validators.required, Validators.min(0)]]
    })
  }

  createExpenseForm(): void {
    this.expenseForm = this.fb.group({
      retirementFunding: ['', [Validators.required]],
      travelAllowance: ['', [Validators.required]]
    });
  }

  getTaxAmount(): number {
    return this.taxpayer.nettTaxPayable.value;
  }

  createPie() {
    this.pieChartData = [this.taxpayer.nettTaxPayable.value, this.taxpayer.nettTaxableIncome.value - this.taxpayer.nettTaxPayable.value];
    this.pieChartLabels = [
      'Nett Tax Payable',
      'Nett Yearly Income'
    ];
  }

  createChart() {
    if (this.chart != null) {
      this.chart.destroy();
    }
    this.chart = new Chart("taxChart", {
      type: "pie",
      data: {
        labels: this.pieChartLabels,
        datasets: [{
          backgroundColor: [
            "#e98e6e",
            "#f0b971"
          ],
          hoverBackgroundColor: [
            "#e98e6e",
            "#f0b971"
          ],
          data: this.pieChartData
        }
        ]
      },
      options: {
        plugins: {
          legend: {display: true},
          title: {
            display: false,
            font: {
              weight: 'bold',
              size: 18
            },
            text: "Nett Yearly Income vs Nett Tax Payable"
          }
        }
      }
    });

  }

  closePopup() {
    this.taxTableDisplay = "none";
  }

  openTaxTable() {
    this.taxTableDisplay = "block";
  }

  updateValueChanges() {
    this.incomeForm.valueChanges.subscribe(form => {
      if (form.salary) {
        this.incomeForm.patchValue({
          salary: this.currencyPipe.transform(form.salary.toString().replace(/\D/g, ''), '', '', '1.0-0')
        }, {emitEvent: false})
      }
      if (form.bonus) {
        this.incomeForm.patchValue({
          bonus: this.currencyPipe.transform(form.bonus.toString().replace(/\D/g, ''), '', '', '1.0-0')
        }, {emitEvent: false})
      }
      if (form.interestReceived) {
        this.incomeForm.patchValue({
          interestReceived: this.currencyPipe.transform(form.interestReceived.toString().replace(/\D/g, ''), '', '', '1.0-0')
        }, {emitEvent: false})
      }
      if (form.dividend) {
        this.incomeForm.patchValue({
          dividend: this.currencyPipe.transform(form.dividend.toString().replace(/\D/g, ''), '', '', '1.0-0')
        }, {emitEvent: false})
      }
      if (form.capitalGain) {
        this.incomeForm.patchValue({
          capitalGain: this.currencyPipe.transform(form.capitalGain.toString().replace(/\D/g, ''), '', '', '1.0-0')
        }, {emitEvent: false})
      }
    });

    this.expenseForm.valueChanges.subscribe(form => {
      if (form.retirementFunding) {
        this.expenseForm.patchValue({
          retirementFunding: this.currencyPipe.transform(form.retirementFunding.toString().replace(/\D/g, ''), '', '', '1.0-0')
        }, {emitEvent: false})
      }

      if (form.travelAllowance) {
        this.expenseForm.patchValue({
          travelAllowance: this.currencyPipe.transform(form.travelAllowance.toString().replace(/\D/g, ''), '', '', '1.0-0')
        }, {emitEvent: false})
      }
    });

    this.taxPayerForm.valueChanges.subscribe(form => {
      if(form.medicalCredits){
        this.taxPayerForm.patchValue({
          medicalCredits: this.currencyPipe.transform(form.medicalCredits.toString().replace(/\D/g,''),'','','1.0-0')
        }, {emitEvent:false})
      }
    });

  }

  stringToNumber(str: string): number {
    const text = str;
    let fixed = "";
    for (let i = 0; i < text.length; i++) {
      const character = text.charAt(i);
      if (character != ",") {
        fixed = fixed + character;
      }
    }
    return Number(fixed);
  }
}
