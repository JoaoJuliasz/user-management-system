import { Button, Flex } from "antd";
import { UserList } from "./UserList";

import style from "./userListWrapper.module.css";
import { useDrawer } from "../../../hooks";
import { UserInfoDrawer } from "./UserInfoDrawer";
import { PlusOutlined } from "@ant-design/icons";

export const UserListWrapper = () => {
  const { open, onClose, onOpen } = useDrawer();

  return (
    <Flex vertical={true} gap={8} className={style.wrapper}>
      <UserInfoDrawer
        title="Create user"
        onClose={onClose}
        isCreate
        open={open}
      />
      <Button
        onClick={onOpen}
        style={{ alignSelf: "end" }}
        iconPosition="end"
        icon={<PlusOutlined />}
        color="primary"
        variant="solid"
        data-testid="create-user"
      >
        New
      </Button>
      <UserList />
    </Flex>
  );
};
