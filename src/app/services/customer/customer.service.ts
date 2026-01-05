import {Injectable, OnDestroy} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Customer} from "../../models/customer/customer.model";
import {Observable, Subscription} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class CustomerService implements OnDestroy {

  private subscriptions: Subscription[] = [];

  constructor(private http: HttpClient) {
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  updateCustomer(customer: Customer) {
    let response = this.http.put("http://localhost:8080/api/customers/update_customer", customer);
    response.subscribe();
  }

  getCustomer(customerNum: String):Observable<Customer> {
    return this.http.get<Customer>("http://localhost:8080/api/customers/" + customerNum);
  }

  createCustomer(customer: Customer) {
    return this.http.post("http://localhost:8080/api/customers/save", customer);
  }

  deleteCustomer(customerNum: string) {
    return this.http.delete("http://localhost:8080/api/customers/delete?customerNum=" + customerNum);
  }

  getCustomers(page:number, pageSize:number, sortOption:string): Observable<any> {
    let url = "http://localhost:8080/api/customers/?page=" + page + "&pageSize=" + pageSize + "&sortOption=" + sortOption;
    return this.http.get(url);
  }

}
