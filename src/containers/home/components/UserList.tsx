import { Table, type TablePaginationConfig } from "antd";
import { useTableConfig, useTableData } from "../../../hooks";
import { useHomeContext } from "../context";

export const UserList = () => {
  const { loading, fetchUsers } = useTableData();
  const columns = useTableConfig();
  const { tableData, pagination } = useHomeContext();

  const onPaginationChange = (paginationConfig: TablePaginationConfig) => {
    if (paginationConfig.current) {
      fetchUsers(paginationConfig.current);
    }
  };

  return (
    <Table
      dataSource={tableData}
      columns={columns}
      onChange={onPaginationChange}
      loading={loading}
      rowKey="id"
      pagination={{
        pageSize: pagination?.per_page,
        current: pagination?.page,
        total: pagination?.total,
      }}
    />
  );
};
