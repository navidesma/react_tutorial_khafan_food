import styles from "./ShoppingCart.module.css";

import Main from "../../components/Main/Main";
import { formatMoney } from "../../util/formatMoney";
import OrderCard from "./components/OrderCard/OrderCard";
import { useContext } from "react";
import { AppContext } from "../../appContext";

import { foods } from "../../foods";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";

export default function ShoppingCart() {
    const { cart } = useContext(AppContext);

    let totalItemCount = 0;
    let totalCostFromStart = 0;
    cart.forEach((item) => {
        const food = foods.find((food) => food.id === item.id);
        totalCostFromStart += food.price * item.count;
        totalItemCount += item.count;
    });

    const totalCostFinal = totalCostFromStart + 15000;

    if (cart.length === 0) {
        return (
            <Main>
                <h1 style={{ textAlign: "center" }}>سبد خرید شما خالی است</h1>
            </Main>
        );
    }

    return (
        <Main>
            <div>
                {cart.map((item) => (
                    <OrderCard count={item.count} id={item.id} />
                ))}
            </div>

            <div className={styles.totalCost}>
                <div>
                    <h3>جمع سفارش:</h3>
                    <h3>{formatMoney(totalCostFromStart)}</h3>
                    <h3>هزینه پیک:</h3>
                    <h3>{formatMoney(15000)}</h3>
                </div>
                <div>
                    <h3>قابل پرداخت:</h3>
                    <h3>{formatMoney(totalCostFinal)}</h3>
                </div>
                <div>
                    <h3>تعداد اقلام</h3>
                    <h3>{totalItemCount + " عدد"}</h3>
                </div>
            </div>
            <Link to={`/payment?amount=${totalCostFinal}`}>
                <Button
                    type={"button"}
                    color={"green"}
                    fullWidthOnMobile
                    style={{ display: "block", padding: "1rem 3rem", marginTop: "1rem" }}
                >
                    پرداخت
                </Button>
            </Link>
        </Main>
    );
}
