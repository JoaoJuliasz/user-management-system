import { Button, Flex } from "antd";
import { UserList } from "./UserList";

export const UserListWrapper = () => {
  return (
    <Flex vertical={true} gap={6}>
        <Button style={{alignSelf: 'end'}}>New</Button>
      <UserList />
    </Flex>
  );
};
