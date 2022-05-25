import React, { FC, MouseEventHandler } from 'react';
import styles from './styles.module.css';

interface Props {
  title: string;
  buttonStyle?: string;
  titleStyle?: string;
  onPress?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  isLoading?: boolean;
}

const Button: FC<Props> = ({
  title,
  onPress,
  disabled = false,
  buttonStyle,
  titleStyle,
  isLoading,
}) => {
  return (
    <button
      className={`${styles.buttonComponent} ${buttonStyle}`}
      onClick={onPress}
      disabled={disabled || isLoading}>
      <p className={titleStyle}>{title}</p>
    </button>
  );
};

export default Button;
