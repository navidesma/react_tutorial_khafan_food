import Home from "./pages/Home/Home";
import { Routes, Route } from "react-router-dom";
import ShoppingCart from "./pages/ShoppingCart/ShoppingCart";
import NotFound from "./pages/NotFound/NotFound";
import Payment from "./pages/Payment/Payment";
import Notification from "./components/Notification/Notification";
import { useContext } from "react";
import { AppContext } from "./appContext";

function App() {
  const { notification } = useContext(AppContext);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="shopping-cart" element={<ShoppingCart />} />
        <Route path="payment" element={<Payment />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {notification && (
        <Notification message={notification.message} type={notification.type} />
      )}
    </>
  );
}

export default App;
