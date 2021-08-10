import React from 'react';
import styles from './OrderOption.module.scss';
import Icon from '../../common/Icon/Icon';
import { formatPrice } from '../../../utils/formatPrice';

const OrderOptionIcons = ({values, required, setOptionValue, currentValue, ...otherProps}) => (
  <div className={styles.component}>
    {!required ? (<div onClick={setOptionValue('')}>
      <Icon name='times-circle' />
      none
      </div>
    ) : ''}
    {values.map(value => (
      <div className={value.id === currentValue ? styles.iconActive : styles.icon} key={value.id} onClick={value => setOptionValue(value.id)}>
        <Icon name={value.icon} />
        {value.name + ' ' + formatPrice(value.price)}
      </div>        
    ))}  
  </div>
);

export default OrderOptionIcons