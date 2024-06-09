import styles from "./FoodCard.module.css";

import { formatMoney } from "../../util/formatMoney";
import Button from "../Button/Button";
import AddAndRemoveItemButton from "../../components/AddAndRemoveItemButton/AddAndRemoveItemButton";

export default function FoodCard({
  id,
  img,
  name,
  restaurant,
  price,
  cart,
  addToCart,
  removeFromCart,
}) {
  const item = cart.find((cart) => cart.id === id);
  const count = item ? item.count : 0;

  return (
    <div className={styles.foodCardContainer}>
      <img className={styles.image} src={img} alt="" />
      <div className={styles.content}>
        <h3>{name}</h3>
        <p>{restaurant}</p>
        <p style={{ fontWeight: "bold" }}>{formatMoney(price)}</p>
        {count === 0 ? (
          <Button
            style={{ padding: "1rem 2rem" }}
            onClick={() => addToCart(id)}
          >
            سفارش
          </Button>
        ) : (
          <AddAndRemoveItemButton
            id={id}
            count={count}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
          />
        )}
      </div>
    </div>
  );
}
