import styles from "./ShoppingCart.module.css";

import Main from "../../components/Main/Main";
import { formatMoney } from "../../util/formatMoney";
import OrderCard from "./components/OrderCard/OrderCard";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../appContext";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Select from "../../components/Select/Select";
import SelectOption from "../../components/Select/SelectOption";
import AddressComponent from "../../components/AddressComponent/AddressComponent";
import useSendRequest from "../../util/useSendRequest";
import useError from "../../util/useError";

export default function ShoppingCart() {
    const sendRequest = useSendRequest();
    const navigate = useNavigate();
    const { cart, clearCart } = useContext(AppContext);

    const [addresses, setAddresses] = useState();
    const [selectedAddress, setSelectedAddress] = useState();

    const [addressError, setAddressError] = useError();

    useEffect(() => {
        const send = async () => {
            const response = await sendRequest("food/address/");
            if (response.isOk) {
                setAddresses(response.data);
            }
        };

        send();
    }, []);

    let totalItemCount = 0;
    let totalCostFromStart = 0;
    cart.forEach((cartItem) => {
        totalCostFromStart += cartItem.item.price * cartItem.count;
        totalItemCount += cartItem.count;
    });

    const totalCostFinal = totalCostFromStart + 15000;

    const submitOrder = () => {
        if (!selectedAddress) {
            setAddressError(true);
            return;
        }

        const body = {
            order_items: cart.map((cartItem) => ({
                food: cartItem.item.id,
                count: cartItem.count,
            })),
            address: +selectedAddress,
        };

        const send = async () => {
            const response = await sendRequest("food/order/submit/", {
                body,
                options: { method: "POST" },
            });

            if (response.isOk) {
                clearCart();
                navigate("/home");
            }
        };

        send();
    };

    if (cart.length === 0) {
        return (
            <Main>
                <h1 style={{ textAlign: "center" }}>سبد خرید شما خالی است</h1>
            </Main>
        );
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
            <div>
                {cart.map((cartItem) => (
                    <OrderCard count={cartItem.count} item={cartItem.item} />
                ))}
            </div>

            <div className={styles.totalCost}>
                <div>
                    <h3>جمع سفارش:</h3>
                    <h3>{formatMoney(totalCostFromStart)}</h3>
                    <h3>هزینه پیک:</h3>
                    <h3>{formatMoney(15000)}</h3>
                </div>
                <div>
                    <h3>قابل پرداخت:</h3>
                    <h3>{formatMoney(totalCostFinal)}</h3>
                </div>
                <div>
                    <h3>تعداد اقلام</h3>
                    <h3>{totalItemCount + " عدد"}</h3>
                </div>
            </div>
            {selectedAddress && (
                <AddressComponent
                    address={addresses.find((address) => address.id === +selectedAddress)}
                />
            )}
            <Select
                label={"آدرس"}
                selectedValue={selectedAddress}
                setValue={setSelectedAddress}
                style={{ marginTop: "1rem" }}
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
                onClick={submitOrder}
                fullWidthOnMobile
                style={{ display: "block", padding: "1rem 3rem", marginTop: "1rem" }}
            >
                ثبت سفارش
            </Button>
            {/* <Link to={`/payment?amount=${totalCostFinal}`}>
                <Button
                    type={"button"}
                    color={"green"}
                    fullWidthOnMobile
                    style={{ display: "block", padding: "1rem 3rem", marginTop: "1rem" }}
                >
                    پرداخت
                </Button>
            </Link> */}
        </Main>
    );
}
