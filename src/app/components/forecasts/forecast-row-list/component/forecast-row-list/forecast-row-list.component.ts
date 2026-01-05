import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ForecastRow} from "../../../../../models/forecasts/forecast-row.model";
import {ActivatedRoute} from "@angular/router";
import {ForecastService} from "../../../../../services/forecast/forecast.service";

@Component({
  selector: 'app-forecast-row-list',
  templateUrl: './forecast-row-list.component.html',
  styleUrls: ['./forecast-row-list.component.css']
})
export class ForecastRowListComponent implements OnInit {

  @Input() forecastRows: ForecastRow[];

  @Input() forecastType: string;

  monthlyAmountText: string;

  forecastNum: string;

  customerNum: string;

  name = 'Angular';

  displayStyles: {
    displayStyle: string;
    term: number;
  }[] = [];

  @Output() addedEvent = new EventEmitter<boolean>();

  @ViewChild('target') private myScrollContainer: ElementRef;

  constructor(private route:ActivatedRoute) {
  }

  ngOnInit(): void {
    document.getElementById('up-list-arrow').style.display = "none";
    this.customerNum = this.route.snapshot.params['customerNum'];
    this.forecastNum = this.route.snapshot.params['forecastNum'];
    if (this.forecastType === "Investment") {
      this.monthlyAmountText = "Monthly Contribution";
    } else {
      this.monthlyAmountText = "Monthly Repayment";
    }
    this.generateEventModals()
  }
  generateEventModals(){
    this.forecastRows.forEach(forecastRow=>{
      this.displayStyles.push({
        displayStyle: "none",
        term: forecastRow.term
      })
    });
  }

  scrollToBottom(el): void {
    this.myScrollContainer.nativeElement.scroll({
      top: this.myScrollContainer.nativeElement.scrollHeight,
      left: 0,
      behavior: 'smooth'
    });
    document.getElementById('down-list-arrow').style.display = "none";
    document.getElementById('up-list-arrow').style.display = "block";
  }

  scrollToTop(): void {
    this.myScrollContainer.nativeElement.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    document.getElementById('down-list-arrow').style.display = "block";
    document.getElementById('up-list-arrow').style.display = "none";
  }

  openPopup(term: number) {
    console.log(term)
    this.displayStyles.forEach((displayStyle)=>{
      if(displayStyle.term == term){
        displayStyle.displayStyle = "block";
      }
    })
  }

  closePopup(term: number) {
    this.displayStyles.forEach((displayStyle)=>{
      if(displayStyle.term == term){
        displayStyle.displayStyle = "none";
      }
    })
  }

  addEvent(added:boolean){
    this.addedEvent.emit(added);
    this.displayStyles.forEach(displayStyle=>{
      displayStyle.displayStyle = "none";
    })
  }
}
