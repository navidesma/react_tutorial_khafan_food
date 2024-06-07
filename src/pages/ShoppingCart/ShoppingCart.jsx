import styles from "./ShoppingCart.module.css";

import Main from "../../components/Main/Main";
import { formatMoney } from "../../util/formatMoney";
import OrderCard from "./components/OrderCard/OrderCard";

export default function ShoppingCart() {
  return (
    <Main>
      <div>
        <OrderCard/>
      </div>

      <div className={styles.totalCost}>
        <div>
          <h3>جمع سفارش:</h3>
          <h3>{formatMoney(200000)}</h3>
          <h3>هزینه پیک:</h3>
          <h3>{formatMoney(200000)}</h3>
        </div>
        <div>
          <h3>قابل پرداخت:</h3>
          <h3>{formatMoney(200000)}</h3>
        </div>
        <div>
          <h3>تعداد اقلام</h3>
          <h3>7 عدد</h3>
        </div>
      </div>
    </Main>
  );
}
