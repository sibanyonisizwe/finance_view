import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {PersonalService} from "../../../../services/forecast/personal/personal.service";
import {Personal} from "../../../../models/forecasts/debt/personal.model";
import {Chart} from "chart.js";
import {CustomerService} from "../../../../services/customer/customer.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-personal-update',
  templateUrl: './personal-update.component.html',
  styleUrls: ['./personal-update.component.css']
})
export class PersonalUpdateComponent implements OnInit, OnDestroy {

  customerNum: string;

  customerName: string;

  personal: Personal;

  doneLoading: boolean = false;

  private subscriptions: Subscription[] = [];

  disableForecastTable: boolean = true;

  disableStatistics: boolean = false;

  disableLineCharts: boolean = true;

  disablePieCharts: boolean = false;

  alertEventAdded: boolean = false;

  personal$: Observable<Personal>;

  lineChart: Chart;

  pieChart: Chart;

  constructor(private service: PersonalService, private route: ActivatedRoute, private customerService:CustomerService,private toast:ToastrService) {
  }

  ngOnInit(): void {
    this.refreshPersonal();
    this.customerNum = this.route.snapshot.params["customerNum"];
    this.subscriptions.push(this.customerService.getCustomer(this.customerNum).subscribe(customer=>{
      this.customerName = customer.name;
    }))
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  alertUpdate(alert: boolean) {
    this.personalUpdateAlert();
    this.showLineCharts();
    this.showForecastTable();
    this.refreshPersonal();
  }

  personalUpdateAlert(){
    this.toast.success("Personal Loan Updated Successfully!","",{
      positionClass:'toast-top-center',
    });
  }


  refreshPersonal() {
    this.personal$ = this.service.getPersonalForecast(this.route.snapshot.params["forecastNum"]);
    let subscription = this.personal$.subscribe((data) => {
      this.personal = data;
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

  createLineChart() {
    if (this.lineChart != null) {
      this.lineChart.destroy();
    }
    this.lineChart = new Chart("interestAndMonthlyAmountChart", {
      type: "line",
      data: {
        labels: this.personal.terms,
        datasets: [
          {
            label: "Closing Balance",
            backgroundColor: "#e98e6e",
            hoverBackgroundColor: "#e98e6e",
            borderColor: "#e98e6e",
            pointRadius: 0,
            pointHoverBackgroundColor: "#e98e6e",
            pointHoverBorderColor: "#e98e6e",
            data: this.personal.closingBalances
          },
          {
            label: "Monthly Repayment",
            backgroundColor: "#f0b971",
            hoverBackgroundColor: "#f0b971",
            borderColor: "#f0b971",
            pointRadius: 0,
            pointHoverBackgroundColor: "#f0b971",
            pointHoverBorderColor: "#f0b971",
            data: this.personal.monthlyAmountGrowth
          },
          {
            label: "Interest Amount Growth",
            backgroundColor: "#70475d",
            hoverBackgroundColor: "#70475d",
            borderColor: "#70475d",
            pointRadius: 0,
            pointHoverBackgroundColor: "#70475d",
            pointHoverBorderColor: "#70475d",
            data: this.personal.interestGrowth
          }
        ]
      },

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

  createPieChart() {
    if (this.pieChart != null) {
      this.pieChart.destroy();
    }
    this.pieChart = new Chart("pieChart", {
      type: "pie",
      data: {
        labels: [
          'Total Interest Gained',
          'Repayment Less Interest'
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
          data: [this.personal.totalInterest.value, this.personal.totalContribution.value]
        }
        ]
      },

      options: {
        plugins: {
          legend: {display: true},
          title: {
            display: true,
            font: {
              weight: 'bold',
              size: 18
            },
            text: "Total Amount Paid"
          }
        }
      }
    });
  }

  closeEventAddedAlert() {
    this.alertEventAdded = false;
  }
}
