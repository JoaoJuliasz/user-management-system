import type { ColumnsType } from "antd/es/table";
import type { User } from "../types";
import { UserListActions } from "../containers";

export const useTableConfig = () => {
  return [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      key: "full_name",
      render: (_, record) => `${record.first_name} ${record.last_name}`,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Actions",
      key: "action",
      render: (_, record, index) => (
        <UserListActions userInfo={record} index={index} />
      ),
      width: '80px'
    },
  ] as ColumnsType<User>;
};
