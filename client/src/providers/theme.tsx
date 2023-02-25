import React from "react";
import { createTheme, ThemeProvider as ThemeProviderMui } from "@mui/material";

interface IThemeProviderProps {
  children: React.ReactNode;
}

declare module "@mui/material/styles" {
  interface PaletteOptions {
    status: {
      danger: string;
      success: string;
      warning: string;
      info: string;
    };
    typography: {
      heading: string;
      body: string;
    };
  }

}

const theme = createTheme({
  typography: {
    fontFamily: "Mulish, Arial",
    h1: {
      fontSize: 40,
    },
    h2: {
      fontSize: 32,
    },
    h3: {
      fontSize: 28,
    },
    h4: {
      fontSize: 24,
    },
    h5: {
      fontSize: 20,
    },
    h6: {
      fontSize: 16,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
      @font-face {
        font-family: 'Mulish';
        font-style: normal;
        font-display: swap;
        font-weight: 400;
        src: local('Mulish'), local('Mulish-Regular'), url('https://fonts.googleapis.com/css?family=Mulish') format('ttf');
        unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
      }
      `,
    },
  },
  palette: {
    status: {
      success: "#28A745",
      danger: "#28A745",
      warning: "#FFC107",
      info: "#00DCC3",
    },
    typography: {
      heading: "#1C232D",
      body: "#747D8A",
    },
  },
});

// theme provider for better understanding
const ThemeProvider: React.FunctionComponent<IThemeProviderProps> = ({
  children,
}) => <ThemeProviderMui theme={theme}>{children}</ThemeProviderMui>;

export default ThemeProvider;
