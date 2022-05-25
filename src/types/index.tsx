export interface Country {
  name: string;
  population?: number;
  exchangeRate: number;
  currency: string;
  convertedPrice: number;
}

export interface CountryDropDownItem {
  id: number;
  name: string;
}

export interface User {
  email: string;
  name: string;
}

export interface DropDownOptionType {
  label: string;
  value: string;
}
