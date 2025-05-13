import { Table, type TablePaginationConfig } from "antd";
import { useTableConfig, useTableData } from "../../../hooks";

export const UserList = () => {
  const { loading, pagination, tableData, fetchUsers } = useTableData();
  const columns = useTableConfig();

  const onPaginationChange = (paginationConfig: TablePaginationConfig) => {
    paginationConfig.current && fetchUsers(paginationConfig.current);
  };

  return (
    <Table
      dataSource={tableData}
      columns={columns}
      onChange={onPaginationChange}
      loading={loading}
      pagination={{
        pageSize: pagination?.per_page,
        current: pagination?.page,
        total: pagination?.total,
      }}
    />
  );
};
