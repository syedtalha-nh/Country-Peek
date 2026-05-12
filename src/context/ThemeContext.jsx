import {
  createContext,
  useState,
  useContext,
} from 'react'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light')

  function toggleTheme() {
    if (theme === 'light') {
      setTheme('dark')
      document.body.setAttribute(
        'data-theme',
        'dark'
      )
    } else {
      setTheme('light')
      document.body.removeAttribute(
        'data-theme'
      )
    }
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTheme() {
  return useContext(ThemeContext)
}