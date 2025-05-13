import { Flex, notification } from "antd";
import { AuthenticationWrapper, LabelInput } from "../../components";
import { useState } from "react";

import style from "./signUp.module.css";
import { instance } from "../../instance";
import { useNavigate } from "react-router";
import { setUserStorageInformation } from "../../utils";
import type { UserAuthenticationResponse } from "../../types";

export const SignUp = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [api, contextHolder] = notification.useNotification();

  const navigate = useNavigate();

  const openToast = (message: string) => {
    api.open({
      type: "error",
      message: "Error",
      description: message,
    });
  };

  const handleClick = async () => {
    if (password !== confirmPassword) {
      openToast("Passwords are different");
      return
    }
    try {
      const { data } = await instance.post<UserAuthenticationResponse>("register", {
        email,
        password,
      });
      data.id && setUserStorageInformation(data.token, data.id)
      navigate("/");
    } catch (error: any) {
      console.error(error.response.data.error);
      openToast(error.response.data.error);
    }
  };

  return (
    <AuthenticationWrapper
      btnText="Sign up"
      title="Sign Up"
      onClick={handleClick}
    >
      {contextHolder}
      <Flex vertical={true} gap={6} className={style.wrapper}>
        <LabelInput label="Email" inputValue={email} setInputValue={setEmail} />
        <LabelInput
          label="New Password"
          inputValue={password}
          setInputValue={setPassword}
          type="password"
        />
        <LabelInput
          label="Confirm Password"
          inputValue={confirmPassword}
          setInputValue={setConfirmPassword}
          type="password"
        />
      </Flex>
    </AuthenticationWrapper>
  );
};
