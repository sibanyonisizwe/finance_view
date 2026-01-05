import {Component, Input, OnInit} from '@angular/core';
import {Vehicle} from "../../../../models/forecasts/debt/vehicle.model";

@Component({
  selector: 'app-vehicle-summary',
  templateUrl: './vehicle-summary.component.html',
  styleUrls: ['./vehicle-summary.component.css']
})
export class VehicleSummaryComponent implements OnInit {
  @Input()vehicle:Vehicle;

  constructor() { }

  ngOnInit(): void {
  }

}
