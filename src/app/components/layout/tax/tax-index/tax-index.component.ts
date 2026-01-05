import {Component, OnDestroy, OnInit} from '@angular/core';
import {TaxPayer} from "../../../../models/tax/TaxPayer.model";
import {Observable, Subscription} from "rxjs";
import {TaxpayerService} from "../../../../services/taxpayer/taxpayer.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {CustomValidator} from "../../../validation/custom-validator";
import {Utility} from "../../../utils/utility";
import {CurrencyPipe} from "@angular/common";

@Component({
  selector: 'app-tax-index',
  templateUrl: './tax-index.component.html',
  styleUrls: ['./tax-index.component.css']
})
export class TaxIndexComponent implements OnInit, OnDestroy {

  taxPayers$: Observable<any>;

  taxPayerForm: FormGroup;

  page = 0;

  count = 10;

  pageSize = 5;

  currentIndex = -1;

  pageSizes = [5, 10, 15, 20]

  sortOption = "name";

  sortOptions = ["name", "taxPayerNum", "age"]

  taxPayers: TaxPayer[] = [];

  private subscriptions: Subscription[] = [];

  displayStyles: {
    displayStyle: string;
    num: string;
  }[] = [];

  loadingScreenDisplay: string = "block";

  constructor(private fb: FormBuilder, private service: TaxpayerService,private toast:ToastrService, private currencyPipe:CurrencyPipe) {

  }

  ngOnInit(): void {
    this.createTaxPayerForm();
    this.refreshList();

    this.taxPayerForm.valueChanges.subscribe(form => {
      if(form.medicalCredits){
        this.taxPayerForm.patchValue({
          medicalCredits: this.currencyPipe.transform(form.medicalCredits.toString().replace(/\D/g,''),'','','1.0-0')
        }, {emitEvent:false})
      }
    });
  }

  retrieveTaxPayers(){
    this.taxPayers$.subscribe((taxPayers)=>{
      this.taxPayers = taxPayers.content;
      this.count = taxPayers.totalElements;
      this.displayStyles = [];
      this.loadingScreenDisplay = "none";
      taxPayers.content.forEach(taxPayer => {
        this.displayStyles.push({
          displayStyle: "none",
          num: taxPayer.taxPayerNum
        })
      })
    })
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  createTaxPayer(): void {
    let rightAmount = Utility.currencyStringToNumber(this.taxPayerForm.value.medicalCredits);
    this.taxPayerForm.value.medicalCredits = rightAmount;
    let subscription = this.service.createTaxPayer(this.taxPayerForm.value).subscribe(() => {
     this.taxPayerCreateAlert();
      this.refreshList();
      // this.retrieveTaxPayers();
    });
    this.subscriptions.push(subscription);
  }

  createTaxPayerForm() {
    this.taxPayerForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('\\b([A-ZÀ-ÿ][-,a-z. \']+[ ]*)+')]],
      age: [null, [Validators.required, Validators.min(1)]],
      medicalCredits: [null, [Validators.required, CustomValidator.min(0)]],
    })
  }

  deleteTaxPayer(taxPayerNum: string) {
    let subscription = this.service.deleteTaxPayer(taxPayerNum).subscribe(() => {
      this.taxPayerDeleteAlert();
      this.refreshList();
      this.closePopup(taxPayerNum);
    });
    this.subscriptions.push(subscription);
  }

  taxPayerCreateAlert(){
    this.toast.success(" Tax Payer Added Successfully!","",{
      positionClass:'toast-top-center',
    });
  }

  taxPayerDeleteAlert(){
    this.toast.success("Tax Payer Deleted Successfully!","",{
      positionClass:'toast-top-center',
    });
  }

  refreshList() {
    this.taxPayers$ = this.service.getTaxPayers(this.page, this.pageSize, this.sortOption);
    this.retrieveTaxPayers();
  }

  openPopup(taxPayerNumTemp: string) {
    this.displayStyles.forEach((object) => {
      if (object.num === taxPayerNumTemp) {
        object.displayStyle = "block";
      }
    })
  }

  closePopup(taxPayerNumTemp: string) {
    this.displayStyles.forEach((object) => {
      if (object.num === taxPayerNumTemp) {
        object.displayStyle = "none";
      }
    })
  }

  handlePageChange(event) {
    this.page = event-1;
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
}
