import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {ForecastRow} from "../../models/forecasts/forecast-row.model";
import {Forecast} from "../../models/forecasts/forecast.model";

@Injectable({
  providedIn: 'root'
})
export class CustomerContextService {
  forecasts$ = new BehaviorSubject<Forecast[]>([]);

  constructor() { }

  getForecastData(){
    return this.forecasts$.asObservable();
  }

  updateForecastData(forecasts: Forecast[]){
    this.forecasts$.next(forecasts);
  }
}
