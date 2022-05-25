import create from 'zustand';
import { Country, CountryDropDownItem, User } from '../types';

interface AppState {
  countries: Country[];
  addCountry: (country: Country) => void;
  removeCountry: (Country: Country) => void;
  countryDropDownItems: CountryDropDownItem[];
  setCountryDropDownItems: (items: CountryDropDownItem[]) => void;
  fetchingCountries: boolean;
  fetchingCountryDetails: boolean;
  setFetchingCountyDetails: (status: boolean) => void;
  token: string;
  setToken: (token: string) => void;
  user: User;
  setUser: (user: User) => void;
  userInputValue: string;
  setUserInputValue: (value: string) => void;
}

const useStore = create<AppState>((set) => ({
  token: '',
  countries: [],
  userInputValue: '0',
  fetchingCountryDetails: false,
  user: {
    email: '',
    name: '',
  },
  fetchingCountries: false,
  countryDropDownItems: [],
  addCountry: (country: Country) => set((state) => ({ countries: [...state?.countries, country] })),
  removeCountry: (country: Country) =>
    set((state) => ({
      countries: state?.countries?.filter((item) => item.name !== country.name),
    })),
  setFetchingCountyDetails: (status: boolean) => set(() => ({ fetchingCountryDetails: status })),

  setCountryDropDownItems: (items: CountryDropDownItem[]) =>
    set(() => ({ countryDropDownItems: items })),
  setToken: (token: string) => set(() => ({ token })),
  setUser: (user: User) => set(() => ({ user })),
  setUserInputValue: (userInputValue: string) => set(() => ({ userInputValue })),
}));

export default useStore;
