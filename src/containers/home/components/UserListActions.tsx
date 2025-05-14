import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Flex, Popconfirm } from "antd";
import { useDrawer, useUserActions } from "../../../hooks";
import { UserInfoDrawer } from "./UserInfoDrawer";
import type { User } from "../../../types";

type UserListActionsProps = {
  userInfo: User;
  index: number;
};

export const UserListActions = ({ userInfo, index }: UserListActionsProps) => {
  const { open, onClose, onOpen } = useDrawer();
  const { removeUser } = useUserActions(false, index);

  return (
    <Flex gap={4}>
      <UserInfoDrawer
        title="Update user"
        onClose={onClose}
        userInfo={userInfo}
        index={index}
        open={open}
      />
      <Button onClick={onOpen}>
        <EditOutlined />
      </Button>
      <Popconfirm
        title="Delete user"
        description="Are you sure to delete this user?"
        onConfirm={removeUser}
        okText="Yes"
        cancelText="No"
      >
        <Button danger>
          <DeleteOutlined color="#E53E3E" />
        </Button>
      </Popconfirm>
    </Flex>
  );
};
