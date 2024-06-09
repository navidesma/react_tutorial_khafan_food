import { useState, createContext } from "react";

export const AppContext = createContext(null);

export default function AppContextProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (id) => {
    setCart((prevState) => {
      const newState = JSON.parse(JSON.stringify(prevState));

      const cartItem = newState.find((cart) => cart.id === id);

      if (!cartItem) {
        newState.push({ id: id, count: 1 });
      } else {
        cartItem.count = cartItem.count + 1;
      }

      return newState;
    });
  };

  const removeFromCart = (id) => {
    setCart((prevState) => {
      const newState = JSON.parse(JSON.stringify(prevState));

      const cartItem = newState.find((cart) => cart.id === id);

      if (cartItem.count === 1) {
        const filtered = newState.filter((cart) => cart.id !== id);

        return filtered;
      } else {
        cartItem.count = cartItem.count - 1;

        return newState;
      }
    });
  };

  return (
    <AppContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </AppContext.Provider>
  );
}
