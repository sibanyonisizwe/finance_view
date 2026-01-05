import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {CustomerComponent} from './components/customers/customer/customer.component';
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {CustomerForecastListComponent} from './components/customers/customer-forecast-list/component/customer-forecast-list.component';
import {CustomerUpdateComponent} from './components/customers/customer-update/customer-update.component';
import {appRoutes} from './pages/routes';
import {NgChartsModule} from "ng2-charts";
import {ChartsComponent} from './components/customers/customer/charts/charts.component';
import {HomeComponent} from './components/layout/home/home.component';
import {ReactiveFormsModule} from "@angular/forms";
import {BackButtonComponent} from './components/common/back-button/back-button.component';
import {TaxpayerMoreDetailsComponent} from './components/layout/tax/taxpayer-more-details/taxpayer-more-details.component';
import {ForecastIndexComponent} from "./components/layout/forecasts/forecast-index/forecast-index.component";
import {TaxIndexComponent} from "./components/layout/tax/tax-index/tax-index.component";
import {InvestmentUpdateComponent} from "./components/layout/forecasts/investment-update/investment-update.component";
import {InvestmentFormComponent} from "./components/forecasts/investments/investment-form/investment-form.component";
import {VehicleFormComponent} from "./components/forecasts/vehicle/vehicle-form/vehicle-form.component";
import {PersonalFormComponent} from "./components/forecasts/personals/personal-form/personal-form.component";
import {PersonalUpdateComponent} from "./components/layout/forecasts/personal-update/personal-update.component";
import {
  ForecastRowListContainerComponent
} from "./components/forecasts/forecast-row-list/container/forecast-row-list-container.component";
import {
  ForecastRowListComponent
} from "./components/forecasts/forecast-row-list/component/forecast-row-list/forecast-row-list.component";
import {VehicleUpdateComponent} from "./components/layout/forecasts/vehicle-update/vehicle-update.component";
import {VehicleSummaryComponent} from './components/forecasts/vehicle/vehicle-summary/vehicle-summary.component';
import {PropertyUpdateComponent} from "./components/layout/forecasts/property-update/property-update.component";
import {PropertyFormComponent} from "./components/forecasts/property/property-form/property-form.component";
import {
  CustomerForecastListContainerComponent
} from "./components/customers/customer-forecast-list/container/customer-forecast-list-container.component";
import { InvestmentSummaryComponent } from './components/forecasts/investments/investment-summary/investment-summary.component';
import { PersonalSummaryComponent } from './components/forecasts/personals/personal-summary/personal-summary.component';
import { MoreDetailsButtonComponent } from './components/common/more-details-button/more-details-button.component';
import { PropertySummeryComponent } from './components/forecasts/property/property-summery/property-summery.component';
import { EventIndexComponent } from './components/layout/forecasts/events/event-index/event-index.component';
import { WithdrawalEventComponent } from './components/events/withdrawal-event/withdrawal-event.component';
import { DepositEventComponent } from './components/events/deposit-event/deposit-event.component';
import { ChangeInterestEventComponent } from './components/events/change-interest-event/change-interest-event.component';
import { IncreaseMonthlyContributionEventComponent } from './components/events/increase-monthly-contribution-event/increase-monthly-contribution-event.component';
import { ChangeMonthlyContributionEventComponent } from './components/events/change-monthly-contribution-event/change-monthly-contribution-event.component';
import { ForecastMoreDetailsComponent } from './components/layout/forecasts/forecast-more-details/forecast-more-details.component';
import { EventTableComponent } from './components/events/event-table/component/event-table.component';
import { EventTableListComponent } from './components/events/event-table/container/event-table-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import {CurrencyPipe} from "@angular/common";
import {NgxPaginationModule} from "ngx-pagination";





@NgModule({
  declarations: [
    AppComponent,
    CustomerComponent,
    HeaderComponent,
    FooterComponent,
    CustomerForecastListComponent,
    CustomerUpdateComponent,
    ChartsComponent,
    HomeComponent,
    BackButtonComponent,
    TaxpayerMoreDetailsComponent,
    ForecastIndexComponent,
    TaxIndexComponent,
    InvestmentUpdateComponent,
    InvestmentFormComponent,
    VehicleFormComponent,
    InvestmentUpdateComponent,
    InvestmentFormComponent,
    PersonalFormComponent,
    PersonalUpdateComponent,
    ForecastRowListContainerComponent,
    ForecastRowListComponent,
    VehicleUpdateComponent,
    VehicleSummaryComponent,
    PropertyUpdateComponent,
    PropertyFormComponent,
    CustomerForecastListContainerComponent,
    InvestmentSummaryComponent,
    PersonalSummaryComponent,
    MoreDetailsButtonComponent,
    PropertySummeryComponent,
    EventIndexComponent,
    WithdrawalEventComponent,
    DepositEventComponent,
    ChangeInterestEventComponent,
    IncreaseMonthlyContributionEventComponent,
    ChangeMonthlyContributionEventComponent,
    ForecastMoreDetailsComponent,
    EventTableComponent,
    EventTableListComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    NgChartsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 1500,
      preventDuplicates: true,
    }),
    BrowserAnimationsModule,
    NgxPaginationModule
  ],
  providers: [CurrencyPipe],
  bootstrap: [AppComponent]
})

export class AppModule {
}
