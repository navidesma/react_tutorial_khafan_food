import { useEffect, useState } from "react";
import Main from "../../components/Main/Main";
import MapComponent, { initialPosition } from "../../components/MapComponent/MapComponent";
import styles from "../SignUp/SignUp.module.css";
import Input from "../../components/Input/Input";
import TextArea from "../../components/Input/TextArea";
import useInputValidator from "../../util/useInputValidator";
import Button from "../../components/Button/Button";
import useSendRequest from "../../util/useSendRequest";
import { useNavigate, useParams } from "react-router-dom";

export default function ManageAddress() {
    const sendRequest = useSendRequest();
    const navigate = useNavigate();
    const { addressId } = useParams();
    const [position, setPosition] = useState(initialPosition);
    const [address, setAddress] = useState();

    const [error, setError] = useState(false);

    const titleInputState = useInputValidator();
    const descriptionInputState = useInputValidator();
    const mobileInputState = useInputValidator({ minLength: 11, maxLength: 11 });

    useEffect(() => {
        if (!addressId) return;

        const send = async () => {
            const response = await sendRequest(`food/address/${addressId}/`);

            if (response.isOk) {
                setAddress(response.data);

                titleInputState.setValue(response.data.title);
                descriptionInputState.setValue(response.data.description);
                mobileInputState.setValue(response.data.mobile);
                setPosition({ lat: response.data.latitude, lng: response.data.longitude });
            }
        };

        send();
    }, [addressId]);

    useEffect(() => {
        if (error) {
            const setErrorToFalseTimeout = setTimeout(() => setError(false), 3000);

            return () => clearTimeout(setErrorToFalseTimeout);
        }
    }, [error]);

    const formSubmitHandler = (event) => {
        event.preventDefault();

        if (
            !(
                titleInputState.getIsValid() &&
                descriptionInputState.getIsValid() &&
                mobileInputState.getIsValid()
            )
        )
            return;

        if (position === initialPosition) {
            setError(true);
            return;
        }

        const body = {
            latitude: position.lat,
            longitude: position.lng,
            description: descriptionInputState.value,
            mobile: mobileInputState.value,
            title: titleInputState.value,
        };

        const send = async () => {
            const response = await sendRequest(
                address ? `food/address/${addressId}/` : "food/address/",
                {
                    body,
                    options: { method: address ? "PATCH" : "POST" },
                },
            );

            if (response.isOk) {
                navigate("/addresses");
            }
        };

        send();
    };

    return (
        <Main>
            <form className={styles.container} onSubmit={formSubmitHandler}>
                <MapComponent position={position} setPosition={setPosition} />
                <Input label={"عنوان آدرس"} {...titleInputState.props} />
                <TextArea label='توضیحات' {...descriptionInputState.props} rows={5} />
                <Input
                    label={"شماره موبایل"}
                    {...mobileInputState.props}
                    type={"number"}
                    dir={"ltr"}
                    className={"numberInput"}
                />
                {error && (
                    <p style={{ color: "red", fontWeight: "bold" }}>لطفا لوکیشن را مشخص نمایید</p>
                )}
                <Button
                    type={"submit"}
                    color={"green"}
                    fullWidthOnMobile
                    style={{ padding: "1rem 2rem", margin: "0 auto", display: "block" }}
                >
                   {address ? "ویرایش" : "ایجاد آدرس"}
                </Button>
            </form>
        </Main>
    );
}
