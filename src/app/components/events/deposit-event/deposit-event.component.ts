import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EventService} from "../../../services/event/event.service";
import {EventType} from "../../../models/event/event/event-type";
import {Subscription} from "rxjs";
import {ForecastRow} from "../../../models/forecasts/forecast-row.model";
import {CurrencyPipe} from "@angular/common";
import {CustomValidator} from "../../validation/custom-validator";

@Component({
  selector: 'app-deposit-event',
  templateUrl: './deposit-event.component.html',
  styleUrls: ['./deposit-event.component.css']
})
export class DepositEventComponent implements OnInit, OnDestroy {

  @Input() forecastNum: string;

  @Input() customerNum: string;

  @Input() term: number;

  @Input() forecastRow: ForecastRow;

  eventType: EventType;

  depositForm: FormGroup;

  private subscribers: Subscription[] = [];

  @Output() addEvent = new EventEmitter<boolean>();

  constructor(private route: ActivatedRoute, private service:EventService, private router: Router, private currencyPipe:CurrencyPipe) { }

  ngOnInit(): void {
    this.createDepositForm();

    this.depositForm.valueChanges.subscribe(form => {
      if(form.amount){
        this.depositForm.patchValue({
          amount: this.currencyPipe.transform(form.amount.toString().replace(/\D/g,''),'','','1.0-0')
        }, {emitEvent:false})
      }
    });
  }

  ngOnDestroy(): void {
  }

  createDepositForm() {
    this.depositForm = new FormGroup({
      amount: new FormControl(1, [Validators.required, CustomValidator.min(1), CustomValidator.max(this.forecastRow.openingBalance.value)]),
      type: new FormControl(EventType.DEPOSIT),
      term: new FormControl(this.term),
    });
  }

  onSubmit() {
    let rightAmount = this.stringToNumber(this.depositForm.value.amount);
    this.depositForm.value.amount = rightAmount;
    let Subscription =  this.service.createEvent(this.depositForm.value,this.forecastNum).subscribe(()=>{
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
