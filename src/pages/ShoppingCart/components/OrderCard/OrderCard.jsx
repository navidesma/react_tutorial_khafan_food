import AddAndRemoveItemButton from "../../../../components/AddAndRemoveItemButton/AddAndRemoveItemButton";
import styles from "./OrderCard.module.css";
import { formatMoney } from "../../../../util/formatMoney";

export default function OrderCard({ item, count }) {
    return (
        <div className={styles.orderCard}>
            <p className={styles.orderItemName}>{item.name}</p>
            <p className={styles.orderItemPrice}>{formatMoney(item.price * count)}</p>
            <AddAndRemoveItemButton item={item} count={count} />
        </div>
    );
}
