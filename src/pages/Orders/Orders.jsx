import styles from "./Orders.module.css";
import Main from "../../components/Main/Main";
import OrderCard from "../../components/OrderCard/OrderCard";
import Pagination from "../../components/Pagination/Pagination";
import useSendRequest from "../../util/useSendRequest";
import usePagination from "../../util/usePagination";
import { useEffect, useState } from "react";

export default function Orders() {
    const sendRequest = useSendRequest();

    const [orders, setOrders] = useState();

    const { count, currentPage, setCount, setCurrentPage } = usePagination();

    useEffect(() => {
        const send = async () => {
            const response = await sendRequest(`food/order/list/?page=${currentPage}`);

            if (response.isOk) {
                setOrders(response.data.results);
                setCount(response.data.count);
            }
        };

        send();
    }, [currentPage]);

    return (
        <Main>
            <div className={styles.orderCardList}>
                {orders && orders.length > 0 ? (
                    orders.map((order) => <OrderCard order={order} />)
                ) : (
                    <h3>هیچ سفارشی ثبت نشده</h3>
                )}
            </div>
            <Pagination {...{ currentPage, setCurrentPage, count }} />
        </Main>
    );
}
