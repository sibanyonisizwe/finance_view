import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Vehicle} from "../../../../models/forecasts/debt/vehicle.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {map, Subscription, switchMap, tap} from "rxjs";
import {Router} from "@angular/router";
import {ForecastContextService} from "../../../../context/forecast/forecast-context.service";
import {ForecastService} from "../../../../services/forecast/forecast.service";
import {VehicleService} from "../../../../services/forecast/vehicle/vehicle.service";
import {CurrencyPipe} from "@angular/common";
import {CustomValidator} from "../../../validation/custom-validator";
import {Utility} from "../../../utils/utility";

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {
  vehicleForm: FormGroup;
  @Input() headerText: string;

  @Input() headerIcon: string;

  @Input() eventType: string;

  @Input() customerNum: string;

  @Input() customerName: string;

  @Input() buttonText: string;

  @Input() vehicle: Vehicle;

  @Output() alertUpdate = new EventEmitter<boolean>();

  private subscriptions: Subscription[] = [];

  constructor(private service: VehicleService, private _router: Router, private forecastContextService: ForecastContextService, private forecastService: ForecastService, private currencyPipe: CurrencyPipe) {
  }

  ngOnInit(): void {
    this.createVehicleForm();
    if (this.eventType === "Update") {
      this.vehicleForm.patchValue({forecastName: this.vehicle.forecastName});
      this.vehicleForm.patchValue({purchasePrice: this.currencyPipe.transform(this.vehicle.purchasePrice.value.toString().replace(/\D/g,''),'','','1.0-0')});
      this.vehicleForm.patchValue({interestRate: this.vehicle.interestRate});
      this.vehicleForm.patchValue({term: this.vehicle.term});
      this.vehicleForm.patchValue({depositPercentage: this.currencyPipe.transform(this.getDepositValue(this.vehicle.depositPercentage, this.vehicle.purchasePrice.value).toString().replace(/\D/g,''),'','','1.0-0') });
      this.vehicleForm.patchValue({forecastNum: this.vehicle.forecastNum});
      this.vehicleForm.patchValue({balloonPercentage: this.currencyPipe.transform(this.getBalloonValue(this.vehicle.balloonPercentage, this.vehicle.depositPercentage, this.vehicle.purchasePrice.value).toString().replace(/\D/g,''),'','','1.0-0') });
    }
    this.updateValueChanges();
  }

  createVehicleForm() {
    this.vehicleForm = new FormGroup({
      type: new FormControl('Vehicle', [Validators.required]),
      forecastName: new FormControl('', [Validators.required, Validators.pattern("[A-Za-z0-9 ]+")]),
      purchasePrice: new FormControl(null, [Validators.required, CustomValidator.min(1)]),
      depositPercentage: new FormControl(null, [Validators.required, CustomValidator.min(0)]),
      balloonPercentage: new FormControl(null, [Validators.required, CustomValidator.min(0)]),
      interestRate: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(100)]),
      term: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(660)])
    });
  }

  clickEvent() {
    this.vehicleForm.value.purchasePrice = Utility.currencyStringToNumber(this.vehicleForm.value.purchasePrice);
    this.vehicleForm.value.balloonPercentage = Utility.currencyStringToNumber(this.vehicleForm.value.balloonPercentage);
    this.vehicleForm.value.depositPercentage = Utility.currencyStringToNumber(this.vehicleForm.value.depositPercentage);

    if (this.eventType === "Update") {
      this.vehicle.forecastName = this.vehicleForm.value.forecastName;
      this.vehicle.purchasePrice.value = this.vehicleForm.value.purchasePrice;
      this.vehicle.interestRate = this.vehicleForm.value.interestRate;
      this.vehicle.term = this.vehicleForm.value.term;
      this.vehicle.balloonPercentage = this.getBalloonPercentage(this.vehicleForm.value.balloonPercentage, this.vehicleForm.value.depositPercentage, this.vehicleForm.value.purchasePrice);
      this.vehicle.depositPercentage = this.getDepositPercentage(this.vehicleForm.value.depositPercentage, this.vehicleForm.value.purchasePrice);
      let subscription = this.service.updateVehicleForecast(this.vehicle).pipe(
        map(() => this.forecastService.getForecastRows(this.vehicle.forecastNum)),
        switchMap((forecastRowsObs) => {
          return forecastRowsObs;
        })
      ).subscribe((data) => {
        this.forecastContextService.updateForecastRowData(data);
        this.alertUpdate.emit(true);
      })
      this.subscriptions.push(subscription);
    } else {
      this.vehicleForm.value.balloonPercentage = this.getBalloonPercentage(this.vehicleForm.value.balloonPercentage, this.vehicleForm.value.depositPercentage, this.vehicleForm.value.purchasePrice);
      console.log(this.vehicleForm.value);
      this.vehicleForm.value.depositPercentage = this.getDepositPercentage(this.vehicleForm.value.depositPercentage, this.vehicleForm.value.purchasePrice);
      let subscription = this.service.createVehicleForecast(this.customerNum, this.vehicleForm.value).subscribe((vehicle: Vehicle) => {
        this._router.navigate(["vehicles/update/" + this.customerNum +"/" + vehicle.forecastNum]);
      })
      this.subscriptions.push(subscription);
    }
  }

  private getDepositPercentage(deposit:number, purchasePrice:number) {
    return (deposit / purchasePrice) * 100;
  }


  private getDepositValue(deposit:number, purchasePrice:number) {
    return Math.round((deposit / 100) * purchasePrice);
  }

  private getBalloonPercentage(balloon:number, deposit:number, purchasePrice:number) {
    return (balloon / (purchasePrice - deposit)) * 100;
  }


  private getBalloonValue(balloon:number, deposit:number, purchasePrice:number) {
    return Math.round((balloon / 100) * (purchasePrice - this.getDepositValue(deposit, purchasePrice)));
  }

  updateValueChanges() {
    this.vehicleForm.valueChanges.subscribe(form=>{
      if(form.purchasePrice) {
        this.vehicleForm.patchValue({
          purchasePrice: this.currencyPipe.transform(form.purchasePrice.toString().replace(/\D/g,''),'','','1.0-0')
        }, {emitEvent:false})
      }
      if(form.depositPercentage) {
        this.vehicleForm.patchValue({
          depositPercentage: this.currencyPipe.transform(form.depositPercentage.toString().replace(/\D/g,''),'','','1.0-0')
        }, {emitEvent:false})
      }
      if(form.balloonPercentage) {
        this.vehicleForm.patchValue({
          balloonPercentage: this.currencyPipe.transform(form.balloonPercentage.toString().replace(/\D/g,''),'','','1.0-0')
        }, {emitEvent:false})
      }
    });
  }
}
