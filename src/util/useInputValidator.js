import { useState } from "react";

function validate({ value, minLength, setErrorMessage, required }) {
  if (required && value === "") {
    setErrorMessage("این فیلد اجباری است");
    return false;
  }

  if (minLength && value.length > 0 && value.length < minLength) {
    setErrorMessage("تعداد کاراکتر ها حداقل باید" + minLength + " باشد");
    return false;
  }

  setErrorMessage("");

  return true;
}

export default function useInputValidator({
  required = true,
  minLength,
  maxLength,
} = {}) {
  const [value, setValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [validateOnEachKeyPress, setValidateOnEachKeyPress] = useState(false);

  const onChange = (event) => {
    const newValue = event.target.value;

    if (validateOnEachKeyPress) {
      getIsValid();
    }

    if (maxLength && newValue.length > maxLength) {
      return;
    }

    setValue(event.target.value);
  };

  const onBlur = () => {
    if (!validateOnEachKeyPress) {
      setValidateOnEachKeyPress(true);
    }
    getIsValid();
  };

  const getIsValid = () => {
    return validate({
      value,
      minLength,
      setErrorMessage,
      required,
    });
  };

  return {
    getIsValid,
    value,
    setValue,
    props: {
      required,
      value,
      errorMessage,
      onBlur,
      onChange,
      error: !!errorMessage,
    },
  };
}
