import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import styles from "./Main.module.css";

export default function Main({ children }) {
    return (
        <>
            <Navbar />
            <main className={styles.main}>{children}</main>
            <Footer />
        </>
    );
}
