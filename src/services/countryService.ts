import useGraphQlWrapper from './baseService';
import useStore from '../store';
import { Country, CountryDropDownItem } from '../types';

export const useCountriesData = (): {
  getAllCountries: () => void;
  getCountryDetails: (countryName: string) => void;
} => {
  const { setCountryDropDownItems, addCountry, setFetchingCountyDetails } = useStore(
    (state) => state,
  );
  const { executeQueryWithAuth } = useGraphQlWrapper();
  const getAllCountries = async (): Promise<void> => {
    const queryString = `
    query Countries {
      countries {
        id
        name
      }
    }`;
    try {
      const response = await executeQueryWithAuth(queryString);
      setCountryDropDownItems(response?.data?.countries as CountryDropDownItem[]);
    } catch (error) {
      alert(error);
    }
  };

  const getCountryDetails = async (countryName: string): Promise<void> => {
    setFetchingCountyDetails(true);
    const queryString = `
    query CountryDetails($countryName: String) {
      country(name: $countryName) {
        name
        population
        exchangeRate
        currency
      }
    }`;
    try {
      const response = await executeQueryWithAuth(queryString, { countryName });
      if (response?.data?.country?.name) {
        // Validations can move to separate folder
        addCountry(response?.data?.country as Country);
      }
      if (response.errors || response.error) {
        alert(response.error || response.errors);
      }
    } catch (error) {
      alert(error);
    } finally {
      setFetchingCountyDetails(false);
    }
  };

  return {
    getAllCountries,
    getCountryDetails,
  };
};
