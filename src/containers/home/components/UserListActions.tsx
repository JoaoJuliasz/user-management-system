import { DeleteFilled, DeleteTwoTone, EditFilled, EditTwoTone } from "@ant-design/icons";
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
      <Button
        color="primary"
        onClick={onOpen}
        icon={<EditFilled />}
        variant="text"
        data-testid={`edit-user-${index}`}
      />
      <Popconfirm
        title="Delete user"
        description="Are you sure to delete this user?"
        onConfirm={removeUser}
        okText="Yes"
        cancelText="No"
      >
        <Button
          color="danger"
          icon={<DeleteFilled />}
          variant="text"
          data-testid={`remove-user-${index}`}
        />
      </Popconfirm>
    </Flex>
  );
};
