import styles from "./FoodCard.module.css";

import { formatMoney } from "../../util/formatMoney";
import Button from "../Button/Button";
import AddAndRemoveItemButton from "../../components/AddAndRemoveItemButton/AddAndRemoveItemButton";
import { useContext } from "react";
import { AppContext, UserTypeEnum } from "../../appContext";
import { Link } from "react-router-dom";

export default function FoodCard({ id, img, name, restaurant, price }) {
    const { cart, addToCart, userInfo } = useContext(AppContext);

    const item = cart.find((cart) => cart.id === id);
    const count = item ? item.count : 0;

    const isRestaurantUser = userInfo.type === UserTypeEnum.RESTAURANT_OWNER;

    return (
        <div className={styles.foodCardContainer}>
            <img className={styles.image} src={img} alt='' />
            <div className={styles.content}>
                <h3>{name}</h3>
                <p>{restaurant}</p>
                <p style={{ fontWeight: "bold" }}>{formatMoney(price)}</p>
                {isRestaurantUser ? (
                    <Link
                        to={`/restaurant/food/${id}`}
                        style={{ display: "block", margin: "0.3rem" }}
                    >
                        <Button variant='outlined'>ویرایش</Button>
                    </Link>
                ) : (
                    <>
                        {count === 0 ? (
                            <Button style={{ padding: "1rem 2rem" }} onClick={() => addToCart(id)}>
                                سفارش
                            </Button>
                        ) : (
                            <AddAndRemoveItemButton id={id} count={count} />
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
