import AddAndRemoveItemButton from "../../../../components/AddAndRemoveItemButton/AddAndRemoveItemButton";
import styles from "./OrderCard.module.css";
import { foods } from "../../../../foods";
import { formatMoney } from "../../../../util/formatMoney";

export default function OrderCard({ id, count }) {
  const food = foods.find((food) => food.id === id);

  return (
    <div className={styles.orderCard}>
      <p className={styles.orderItemName}>{food.name}</p>
      <p className={styles.orderItemPrice}>{formatMoney(food.price * count)}</p>
      <AddAndRemoveItemButton id={id} count={count} />
    </div>
  );
}
