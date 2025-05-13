import type { User } from ".";

export type UserRequestResponse = {
  data: User;
  support: {
    url: string;
    text: string;
  };
};

export type UserAuthenticationResponse = {
  token: string;
  id?: number;
};

export type Pagination = {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
};

export type UserListRequestResponse = Pagination & {
  data: User[];
  support: {
    url: string;
    text: string;
  };
};
