import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ForecastService} from "../../../../services/forecast/forecast.service";
import {Forecast} from "../../../../models/forecasts/forecast.model";
import {Observable, Subscription} from "rxjs";
import {Customer} from "../../../../models/customer/customer.model";
import {CustomerService} from "../../../../services/customer/customer.service";
import {Chart} from "chart.js";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-forecast-more-details',
  templateUrl: './forecast-more-details.component.html',
  styleUrls: ['./forecast-more-details.component.css']
})
export class ForecastMoreDetailsComponent implements OnInit, OnDestroy {

  forecast: Forecast;

  customer: Customer;

  customerNum: string;

  customerName: string;

  forecastNum: string;

  forecastName: string;

  disableEventTable: boolean = true;

  disableStatistics: boolean = false;

  disableClosingBalance: boolean = false;

  disableMonthlyRepayments: boolean = false;

  disableDeposits: boolean = false;

  disableWithdrawals: boolean = false;

  disableInterestRate: boolean = false;

  closingBalance: Chart;

  monthlyPayment: Chart;

  interestRate: Chart;

  deposit: Chart;

  withdrawal: Chart;

  forecast$: Observable<Forecast>;

  private subscriptions: Subscription[] = [];
  monthlyText: string;


  constructor(private route: ActivatedRoute, private forecastService: ForecastService, private customerService: CustomerService,private toast:ToastrService) {
  }

  ngOnInit(): void {
    this.customerNum = this.route.snapshot.params["customerNum"];
    this.forecastNum = this.route.snapshot.params["forecastNum"];
    this.monthlyText = this.getMonthlyText();
    this.refreshForecast();
    this.subscriptions.push(this.customerService.getCustomer(this.customerNum).subscribe(customer => {
      this.customer = customer;
      this.customerName = this.customer.name;
    }));

  }

