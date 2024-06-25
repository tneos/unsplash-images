import {createContext, useContext, useState, useEffect} from "react";
import App from "./App";

const AppContext = createContext();

const getInitialMode = () => {
  const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
  console.log(prefersDarkMode);
  return prefersDarkMode;
};

export const AppProvider = ({children}) => {
  const [isDarkTheme, setIsDarkTheme] = useState(getInitialMode());
  const [searchTerm, setSearchTerm] = useState("cat");

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
  };

  console.log(isDarkTheme);
  useEffect(() => {
    document.body.classList.toggle("dark-theme", isDarkTheme);
  }, [isDarkTheme]);

  return (
    <AppContext.Provider value={{isDarkTheme, toggleDarkTheme, searchTerm, setSearchTerm}}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => useContext(AppContext);
