import Input from "../../components/Input/Input";
import styles from "./Payment.module.css";
import Button from "../../components/Button/Button";
import { useContext, useEffect, useState } from "react";
import useInputValidator from "../../util/useInputValidator";
import { useNavigate, useSearchParams } from "react-router-dom";
import { formatMoney } from "../../util/formatMoney";
import { AppContext } from "../../appContext";

export default function Payment() {
  const { clearCart, toggleNotification } = useContext(AppContext);

  const cardNumberInputState = useInputValidator({
    maxLength: 16,
    minLength: 16,
  });

  const cvv2InputState = useInputValidator({
    maxLength: 4,
    minLength: 3,
  });

  const monthInputState = useInputValidator({
    maxLength: 2,
    minLength: 2,
  });

  const yearInputState = useInputValidator({
    maxLength: 2,
    minLength: 2,
  });

  const passwordInputState = useInputValidator({
    maxLength: 8,
    minLength: 4,
  });

  const emailInputState = useInputValidator({
    maxLength: 32,
    minLength: 12,
    required: false,
  });

  const [count, setCount] = useState(0);

  const [searchParams] = useSearchParams();

  const amount = searchParams.get("amount") || "0";

  const navigate = useNavigate();

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

  const formSubmitHandler = (event) => {
    event.preventDefault();

    if (
      !(
        cardNumberInputState.isValid &&
        cvv2InputState.isValid &&
        monthInputState.isValid &&
        yearInputState.isValid &&
        passwordInputState.isValid &&
        emailInputState.isValid
      )
    ) {
      return;
    }

    console.log("form is valid");

    // send data to server

    clearCart();

    toggleNotification({
      type: "success",
      message: "سفارش شما ثبت شد، زودی براتون میاریم",
    });

    navigate("/home");
  };

  return (
    <form className={styles.container} onSubmit={formSubmitHandler}>
      <h1 style={{ textAlign: "center" }}>
        مبلغ قابل پرداخت: {formatMoney(amount)}
      </h1>

      <Input
        label={"شماره کارت"}
        dir="ltr"
        type={"number"}
        className={styles.numberInput}
        {...cardNumberInputState.props}
      />
      <Input
        label={"CVV2"}
        required
        dir="ltr"
        type={"number"}
        style={{ width: "40%" }}
        className={styles.numberInput}
        {...cvv2InputState.props}
      />
      <h3 style={{ textAlign: "center" }}>تاریخ انقضا:</h3>
      <div className={styles.dateContainer}>
        <Input
          label={"ماه"}
          required
          dir="ltr"
          type={"number"}
          className={styles.numberInput}
          {...monthInputState.props}
        />
        <Input
          label={"سال"}
          required
          dir="ltr"
          type={"number"}
          className={styles.numberInput}
          {...yearInputState.props}
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
          {...passwordInputState.props}
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
      <Input
        label={"ایمیل شما: "}
        dir="ltr"
        type={"text"}
        displayInline
        {...emailInputState.props}
      />
      <Button
        color={"green"}
        fullWidthOnMobile
        style={{
          padding: "1rem 2rem",
          margin: "1 auto",
          marginTop: "1rem",
          display: "block",
        }}
        type={"submit"}
      >
        پرداخت
      </Button>
    </form>
  );
}
