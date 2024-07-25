import styles from "./Select.module.css";

export default function SelectOption({ value, children }) {
  return (
    <option value={value} className={styles.option}>
      {children}
    </option>
  );
}
