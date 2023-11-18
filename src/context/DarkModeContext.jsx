import { createContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";
import PropTypes from "prop-types";

export const DarkModeContext = createContext();

export function DarkModeProvider({ children }) {
  const [isDarkMode, setDarkMode] = useLocalStorageState(
    window.matchMedia("(prefers-color-sheme: dark)").matches,
    "isDarkMode"
  );

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark-mode");
      document.documentElement.classList.remove("light-mode");
    } else {
      document.documentElement.classList.add("light-mode");
      document.documentElement.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setDarkMode((isDark) => !isDark);
  };

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

// export function useDarkMode() {
//   const context = useContext(DarkModeContext);
//   if (context === undefined)
//     throw new Error("DarkModeContext was used outside of a DarkModeProvider");
// }

DarkModeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
