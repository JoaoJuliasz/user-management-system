import { useCallback, useEffect, useState } from "react";
import { instance } from "../instance";
import {
  type Pagination,
  type User,
  type UserListRequestResponse,
} from "../types";

export const useTableData = () => {
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [tableData, setTableData] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchUsers = useCallback(async (pageNumber: number) => {
    setLoading(true);
    try {
      const {
        data: { data, page, per_page, total, total_pages },
      } = await instance.get<UserListRequestResponse>(`users`, {
        params: { page: pageNumber },
      });
      setTableData(data);
      const resPagination: Pagination = { page, per_page, total, total_pages };
      setPagination(resPagination);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers(0);
  }, []);

  return { pagination, tableData, loading, fetchUsers };
};
