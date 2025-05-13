import { Flex } from "antd";
import { AuthenticationWrapper, LabelInput } from "../../components";
import { useState } from "react";

import style from "./signUp.module.css";
import { useAuthenticateUser, useHomeRedirect } from "../../hooks";

export const SignUp = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const { authenticateUser, openToast, toast } = useAuthenticateUser();

  useHomeRedirect();

  const handleClick = () => {
    if (password !== confirmPassword) {
      openToast("Passwords are different");
      return;
    }
    authenticateUser(email, password, "sign-up");
  };

  return (
    <AuthenticationWrapper
      btnText="Sign up"
      title="Sign Up"
      onClick={handleClick}
    >
      {toast}
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
