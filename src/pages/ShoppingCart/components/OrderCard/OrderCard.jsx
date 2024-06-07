import { useState } from "react";
import AddAndRemoveItemButton from "../../../../components/AddAndRemoveItemButton/AddAndRemoveItemButton"
import styles from "./OrderCard.module.css"

export default function OrderCard() {
    const [count, setCount] = useState(0);
    return (
        <div className={styles.orderCard}>
            <p className={styles.orderItemName}>عنوان غذا</p>
            <p className={styles.orderItemPrice}>مبلغ قابل پرداخت</p>
            <AddAndRemoveItemButton count={count} setCount={setCount} />
        </div>
    )
}