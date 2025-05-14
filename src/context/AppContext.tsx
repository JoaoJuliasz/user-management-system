import { createContext, type Dispatch, type SetStateAction } from "react";

type AppContextType = {
  isDarkMode: boolean;
  setIsDarkMode: Dispatch<SetStateAction<boolean>>;
};
const AppContext = createContext<AppContextType | null>(null);

const AppProvider = AppContext.Provider;

export { AppContext, AppProvider };
