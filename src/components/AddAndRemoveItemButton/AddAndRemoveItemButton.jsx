import styles from "./AddAndRemoveItemButton.module.css";
import trashCan from "../../resources/images/trashcan.svg";
import Button from "../Button/Button";
import { AppContext } from "../../appContext";
import { useContext } from "react";

export default function AddAndRemoveItemButton({ id, count }) {
    const { addToCart, removeFromCart } = useContext(AppContext);

    return (
        <div className={styles.action}>
            <Button style={{ padding: "0.5rem 1rem" }} onClick={() => addToCart(id)}>
                +
            </Button>
            <p className={styles.actionNumberOfItems}>{count}</p>
            <Button style={{ padding: "0.5rem 1rem" }} onClick={() => removeFromCart(id)}>
                {count > 1 ? (
                    "-"
                ) : (
                    <img src={trashCan} alt='trash can' width={"15px"} height={"15px"} />
                )}
            </Button>
        </div>
    );
}
