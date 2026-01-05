import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {InvestmentService} from "../../../../services/forecast/investment/investment.service";
import {Forecast} from "../../../../models/forecasts/forecast.model";
import {CustomerContextService} from "../../../../context/customer/customer-context.service";
import {map, Subscription, switchMap} from "rxjs";
import {CustomerService} from "../../../../services/customer/customer.service";
import {PersonalService} from "../../../../services/forecast/personal/personal.service";
import {PropertyService} from "../../../../services/forecast/property/property.service";
import {VehicleService} from "../../../../services/forecast/vehicle/vehicle.service";

@Component({
  selector: 'app-customer-forecast-list',
  templateUrl: './customer-forecast-list.component.html',
  styleUrls: ['./customer-forecast-list.component.css']
})
export class CustomerForecastListComponent implements OnInit, OnDestroy {

  @Input() forecasts: Forecast[] = [];

  @Input() customerNum:string;

  @Output() alertForecastDelete = new EventEmitter<boolean>;

  displayStyles: {
    displayStyle: string;
    num: string;
  }[] = [];

  forecastType: string;

  private subscriptions:Subscription[] = [];

  constructor(private http: HttpClient,private customerService:CustomerService, private customerContext:CustomerContextService,
              private route: ActivatedRoute, private investmentService:InvestmentService, private personalService:PersonalService,
              private propertyService:PropertyService, private vehicleService:VehicleService) {
  }

  ngOnInit(): void {
    this.generateDeleteModals();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub=>sub.unsubscribe());
  }


  generateDeleteModals(){
    this.subscriptions.push(this.customerService.getCustomer(this.route.snapshot.params["customerNum"]).subscribe((customer)=>{
        customer.forecastList.forEach(forecast=>{
          this.displayStyles.push({
            displayStyle: "none",
            num: forecast.forecastNum
          })
        })
      }));
  }

  deleteInvestment(forecastNum:string){
    this.subscriptions.push(this.investmentService.deleteInvestment(forecastNum).pipe(
      map(()=>this.customerService.getCustomer(this.route.snapshot.params["customerNum"])),
      switchMap((forecastsObs)=>{
        return forecastsObs;
      })
    ).subscribe((data)=>{
      this.customerContext.updateForecastData(data.forecastList);
    }));
  }

  deletePersonal(forecastNum: string) {
    this.subscriptions.push(this.personalService.deletePersonalForecast(forecastNum).pipe(
      map(()=>this.customerService.getCustomer(this.route.snapshot.params["customerNum"])),
      switchMap((forecastsObs)=>{
        return forecastsObs;
      })
    ).subscribe((data)=>{
      this.customerContext.updateForecastData(data.forecastList);
    }));
  }

  deleteProperty(forecastNum: string) {
    this.subscriptions.push(this.propertyService.deletePropertyForecast(forecastNum).pipe(
      map(()=>this.customerService.getCustomer(this.route.snapshot.params["customerNum"])),
      switchMap((forecastsObs)=>{
        return forecastsObs;
      })
    ).subscribe((data)=>{
      this.customerContext.updateForecastData(data.forecastList);
    }));
  }

  deleteVehicle(forecastNum: string) {
    this.subscriptions.push(this.vehicleService.deleteVehicleForecast(forecastNum).pipe(
      map(()=>this.customerService.getCustomer(this.route.snapshot.params["customerNum"])),
      switchMap((forecastsObs)=>{
        return forecastsObs;
      })
    ).subscribe((data)=>{
      this.customerContext.updateForecastData(data.forecastList);
    }));
  }

  openPopup(forecastNum: string) {
    this.displayStyles.forEach((object) => {
      if (object.num === forecastNum) {
        object.displayStyle = "block";
        if(forecastNum.includes("INV")){
          this.forecastType = "Investment"
        } else if(forecastNum.includes("PER")){
          this.forecastType = "Personal"
        } else if(forecastNum.includes("PRB")){
          this.forecastType = "Property"
        }else if(forecastNum.includes("VEB")){
          this.forecastType = "Vehicle"
        }
      }
    })
  }

  closePopup(forecastNum: string) {
    this.displayStyles.forEach((object) => {
      if (object.num === forecastNum) {
        object.displayStyle = "none";
      }
    })
  }

  deleteForecast(num: string) {
    if(num.includes("INV")){
      this.deleteInvestment(num);
    } else if(num.includes("PER")){
      this.deletePersonal(num);
    } else if(num.includes("PRB")){
      this.deleteProperty(num);
    }else if(num.includes("VEB")){
      this.deleteVehicle(num);
    }
    this.closePopup(num);
    this.alertForecastDelete.emit(true);
  }

}

