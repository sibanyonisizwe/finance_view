import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ForecastRow} from "../../../../../models/forecasts/forecast-row.model";
import {ForecastService} from "../../../../../services/forecast/forecast.service";
import {Subscription} from "rxjs";
import {EventType} from "../../../../../models/event/event/event-type";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-event-index',
  templateUrl: './event-index.component.html',
  styleUrls: ['./event-index.component.css']
})
export class EventIndexComponent implements OnInit {

  customerNum: string;

  forecastNum: string ;

  term: number;

  @Input() forecastRow: ForecastRow;

  depositDisplay: string = "block";

  withdrawalDisplay: string = "none";

  changeInterestDisplay: string = "none";

  increaseMonthlyDisplay: string = "none";

  changeMonthlyDisplay: string = "none";

  @Output() addedEvent = new EventEmitter<boolean>();

  doneLoading: boolean = false;

  private subscriptions:Subscription[] = [];

  monthlyAmountString:string;

  constructor(private route: ActivatedRoute,private toast:ToastrService,private forecastService:ForecastService) {
  }

  ngOnInit(): void {
    this.customerNum = this.route.snapshot.params["customerNum"];
    this.forecastNum = this.route.snapshot.params["forecastNum"];
    if(this.forecastNum.includes("INV")){
      this.monthlyAmountString = "Contribution"
    } else{
      this.monthlyAmountString = "Repayment"
    }
    this.term = this.route.snapshot.params["term"];
    this.subscriptions.push(this.forecastService.getForecastRows(this.forecastNum).subscribe((forecastRows)=>{
      this.forecastRow = forecastRows[this.term - 1];
      this.doneLoading = true;
    }))
  }

  displayDeposit() {
    this.depositDisplay = "block";
    this.closeWithdrawal();
    this.closeInterest();
    this.closeIncreaseMonthly();
    this.closeChangeMonthly();
  }

  displayWithdrawal() {
    this.withdrawalDisplay = "block";
    this.closeDeposit();
    this.closeInterest();
    this.closeIncreaseMonthly();
    this.closeChangeMonthly();
  }

  displayInterest() {
    this.changeInterestDisplay = "block";
    this.closeWithdrawal();
    this.closeDeposit();
    this.closeIncreaseMonthly();
    this.closeChangeMonthly();
  }

  displayIncreaseMonthly() {
    this.increaseMonthlyDisplay = "block";
    this.closeWithdrawal();
    this.closeInterest();
    this.closeDeposit();
    this.closeChangeMonthly();
  }

  displayChangeMonthly() {
    this.changeMonthlyDisplay = "block";
    this.closeWithdrawal();
    this.closeInterest();
    this.closeIncreaseMonthly();
    this.closeDeposit();
  }

  closeDeposit() {
    this.depositDisplay = "none";
  }

  closeWithdrawal() {
    this.withdrawalDisplay = "none";
  }

  closeInterest() {
    this.changeInterestDisplay = "none";
  }

  closeIncreaseMonthly() {
    this.increaseMonthlyDisplay = "none";
  }

  closeChangeMonthly() {
    this.changeMonthlyDisplay = "none";
  }

  addEvent(added: boolean) {
    this.addedEvent.emit(added);
    this.eventAddedAlert();
  }

  eventAddedAlert() {
    this.toast.success("Event added Successfully!", "", {
      positionClass: 'toast-top-center',
    });
  }
}
