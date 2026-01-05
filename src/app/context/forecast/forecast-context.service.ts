import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {ForecastRow} from "../../models/forecasts/forecast-row.model";

@Injectable({
  providedIn: 'root'
})
export class ForecastContextService {

  forecastRow$ = new BehaviorSubject<ForecastRow[]>([]);

  constructor() { }

  getForecastRowData(){
    return this.forecastRow$.asObservable();
  }

  updateForecastRowData(forecastRows: ForecastRow[]){
    this.forecastRow$.next(forecastRows);
  }
}
