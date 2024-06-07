import Home from "./pages/Home/Home";
import { Routes, Route } from "react-router-dom";
import ShoppingCart from "./pages/ShoppingCart/ShoppingCart";

function App() {
  return <>
    <Routes>
      <Route path="home" element={<Home/>} />
      <Route path="shopping-cart" element={<ShoppingCart/>} />
    </Routes>
  </>;
}

export default App;
