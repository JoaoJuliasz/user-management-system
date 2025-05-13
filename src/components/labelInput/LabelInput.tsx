import { Flex, Typography, type InputProps } from "antd";
import { SysInput } from "..";
import type { ChangeEvent, Dispatch, SetStateAction } from "react";

import style from "./labelInput.module.css";

const { Text } = Typography;

type LabelInputProps = {
  label: string;
  inputValue: string;
  setInputValue: Dispatch<SetStateAction<string>>;
} & InputProps;

export const LabelInput = ({
  label,
  inputValue,
  setInputValue,
  ...props
}: LabelInputProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
  };

  return (
    <Flex vertical={true} gap={4} align="start" className={style.container}>
      <Text className={style.text}>{label}</Text>
      <SysInput value={inputValue} onChange={handleChange} {...props} />
    </Flex>
  );
};
