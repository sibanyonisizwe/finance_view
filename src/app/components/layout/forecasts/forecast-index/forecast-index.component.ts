import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomerService} from "../../../../services/customer/customer.service";
import {Customer} from "../../../../models/customer/customer.model";
import {Observable, Subscription} from "rxjs";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-forecast-index',
  templateUrl: './forecast-index.component.html',
  styleUrls: ['./forecast-index.component.css']
})
export class ForecastIndexComponent implements OnInit, OnDestroy {

  customer$: Observable<any>;

  customerCreateForm: FormGroup;

  alertNewCustomer: boolean = false;

  alertDeleteCustomer: boolean = false;

  private subscriptions: Subscription[] = [];

  displayStyles: {
    displayStyle: string;
    num: string;
  }[] = [];

  pageSizes = [5, 10, 15, 20]

  sortOption = "name";

  sortOptions = ["name", "customerNum"]

  page = 0;

  count = 10;

  pageSize = 5;

  currentIndex = -1;

  customers: Customer[] = [];

  loadingScreenDisplay: string = "block";

  constructor(private fb: FormBuilder, private service: CustomerService,private toast:ToastrService) {
  }

  ngOnInit(): void {
    this.createCustomerForm();
    this.customer$ = this.service.getCustomers(this.page, this.pageSize, this.sortOption);
    this.generateDeleteModal();
  }

  generateDeleteModal() {
    this.customer$.subscribe((customers)=>{
      this.customers = customers.content;
      this.count = customers.totalElements;
      this.loadingScreenDisplay = "none";
      this.displayStyles = [];
      this.customers.forEach(customer => {
        this.displayStyles.push({
          displayStyle: "none",
          num: customer.customerNum
        })
      })
    })
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  createCustomer(): void {
    let subscription = this.service.createCustomer(this.customerCreateForm.value).subscribe(() => {
      this.refreshList();
      this.generateDeleteModal();
      this.createCustomerAlert();
    });
    this.subscriptions.push(subscription);
  }

  createCustomerForm() {
    this.customerCreateForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
    })
  }

  deleteCustomer(customerNum: string) {
    let subscription = this.service.deleteCustomer(customerNum).subscribe(() => {
      this.refreshList();
      this.closePopup(customerNum);
      this.deleteCustomerAlert();
    });
    this.subscriptions.push(subscription);
  }

  openPopup(customerNumTemp: string) {
    this.displayStyles.forEach((object) => {
      if (object.num === customerNumTemp) {
        object.displayStyle = "block";
      }
    })
  }

  closePopup(customerNumTemp: string) {
    this.displayStyles.forEach((object) => {
      if (object.num === customerNumTemp) {
        object.displayStyle = "none";
      }
    })
  }

  refreshList() {
    this.customer$ = this.service.getCustomers(this.page, this.pageSize, this.sortOption);
    this.generateDeleteModal();
  }

  handlePageChange(event) {
    this.page = event - 1;
    this.refreshList();
  }

  handlePageSizeChange(event) {
    this.pageSize = event.target.value;
    this.page = 0;
    this.refreshList();
  }

  handleSortChange(event) {
    this.sortOption = event.target.value;
    this.page = 0;
    this.refreshList();
  }
  deleteCustomerAlert(){
    this.toast.success("Customer Deleted Successfully!","",{
      positionClass:'toast-top-center',
    });
  }

  createCustomerAlert(){
    this.toast.success("Customer Added Successfully","",{
      positionClass:'toast-top-center',
    });
  }

}
