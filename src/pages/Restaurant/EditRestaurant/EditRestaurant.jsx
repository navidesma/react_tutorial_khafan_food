import styles from "./EditRestaurant.module.css";
import Main from "../../../components/Main/Main";
import { useEffect, useState } from "react";
import useSendRequest from "../../../util/useSendRequest";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../../components/Button/Button";
import Input from "../../../components/Input/Input";
import Select from "../../../components/Select/Select";
import SelectOption from "../../../components/Select/SelectOption";
import useInputValidator from "../../../util/useInputValidator";
import useError from "../../../util/useError";

export default function EditRestaurant() {
    const navigate = useNavigate();
    const sendRequest = useSendRequest();
    const [restaurant, setRestaurant] = useState();
    const [addresses, setAddresses] = useState();

    const nameInputState = useInputValidator();
    const [selectedAddress, setSelectedAddress] = useState();

    const [addressError, setAddressError] = useError();

    useEffect(() => {
        const send = async () => {
            const restaurantResponse = await sendRequest("food/restaurant/");

            const addressesResponse = await sendRequest("food/address/");

            if (restaurantResponse.isOk && addressesResponse.isOk) {
                setRestaurant(restaurantResponse.data);
                if (restaurantResponse.data.name) {
                    nameInputState.setValue(restaurantResponse.data.name);
                }
                if (restaurantResponse.data.address) {
                    setSelectedAddress(restaurantResponse.data.address.toString());
                }
                setAddresses(addressesResponse.data);
            }
        };

        send();
    }, []);

    const formSubmitHandler = (event) => {
        event.preventDefault();

        if (!nameInputState.getIsValid()) return;

        if (!selectedAddress) {
            setAddressError(true);
            return;
        }

        const body = { name: nameInputState.value, address: +selectedAddress };

        const send = async () => {
            const response = await sendRequest("food/restaurant/", {
                body,
                options: { method: "PATCH" },
            });

            if (response.isOk) {
                navigate("/restaurant");
            }
        };

        send();
    };

    if (!restaurant) {
        return <></>;
    }

    if (!addresses || addresses.length === 0) {
        return (
            <Main>
                <div className={styles.noAddressContainer}>
                    <h1>هیچ آدرسی تعریف نشده، حداقل یک آدرس تعریف کنید</h1>
                    <Link to={"/addresses"}>
                        <Button>مدیریت آدرس ها</Button>
                    </Link>
                </div>
            </Main>
        );
    }

    return (
        <Main>
            <form className={styles.container} onSubmit={formSubmitHandler}>
                <Input label={"نام رستوران"} {...nameInputState.props} />
                <Select
                    label={"آدرس"}
                    selectedValue={selectedAddress}
                    setValue={setSelectedAddress}
                >
                    <SelectOption value={""}>------</SelectOption>
                    {addresses.map((address) => (
                        <SelectOption value={address.id} key={address.id}>
                            {address.title}
                        </SelectOption>
                    ))}
                </Select>

                {addressError && <p style={{ color: "red" }}>آدرس را مشخص کنید</p>}

                <Button
                    type={"submit"}
                    color={"green"}
                    fullWidthOnMobile
                    style={{ padding: "1rem 2rem", margin: "0 auto", display: "block" }}
                >
                    ویرایش
                </Button>
            </form>
        </Main>
    );
}
