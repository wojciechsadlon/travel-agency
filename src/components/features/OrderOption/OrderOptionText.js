import React from 'react';

const OrderOptionText = ({type, setOptionValue, currentValue, name}) => (
  <div>
    <input type={type} value={currentValue ? currentValue : name} onChange={event => setOptionValue(event.currentTarget.value)} />
  </div>
);

export default OrderOptionText