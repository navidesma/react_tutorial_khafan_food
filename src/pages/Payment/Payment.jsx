import Input from "../../components/Input/Input";
import styles from "./Payment.module.css";
import Button from "../../components/Button/Button";
import { useEffect, useState } from "react";

export default function Payment() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count > 0) {
      const decrementCountInterval = setInterval(() => {
        setCount((prevState) => prevState - 1);
      }, 1000);

      return () => clearInterval(decrementCountInterval);
    }
  }, [count]);

  const handleClickCounter = () => {
    setCount(120);
  };

  return (
    <form className={styles.container}>
      <h1 style={{ textAlign: "center" }}>مبلغ قابل پرداخت</h1>
      <Input
        label={"شماره کارت"}
        required
        dir="ltr"
        type={"number"}
        className={styles.numberInput}
      />
      <Input
        label={"CVV2"}
        required
        dir="ltr"
        type={"number"}
        style={{ width: "40%" }}
        className={styles.numberInput}
      />
      <h3 style={{ textAlign: "center" }}>تاریخ انقضا:</h3>
      <div className={styles.dateContainer}>
        <Input
          label={"ماه"}
          required
          dir="ltr"
          type={"number"}
          className={styles.numberInput}
        />
        <Input
          label={"سال"}
          required
          dir="ltr"
          type={"number"}
          className={styles.numberInput}
        />
      </div>
      <div className={styles.passwordContainer}>
        <Input
          label={"رمز دوم"}
          required
          dir="ltr"
          type={"number"}
          displayInline
          className={styles.numberInput}
        />
        <Button
          style={{
            height: "70px",
            width: "150px",
            marginTop: "2rem",
          }}
          type="button"
          onClick={handleClickCounter}
          disabled={count > 0}
        >
          {count > 0 ? count + " ثانیه" : "درخواست رمز دوم"}
        </Button>
      </div>
      <Button
        color={"green"}
        fullWidthOnMobile
        style={{ padding: "1rem 2rem", margin: "1 auto", display: "block" }}
        type={"submit"}
      >
        پرداخت
      </Button>
    </form>
  );
}
