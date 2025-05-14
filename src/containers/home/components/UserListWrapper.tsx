import { Button, Flex } from "antd";
import { UserList } from "./UserList";

import style from "./userListWrapper.module.css";
import { useDrawer } from "../../../hooks";
import { UserInfoDrawer } from "./UserInfoDrawer";

export const UserListWrapper = () => {
  const { open, onClose, onOpen } = useDrawer();

  return (
    <Flex vertical={true} gap={6} className={style.wrapper}>
      {open && <UserInfoDrawer title="Create user" onClose={onClose} isCreate />}
      <Button onClick={onOpen} style={{ alignSelf: "end" }}>New</Button>
      <UserList />
    </Flex>
  );
};
