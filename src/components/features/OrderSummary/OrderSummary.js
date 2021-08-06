import React from "react";
import styles from "./OrderSummary.module.scss";
import { calculateTotal } from "../../../utils/calculateTotal";
import { formatPrice } from "../../../utils/formatPrice";

const OrderSummary = ({ cost, options }) => {
  const total = calculateTotal(cost, options);
  const price = formatPrice(total);

  return (
    <h2 className={styles.component}>
      Total: <strong>{price}</strong>
    </h2>
  );
};

export default OrderSummary;
