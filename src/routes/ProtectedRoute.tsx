import { Navigate } from "react-router";
import { getUserInformationFromStorage } from "../utils";
import type { ReactNode } from "react";

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { token } = getUserInformationFromStorage();

  if (!token) {
    return <Navigate to="/sign-up" replace />;
  }

  return <>{children}</>;
}
