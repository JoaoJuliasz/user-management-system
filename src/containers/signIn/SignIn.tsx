import { useState, type ChangeEvent } from "react";
import { Flex } from "antd";
import { LabelInput, AuthenticationWrapper } from "../../components";

import style from "./signIn.module.css";
import { useAuthenticateUser, useHomeRedirect } from "../../hooks";

export const SignIn = () => {
  const [form, setForm] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });

  const { authenticateUser, toast } = useAuthenticateUser();

  useHomeRedirect();

  const handleClick = async () => {
    const { email, password } = form;
    authenticateUser(email, password, "sign-in");
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
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
        <LabelInput
          value={form.email}
          onChange={handleChange}
          label="Email"
          name="email"
        />
        <LabelInput
          value={form.password}
          onChange={handleChange}
          label="Password"
          name="password"
          type="password"
        />
      </Flex>
    </AuthenticationWrapper>
  );
};
