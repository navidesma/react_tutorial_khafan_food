import Input from "../../components/Input/Input";
import styles from "./Payment.module.css";

export default function Payment() {
    return (
        <form className={styles.container}>
            <Input type={"number"} />
        </form>
    )
}