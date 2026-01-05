import { Component, OnInit } from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {PropertyService} from "../../../../services/forecast/property/property.service";
import {Property} from "../../../../models/forecasts/debt/property.model";
import {Chart} from "chart.js";
import {CustomerService} from "../../../../services/customer/customer.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-property-update',
  templateUrl: './property-update.component.html',
  styleUrls: ['./property-update.component.css']
})
export class PropertyUpdateComponent implements OnInit {

  customerNum: string;

  customerName: string;

  property: Property;

  doneLoading: boolean = false;

  private subscriptions: Subscription[] = [];

  disableForecastTable: boolean = true;

  disableStatistics: boolean = false;

  disableLineCharts: boolean = true;

  disablePieCharts: boolean = false;

  alertEventAdded: boolean = false;

  property$: Observable<Property>;

  lineChart: Chart;

  pieChart: Chart;


  constructor(private fb: FormBuilder, private service: PropertyService, private route: ActivatedRoute, private customerService:CustomerService,private toast:ToastrService) {
  }

  ngOnInit(): void {
    this.refreshProperty();
    this.customerNum = this.route.snapshot.params["customerNum"];
    this.subscriptions.push(this.customerService.getCustomer(this.customerNum).subscribe(customer=>{
      this.customerName = customer.name;
    }))
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  alertUpdate(alert: boolean) {
    this.propertyUpdateAlert();
    this.showLineCharts();
    this.showForecastTable();
    this.refreshProperty();
  }

  propertyUpdateAlert(){
    this.toast.success("Property Forecast Updated Successfully!","",{
      positionClass:'toast-top-center',
    });
  }

  refreshProperty() {
    this.property$ = this.service.getPropertyForecast(this.route.snapshot.params["forecastNum"]);
    let subscription = this.property$.subscribe((data) => {
      this.property = data;
      this.doneLoading = true;
      document.getElementById("statistics").style.display = "block";
      document.getElementById("pie-charts").style.display = "block";
      this.createLineChart();
      this.createPieChart();
      document.getElementById("statistics").style.display = "none";
      document.getElementById("pie-charts").style.display = "none";
    });
    this.subscriptions.push(subscription);
  }

  showForecastTable() {
    document.getElementById('statistics').style.display = "none";
    document.getElementById('forecast-table').style.display = "block";
    this.disableForecastTable = true;
    this.disableStatistics = false;
  }

  showStatistics() {
    document.getElementById('statistics').style.display = "block";
    document.getElementById('forecast-table').style.display = "none";
    this.disableForecastTable = false;
    this.disableStatistics = true;
  }



  showLineCharts() {
    document.getElementById('line-charts').style.display = "block";
    document.getElementById('pie-charts').style.display = "none";
    this.disableLineCharts = true;
    this.disablePieCharts = false;
  }

  showPieCharts() {
    document.getElementById('line-charts').style.display = "none";
    document.getElementById('pie-charts').style.display = "block";
    this.disableLineCharts = false;
    this.disablePieCharts = true;
  }

  createPieChart(){
    if (this.pieChart != null){
      this.pieChart.destroy();
    }
    this.pieChart = new Chart("pieChart", {
      type: "pie",
      data: {
        labels: [
          'Total Interest Gained',
          'Total Monthly Repayment'
        ],
        datasets: [{
          backgroundColor: [
            "#e98e6e",
            "#f0b971"
          ],
          hoverBackgroundColor: [
            "#e98e6e",
            "#f0b971"
          ],
          data: [this.property.totalInterest.value, this.property.totalContribution.value]
        }
        ]},

      options: {
        plugins: {
          legend: {display: true},
          title: {
            display: true,
            font: {
              weight: 'bold',
              size: 18
            },
            text: "Total Interest vs Total Monthly Repayment"
          }
        }
      }
    });
  }

  createLineChart(){
    if (this.lineChart != null){
      this.lineChart.destroy();
    }
    this.lineChart = new Chart("interestAndMonthlyAmountChart", {
      type: "line",
      data: {
        labels: this.property.terms,
        datasets: [
          {
            label: "Closing Balance",
            backgroundColor: "#e98e6e",
            hoverBackgroundColor: "#e98e6e",
            borderColor: "#e98e6e",
            pointRadius: 0,
            pointHoverBackgroundColor: "#e98e6e",
            pointHoverBorderColor: "#e98e6e",
            data: this.property.closingBalances
          },
          {
            label: "Monthly Repayment",
            backgroundColor: "#f0b971",
            hoverBackgroundColor: "#f0b971",
            borderColor: "#f0b971",
            pointRadius: 0,
            pointHoverBackgroundColor: "#f0b971",
            pointHoverBorderColor: "#f0b971",
            data: this.property.monthlyAmountGrowth
          },
          {
            label: "Interest Amount",
            backgroundColor: "#70475d",
            hoverBackgroundColor: "#70475d",
            borderColor: "#70475d",
            pointRadius: 0,
            pointHoverBackgroundColor: "#70475d",
            pointHoverBorderColor: "#70475d",
            data: this.property.interestGrowth
          }
        ]},

      options: {
        plugins: {
          legend: {display: true},
          title: {
            display: false,
            font: {
              weight: 'bold',
              size: 18
            }
          }
        }
      }
    });
  }

  closeEventAddedAlert() {
    this.alertEventAdded = false;
  }
}
