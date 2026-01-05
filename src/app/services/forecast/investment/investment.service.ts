import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Investment} from "../../../models/forecasts/investment/investment.model";
import {Observable, Subscription} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class InvestmentService {

  constructor(private http: HttpClient) {
  }

  createInvestment(customerNum: string, investment: Investment): Observable<Investment> {
    return this.http.post<Investment>("http://localhost:8080/api/forecasts/investments/create?customerNum=" + customerNum, investment);
  }

  getInvestment(forecastNum: string): Observable<Investment> {
    return this.http.get<Investment>("http://localhost:8080/api/forecasts/investments/" + forecastNum);
  }

  updateInvestment(investment: Investment) {
    return this.http.put("http://localhost:8080/api/forecasts/investments/update", investment);
  }

  deleteInvestment(forecastNum:string){
    return this.http.delete("http://localhost:8080/api/forecasts/investments/delete?forecastNum=" + forecastNum);
  }
}
