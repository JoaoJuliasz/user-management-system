import { useEffect } from "react";
import { useNavigate } from "react-router";
import { getUserInformationFromStorage } from "../utils";

export const useHomeRedirect = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const { token } = getUserInformationFromStorage();
    if (token) {
      navigate("/");
    }
  }, []);
};
