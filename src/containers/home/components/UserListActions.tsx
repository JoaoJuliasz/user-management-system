import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Flex } from "antd";
import { useDrawer } from "../../../hooks";
import { UserInfoDrawer } from "./UserInfoDrawer";
import type { User } from "../../../types";

type UserListActionsProps = {
  userInfo: User;
  index: number;
};

export const UserListActions = ({ userInfo, index }: UserListActionsProps) => {
  const { open, onClose, onOpen } = useDrawer();

  return (
    <Flex gap={4}>
      {open && (
        <UserInfoDrawer
          title="Update user"
          onClose={onClose}
          userInfo={userInfo}
          index={index}
        />
      )}
      <Button onClick={onOpen}>
        <EditOutlined />
      </Button>
      <Button>
        <DeleteOutlined color="#E53E3E" />
      </Button>
    </Flex>
  );
};
