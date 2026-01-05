import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-more-details-button',
  templateUrl: './more-details-button.component.html',
  styleUrls: ['./more-details-button.component.css']
})
export class MoreDetailsButtonComponent implements OnInit {

  @Input() forecastNum: string;

  @Input() customerNum: string;

  constructor() {
  }

  ngOnInit(): void {
  }

}
