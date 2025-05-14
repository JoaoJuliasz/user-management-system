import { useCallback } from "react";
import { useHomeContext } from "../containers";
import { instance } from "../instance";
import type { User } from "../types";
import { notification } from "antd";

export const useUserActions = (isCreate?: boolean, index?: number) => {
  const [api, contextHolder] = notification.useNotification();

  const {
    tableData,
    setTableData,
    pagination,
    setPagination,
    setCachePagination,
  } = useHomeContext();

  const openToast = useCallback(
    (message: string) => {
      console.log("ue");
      api.open({
        type: "success",
        message: "Success",
        description: message,
      });
    },
    [api]
  );

  const fetchAction = useCallback(
    (user: User) => {
      if (isCreate) {
        return instance.post<User>("users", { ...user });
      }
      return instance.put<User>(`users/${user.id}`, { ...user });
    },
    [isCreate]
  );

  const updateUser = useCallback(
    (data: User) => {
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
      openToast("User updated!");
    },
    [index, pagination, setCachePagination, setTableData, openToast]
  );

  const createUser = useCallback(
    (data: User) => {
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
      openToast("User created!");
    },
    [
      pagination,
      setCachePagination,
      setPagination,
      setTableData,
      tableData.length,
      openToast,
    ]
  );

  const removeUser = useCallback(() => {
    setTableData((prev) => {
      if (index === undefined) return prev;
      const updated = [...prev];
      updated.splice(index, 1);
      return updated;
    });
    setCachePagination((prev) => {
      const updated = { ...prev };
      if (!pagination || !index) return prev;
      updated[pagination.page].splice(index, 1);
      return updated;
    });
    setPagination((prev) => {
      if (!prev) return null;
      return { ...prev, total: prev.total - 1 };
    });
  }, [index, pagination, setCachePagination, setPagination, setTableData]);

  return { contextHolder, createUser, fetchAction, updateUser, removeUser };
};
