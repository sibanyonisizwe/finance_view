export interface Customer {
  customerNum: string;
  name: string;
  isActive: boolean;
  forecastList: any[];
  totalForecasts: number;
  numberOfInvestmentForecasts: number;
  numberOfPropertyForecasts: number;
  numberOfVehicleForecasts: number;
  numberOfPersonalForecasts: number;
}
