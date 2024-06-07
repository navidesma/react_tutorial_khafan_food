import styles from "./FoodCard.module.css";

import { formatMoney } from "../../util/formatMoney";
import Button from "../Button/Button";

export default function FoodCard(props) {
  return (
    <div className={styles.foodCardContainer}>
      <img
        className={styles.image}
        src={props.img}
        alt=""
      />
      <div className={styles.content}>
        <h3>{props.name}</h3>
        <p>{props.restaurant}</p>
        <p style={{ fontWeight: "bold" }}>{formatMoney(props.price)}</p>
        <Button style={{ padding: "1rem 2rem" }}>سفارش</Button>
      </div>
    </div>
  );
}
