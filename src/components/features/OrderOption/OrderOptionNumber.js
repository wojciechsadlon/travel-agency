import React from 'react';
import styles from './OrderOption.module.scss';
import { formatPrice } from '../../../utils/formatPrice';

const OrderOptionNumber = ({currentValue, limits, setOptionValue, price, ...otherProps}) => (
  <div className={styles.number}>
    <input type='number' 
      className={styles.inputSmall} 
      value={currentValue} 
      min={limits.min} 
      max={limits.max} 
      onChange={event => setOptionValue(event.currentTarget.value)}
    />
    <span>{formatPrice(price)}</span>
  </div>
);

export default OrderOptionNumber