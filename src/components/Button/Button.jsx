import styles from "./Button.module.css";

export default function Button(props) {
  const {
    style,
    className,
    size,
    variant,
    onClick,
    disabled,
    color,
    fullWidthOnMobile,
    children,
    type,
  } = props;

  return (
    <button
      className={
        styles.button +
        " " +
        (variant && variant === "outlined" ? styles.outlined : "") +
        " " +
        (fullWidthOnMobile ? styles.fullWidthOnMobile : "") +
        " " +
        className
      }
      disabled={disabled}
      onClick={onClick}
      type={type}
      style={{
        ...style,
        backgroundColor:
          color ||
          (style && style.backgroundColor ? style.backgroundColor : undefined),
        padding:
          (style && style.padding)
            ? style.padding
            : size === "normal"
            ? undefined
            : size === "small"
            ? "0.2rem 1rem"
            : size === "big"
            ? "1.5rem 3rem"
            : undefined,
      }}
    >
      {children}
    </button>
  );
}
