import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Forecast} from "../../../../models/forecasts/forecast.model";
import {ForecastRow} from "../../../../models/forecasts/forecast-row.model";
import {ForecastService} from "../../../../services/forecast/forecast.service";
import {ForecastContextService} from "../../../../context/forecast/forecast-context.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-forecast-row-list-container',
  templateUrl: './forecast-row-list-container.component.html',
  styleUrls: ['./forecast-row-list-container.component.css']
})
export class ForecastRowListContainerComponent implements OnInit, OnDestroy {

  @Input() forecastNum:string;

  @Input() forecastType:string;

  forecastRows: ForecastRow[] = [];

  doneLoading:boolean = false;

  private subscriptions:Subscription[] = [];
  loadingScreenDisplay: string = "block";

  constructor(private service: ForecastService, private contextService: ForecastContextService) { }

  ngOnInit(): void {
    this.contextService.getForecastRowData().subscribe((data)=>{
      this.forecastRows = data;
    });

    this.service.getForecastRows(this.forecastNum).subscribe(data =>{
      this.contextService.updateForecastRowData(data);
      this.doneLoading = true;
      this.loadingScreenDisplay = "none";
    })
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub=>sub.unsubscribe());
  }

  addEvent(added:boolean){
    this.contextService.getForecastRowData().subscribe((data)=>{
      this.forecastRows = data;
    });

    this.service.getForecastRows(this.forecastNum).subscribe(data =>{
      this.contextService.updateForecastRowData(data);
      this.doneLoading = true;
    })
  }
}
