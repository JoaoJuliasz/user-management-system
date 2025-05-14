import "./app.css";
import { App as AntApp, ConfigProvider, theme } from "antd";
import { useEffect, useState } from "react";
import { AppWrapper } from "./containers";
import { AppProvider } from "./context";

export const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const darkMode = localStorage.getItem("isDarkMode");
    if (darkMode) {
      setIsDarkMode(JSON.parse(darkMode));
    }
  }, []);

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorText: isDarkMode ? "#f5f5f5" : "#3d3d3d",
          colorBorderSecondary: isDarkMode ? "#4c4a4a" : "#edf2f7",
          colorBgContainer: isDarkMode ? "#1a1a1a" : "#ffffff",
        },
      }}
    >
      <AntApp style={{ height: "100%" }}>
        <AppProvider value={{ isDarkMode, setIsDarkMode }}>
          <AppWrapper />
        </AppProvider>
      </AntApp>
    </ConfigProvider>
  );
};
