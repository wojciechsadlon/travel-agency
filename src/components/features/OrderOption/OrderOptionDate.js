import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const OrderOptionDate = ({currentValue, setOptionValue}) => (
  <div>
    <DatePicker dateFormat='dd/MM/yyyy' selected={!currentValue ? new Date() : currentValue} onChange={(date) => setOptionValue(date)} />
  </div>
);

export default OrderOptionDate
