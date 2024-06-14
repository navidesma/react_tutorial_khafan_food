import styles from "./Input.module.css";
import PropTypes from "prop-types";

export default function Input(props) {
  const {
    label,
    displayInline,
    error,
    errorMessage,
    className,
    type,
    required,
    dir,
    style,
  } = props;
  return (
    <div
      className={styles.inputContainer}
      style={{ display: displayInline ? "inline" : "block" }}
    >
      <label htmlFor={label} className={styles.label}>
        {label}
      </label>
      <br />
      <input
        style={style}
        dir={dir}
        required={required}
        type={type}
        id={label}
        className={
          styles.input +
          " " +
          (className || "") +
          " " +
          (error ? styles.error : "")
        }
      />
      {error && (
        <span className={styles.errorMessage}>
          {errorMessage || "مقدار صحیح وارد کنید"}
        </span>
      )}
    </div>
  );
}

Input.propTypes = {
  label: PropTypes.string.isRequired,
  displayInline: PropTypes.bool,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.string.isRequired,
  required: PropTypes.bool,
  dir: PropTypes.string,
  style: PropTypes.object,
};
