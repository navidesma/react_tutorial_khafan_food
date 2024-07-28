import styles from "./OrderCard.module.css";
import { formatMoney } from "../../util/formatMoney";
import { formatDate, formatTime } from "../../util/formatTime";
import { useContext } from "react";
import { AppContext, UserTypeEnum } from "../../appContext";
import useSendRequest from "../../util/useSendRequest";
import Button from "../Button/Button";

export default function OrderCard({ order }) {
    const sendRequest = useSendRequest();
    const { userInfo, toggleNotification } = useContext(AppContext);

    const isRestaurantUser = userInfo.type === UserTypeEnum.RESTAURANT_OWNER;

    const submitDelivery = async () => {
        const response = await sendRequest(`food/order/deliver/${order.id}/`, {
            options: { method: "PUT" },
        });

        if (response.isOk) {
            toggleNotification({ type: "success", message: "سفارش با موفقیت تحویل شد" });
        }
    };

    return (
        <div className={styles.container}>
            {order.items.map((oderItem) => (
                <div>
                    <p>
                        {oderItem.food.name}{" "}
                        <span style={{ fontWeight: "bold" }}>x{oderItem.count}</span>
                    </p>
                </div>
            ))}
            <p>{formatMoney(order.total_cost)}</p>
            <p>وضعیت سفارش: {order.is_finished ? "تحویل شده" : "در حال پردازش"}</p>
            <p>تاریخ ثبت: {formatDate(order.created_at)}</p>
            <p>زمان ثبت: {formatTime(order.created_at)}</p>
            {order.deliver_time && <p>زمان تحویل: {formatTime(order.deliver_time)}</p>}
            {isRestaurantUser && !order.is_finished && (
                <Button color={"blue"} onClick={submitDelivery}>
                    ثبت به عنوان تحویل شده
                </Button>
            )}
        </div>
    );
}
