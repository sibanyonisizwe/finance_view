import {Component, Input, OnInit} from '@angular/core';
import {Property} from "../../../../models/forecasts/debt/property.model";

@Component({
  selector: 'app-property-summery',
  templateUrl: './property-summery.component.html',
  styleUrls: ['./property-summery.component.css']
})
export class PropertySummeryComponent implements OnInit {

  @Input() property: Property;

  constructor() { }

  ngOnInit(): void {
  }

}
