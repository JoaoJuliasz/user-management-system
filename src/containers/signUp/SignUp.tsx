import { Flex } from "antd";
import { AuthenticationWrapper, LabelInput } from "../../components";
import { useState, type ChangeEvent } from "react";

import style from "./signUp.module.css";
import { useAuthenticateUser, useHomeRedirect } from "../../hooks";

export const SignUp = () => {
  const [form, setForm] = useState<{
    email: string;
    password: string;
    confirmPassword: string;
  }>({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { authenticateUser, openToast, loading, toast } = useAuthenticateUser();

  useHomeRedirect();

  const handleClick = () => {
    const { confirmPassword, email, password } = form;
    if (password !== confirmPassword) {
      openToast("Passwords are different");
      return;
    }
    authenticateUser(email, password, "sign-up");
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <AuthenticationWrapper
      btnText="Sign up"
      title="Sign Up"
      onClick={handleClick}
      loading={loading}
    >
      {toast}
      <Flex vertical={true} gap={6} className={style.wrapper}>
        <LabelInput
          value={form.email}
          onChange={handleChange}
          label="Email"
          name="email"
          id="email-input"
          data-testid="email-input"
        />
        <LabelInput
          value={form.password}
          onChange={handleChange}
          label="Password"
          name="password"
          type="password"
          data-testid="password-input"
        />
        <LabelInput
          value={form.confirmPassword}
          onChange={handleChange}
          label="Password"
          name="confirmPassword"
          type="password"
          data-testid="new-password-input"
        />
      </Flex>
    </AuthenticationWrapper>
  );
};
