import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {EventType} from "../../../models/event/event/event-type";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {EventService} from "../../../services/event/event.service";
import {ForecastRow} from "../../../models/forecasts/forecast-row.model";

@Component({
  selector: 'app-change-interest-event',
  templateUrl: './change-interest-event.component.html',
  styleUrls: ['./change-interest-event.component.css']
})
export class ChangeInterestEventComponent implements OnInit {

  @Input() customerNum: string;

  @Input() forecastNum: string;

  @Input() term: number;

  @Input() forecastRow: ForecastRow;

  eventType: EventType;

  changeInterestForm:  FormGroup;

  private subscribers: Subscription[] = [];

  @Output() addEvent = new EventEmitter<boolean>();

  constructor(private route: ActivatedRoute, private service:EventService, private router:Router) { }

  ngOnInit(): void {
    this.createChangeInterestForm();
  }

  ngOnDestroy(): void {

  }

  createChangeInterestForm() {
    this.changeInterestForm = new FormGroup({
      amount: new FormControl(1, [Validators.required, Validators.min(1), Validators.max(100)]),
      type: new FormControl(EventType.CHANGE_INTEREST),
      term: new FormControl(this.term),
    });
  }

  onSubmit() {
    let Subscription =  this.service.createEvent(this.changeInterestForm.value,this.forecastNum).subscribe(
      ()=>{
        this.addEvent.emit(true);
        this.router.navigate([this.getForecastType()+"/update/"+this.customerNum+"/"+this.forecastNum]);
      }
    );
    this.subscribers.push(Subscription);
  }

  getForecastType(): string{
    if(this.forecastNum.includes("INV"))
    {
      return "investments";
    }
    else if(this.forecastNum.includes("VEB")){
      return "vehicles";
    }
    else if(this.forecastNum.includes("PRB")){
      return "properties"
    }
    else{
      return "personals"
    }
  }
}
