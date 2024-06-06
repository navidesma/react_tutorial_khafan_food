import styles from "./Navbar.module.css";
import logo from "../../resources/images/logo.png";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <h1 style={{ marginTop: "0.8rem", marginRight: "1rem" }}>خفن فود</h1>
        <img src={logo} alt="logo" style={{ width: "70px", height: "70px" }} />
        <div style={{ display: "flex", marginLeft: "1rem" }}>
          <button>سبد خرید</button>
        </div>
      </div>
    </nav>
  );
}
