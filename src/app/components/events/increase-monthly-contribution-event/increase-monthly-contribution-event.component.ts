import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EventType} from "../../../models/event/event/event-type";
import {EventService} from "../../../services/event/event.service";
import {Subscription} from "rxjs";
import {ForecastRow} from "../../../models/forecasts/forecast-row.model";
import {CurrencyPipe} from "@angular/common";
import {CustomValidator} from "../../validation/custom-validator";

@Component({
  selector: 'app-increase-monthly-contribution-event',
  templateUrl: './increase-monthly-contribution-event.component.html',
  styleUrls: ['./increase-monthly-contribution-event.component.css']
})
export class IncreaseMonthlyContributionEventComponent implements OnInit {

  @Input() forecastNum: string;

  @Input() customerNum: string;

  @Input() term: number;

  @Input() forecastRow: ForecastRow;

  eventType: EventType;

  increaseMonthlyForm: FormGroup;

  private subscribers: Subscription[] = [];

  monthlyAmountString: string;

  @Output() addEvent = new EventEmitter<boolean>();

  constructor(private route: ActivatedRoute, private service: EventService, private router: Router, private currencyPipe: CurrencyPipe) {
  }

  ngOnInit(): void {
    if (this.forecastNum.includes("INV")) {
      this.monthlyAmountString = "Contribution"
    } else {
      this.monthlyAmountString = "Repayment"
    }
    this.createIncreaseMonthlyForm();
    this.increaseMonthlyForm.valueChanges.subscribe(form => {
      if (form.amount) {
        this.increaseMonthlyForm.patchValue({
          amount: this.currencyPipe.transform(form.amount.toString().replace(/\D/g, ''), '', '', '1.0-0')
        }, {emitEvent: false})
      }
    });
  }

  createIncreaseMonthlyForm() {
    this.increaseMonthlyForm = new FormGroup({
      amount: new FormControl(1, [Validators.required, CustomValidator.min(0),
        CustomValidator.max(this.forecastRow.openingBalance.value - this.forecastRow.deposit.value)]),
      type: new FormControl(EventType.INCREASE_MONTHLY_AMOUNT),
      term: new FormControl(this.term),
    });
  }

  onSubmit() {
    let rightAmount = this.stringToNumber(this.increaseMonthlyForm.value.amount);
    this.increaseMonthlyForm.value.amount = rightAmount;
    let Subscription = this.service.createEvent(this.increaseMonthlyForm.value, this.forecastNum).subscribe(() => {
      this.addEvent.emit(true);
      this.router.navigate([this.getForecastType() + "/update/" + this.customerNum + "/" + this.forecastNum]);
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
      if (character != ",") {
        fixed = fixed + character;
      }
    }
    return Number(fixed);
  }

}
