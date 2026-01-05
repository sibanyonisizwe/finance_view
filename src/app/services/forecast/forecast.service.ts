import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ForecastRow} from "../../models/forecasts/forecast-row.model";
import {Forecast} from "../../models/forecasts/forecast.model";
import {InvestmentService} from "./investment/investment.service";
import {PropertyService} from "./property/property.service";
import {PersonalService} from "./personal/personal.service";
import {VehicleService} from "./vehicle/vehicle.service";

@Injectable({
  providedIn: 'root'
})
export class ForecastService {
  constructor(private http: HttpClient, private investmentService: InvestmentService, private propertyService:PropertyService,private personalService:PersonalService,private vehicleService:VehicleService) {
  }

  getForecastRows(forecastNum: string): Observable<ForecastRow[]> {
    return this.http.get<ForecastRow[]>("http://localhost:8080/api/forecasts/forecastRows/" + forecastNum);
  }

  getForecast(forecastNum: string): Observable<Forecast> {
    if (forecastNum.includes("INV")) {
      return this.investmentService.getInvestment(forecastNum);
    }
    if (forecastNum.includes("VEB")) {
      return this.vehicleService.getVehicle(forecastNum);
    }
    if (forecastNum.includes("PRB")) {
      return this.propertyService.getPropertyForecast(forecastNum);
    }
    if (forecastNum.includes("PER")) {
      return this.personalService.getPersonalForecast(forecastNum);
    }
    return null;
  }
}