  private getMonthlyText() {
    if (this.forecastNum.startsWith("INV")) {
      return "Monthly Contribution"
    }
    return "Monthly Repayments";
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  refreshForecast() {
    this.forecast$ = this.forecastService.getForecast(this.forecastNum);
    this.subscriptions.push(this.forecast$.subscribe(forecast => {
      this.forecast = forecast;
      this.forecastName = this.forecast.forecastName;
      this.showClosingBalance();
      this.createCharts();
    }));
  }

  showStatisticsTable() {
    document.getElementById('statistics').style.display = "block";
    document.getElementById('table').style.display = "none";
    this.disableEventTable = false;
    this.disableStatistics = true;
  }

  showEventsTable() {
    document.getElementById('statistics').style.display = "none";
    document.getElementById('table').style.display = "block";
    this.disableEventTable = true;
    this.disableStatistics = false;
  }

  showClosingBalance() {
    document.getElementById('closing-balance').style.display = "block";
    document.getElementById('monthly-repayments').style.display = "none";
    document.getElementById('deposits').style.display = "none";
    document.getElementById('withdrawals').style.display = "none";
    document.getElementById('interest-rate').style.display = "none";
    this.disableClosingBalance = true;
    this.disableMonthlyRepayments = false;
    this.disableDeposits = false;
    this.disableWithdrawals = false;
    this.disableInterestRate = false;
  }

  showMonthlyRepayments() {
    document.getElementById('closing-balance').style.display = "none";
    document.getElementById('monthly-repayments').style.display = "block";
    document.getElementById('deposits').style.display = "none";
    document.getElementById('withdrawals').style.display = "none";
    document.getElementById('interest-rate').style.display = "none";
    this.disableClosingBalance = false;
    this.disableMonthlyRepayments = true;
    this.disableDeposits = false;
    this.disableWithdrawals = false;
    this.disableInterestRate = false;
  }

  showDeposits() {
    document.getElementById('closing-balance').style.display = "none";
    document.getElementById('monthly-repayments').style.display = "none";
    document.getElementById('deposits').style.display = "block";
    document.getElementById('withdrawals').style.display = "none";
    document.getElementById('interest-rate').style.display = "none";
    this.disableClosingBalance = false;
    this.disableMonthlyRepayments = false;
    this.disableDeposits = true;
    this.disableWithdrawals = false;
    this.disableInterestRate = false;
  }

  showWithdrawals() {
    document.getElementById('closing-balance').style.display = "none";
    document.getElementById('monthly-repayments').style.display = "none";
    document.getElementById('deposits').style.display = "none";
    document.getElementById('withdrawals').style.display = "block";
    document.getElementById('interest-rate').style.display = "none";
    this.disableClosingBalance = false;
    this.disableMonthlyRepayments = false;
    this.disableDeposits = false;
    this.disableWithdrawals = true;
    this.disableInterestRate = false;
  }

  showInterestRate() {
    document.getElementById('closing-balance').style.display = "none";
    document.getElementById('monthly-repayments').style.display = "none";
    document.getElementById('deposits').style.display = "none";
    document.getElementById('withdrawals').style.display = "none";
    document.getElementById('interest-rate').style.display = "block";
    this.disableClosingBalance = false;
    this.disableMonthlyRepayments = false;
    this.disableDeposits = false;
    this.disableWithdrawals = false;
    this.disableInterestRate = true;
  }


  createCharts() {
    this.createClosingBalanceChart();
    this.createDepositsChart();
    this.createWithdrawalsChart();
    this.createInterestRateChart();
    this.createMonthlyPaymentChart();
  }

  createClosingBalanceChart() {
    if (this.closingBalance != null) {
      this.closingBalance.destroy();
    }
    this.closingBalance = new Chart("closingBalance", {
      type: "line",
      data: {
        labels: this.forecast.terms,
        datasets: [
          {
            label: "Closing Balance",
            backgroundColor: "#e98e6e",
            hoverBackgroundColor: "#e98e6e",
            borderColor: "#e98e6e",
            pointRadius: 0,
            pointHoverBackgroundColor: "#e98e6e",
            pointHoverBorderColor: "#e98e6e",
            data: this.forecast.closingBalances
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

  createMonthlyPaymentChart() {
    if (this.monthlyPayment != null) {
      this.monthlyPayment.destroy();
    }
    this.monthlyPayment = new Chart("monthlyRepayment", {
      type: "line",
      data: {
        labels: this.forecast.terms,
        datasets: [
          {
            label: "Monthly Repayment",
            backgroundColor: "#f0b971",
            hoverBackgroundColor: "#f0b971",
            borderColor: "#f0b971",
            pointRadius: 0,
            pointHoverBackgroundColor: "#f0b971",
            pointHoverBorderColor: "#f0b971",
            data: this.forecast.monthlyAmounts
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

  createInterestRateChart() {
    if (this.interestRate != null) {
      this.interestRate.destroy();
    }
    this.interestRate = new Chart("interestRate", {
      type: "line",
      data: {
        labels: this.forecast.terms,
        datasets: [
          {
            label: "Interest Amount Growth",
            backgroundColor: "#70475d",
            hoverBackgroundColor: "#70475d",
            borderColor: "#70475d",
            pointRadius: 0,
            pointHoverBackgroundColor: "#70475d",
            pointHoverBorderColor: "#70475d",
            data: this.forecast.interestRates
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

  createWithdrawalsChart() {
    if (this.withdrawal != null) {
      this.withdrawal.destroy();
    }
    this.withdrawal = new Chart("withdrawal", {
      type: "line",
      data: {
        labels: this.forecast.terms,
        datasets: [
          {
            label: "Withdrawals",
            backgroundColor: "#e98e6e",
            hoverBackgroundColor: "#e98e6e",
            borderColor: "#e98e6e",
            pointRadius: 0,
            pointHoverBackgroundColor: "#e98e6e",
            pointHoverBorderColor: "#e98e6e",
            data: this.forecast.withdrawals
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

  createDepositsChart() {
    if (this.deposit != null) {
      this.deposit.destroy();
    }
    this.deposit = new Chart("deposit", {
      type: "line",
      data: {
        labels: this.forecast.terms,
        datasets: [
          {
            label: "Deposits",
            backgroundColor: "#e98e6e",
            hoverBackgroundColor: "#e98e6e",
            borderColor: "#e98e6e",
            pointRadius: 0,
            pointHoverBackgroundColor: "#e98e6e",
            pointHoverBorderColor: "#e98e6e",
            data: this.forecast.deposits
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

  alertDelete(alert: boolean) {
    this.refreshForecast();
    this.alertDeleteEvent();
  }

  alertDeleteEvent(){
    this.toast.success("Event Deleted Successfully!","",{
      positionClass:'toast-top-center',
    });
  }
}
