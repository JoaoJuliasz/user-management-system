import { useNavigate } from "react-router";
import { instance } from "../instance";
import type { UserAuthenticationResponse } from "../types";
import { setUserStorageInformation } from "../utils";
import { useCallback, useState } from "react";
import { notification } from "antd";
import type { AxiosError } from "axios";

type APIError = {
  error: string;
};

export const useAuthenticateUser = () => {
  const [loading, setLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();

  const navigate = useNavigate();

  const openToast = useCallback(
    (message: string) => {
      api.open({
        type: "error",
        message: "Error",
        description: message,
      });
    },
    [api]
  );

  const authenticateUser = useCallback(
    async (email: string, password: string, source: "sign-in" | "sign-up") => {
      setLoading(true);
      try {
        const { data } = await instance.post<UserAuthenticationResponse>(
          source === "sign-in" ? "login" : "register",
          {
            email,
            password,
          }
        );
        setUserStorageInformation(
          data.token,
          source === "sign-in" ? 1 : data.id ?? -1
        );
        navigate("/");
      } catch (error: unknown) {
        const err = error as AxiosError<APIError>;
        if (!err.response) return;
        console.error(err.response.data.error);
        openToast(err.response.data.error);
      } finally {
        setLoading(false);
      }
    },
    [navigate, openToast]
  );

  return { toast: contextHolder, authenticateUser, loading, openToast };
};
