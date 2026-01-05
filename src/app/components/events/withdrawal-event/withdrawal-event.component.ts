import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {EventType} from "../../../models/event/event/event-type";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {EventService} from "../../../services/event/event.service";
import {ForecastRow} from "../../../models/forecasts/forecast-row.model";

import {ForecastService} from "../../../services/forecast/forecast.service";

import {CurrencyPipe} from "@angular/common";
import {CustomValidator} from "../../validation/custom-validator";


@Component({
  selector: 'app-withdrawal-event',
  templateUrl: './withdrawal-event.component.html',
  styleUrls: ['./withdrawal-event.component.css']
})
export class WithdrawalEventComponent implements OnInit {

  @Input() forecastNum: string;

  @Input() customerNum: string;

  @Input() term: number;

  @Input() forecastRow: ForecastRow;

  eventType: EventType;

  withdrawalForm: FormGroup;

  private subscribers: Subscription[] = [];

  @Output() addEvent = new EventEmitter<boolean>();

  private ninetyPercentOfForecastAmount: number;

  maxWithdrawalAmount: number;

  initialAmount: number;

  doneLoading: boolean = false;

  constructor(private route: ActivatedRoute, private service: EventService, private router: Router, private forecastService: ForecastService, private currencyPipe: CurrencyPipe) {
  }

  ngOnInit(): void {
    this.subscribers.push(this.forecastService.getForecast(this.forecastNum).subscribe(forecast => {
      this.initialAmount = forecast.forecastRows[0].openingBalance.value;
      this.createWithdrawalForm(forecast.forecastRows[0].openingBalance.value);
      this.doneLoading = true;
      this.withdrawalForm.valueChanges.subscribe(form => {
        if (form.amount) {
          this.withdrawalForm.patchValue({
            amount: this.currencyPipe.transform(form.amount.toString().replace(/\D/g, ''), '', '', '1.0-0')
          }, {emitEvent: false})
        }
      });
    }))
  }

  createWithdrawalForm(value: number) {
    this.withdrawalForm = new FormGroup({
      amount: new FormControl(1, [Validators.required, CustomValidator.min(0), CustomValidator.max(this.getRowMaxWithdrawalAmount(value))]),
      type: new FormControl(EventType.WITHDRAWAL),
      term: new FormControl(this.term),
    });
  }

  //only withdraw up to 90% of the loan.
  private getRowMaxWithdrawalAmount(value: number): number {
    this.ninetyPercentOfForecastAmount = value * 0.9;
    if ((this.ninetyPercentOfForecastAmount - this.forecastRow.openingBalance.value) < 0) {
      this.maxWithdrawalAmount = 0;
    } else {
      this.maxWithdrawalAmount = this.ninetyPercentOfForecastAmount - this.forecastRow.openingBalance.value;
    }
    return this.maxWithdrawalAmount;
  }

  onSubmit() {
    let rightAmount = this.stringToNumber(this.withdrawalForm.value.amount);
    this.withdrawalForm.value.amount = rightAmount;
    let Subscription =  this.service.createEvent(this.withdrawalForm.value,this.forecastNum).subscribe(()=>{
      this.addEvent.emit(true);
      this.router.navigate([this.getForecastType()+"/update/"+this.customerNum+"/"+this.forecastNum]);
    });
    this.subscribers.push(Subscription);
  }

  getForecastType(): string {
    if (this.forecastNum.includes("INV")) {
      return "investments";
    } else if (this.forecastNum.includes("VEB")) {
      return "vehicles";
    } else if (this.forecastNum.includes("PRB")) {
      return "properties"
    } else {
      return "personals"
    }
  }

  stringToNumber(str: string): number {
    const text = str;
    let fixed = "";
    for (let i = 0; i < text.length; i++) {
      const character = text.charAt(i);
      if(character != ",")
      {
        fixed = fixed + character;
      }
    }
    return Number(fixed);
  }
}
