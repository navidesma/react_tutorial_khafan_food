import { useState } from "react";
import styles from "./Home.module.css";
import Main from "../../components/Main/Main";
import FoodCard from "../../components/FoodCard/FoodCard";
import { foods } from "../../foods";

export default function Home() {
  const [cart, setCart] = useState([{ id: 1, count: 1 }]);

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
    <Main>
      <div className={styles.foodCardList}>
        {foods.map((food) => (
          <div className={styles.foodCardItem} key={food.id}>
            <FoodCard
              id={food.id}
              name={food.name}
              price={food.price}
              restaurant={food.restaurant}
              img={food.img}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
              cart={cart}
            />
          </div>
        ))}
      </div>
    </Main>
  );
}
