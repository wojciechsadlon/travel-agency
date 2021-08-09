import React from 'react';
import styles from './OrderOption.module.scss';
import Icon from '../../common/Icon/Icon';
import { formatPrice } from '../../../utils/formatPrice';

const OrderOptionIcons = ({values, required, setOptionValue, ...otherProps}) => (
  <div className={styles.icon}>
    {!required ? (<div onClick={setOptionValue('')}>
      <Icon name='times-circle' />
      none
      </div>
    ) : ''}
    {values.map(value => (
      <div className={value ? styles.iconActive : ''} key={value.id} onClick={value => setOptionValue(value.id)}>
        <Icon name={value.icon} />
        {value.name + ' ' + formatPrice(value.price)}
      </div>        
    ))}  
  </div>
);

export default OrderOptionIcons