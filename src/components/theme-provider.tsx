import { createContext, useContext, useEffect, useState } from "react";

/**
 * Available theme states.
 */
type Theme = "dark" | "light" | "system";

/**
 * State shape for the ThemeProvider context.
 */
type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

/**
 * Initial state for the ThemeProvider context.
 */
const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
};

/**
 * Context for the ThemeProvider.
 */
const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

/**
 * ThemeProvider component that manages the theme state and persists it in
 * localStorage.
 *
 * @param children -
 * The children components to wrap with the theme provider.
 *
 * @param defaultTheme -
 * The default theme to use if no theme is stored in localStorage.
 *
 * @param storageKey -
 * The key to use for storing the theme in localStorage.
 */
export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "wicked-engine-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme,
  );

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

/**
 * Custom hook to access the ThemeProvider context.
 *
 * @returns The current theme and a function to update it.
 */
export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
