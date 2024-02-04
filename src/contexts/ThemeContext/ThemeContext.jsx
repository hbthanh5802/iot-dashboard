import { createContext, useState, useLayoutEffect } from 'react';

const ThemeContext = createContext();
const DARK_THEME = process.env.REACT_APP_DARK_THEME;

function ThemeProvider({ children }) {
  const [dark, setDark] = useState(!!localStorage.getItem(DARK_THEME));

  const handleToggleDark = () => {
    const newDarkTheme = !dark;
    localStorage.setItem(DARK_THEME, newDarkTheme);
    setDark(newDarkTheme);
  };

  useLayoutEffect(() => {
    const savedTheme = localStorage.getItem(DARK_THEME) === 'true' ? true : false;
    if (savedTheme !== undefined) {
      console.log(savedTheme);
      setDark(savedTheme);
    }
  }, []);

  const values = {
    dark,
    handleToggleDark,
  };

  return <ThemeContext.Provider value={values}>{children}</ThemeContext.Provider>;
}
export { ThemeContext, ThemeProvider };
