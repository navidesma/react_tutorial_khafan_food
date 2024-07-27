import styles from "./Input.module.css";

export default function TextArea(props) {
    return (
        <div
            className={styles.inputContainer}
            style={{ display: props.displayInline ? "inline" : "block" }}
        >
            <label htmlFor={props.label} className={styles.label}>
                {props.label}
            </label>
            <br />
            <textarea
                {...props}
                className={
                    styles.input +
                    " " +
                    (props.className || "") +
                    " " +
                    (props.error ? styles.error : "")
                }
                id={props.label}
            />
            {props.error && (
                <span className={styles.errorMessage}>
                    {props.errorMessage || "مقدار درست وارد کنید"}
                </span>
            )}
        </div>
    );
}
