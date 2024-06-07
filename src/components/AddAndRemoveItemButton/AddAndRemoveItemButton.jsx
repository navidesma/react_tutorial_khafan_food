import styles from "./AddAndRemoveItemButton.module.css";
import trashCan from "../../resources/images/trashcan.svg";
import Button from "../Button/Button";

export default function AddAndRemoveItemButton({ count, setCount }) {
  return (
    <div className={styles.action}>
      <Button
        style={{ padding: "0.5rem 1rem" }}
        onClick={() => setCount((prevState) => prevState + 1)}
      >
        +
      </Button>
      <p className={styles.actionNumberOfItems}>{count}</p>
      <Button
        style={{ padding: "0.5rem 1rem" }}
        onClick={() => setCount((prevState) => prevState - 1)}
      >
        {count > 1 ? (
          "-"
        ) : (
          <img src={trashCan} alt="trash can" width={"15px"} height={"15px"} />
        )}
      </Button>
    </div>
  );
}
