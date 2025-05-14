import { Button } from "antd";
import { useAppContext } from "../context";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";

export const ThemeToggle = () => {
  const { isDarkMode, setIsDarkMode } = useAppContext();
  const toggleThemeMode = () =>
    setIsDarkMode((prev) => {
      localStorage.setItem("isDarkMode", JSON.stringify(!prev));
      return !prev;
    });
  return (
    <Button
      style={{ position: "absolute", bottom: "30px", left: "30px" }}
      onClick={toggleThemeMode}
      icon={isDarkMode ? <MoonOutlined /> : <SunOutlined />}
    />
  );
};
