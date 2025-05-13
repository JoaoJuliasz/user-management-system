import { useEffect, useState } from "react";
import { getUserInformationFromStorage } from "../../utils";
import { useNavigate } from "react-router";
import { Flex, notification } from "antd";
import { LabelInput } from "../../components";

import style from "./signIn.module.css";
import { AuthenticationWrapper } from "../../components/authenticationWrapper";
import { instance } from "../../instance";

export const SignIn = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [api, contextHolder] = notification.useNotification();

  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      const { data } = await instance.post("login", {
        email,
        password,
      });
      localStorage.setItem("user_token", JSON.stringify(data.token));
      navigate("/");
    } catch (error: any) {
      console.error(error.response.data.error);
      api.open({
        type: "error",
        message: "Error",
        description: error.response.data.error,
      });
    }
  };

  useEffect(() => {
    const { token } = getUserInformationFromStorage();
    if (token) {
      navigate("/");
    }
  }, []);

  return (
    <AuthenticationWrapper
      btnText="Sign in"
      title="Login"
      onClick={handleClick}
      isSignIn={true}
    >
      {contextHolder}
      <Flex vertical={true} gap={6} className={style.wrapper}>
        <LabelInput label="Email" inputValue={email} setInputValue={setEmail} />
        <LabelInput
          label="Password"
          inputValue={password}
          setInputValue={setPassword}
          type="password"
        />
      </Flex>
    </AuthenticationWrapper>
  );
};
