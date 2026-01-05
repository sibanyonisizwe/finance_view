import {Component, Input, OnInit} from '@angular/core';
import {Chart} from "chart.js";
import {Customer} from "../../../../models/customer/customer.model";

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {
  chart: Chart;
  doughnutChartData: number[] = [];
  doughnutChartLabels: string[] = [];
  @Input() customer: Customer;

  constructor() {
  }

  ngOnInit(): void {
    this.createDoughnut();
    this.createChart();
  }

  createDoughnut() {
    this.doughnutChartData = [this.customer.numberOfInvestmentForecasts, this.customer.numberOfPropertyForecasts, this.customer.numberOfVehicleForecasts, this.customer.numberOfPersonalForecasts];
    this.doughnutChartLabels = [
      'Investments',
      'Properties',
      'Vehicles',
      'Personal Loans'
    ];
  }

  createChart() {
    this.chart = new Chart("forecastsChart", {
      type: "doughnut",
      data: {
        labels: this.doughnutChartLabels,
        datasets: [{
          backgroundColor: [
            "#e98e6e",
            getComputedStyle(document.documentElement).getPropertyValue('--secondary'),
            "#70475d",
            "#f0b971"
          ],
          hoverBackgroundColor: [
            "#e98e6e",
            getComputedStyle(document.documentElement).getPropertyValue('--secondary'),
            "#70475d",
            "#f0b971"
          ],
          data: this.doughnutChartData
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
            },
            text: "Total Interest vs Total Monthly Repayment"
          }
        }
      }
    });

  }
}
