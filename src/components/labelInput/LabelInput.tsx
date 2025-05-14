import { Flex, Typography, type InputProps } from "antd";
import { SysInput } from "..";

import style from "./labelInput.module.css";

const { Text } = Typography;

type LabelInputProps = {
  label: string;
} & InputProps;

export const LabelInput = ({ label, ...props }: LabelInputProps) => {
  return (
    <Flex vertical={true} gap={4} align="start" className={style.container}>
      <Text className={style.text}>{label}</Text>
      <SysInput {...props} />
    </Flex>
  );
};
