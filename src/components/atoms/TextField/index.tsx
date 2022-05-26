import React, { ChangeEvent, FC } from 'react';
import styles from './styles.module.css';

interface Props {
  onChange: (value: string) => void;
  value: string | number | undefined;
  error?: string | null;
  label?: string;
  placeholder?: string;
  name?: string;
  isDisabled?: boolean;
  type?: 'text' | 'number' | 'tel' | 'currency';
  onBlur?: (e: React.FocusEvent<unknown>) => void;
  style?: string;
}

const TextField: FC<Props> = ({
  onChange,
  value,
  error = null,
  label = '',
  placeholder = '',
  name = 'text',
  isDisabled = false,
  type = 'text',
  onBlur,
  style,
}) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event?.target?.value);
  };

  return (
    <div className={styles.labelText}>
      {label && (
        <div className="ml-2">
          <p>{label}</p>
        </div>
      )}

      <div>
        <input
          name={name}
          className={`${styles.textInputContainer} ${style}`}
          placeholder={placeholder}
          value={value}
          onChange={(e) => {
            handleChange(e);
          }}
          disabled={isDisabled}
          type={type}
          onBlur={onBlur}
        />
      </div>
      <div className="mt-1 ml-1">
        <p>{error}</p>
      </div>
    </div>
  );
};

export default TextField;
