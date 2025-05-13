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
