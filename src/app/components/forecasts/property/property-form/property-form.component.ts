import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {map, Observable, Subscription, switchMap, tap} from "rxjs";
import {Property} from "../../../../models/forecasts/debt/property.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PropertyService} from "../../../../services/forecast/property/property.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ForecastContextService} from "../../../../context/forecast/forecast-context.service";
import {ForecastService} from "../../../../services/forecast/forecast.service";
import {CurrencyPipe} from "@angular/common";
import {Utility} from "../../../utils/utility";
import {CustomValidator} from "../../../validation/custom-validator";

@Component({
  selector: 'app-property-form',
  templateUrl: './property-form.component.html',
  styleUrls: ['./property-form.component.css']
})
export class PropertyFormComponent implements OnInit {

  @Input() headerText: string;

  @Input() headerIcon: string;

  @Input() eventType: string;

  @Input() customerNum: string;

  @Input() customerName: string;

  @Input() buttonText: string;

  @Input() property: Property;

  @Output() alertUpdate = new EventEmitter<boolean>();

  subscribers: Subscription[] = [];

  propertyForm: FormGroup;

  constructor(private fb: FormBuilder, private _router: Router, private propertyService:PropertyService, private route: ActivatedRoute,private forecastContextService: ForecastContextService, private forecastService: ForecastService, private currencyPipe: CurrencyPipe) {
  }

  ngOnInit(): void {
    this.createPropertyForm();
    if (this.eventType === "Update") {
      this.propertyForm.patchValue({forecastName: this.property.forecastName});
      this.propertyForm.patchValue({purchasePrice: this.currencyPipe.transform(this.property.purchasePrice.value.toString().replace(/\D/g,''),'','','1.0-0')});
      this.propertyForm.patchValue({interestRate: this.property.interestRate});
      this.propertyForm.patchValue({term: this.property.term});
      this.propertyForm.patchValue({depositPercentage: this.currencyPipe.transform(this.getDepositValue(this.property.depositPercentage, this.property.purchasePrice.value).toString().replace(/\D/g,''),'','','1.0-0') });
      this.propertyForm.patchValue({forecastNum: this.property.forecastNum});
    }
    this.updateValueChanges();
  }


  ngOnDestroy(): void {
    this.subscribers.forEach(subscriber=>subscriber.unsubscribe())
  }

  createPropertyForm(): void {
    this.propertyForm = this.fb.group({
      type: ['Property', [Validators.required, Validators.min(0)]],
      forecastName: ['', [Validators.required,Validators.pattern("[A-Za-z0-9 ]+")]],
      purchasePrice: [null, [Validators.required, CustomValidator.min(1)]],
      depositPercentage: [null, [Validators.required, CustomValidator.min(0)]],
      interestRate: [null, [Validators.required, Validators.min(1),Validators.max(100)]],
      term: [null, [Validators.required, Validators.min(1),Validators.max(660)]],
    })
  }

  clickEvent() {
    this.propertyForm.value.purchasePrice = Utility.currencyStringToNumber(this.propertyForm.value.purchasePrice);
    this.propertyForm.value.depositPercentage = Utility.currencyStringToNumber(this.propertyForm.value.depositPercentage);

    if(this.eventType === "Update"){
      this.property.forecastName = this.propertyForm.value.forecastName;
      this.property.purchasePrice.value = this.propertyForm.value.purchasePrice;
      this.property.interestRate = this.propertyForm.value.interestRate;
      this.property.term = this.propertyForm.value.term;
      this.property.depositPercentage = this.getDepositPercentage(this.propertyForm.value.depositPercentage, this.propertyForm.value.purchasePrice);
      let subscription = this.propertyService.updatePropertyForecast(this.property).pipe(
        map(() => this.forecastService.getForecastRows(this.property.forecastNum)),
        switchMap((forecastRowsObs) => {
          return forecastRowsObs;
        })
      ).subscribe((data) => {
        this.forecastContextService.updateForecastRowData(data);
        this.alertUpdate.emit(true);
      })
      this.subscribers.push(subscription);
    }
    else{
      this.propertyForm.value.depositPercentage = this.getDepositPercentage(this.propertyForm.value.depositPercentage, this.propertyForm.value.purchasePrice);
      let subscription = this.propertyService.createProperty(this.propertyForm.value,this.customerNum).subscribe((property: Property) => {
        this._router.navigate(["properties/update/" + this.customerNum +"/" + property.forecastNum]);
      })
      this.subscribers.push(subscription);
    }
  }

  private getDepositPercentage(deposit:number, purchasePrice:number) {
    return (deposit / purchasePrice) * 100;
  }


  private getDepositValue(deposit:number, purchasePrice:number) {
    return (deposit / 100) * purchasePrice;
  }

  updateValueChanges() {
    this.propertyForm.valueChanges.subscribe(form=>{
      if(form.purchasePrice) {
        this.propertyForm.patchValue({
          purchasePrice: this.currencyPipe.transform(form.purchasePrice.toString().replace(/\D/g,''),'','','1.0-0')
        }, {emitEvent:false})
      }
      if(form.depositPercentage) {
        this.propertyForm.patchValue({
          depositPercentage: this.currencyPipe.transform(form.depositPercentage.toString().replace(/\D/g,''),'','','1.0-0')
        }, {emitEvent:false})
      }
    });
  }

}
