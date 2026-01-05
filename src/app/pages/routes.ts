import {Routes} from "@angular/router";
import {CustomerComponent} from "../components/customers/customer/customer.component";
import {HomeComponent} from "../components/layout/home/home.component";
import {TaxpayerMoreDetailsComponent} from "../components/layout/tax/taxpayer-more-details/taxpayer-more-details.component";
import {ForecastIndexComponent} from "../components/layout/forecasts/forecast-index/forecast-index.component";
import {TaxIndexComponent} from "../components/layout/tax/tax-index/tax-index.component";
import {InvestmentUpdateComponent} from "../components/layout/forecasts/investment-update/investment-update.component";
import {PersonalUpdateComponent} from "../components/layout/forecasts/personal-update/personal-update.component";
import {VehicleUpdateComponent} from "../components/layout/forecasts/vehicle-update/vehicle-update.component";
import {PropertyUpdateComponent} from "../components/layout/forecasts/property-update/property-update.component";
import {DepositEventComponent} from "../components/events/deposit-event/deposit-event.component"
import {WithdrawalEventComponent} from "../components/events/withdrawal-event/withdrawal-event.component"
import {ChangeInterestEventComponent} from "../components/events/change-interest-event/change-interest-event.component"
import {ChangeMonthlyContributionEventComponent} from "../components/events/change-monthly-contribution-event/change-monthly-contribution-event.component"
import {IncreaseMonthlyContributionEventComponent} from "../components/events/increase-monthly-contribution-event/increase-monthly-contribution-event.component"
import {
  ForecastMoreDetailsComponent
} from "../components/layout/forecasts/forecast-more-details/forecast-more-details.component";
import {EventIndexComponent} from "../components/layout/forecasts/events/event-index/event-index.component";

export const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'forecastIndex', component: ForecastIndexComponent},
  {path: 'taxIndex', component: TaxIndexComponent},
  {path: 'taxPayers/:taxPayerNum', component: TaxpayerMoreDetailsComponent},
  {path: 'customers/:customerNum', component: CustomerComponent},
  {path: 'investments/update/:customerNum/:forecastNum', component: InvestmentUpdateComponent},
  {path: 'personals/update/:customerNum/:forecastNum', component: PersonalUpdateComponent},
  {path: 'vehicles/update/:customerNum/:forecastNum', component: VehicleUpdateComponent},
  {path: 'properties/update/:customerNum/:forecastNum', component: PropertyUpdateComponent},
  {path: 'events/create/:customerNum/:forecastNum/:term', component: EventIndexComponent},
  {path: 'forecast/more-details/:customerNum/:forecastNum', component: ForecastMoreDetailsComponent}
]
