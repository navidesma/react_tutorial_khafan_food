import styles from "./Home.module.css";
import Main from "../../components/Main/Main";
import FoodCard from "../../components/FoodCard/FoodCard";
import { foods } from "../../foods";

export default function Home() {
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
                        />
                    </div>
                ))}
            </div>
        </Main>
    );
}
