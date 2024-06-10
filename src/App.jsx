import Home from "./pages/Home/Home";
import { Routes, Route } from "react-router-dom";
import ShoppingCart from "./pages/ShoppingCart/ShoppingCart";
import NotFound from "./pages/NotFound/NotFound";
import Payment from "./pages/Payment/Payment";

function App() {
  return (
    <>
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="shopping-cart" element={<ShoppingCart />} />
        <Route path="payment" element={<Payment />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
