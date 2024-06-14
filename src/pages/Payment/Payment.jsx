import Input from "../../components/Input/Input";
import styles from "./Payment.module.css";
import Button from "../../components/Button/Button";
import { useEffect, useState } from "react";

function validate({ value, minLength, setErrorMessage, required }) {
  if (required && value === "") {
    setErrorMessage("این فیلد اجباری است");
    return;
  }

  if (minLength && value.length < minLength) {
    setErrorMessage("تعداد کاراکتر ها حداقل باید" + minLength + " باشد");
    return;
  }

  setErrorMessage("");
}

export default function Payment() {
  const [value, setValue] = useState("");

  const maxLength = 16;
  const minLength = 16;

  const required = true;

  const [errorMessage, setErrorMessage] = useState("");

  const [count, setCount] = useState(0);

  const [validateOnEachKeyPress, setValidateOnEachKeyPress] = useState(false);

  const onChangeHandler = (event) => {
    const newValue = event.target.value;

    if (validateOnEachKeyPress) {
      validate({ value: newValue, minLength, required, setErrorMessage });
    }

    if (maxLength && newValue.length > maxLength) {
      return;
    }

    setValue(event.target.value);
  };

  const onBlurHandler = () => {
    if (!validateOnEachKeyPress) {
      setValidateOnEachKeyPress(true);
    }
    validate({ value, minLength, required, setErrorMessage });
  };

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
        required={required}
        dir="ltr"
        type={"number"}
        className={styles.numberInput}
        value={value}
        onChange={onChangeHandler}
        onBlur={onBlurHandler}
        error={errorMessage !== ""}
        errorMessage={errorMessage}
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
      <Input label={"ایمیل شما: "} dir="ltr" type={"text"} displayInline />
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
