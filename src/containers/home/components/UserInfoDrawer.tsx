import { Button, Drawer, Flex } from "antd";
import type { User } from "../../../types";
import { useEffect, useState, type ChangeEvent } from "react";
import { LabelInput } from "../../../components";
import { instance } from "../../../instance";
import { useHomeContext } from "../context";

type UserInfoDrawerProps = {
  title: string;
  userInfo?: User;
  isCreate?: boolean;
  index?: number;
  onClose: () => void;
};

export const UserInfoDrawer = ({
  title,
  userInfo,
  isCreate,
  index,
  onClose,
}: UserInfoDrawerProps) => {
  const [user, setUser] = useState<User>({
    avatar: "",
    email: "",
    first_name: "",
    last_name: "",
  });

  const {
    tableData,
    setTableData,
    pagination,
    setPagination,
    setCachePagination,
  } = useHomeContext();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const fetchAction = () => {
    if (isCreate) {
      return instance.post<User>("users", { ...user });
    }
    return instance.put<User>(`users/${user.id}`, { ...user });
  };

  const updateUser = (data: User) => {
    setTableData((prev) => {
      const updated = [...prev];
      if (index !== undefined) {
        updated[index] = data;
      }
      return updated;
    });
    setCachePagination((prev) => {
      const updated = { ...prev };
      if (index !== undefined && pagination) {
        updated[pagination.page][index] = data;
      }
      return updated;
    });
  };

  const createUser = (data: User) => {
    setTableData((prev) => {
      if (prev.length === 6) {
        return [data];
      }
      return [...prev, data];
    });
    setCachePagination((prev) => {
      const updated = { ...prev };
      if (!pagination) return prev;
      if (updated[pagination.page].length === 6) {
        updated[pagination.total_pages + 1] = [data];
      } else {
        updated[pagination.total_pages].push(data);
      }
      return updated;
    });
    setPagination((prev) => {
      if (!prev) return null;
      if (tableData.length === 6) {
        return {
          ...prev,
          page: prev.total_pages + 1,
          total: prev.total + 1,
          total_pages: prev.total_pages + 1,
        };
      }
      return {
        ...prev,
        total: prev.total + 1,
      };
    });
  };

  const handleSubmit = async () => {
    try {
      const { data } = await fetchAction();
      if (isCreate) {
        createUser(data);
      } else {
        updateUser(data);
      }
      onClose();
    } catch (error) {
      console.error({ error });
    }
  };

  useEffect(() => {
    if (!user.first_name && userInfo) {
      setUser(userInfo);
    }
  }, [userInfo]);

  return (
    <Drawer
      title={title}
      closable={{ "aria-label": "Close Button" }}
      onClose={onClose}
      open={true}
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
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>{isCreate ? "Create" : "Save"}</Button>
        </Flex>
      </Flex>
    </Drawer>
  );
};
