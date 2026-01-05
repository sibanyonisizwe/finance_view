import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CustomerService} from "../../../services/customer/customer.service";
import {Subscription} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {Customer} from "../../../models/customer/customer.model";


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit, OnDestroy {

  customer: Customer;

  alertUpdateCustomer: boolean = false;

  subscriptions: Subscription[] = [];

  alertDeleteForecast: boolean = false;

  doneLoading: boolean = false;

  loadingScreenDisplay: string = "block";

  constructor(private service: CustomerService, private route: ActivatedRoute,private toast:ToastrService) {
  }

  ngOnInit(): void {
    this.subscriptions.push(this.service.getCustomer(this.route.snapshot.params["customerNum"])
      .subscribe((data) => {
        this.customer = data;
        this.doneLoading = true;
        this.loadingScreenDisplay = "none";
      }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  alertUpdate(alert: boolean) {
    this.alertUpdateCustomer = alert;
    this.updateCustomerAlert();
  }

  alertForecastDelete(alert: boolean) {
    this.alertDeleteForecast = alert;
    this.deleteForecastAlert();
  }


  deleteForecastAlert(){
   this.toast.success("Forecast Deleted Successfully!","",{
     positionClass:'toast-top-center',
   });
  }

  updateCustomerAlert(){
    this.toast.success("Customer Successfully Updated!","",{
      positionClass:'toast-top-center',
    });
  }
}
