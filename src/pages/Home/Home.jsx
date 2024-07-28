import styles from "./Home.module.css";
import Main from "../../components/Main/Main";
import FoodCard from "../../components/FoodCard/FoodCard";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import { useContext, useEffect, useState } from "react";
import { AppContext, UserTypeEnum } from "../../appContext";
import useSendRequest from "../../util/useSendRequest";
import usePagination from "../../util/usePagination";
import Pagination from "../../components/Pagination/Pagination";

export default function Home() {
    const sendRequest = useSendRequest();
    const { userInfo } = useContext(AppContext);

    const isRestaurantOwner = userInfo.type === UserTypeEnum.RESTAURANT_OWNER;

    const { count, currentPage, setCount, setCurrentPage } = usePagination();

    const [foods, setFoods] = useState();

    useEffect(() => {
        const send = async () => {
            const response = await sendRequest(`food/list/?page=${currentPage}`);

            if (response.isOk) {
                setCount(response.data.count);
                setFoods(response.data.results);
            }
        };

        send();
    }, [currentPage]);

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
            <Link to={"/addresses"} style={{ display: "block", margin: "0.5rem auto" }}>
                <Button>مدیریت آدرس ها</Button>
            </Link>
            {foods && foods.length > 0 ? (
                <>
                    <div className={styles.foodCardList}>
                        {foods.map((food) => (
                            <div className={styles.foodCardItem} key={food.id}>
                                <FoodCard
                                    food={food} 
                                />
                            </div>
                        ))}
                    </div>
                    <Pagination
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        count={count}
                    />
                </>
            ) : (
                <h3>هیچ غذایی تعریف نشده</h3>
            )}
        </Main>
    );
}
