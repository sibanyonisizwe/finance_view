import {Component, Input, OnInit} from '@angular/core';
import {Investment} from "../../../../models/forecasts/investment/investment.model";

@Component({
  selector: 'app-investment-summary',
  templateUrl: './investment-summary.component.html',
  styleUrls: ['./investment-summary.component.css']
})
export class InvestmentSummaryComponent implements OnInit {

  @Input() investment:Investment;

  constructor() { }

  ngOnInit(): void {
  }

}
