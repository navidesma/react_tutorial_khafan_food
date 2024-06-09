import styles from "./Navbar.module.css";
import logo from "../../resources/images/logo.png";
import Button from "../Button/Button";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../appContext";

export default function Navbar() {
  const { cart } = useContext(AppContext);

  let count = 0;

  cart.forEach((item) => {
    count += item.count;
  });

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <Link to="/home">
          <h1 style={{ marginTop: "0.8rem", marginRight: "1rem" }}>خفن فود</h1>
        </Link>
        <img src={logo} alt="logo" style={{ width: "70px", height: "70px" }} />
        <div style={{ display: "flex", marginLeft: "1rem" }}>
          <Link to="/shopping-cart" style={{ margin: "0.5rem" }}>
            <Button
              size="small"
              variant="outlined"
              style={{ margin: "0.7rem" }}
            >
              سبد خرید
              {count > 0 && (
                <span
                  style={{
                    color: "white",
                    backgroundColor: "red",
                    borderRadius: "50%",
                    padding: "0.2rem",
                  }}
                >
                  {count}
                </span>
              )}
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
