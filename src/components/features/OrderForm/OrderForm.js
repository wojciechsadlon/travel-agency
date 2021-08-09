import React from 'react';
// eslint-disable-next-line
import styles from './OrderForm.scss';
import { Row, Col } from 'react-flexbox-grid';
import OrderSummary from '../OrderSummary/OrderSummary';
import pricing from '../../../data/pricing.json';
import OrderOption from '../OrderOption/OrderOption';
import { setOrderOption } from '../../../redux/orderRedux';

const OrderForm = ({tripCost, options}) => (
  <Row>
    <Col xs={12}>
      {pricing.map(option => (
        <Col md={4} key={option.id}>
          <OrderOption {...option} currentValue={options[option.id]} setOrderOption={setOrderOption}/>
        </Col>
      ))}
      <OrderSummary cost={tripCost} options={options}/>
    </Col>
  </Row>
);

export default OrderForm;
