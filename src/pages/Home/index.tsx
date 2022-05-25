import React, { FC, useEffect, useState } from 'react';
import styles from './styles.module.css';
import { TextField, Button } from '../../components/atoms';
import logo from '../../assets/AnyfinLogo.png';
import Select, { StylesConfig } from 'react-select';
import CountryItem from '../../components/molecules/CountryItem';
import { useCountriesData } from '../../services/countryService';
import useStore from '../../store';
import { useAuth0 } from '@auth0/auth0-react';
import { DropDownOptionType } from '../../types';
import { FiPower } from 'react-icons/fi';

const Home: FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const {
    countryDropDownItems,
    countries,
    setUserInputValue,
    user,
    removeCountry,
    fetchingCountryDetails,
  } = useStore.getState();
  const [inputValue, setInputValue] = useState<string>('0');
  const { getAllCountries, getCountryDetails } = useCountriesData();
  // we can add a loading status to here
  const { logout } = useAuth0();
  const headers = ['Name', 'Population', 'Exchange Rate', 'Value'];

  /*
  Test cases
  */
  useEffect(() => {
    getAllCountries();
  }, []);

  const options = countryDropDownItems.map((countryItem) => {
    return { value: countryItem?.name, label: countryItem?.name };
  });

  const handleChange = (newValue: any) => {
    setSelectedCountry(newValue?.label || '');
  };

  const onAddNewCountry = () => {
    const isExistCountry = countries.find((country) => country?.name === selectedCountry);
    console.log(isExistCountry);
    if (!isExistCountry) {
      getCountryDetails(selectedCountry);
    } else {
      alert('country is already exist');
    }
  };

  const customStyles: StylesConfig<DropDownOptionType, boolean> = {
    option: (provided) => ({
      ...provided,
      textAlign: 'left',
      fontSize: 16,
    }),
    control: (provided) => ({
      ...provided,
      width: '70vmin',
      marginRight: 20,
      height: 50,
      textAlign: 'left',
      fontSize: 16,
    }),
  };

  const onPressCalculateButton = async () => {
    setUserInputValue(inputValue);
  };

  return (
    <div className={styles.homeContainer}>
      <div className={styles.amountContainer}>
        <div className={styles.userContainer}>
          <p className={styles.greetingText}>{'Hello!'}</p>
          <p className={styles.userName}>{user?.name}</p>
        </div>
        <img src={logo} className={styles.appLogo} alt="logo" />
        <p>Enter Amount</p>
        <div className={styles.textFieldContainer}>
          <TextField
            value={inputValue}
            onChange={(value) => setInputValue(value)}
            style={styles.textInputStyle}
          />
          <p className={styles.currencyText}>SEK</p>
        </div>
        <Button title="Calculate" onPress={onPressCalculateButton} />
        <div
          className={styles.logoutContainer}
          onClick={() => logout({ returnTo: window.location.origin })}>
          <FiPower size={40} color="#ffdf6e" />
          <p className={styles.currencyText}>Logout</p>
        </div>
      </div>
      <div className={styles.countryContainer}>
        <p className={styles.selectCountyTitle}>Select Countries</p>
        <div className={styles.dropDownContainer}>
          {/* This can be taken as a custom component */}
          <Select
            options={options}
            styles={customStyles}
            onChange={handleChange}
            placeholder={'Type to search'}
          />
          <Button
            title="ADD"
            onPress={onAddNewCountry}
            disabled={selectedCountry === ''}
            isLoading={fetchingCountryDetails}
          />
        </div>
        {countries.length ? (
          <div className={styles.countriesListContainer}>
            <table>
              <thead>
                <tr className={styles.header}>
                  {headers.map((header) => (
                    <th className={styles.headerItem} key={header}>
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
            </table>
            {countries.map((country) => (
              <CountryItem
                key={country?.name}
                country={country}
                onDelete={(country) => removeCountry(country)}
              />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Home;
