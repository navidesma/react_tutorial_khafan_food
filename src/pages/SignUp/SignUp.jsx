import styles from "./SignUp.module.css";
import logo from "../../resources/images/logo.png";
import Input from "../../components/Input/Input";
import useInputValidator from "../../util/useInputValidator";
import Select from "../../components/Select/Select";
import SelectOption from "../../components/Select/SelectOption";
import Button from "../../components/Button/Button";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useSendRequest from "../../util/useSendRequest";
import { UserTypeEnum } from "../../appContext";

export default function SignUp() {
    const sendRequest = useSendRequest();
    const navigate = useNavigate();
    const usernameInputState = useInputValidator();
    const nameInputState = useInputValidator();
    const lastNameInputState = useInputValidator();
    const mobileInputState = useInputValidator({ minLength: 11, maxLength: 11 });
    const passwordInputState = useInputValidator({ minLength: 8 });

    const [selectedUserType, setSelectedUserType] = useState(UserTypeEnum.NORMAL_USER);

    const formSubmitHandler = (event) => {
        event.preventDefault();

        if (
            !(
                usernameInputState.getIsValid() &&
                nameInputState.getIsValid() &&
                lastNameInputState.getIsValid() &&
                mobileInputState.getIsValid() &&
                passwordInputState.getIsValid()
            )
        ) {
            return;
        }

        const body = {
            username: usernameInputState.value,
            password: passwordInputState.value,
            first_name: nameInputState.value,
            last_name: lastNameInputState.value,
            type: selectedUserType,
            mobile: mobileInputState.value,
        };

        const send = async () => {
            const response = await sendRequest("user/create/", {
                body,
                options: { method: "POST" },
            });

            if (response.isOk) {
                navigate("/sign-in");
            }
        };

        send();
    };

    return (
        <form className={styles.container} onSubmit={formSubmitHandler}>
            <h1 style={{ textAlign: "center" }}>ثبت نام</h1>
            <img src={logo} alt='' className={styles.image} />
            <Input
                label={"نام کاربری"}
                {...usernameInputState.props}
                dir={"ltr"}
                style={{ paddingLeft: "1rem" }}
            />
            <Input label={"نام"} {...nameInputState.props} />
            <Input label={"نام خانوادگی"} {...lastNameInputState.props} />
            <Input
                label={"شماره تلفن"}
                {...mobileInputState.props}
                type='number'
                dir={"ltr"}
                className={"numberInput"}
            />
            <Input
                label={"رمز عبور"}
                {...passwordInputState.props}
                dir={"ltr"}
                type='password'
                style={{ paddingLeft: "1rem" }}
            />
            <Select
                label={"نوع کاربر"}
                selectedValue={selectedUserType}
                setValue={setSelectedUserType}
                style={{ marginBottom: "1rem" }}
            >
                <SelectOption value={UserTypeEnum.NORMAL_USER}>کاربر عادی</SelectOption>
                <SelectOption value={UserTypeEnum.RESTAURANT_OWNER}>کاربر رستوران</SelectOption>
            </Select>
            <Button
                type={"submit"}
                color={"green"}
                fullWidthOnMobile
                style={{ padding: "1rem 2rem", margin: "0 auto", display: "block" }}
            >
                ثبت نام
            </Button>

            <Link to={"/sign-in"} className={styles.linkElement}>
                حساب کاربری دارید؟ وارد حساب خود شوید
            </Link>
        </form>
    );
}
