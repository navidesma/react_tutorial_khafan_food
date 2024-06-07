import styles from "./FoodCard.module.css";

import { formatMoney } from "../../util/formatMoney";
import Button from "../Button/Button";
import { useState } from "react";
import AddAndRemoveItemButton from "../../components/AddAndRemoveItemButton/AddAndRemoveItemButton";

export default function FoodCard(props) {
  const [count, setCount] = useState(0);

  return (
    <div className={styles.foodCardContainer}>
      <img className={styles.image} src={props.img} alt="" />
      <div className={styles.content}>
        <h3>{props.name}</h3>
        <p>{props.restaurant}</p>
        <p style={{ fontWeight: "bold" }}>{formatMoney(props.price)}</p>
        {count === 0 ? (
          <Button style={{ padding: "1rem 2rem" }} onClick={() => setCount(1)}>
            سفارش
          </Button>
        ) : (
          <AddAndRemoveItemButton count={count} setCount={setCount} />
        )}
      </div>
    </div>
  );
}
