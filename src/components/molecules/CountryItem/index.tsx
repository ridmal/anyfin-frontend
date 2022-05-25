import React, { FC } from 'react';
import { CalculateTotalValue } from '../../../helpers/countryHelper';
import useStore from '../../../store';
import { Country } from '../../../types';
import styles from './styles.module.css';
import { FiXCircle } from 'react-icons/fi';

export interface Props {
  country: Country;
  onDelete?: (country: Country) => void;
}

const CountryItem: FC<Props> = ({ country, onDelete }) => {
  const userInputValue = useStore((state) => state.userInputValue);
  return (
    <div>
      <FiXCircle
        className={styles.closeIcon}
        size={22}
        color="gray"
        onClick={() => (onDelete ? onDelete(country) : undefined)}
      />
      <div className={styles.container}>
        <p className={styles.countryItem}>{country?.name}</p>
        <p className={styles.countryItem}>{country?.population}</p>
        <p className={styles.countryItem}>
          {`${Number(country?.exchangeRate).toFixed(2)} ${country?.currency}`}
        </p>
        <p className={styles.countryItem}>
          {CalculateTotalValue(Number(userInputValue), country?.currency, country?.exchangeRate)}
        </p>
      </div>
    </div>
  );
};

export default CountryItem;
