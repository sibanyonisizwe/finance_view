import {Component, Input, OnInit} from '@angular/core';
import {Personal} from "../../../../models/forecasts/debt/personal.model";

@Component({
  selector: 'app-personal-summary',
  templateUrl: './personal-summary.component.html',
  styleUrls: ['./personal-summary.component.css']
})
export class PersonalSummaryComponent implements OnInit {

  @Input() personal: Personal;

  constructor() {
  }

  ngOnInit(): void {
  }

}
