import {Injectable, OnDestroy} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Property} from "../../../models/forecasts/debt/property.model";
import {Observable, Subscription} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PropertyService{


  constructor(private http:HttpClient) {
  }

  createProperty(property: Property, customerNum:string):Observable<Property> {
    return this.http.post<Property>("http://localhost:8080/api/forecasts/properties/create?customerNum="+customerNum, property);
  }
  updatePropertyForecast(Property: Property) {
    return this.http.put("http://localhost:8080/api/forecasts/properties/update", Property);
  }

  getPropertyForecast(forecastNum: string): Observable<Property> {
    return this.http.get<Property>("http://localhost:8080/api/forecasts/properties/" + forecastNum);
  }

  deletePropertyForecast(forecastNum: string) {
    return this.http.delete("http://localhost:8080/api/forecasts/properties/delete?forecastNum=" + forecastNum);
  }
}
