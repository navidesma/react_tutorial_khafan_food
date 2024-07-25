import styles from "./Select.module.css";

export default function Select(props) {
  const { label, selectedValue, setValue, children } = props;

  const selectChangeHandler = (event) => {
    setValue(event.target.value);
  };

  return (
    <div {...props}>
      <label htmlFor={label}>{label}:</label>
      <select
        className={styles.select}
        id={label}
        value={selectedValue}
        onChange={selectChangeHandler}
      >
        {children}
      </select>
    </div>
  );
}
