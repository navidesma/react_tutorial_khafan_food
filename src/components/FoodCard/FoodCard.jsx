import styles from "./FoodCard.module.css";

import { formatMoney } from "../../util/formatMoney";

export default function FoodCard() {
  return (
    <div className={styles.foodCardContainer}>
      <img
        className={styles.image}
        src="https://www.starbaal.com/uploads/posts/dfdf5d.jpg?m=thumb&w=800&h=600&q=high"
        alt=""
      />
      <div className={styles.content}>
        <h3>عنوان غذا</h3>
        <p>اسم رستوران</p>
        <p style={{ fontWeight: "bold" }}>{formatMoney(200000)}</p>
        <button>سفارش</button>
      </div>
    </div>
  );
}
