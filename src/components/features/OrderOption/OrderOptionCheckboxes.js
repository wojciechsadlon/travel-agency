import React from 'react';
import styles from './OrderOption.module.scss'

const newValueSet = (currentValue, id, checked) => {
  if(checked){
    return [
      ...currentValue,
      id,
    ];
  } else {
    return currentValue.filter(value => value !== id)
  }
}

const OrderOptionCheckboxes = ({values, currentValue, setOptionValue, ...otherProps}) => (
  <div className={styles.checkboxes}>
    {values.map(value => (
      <label key={value.id}>
        <input type='checkbox' 
          value={value.id} 
          checked={currentValue.includes(value.id)}
          onChange={event => setOptionValue(newValueSet(currentValue, value.id, event.currentTarget.checked))}
        />
          {value.name + ' ' + value.price}
      </label>
    ))}
  </div>
);

export default OrderOptionCheckboxes