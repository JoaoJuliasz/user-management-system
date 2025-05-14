import { RouterProvider } from "react-router";
import { router } from "../../routes";
import { ThemeToggle } from "../../components";

import style from "./appWrapper.module.css";
import { useAppContext } from "../../context";

export const AppWrapper = () => {
  const { isDarkMode } = useAppContext();
  return (
    <div
      className={`${style.wrapper} ${isDarkMode ? style.dark : style.light}`}
    >
      <RouterProvider router={router} />
      <ThemeToggle />
    </div>
  );
};
