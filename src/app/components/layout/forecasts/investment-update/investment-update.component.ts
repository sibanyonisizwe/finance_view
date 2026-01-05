import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {InvestmentService} from "../../../../services/forecast/investment/investment.service";
import {ActivatedRoute} from "@angular/router";
import {Investment} from "../../../../models/forecasts/investment/investment.model";
import {Chart} from "chart.js";
import {CustomerService} from "../../../../services/customer/customer.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-investment-update',
  templateUrl: './investment-update.component.html',
  styleUrls: ['./investment-update.component.css']
})
export class InvestmentUpdateComponent implements OnInit, OnDestroy {

  customerNum: string;

  customerName: string;

  investment: Investment;

  alertUpdateInvestment: boolean = false;

  doneLoading: boolean = false;

  investment$: Observable<Investment>;

  private subscriptions: Subscription[] = [];

  disableForecastTable: boolean = true;

  disableStatistics: boolean = false;

  disableLineCharts: boolean = true;

  disablePieCharts: boolean = false;

  alertEventAdded: boolean = false;

  lineChart: Chart;

  pieChart: Chart;


  constructor(private service: InvestmentService, private route: ActivatedRoute, private customerService: CustomerService,private toast:ToastrService) {
  }

  ngOnInit(): void {
    this.refreshInvestment();
    this.customerNum = this.route.snapshot.params["customerNum"];
    this.subscriptions.push(this.customerService.getCustomer(this.customerNum).subscribe(customer => {
      this.customerName = customer.name;
    }))
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  alertUpdate(alert: boolean) {
    this.investmentUpdateAlert();
    this.showLineCharts();
    this.showForecastTable();
    this.refreshInvestment();
  }

  investmentUpdateAlert(){
    this.toast.success("Investment Forecast Updated Successfully!","",{
      positionClass:'toast-top-center',
    });
  }

  refreshInvestment() {
    this.investment$ = this.service.getInvestment(this.route.snapshot.params["forecastNum"]);
    let subscription = this.investment$.subscribe((data) => {
      this.investment = data;
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
        labels: this.investment.terms,
        datasets: [
          {
            label: "Closing Balance",
            backgroundColor: "#e98e6e",
            hoverBackgroundColor: "#e98e6e",
            borderColor: "#e98e6e",
            pointRadius: 0,
            pointHoverBackgroundColor: "#e98e6e",
            pointHoverBorderColor: "#e98e6e",
            data: this.investment.closingBalances
          },
          {
            label: "Monthly Contribution(Without Interest) Growth",
            backgroundColor: "#f0b971",
            hoverBackgroundColor: "#f0b971",
            borderColor: "#f0b971",
            pointRadius: 0,
            pointHoverBackgroundColor: "#f0b971",
            pointHoverBorderColor: "#f0b971",
            data: this.investment.monthlyAmountGrowth
          },
          {
            label: "Interest Amount Growth",
            backgroundColor: "#70475d",
            hoverBackgroundColor: "#70475d",
            borderColor: "#70475d",
            pointRadius: 0,
            pointHoverBackgroundColor: "#70475d",
            pointHoverBorderColor: "#70475d",
            data: this.investment.interestGrowth
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
          'Total Monthly Contribution'
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
          data: [this.investment.totalInterest.value, this.investment.totalContribution.value]
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
            text: "Total Interest vs Total Monthly Contribution"
          }
        }
      }
    });
  }
  closeEventAddedAlert() {
    this.alertEventAdded = false;
  }
}
