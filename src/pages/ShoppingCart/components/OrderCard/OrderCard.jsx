import Button from "../../../../components/Button/Button"
import styles from "./OrderCard.module.css"

export default function OrderCard() {
    return (
        <div className={styles.orderCard}>
            <p className={styles.orderItemName}>عنوان غذا</p>
            <p className={styles.orderItemPrice}>مبلغ قابل پرداخت</p>
            <Button>کم و اضافه کردن</Button>
        </div>
    )
}