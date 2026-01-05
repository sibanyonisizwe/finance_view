import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Customer} from "../../../models/customer/customer.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {CustomerService} from "../../../services/customer/customer.service";

@Component({
  selector: 'app-customer-update',
  templateUrl: './customer-update.component.html',
  styleUrls: ['./customer-update.component.css']
})
export class CustomerUpdateComponent implements OnInit, OnDestroy {
  customer: Customer;
  customerUpdateForm: FormGroup;
  subscriptions: Subscription[] = [];
  isDataAvailable: boolean = false;
  @Output() alertUpdate = new EventEmitter<boolean>();

  investmentModalDisplay:string = "none";
  vehicleModalDisplay: string = "none";
  personalModalDisplay: string = "none";
  propertyModalDisplay: string = "none";

  constructor(private route: ActivatedRoute, private router: Router, private service: CustomerService) {
  }

  ngOnInit() {

    this.createUpdateForm();
    let subscription = this.service.getCustomer(this.route.snapshot.params['customerNum'])
      .subscribe((customer: Customer) => {
        this.customer = customer;
        this.customerUpdateForm.patchValue({
          name: customer.name,
          customerNum: customer.customerNum
        });
        this.isDataAvailable = true;
      });
    this.subscriptions.push(subscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  createUpdateForm(): void {
    this.customerUpdateForm = new FormGroup(
      {
        name: new FormControl('', [Validators.required, Validators.pattern("[A-Za-z0-9]+")
        ]),
        customerNum: new FormControl('', [Validators.pattern("[A-Za-z0-9 ]+")
        ])
      }
    );
  }

  onSubmit() {
    this.customer.name = this.getName().value;
    this.service.updateCustomer(this.customer);
    this.router.navigate(['customers', this.customer.customerNum]).then(() => {
      this.alertUpdate.emit(true);
    });
  }

  getName() {
    return this.customerUpdateForm.get('name');
  }

  openInvestmentCreatePopup(){
    this.investmentModalDisplay = "block";
  }

  closeInvestmentCreatePopup(){
    this.investmentModalDisplay = "none";
  }

  openVehicleCreatePopup() {
    this.vehicleModalDisplay = "block";
  }

  openPersonalCreatePopup() {
    this.personalModalDisplay = "block";
  }

  openPropertyCreatePopup() {
    this.propertyModalDisplay = "block";
  }

  closeVehicleCreatePopup() {
    this.vehicleModalDisplay = "none";
  }

  closePersonalCreatePopup() {
    this.personalModalDisplay = "none";
  }

  closePropertyCreatePopup() {
    this.propertyModalDisplay = "none";
  }
}
