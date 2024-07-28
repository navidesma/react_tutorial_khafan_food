import styles from "./Home.module.css";
import Main from "../../components/Main/Main";
import FoodCard from "../../components/FoodCard/FoodCard";
import { foods } from "../../foods";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import { useContext, useEffect, useState } from "react";
import { AppContext, UserTypeEnum } from "../../appContext";
import useSendRequest from "../../util/useSendRequest";
import Pagination from "../../components/Pagination/Pagination";

export default function Home() {
    const sendRequest = useSendRequest();
    const { userInfo } = useContext(AppContext);

    const isRestaurantOwner = userInfo.type === UserTypeEnum.RESTAURANT_OWNER;

    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const send = async () => {
            const response = await sendRequest("food/list/?page=1");

            if (response.isOk) {
                console.log(response.data);
            }
        };

        send();
    }, []);

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
            <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} count={30} />
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
