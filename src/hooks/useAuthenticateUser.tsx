import { useNavigate } from "react-router";
import { instance } from "../instance";
import type { UserAuthenticationResponse } from "../types";
import { setUserStorageInformation } from "../utils";
import { useCallback } from "react";
import { notification } from "antd";

export const useAuthenticateUser = () => {
  const [api, contextHolder] = notification.useNotification();

  const navigate = useNavigate();

  const openToast = useCallback((message: string) => {
    api.open({
      type: "error",
      message: "Error",
      description: message,
    });
  }, []);

  const authenticateUser = useCallback(
    async (email: string, password: string, source: "sign-in" | "sign-up") => {
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
      } catch (error: any) {
        console.error(error.response.data.error);
        openToast(error.response.data.error);
      }
    },
    [navigate, openToast]
  );

  return { toast: contextHolder, authenticateUser, openToast };
};
