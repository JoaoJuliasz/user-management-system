// routes.tsx
import { createBrowserRouter } from "react-router";
import { SignIn, Home } from "../containers";
import { ProtectedRoute } from "./ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: <SignIn />,
  },
]);
