import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Investment} from "../../../../models/forecasts/investment/investment.model";
import {InvestmentService} from "../../../../services/forecast/investment/investment.service";
import {map, Subscription, switchMap} from "rxjs";
import {Router} from "@angular/router";
import {ForecastContextService} from "../../../../context/forecast/forecast-context.service";
import {ForecastService} from "../../../../services/forecast/forecast.service";
import {CurrencyPipe} from "@angular/common";
import {Utility} from "../../../utils/utility";
import {CustomValidator} from "../../../validation/custom-validator";

@Component({
  selector: 'app-investment-form',
  templateUrl: './investment-form.component.html',
  styleUrls: ['./investment-form.component.css']
})
export class InvestmentFormComponent implements OnInit, OnDestroy {

  investmentForm: FormGroup;

  @Input() headerText: string;

  @Input() headerIcon: string;

  @Input() eventType: string;

  @Input() customerNum: string;

  @Input() customerName: string;

  @Input() buttonText: string;

  @Input() investment: Investment;

  @Output() alertUpdate = new EventEmitter<boolean>();

  private subscriptions: Subscription[] = [];

  constructor(private fb: FormBuilder, private service: InvestmentService, private _router: Router, private forecastContextService: ForecastContextService, private forecastService: ForecastService, private currencyPipe: CurrencyPipe) {
  }

  ngOnInit(): void {
    this.createInvestmentForm();
    if (this.eventType === "Update") {
      this.investmentForm.patchValue({forecastName: this.investment.forecastName});
      this.investmentForm.patchValue({initialAmount:  this.currencyPipe.transform(this.investment.initialAmount.value.toString().replace(/\D/g,''),'','','1.0-0') });
      this.investmentForm.patchValue({monthlyContribution: this.currencyPipe.transform(this.investment.monthlyContribution.value.toString().replace(/\D/g,''),'','','1.0-0') });
      this.investmentForm.patchValue({interestRate: this.investment.interestRate});
      this.investmentForm.patchValue({term: this.investment.term});
    }
    this.updateValueChanges();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  createInvestmentForm() {
    this.investmentForm = this.fb.group({
      type: ['Investment', [Validators.required]],
      forecastName: ['', [Validators.required, Validators.pattern("[A-Za-z0-9 ]+")]],
      initialAmount: [null, [Validators.required, CustomValidator.min(0)]],
      monthlyContribution: [null, [Validators.required, CustomValidator.min(0)]],
      interestRate: [null, [Validators.required, Validators.min(1), Validators.max(100)]],
      term: [null, [Validators.required, Validators.min(1), Validators.max(660)]]
    })
  }

  clickEvent() {

    this.investmentForm.value.initialAmount = Utility.currencyStringToNumber(this.investmentForm.value.initialAmount);
    this.investmentForm.value.monthlyContribution = Utility.currencyStringToNumber(this.investmentForm.value.monthlyContribution);

    if (this.eventType === "Update") {
      this.investment.forecastName = this.investmentForm.value.forecastName;
      this.investment.initialAmount.value = this.investmentForm.value.initialAmount
      this.investment.monthlyContribution.value = this.investmentForm.value.monthlyContribution;
      this.investment.interestRate = this.investmentForm.value.interestRate;
      this.investment.term = this.investmentForm.value.term;
      let subscription = this.service.updateInvestment(this.investment).pipe(
        map(() => this.forecastService.getForecastRows(this.investment.forecastNum)),
        switchMap((forecastRowsObs) => {
          return forecastRowsObs;
        })
      ).subscribe((data) => {
        this.forecastContextService.updateForecastRowData(data);
        this.alertUpdate.emit(true);
      })
      this.subscriptions.push(subscription);
    } else {
      let subscription = this.service.createInvestment(this.customerNum, this.investmentForm.value).subscribe((investment) => {
        this._router.navigate(["investments/update/" + this.customerNum + "/" + investment.forecastNum]);
      })
      this.subscriptions.push(subscription);
    }
  }

  updateValueChanges() {
    this.investmentForm.valueChanges.subscribe(form=>{
      if(form.initialAmount) {
        this.investmentForm.patchValue({
          initialAmount: this.currencyPipe.transform(form.initialAmount.toString().replace(/\D/g,''),'','','1.0-0')
        }, {emitEvent:false})
      }
      if(form.monthlyContribution) {
        this.investmentForm.patchValue({
          monthlyContribution: this.currencyPipe.transform(form.monthlyContribution.toString().replace(/\D/g,''),'','','1.0-0')
        }, {emitEvent:false})
      }
    });
  }

}
