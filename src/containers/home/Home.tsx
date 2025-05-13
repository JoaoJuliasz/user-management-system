import { useCallback, useEffect, useState } from "react";
import { instance } from "../../instance";
import { getUserInformationFromStorage } from "../../utils";
import { type User, type UserRequestResponse } from "../../types";
import { Spin } from "antd";
import { UserListWrapper } from "./components";

export const Home = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const init = useCallback(async () => {
    const { userId } = getUserInformationFromStorage();
    if (!userId) return;
    setLoading(true);
    try {
      const { data } = await instance.get<UserRequestResponse>(
        `users/${userId}`
      );
      setUser(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    init();
  }, [init]);

  if (loading) return <Spin size="large" />;

  if (!user) return null;

  return <UserListWrapper />;
};
