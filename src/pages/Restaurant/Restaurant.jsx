import { Link } from "react-router-dom";
import Main from "../../components/Main/Main";
import Button from "../../components/Button/Button";
import AddressComponent from "../../components/AddressComponent/AddressComponent";
import { useEffect, useState } from "react";
import useSendRequest from "../../util/useSendRequest";

export default function Restaurant() {
    const sendRequest = useSendRequest();
    const [restaurant, setRestaurant] = useState();
    const [address, setAddress] = useState();

    useEffect(() => {
        const send = async () => {
            const response = await sendRequest("food/restaurant/");

            if (response.isOk) {
                setRestaurant(response.data);
                if (response.data.address) {
                    const addressResponse = await sendRequest(`food/address/${response.data.address}/`);
                    if (addressResponse.isOk) {
                        setAddress(addressResponse.data);
                    }
                }
            }
        };

        send();
    }, []);

    if (!restaurant) {
        return <></>;
    }

    return (
        <Main>
            <Link to={"/restaurant/edit-restaurant"}>
                <Button>ویرایش اطلاعات رستوران</Button>
            </Link>
            {restaurant.is_creation_completed ? (
                <div>
                    <h1>نام رستوران: {restaurant.name}</h1>
                    <h2>آدرس:</h2>
                    {address && <AddressComponent address={address} />}
                </div>
            ) : (
                <h1>اطلاعات رستوران کامل نشده است، در بخش ویرایش رستوران آنرا کامل کنید. </h1>
            )}
        </Main>
    );
}
