import { Button, Flex, Typography } from "antd";

import type { PropsWithChildren } from "react";

import style from "./authenticationWrapper.module.css";
import { Link } from "react-router";

const { Text } = Typography;

type AuthenticationWrapperProps = PropsWithChildren<{
  title: string;
  btnText: string;
  loading: boolean;
  isSignIn?: boolean;
  onClick: () => void;
}>;

export const AuthenticationWrapper = ({
  btnText,
  title,
  isSignIn,
  loading,
  children,
  onClick,
}: AuthenticationWrapperProps) => {
  return (
    <Flex className={style.container} vertical={true} gap={12} align="center">
      <Text className={style.text}>{title}</Text>
      {children}
      <Button
        className={style.button}
        type="primary"
        onClick={onClick}
        loading={loading}
      >
        {btnText}
      </Button>
      {isSignIn ? (
        <Flex gap={4} align="center">
          <Text>Don't have an account?</Text>
          <Link className={style.link} to="/sign-up">
            Sign up
          </Link>
        </Flex>
      ) : (
        <Flex gap={4} align="center">
          <Text>Already have an account?</Text>
          <Link className={style.link} to="/sign-in">
            Sign in
          </Link>
        </Flex>
      )}
    </Flex>
  );
};
