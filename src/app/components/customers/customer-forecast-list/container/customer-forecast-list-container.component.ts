import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {InvestmentService} from "../../../../services/forecast/investment/investment.service";
import {Forecast} from "../../../../models/forecasts/forecast.model";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {CustomerService} from "../../../../services/customer/customer.service";
import {CustomerContextService} from "../../../../context/customer/customer-context.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-customer-forecast-list-container',
  templateUrl: './customer-forecast-list-container.component.html',
  styleUrls: ['./customer-forecast-list-container.component.css']
})
export class CustomerForecastListContainerComponent implements OnInit, OnDestroy {

  forecasts: Forecast[] = [];

  @Input() customerNum: string;

  @Output() alertDeleteForecast$ = new EventEmitter<boolean>;

  private subscriptions: Subscription[] = [];

  constructor(private http: HttpClient, private customerService: CustomerService, private customerContext: CustomerContextService, private route: ActivatedRoute, private investmentService: InvestmentService) {
  }

  ngOnInit(): void {
    this.customerContext.getForecastData().subscribe((data) => {
      this.forecasts = data;
    })

    this.subscriptions.push(this.customerService.getCustomer(this.route.snapshot.params["customerNum"]).subscribe(customer => {
      this.customerContext.updateForecastData(customer.forecastList);
    }));

  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  alertDelete(alert: boolean) {
    this.alertDeleteForecast$.emit(alert);
  }
}
