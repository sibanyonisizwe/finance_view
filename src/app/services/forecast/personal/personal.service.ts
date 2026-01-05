import {Injectable, OnDestroy} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Personal} from "../../../models/forecasts/debt/personal.model";

@Injectable({
  providedIn: 'root'
})
export class PersonalService {

  constructor(private http: HttpClient) {
  }

  updatePersonalForecast(personal: Personal) {
    return this.http.put("http://localhost:8080/api/forecasts/personals/update", personal);
  }

  getPersonalForecast(forecastNum: string): Observable<Personal> {
    return this.http.get<Personal>("http://localhost:8080/api/forecasts/personals/" + forecastNum);
  }

  createPersonalForecast(personal: Personal, customerNum: string) {
    return this.http.post("http://localhost:8080/api/forecasts/personals/save?customerNum=" + customerNum, personal);
  }

  deletePersonalForecast(forecastNum: string) {
    return this.http.delete("http://localhost:8080/api/forecasts/personals/delete?forecastNum=" + forecastNum);
  }


}
