import { createContext, type Dispatch, type SetStateAction } from "react";
import type { Pagination, User } from "../../../types";

type HomeContextType = {
  tableData: User[];
  setTableData: Dispatch<SetStateAction<User[]>>;
  cachePagination: Record<number, User[]>;
  setCachePagination: Dispatch<SetStateAction<Record<number, User[]>>>;
  pagination: Pagination | null;
  setPagination: Dispatch<SetStateAction<Pagination | null>>;
};

const HomeContext = createContext<HomeContextType | null>(null);

const HomeProvider = HomeContext.Provider;

export { HomeContext, HomeProvider };
