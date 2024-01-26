import { createContext, useState } from 'react';

const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [dark, setDark] = useState(false);
  const handleToggleDark = () => setDark(!dark);

  const values = {
    dark,
    handleToggleDark,
  };

  return <ThemeContext.Provider value={values}>{children}</ThemeContext.Provider>;
}
export { ThemeContext, ThemeProvider };
