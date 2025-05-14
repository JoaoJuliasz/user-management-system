import { Button, Drawer, Flex } from "antd";
import type { User } from "../../../types";
import { useEffect, useState, type ChangeEvent } from "react";
import { LabelInput } from "../../../components";
import { useUserActions } from "../../../hooks";

type UserInfoDrawerProps = {
  title: string;
  open: boolean;
  userInfo?: User;
  isCreate?: boolean;
  index?: number;
  onClose: () => void;
};

export const UserInfoDrawer = ({
  title,
  open,
  userInfo,
  isCreate,
  index,
  onClose,
}: UserInfoDrawerProps) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User>({
    avatar: "",
    email: "",
    first_name: "",
    last_name: "",
  });

  const { contextHolder, createUser, fetchAction, updateUser } = useUserActions(
    isCreate,
    index
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const { data } = await fetchAction(user);
      if (isCreate) {
        createUser(data);
      } else {
        updateUser(data);
      }
      onClose();
    } catch (error) {
      console.error({ error });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open && !user.first_name && userInfo) {
      setUser(userInfo);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo, open]);

  return (
    <>
      {contextHolder}
      <Drawer
        title={title}
        closable={{ "aria-label": "Close Button" }}
        onClose={onClose}
        open={open}
        size="large"
      >
        <Flex vertical justify="space-between" style={{ height: "100%" }}>
          <Flex vertical gap={12}>
            <LabelInput
              label="Email"
              value={user.email}
              name="email"
              onChange={handleChange}
            />
            <LabelInput
              label="First Name"
              value={user.first_name}
              name="first_name"
              onChange={handleChange}
            />
            <LabelInput
              label="Last Name"
              value={user.last_name}
              name="last_name"
              onChange={handleChange}
            />
          </Flex>
          <Flex gap={6} style={{ alignSelf: "end" }}>
            <Button onClick={onClose} color="default" variant="filled">
              Cancel
            </Button>
            <Button
              disabled={!user.email || !user.first_name || !user.last_name}
              loading={loading}
              onClick={handleSubmit}
              color="primary"
              variant="filled"
            >
              {isCreate ? "Create" : "Save"}
            </Button>
          </Flex>
        </Flex>
      </Drawer>
    </>
  );
};
