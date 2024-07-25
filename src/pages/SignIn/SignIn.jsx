import styles from "../SignUp/SignUp.module.css";
import logo from "../../resources/images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import useInputValidator from "../../util/useInputValidator";
import useSendRequest from "../../util/useSendRequest";
import { useContext } from "react";
import { AppContext } from "../../appContext";

export default function SignIn() {
  const { signIn } = useContext(AppContext);

  const navigate = useNavigate();

  const sendRequest = useSendRequest();
  const usernameInputState = useInputValidator();
  const passwordInputState = useInputValidator({ minLength: 8 });

  const formSubmitHandler = (event) => {
    event.preventDefault();

    if (!(usernameInputState.getIsValid() && passwordInputState.getIsValid())) {
      return;
    }

    const body = {
      username: usernameInputState.value,
      password: passwordInputState.value,
    };

    const send = async () => {
      const loginResponse = await sendRequest("token/", {
        body,
        options: { method: "POST" },
      });

      if (loginResponse.isOk) {
        const userResponse = await sendRequest("user/get-my-profile/", {
          forceToken: loginResponse.data.access,
        });

        if (userResponse.isOk) {
          signIn(loginResponse.data.access, {
            type: userResponse.data.type,
            full_name: userResponse.data.full_name,
          });
          navigate("/home");
        }
      }
    };

    send();
  };

  return (
    <form className={styles.container} onSubmit={formSubmitHandler}>
      <h1 style={{ textAlign: "center" }}>ورود</h1>
      <img src={logo} alt="" className={styles.image} />
      <Input
        label={"نام کاربری"}
        {...usernameInputState.props}
        dir={"ltr"}
        style={{ paddingLeft: "1rem" }}
      />
      <Input
        label={"رمز عبور"}
        {...passwordInputState.props}
        dir={"ltr"}
        type="password"
        style={{ paddingLeft: "1rem" }}
      />
      <Button
        type={"submit"}
        color={"green"}
        fullWidthOnMobile
        style={{ padding: "1rem 2rem", margin: "0 auto", display: "block" }}
      >
        ورود
      </Button>

      <Link to={"/sign-up"} className={styles.linkElement}>
        حساب کاربری ندارید؟ حساب جدید بسازید
      </Link>
    </form>
  );
}
