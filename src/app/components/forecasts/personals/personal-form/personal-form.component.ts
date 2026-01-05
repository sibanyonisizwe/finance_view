import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {map, Subscription, switchMap} from "rxjs";
import {Router} from "@angular/router";
import {PersonalService} from "../../../../services/forecast/personal/personal.service";
import {ForecastContextService} from "../../../../context/forecast/forecast-context.service";
import {ForecastService} from "../../../../services/forecast/forecast.service";
import {Personal} from "../../../../models/forecasts/debt/personal.model";
import {CurrencyPipe} from "@angular/common";
import {Utility} from "../../../utils/utility";
import {CustomValidator} from "../../../validation/custom-validator";

@Component({
  selector: 'app-personal-form',
  templateUrl: './personal-form.component.html',
  styleUrls: ['./personal-form.component.css']
})
export class PersonalFormComponent implements OnInit, OnDestroy {

  personalForm: FormGroup;

  @Input() headerText: string;

  @Input() headerIcon: string;

  @Input() eventType: string;

  @Input() customerNum: string;

  @Input() customerName: string;

  @Input() buttonText: string;

  @Input() personal: Personal;

  @Output() alertUpdate = new EventEmitter<boolean>();

  private subscriptions: Subscription[] = [];

  constructor(private fb: FormBuilder, private service: PersonalService, private _router: Router, private forecastContextService: ForecastContextService, private forecastService: ForecastService, private currencyPipe: CurrencyPipe) {
  }

  ngOnInit(): void {
    this.createInvestmentForm();
    if (this.eventType === "Update") {
      this.personalForm.patchValue({forecastName: this.personal.forecastName});
      this.personalForm.patchValue({purchasePrice: this.currencyPipe.transform(this.personal.purchasePrice.value.toString().replace(/\D/g,''),'','','1.0-0') });
      this.personalForm.patchValue({interestRate: this.personal.interestRate});
      this.personalForm.patchValue({term: this.personal.term});
    }
    this.updateValueChanges();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  createInvestmentForm() {
    this.personalForm = this.fb.group({
      type: ['Personal', [Validators.required]],
      forecastName: ['', [Validators.required, Validators.pattern("[A-Za-z0-9 ]+")]],
      purchasePrice: [null, [Validators.required, CustomValidator.min(1)]],
      interestRate: [null, [Validators.required, Validators.min(1),Validators.max(100)]],
      term: [null, [Validators.required, Validators.min(1), Validators.max(144)]]
    })
  }

  clickEvent() {
    this.personalForm.value.purchasePrice = Utility.currencyStringToNumber(this.personalForm.value.purchasePrice);
    if (this.eventType === "Update") {
      this.personal.forecastName = this.personalForm.value.forecastName;
      this.personal.purchasePrice.value = this.personalForm.value.purchasePrice;
      this.personal.interestRate = this.personalForm.value.interestRate;
      this.personal.term = this.personalForm.value.term;
      let subscription = this.service.updatePersonalForecast(this.personal).pipe(
        map(() => this.forecastService.getForecastRows(this.personal.forecastNum)),
        switchMap((forecastRowsObs) => {
          return forecastRowsObs;
        })
      ).subscribe((data) => {
        this.forecastContextService.updateForecastRowData(data);
        this.alertUpdate.emit(true);
      })
      this.subscriptions.push(subscription);
    } else {
      let subscription = this.service.createPersonalForecast(this.personalForm.value, this.customerNum).subscribe((personal: Personal) => {
        this._router.navigate(["personals/update/" + this.customerNum +"/" + personal.forecastNum]);
      })
      this.subscriptions.push(subscription);
    }
  }

  updateValueChanges() {

    this.personalForm.valueChanges.subscribe(form=>{
      if(form.purchasePrice) {
        this.personalForm.patchValue({
          purchasePrice: this.currencyPipe.transform(form.purchasePrice.toString().replace(/\D/g,''),'','','1.0-0')
        }, {emitEvent:false})
      }
    });

  }
}
