import styles from "./Navbar.module.css";
import logo from "../../resources/images/logo.png";

import Button from "../Button/Button";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <h1 style={{ marginTop: "0.8rem", marginRight: "1rem" }}>خفن فود</h1>
        <img src={logo} alt="logo" style={{ width: "70px", height: "70px" }} />
        <div style={{ display: "flex", marginLeft: "1rem" }}>
          <div style={{ display: "flex", marginLeft: "1rem" }}>
            <Button
              size="small"
              variant="outlined"
              style={{ margin: "0.7rem" }}
            >
              سبد خرید
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
