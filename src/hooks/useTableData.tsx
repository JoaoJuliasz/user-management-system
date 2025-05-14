import { useCallback, useEffect, useState } from "react";
import { instance } from "../instance";
import { type Pagination, type UserListRequestResponse } from "../types";
import { useHomeContext } from "../containers";

export const useTableData = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const {
    setTableData,
    cachePagination,
    setCachePagination,
    pagination,
    setPagination,
  } = useHomeContext();

  const fetchUsers = useCallback(
    async (pageNumber: number) => {
      setLoading(true);
      try {
        if (cachePagination[pageNumber]) {
          setTableData(cachePagination[pageNumber]);
          setPagination((prev) => prev && { ...prev, page: pageNumber });
          return;
        }
        const {
          data: { data, page, per_page, total, total_pages },
        } = await instance.get<UserListRequestResponse>(`users`, {
          params: { page: pageNumber },
        });

        setTableData(data);

        const resPagination: Pagination = {
          page,
          per_page,
          total: pagination?.total ?? total,
          total_pages: pagination?.total_pages ?? total_pages,
        };
        setCachePagination((prev) => ({ ...prev, [pageNumber]: data }));
        setPagination(resPagination);
      } finally {
        setLoading(false);
      }
    },
    [
      pagination,
      cachePagination,
      setCachePagination,
      setPagination,
      setTableData,
    ]
  );

  useEffect(() => {
    fetchUsers(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { loading, fetchUsers };
};
