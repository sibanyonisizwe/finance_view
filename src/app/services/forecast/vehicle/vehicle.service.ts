import {Injectable} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Vehicle} from "../../../models/forecasts/debt/vehicle.model";

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  subscriptions: Subscription[] = [];

  constructor(private http: HttpClient) {
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub=>sub.unsubscribe());
  }

  createVehicleForecast(customerNum: string, forecast: Vehicle):Observable<Vehicle> {
    console.log(forecast);
    let response = this.http.post<Vehicle>("http://localhost:8080/api/forecasts/vehicles/save", forecast, {params: {customerNum: customerNum}});
    return response;
  }

  updateVehicleForecast(vehicle:Vehicle):Observable<Vehicle>{
    let response = this.http.put<Vehicle>("http://localhost:8080/api/forecasts/vehicles/update",vehicle);
    return response;
  }
  deleteVehicleForecast(forecastNum:string){
    return this.http.delete("http://localhost:8080/api/forecasts/vehicles/delete?forecastNum="+forecastNum);
  }

  getVehicle(forecastNum:string):Observable<Vehicle>{
    return this.http.get<Vehicle>("http://localhost:8080/api/forecasts/vehicles/" + forecastNum);
  }

}
