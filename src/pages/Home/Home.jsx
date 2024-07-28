import styles from "./Home.module.css";
import Main from "../../components/Main/Main";
import FoodCard from "../../components/FoodCard/FoodCard";
import { foods } from "../../foods";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import { useContext } from "react";
import { AppContext, UserTypeEnum } from "../../appContext";

export default function Home() {
    const { userInfo } = useContext(AppContext);

    const isRestaurantOwner = userInfo.type === UserTypeEnum.RESTAURANT_OWNER;

    return (
        <Main>
            {isRestaurantOwner && (
                <>
                    <Link
                        to={"/restaurant/food"}
                        style={{ display: "block", margin: "0.5rem auto" }}
                    >
                        <Button color={"green"}>تعریف غذای جدید</Button>
                    </Link>
                    <Link to={"/restaurant"} style={{ display: "block", margin: "0.5rem auto" }}>
                        <Button>مدیریت رستوران</Button>
                    </Link>
                </>
            )}
            {/* <div className={styles.foodCardList}>
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
      </div> */}
        </Main>
    );
}
