import { useState, createContext, useEffect } from "react";

export const AppContext = createContext(null);

export default function AppContextProvider({ children }) {
  const [cart, setCart] = useState([]);

  const [notification, setNotification] = useState(null);

  const [token, setToken] = useState(localStorage.getItem("token"));

  const isSingedIn = !!token;

  const [userInfo, setUserInfo] = useState(
    localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null
  );

  useEffect(() => {
    if (notification) {
      const notificationTimeout = setTimeout(() => {
        setNotification(null);
      }, 5000);

      return () => clearTimeout(notificationTimeout);
    }
  }, [notification]);

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

  const toggleNotification = ({ type, message }) => {
    setNotification({ type, message });
  };

  const clearCart = () => {
    setCart([]);
  };

  const signIn = (token, userInfo) => {
    setToken(token);
    localStorage.setItem("token", token);

    setUserInfo(userInfo);
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
  };

  const clearAuth = () => {
    setToken(null);

    localStorage.clear();
  };

  return (
    <AppContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        toggleNotification,
        notification,
        isSingedIn,
        token,
        signIn,
        userInfo,
        clearAuth,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
