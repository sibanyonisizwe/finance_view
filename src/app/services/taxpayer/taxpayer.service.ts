import {Injectable, OnDestroy} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {TaxPayer} from "../../models/tax/TaxPayer.model";
import {Income} from "../../models/tax/income.model";
import {Expense} from "../../models/tax/expense.model";

@Injectable({
  providedIn: 'root'
})
export class TaxpayerService{

  constructor(private http: HttpClient) {
  }

  updateTaxPayer(taxPayer: TaxPayer) {
    return this.http.put("http://localhost:8080/api/tax/taxPayer/update", taxPayer);
  }

  getTaxPayer(taxPayerNum: string): Observable<TaxPayer> {
    return this.http.get<TaxPayer>("http://localhost:8080/api/tax/taxPayer/" + taxPayerNum);
  }

  createTaxPayer(taxPayer: TaxPayer) {
    console.log(taxPayer);
    return this.http.post("http://localhost:8080/api/tax/taxPayer/save", taxPayer);
  }

  getTaxPayers(page:number, pageSize:number, sortOption:string): Observable<any> {
    let url = "http://localhost:8080/api/tax/?page=" + page + "&pageSize=" + pageSize + "&sortOption=" + sortOption;
    return this.http.get(url);
  }

  deleteTaxPayer(taxPayerNum: string) {
    return this.http.delete("http://localhost:8080/api/tax/taxPayer/delete?taxpayerNum=" + taxPayerNum);
  }

  updateIncome(income: Income, taxpayerNum: string) {
    return this.http.put("http://localhost:8080/api/tax/income/update?taxpayerNum=" + taxpayerNum, income);
  }

  updateExpense(expense: Expense, taxpayerNum: string) {
    return this.http.put("http://localhost:8080/api/tax/expense/update?taxpayerNum=" + taxpayerNum, expense);
  }
}
