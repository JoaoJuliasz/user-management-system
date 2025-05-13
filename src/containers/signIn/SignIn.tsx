import { useState } from "react";
import { Flex } from "antd";
import { LabelInput, AuthenticationWrapper } from "../../components";

import style from "./signIn.module.css";
import { useAuthenticateUser, useHomeRedirect } from "../../hooks";

export const SignIn = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { authenticateUser, toast } = useAuthenticateUser();

  useHomeRedirect();

  const handleClick = async () => {
    authenticateUser(email, password, "sign-in");
  };
  return (
    <AuthenticationWrapper
      btnText="Sign in"
      title="Login"
      onClick={handleClick}
      isSignIn={true}
    >
      {toast}
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
