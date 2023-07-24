import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material";

export const tokens = (mode: string) => ({
  ...(mode === "dark"
    ? {
        accentBlue: {
          DEFAULT: "#1900D5",
          100: "#05002D",
          200: "#0C0065",
          300: "#120090",
          400: "#1900D5",
          500: "#1E00FE",
          600: "#4128FF",
          700: "#6550FF",
          800: "#8979FF",
          900: "#9B8EFF",
        },
        seconddary:{
          DEFAULT: "#7C7C7C",
        },
        lime: {
          DEFAULT: "#C1EF00",
          100: "#394700",
          200: "#667F00",
          300: "#94B700",
          400: "#C1EF00",
          500: "#D3FF19",
          600: "#DBFF42",
          700: "#E2FF6A",
          800: "#EAFF93",
          900: "#EEFFA8",
        },
        cinnabar: {
          DEFAULT: "#E8502F",
          100: "#641B0B",
          200: "#962811",
          300: "#C93616",
          400: "#E8502F",
          500: "#EC6F54",
          600: "#F08E78",
          700: "#F4AD9D",
          800: "#F8CCC2",
          900: "#FADBD4",
        },
        primary: {
          DEFAULT: "#000000",
          100: "#000000",
          200: "#000000",
          300: "#000000",
          400: "#000000",
          500: "#0F0E0E",
          600: "#232323",
          700: "#3D3D3D",
          800: "#525252",
          900: "#5C5C5C",
        },
        black: {
          DEFAULT: "#000000",
          100: "#000000",
          200: "#000000",
          300: "#000000",
          400: "#000000",
          500: "#0F0E0E",
          600: "#292929",
          700: "#3D3D3D",
          800: "#525252",
          900: "#5C5C5C",
        },
        mineShaft: {
          DEFAULT: "#3C3C3C",
          100: "#000000",
          200: "#040404",
          300: "#202020",
          400: "#3C3C3C",
          500: "#505050",
          600: "#656565",
          700: "#797979",
          800: "#8E8E8E",
          900: "#989898",
        },
        gray: {
          DEFAULT: "#7C7C7C",
          100: "#282828",
          200: "#444444",
          300: "#606060",
          400: "#7C7C7C",
          500: "#909090",
          600: "#A5A5A5",
          700: "#B9B9B9",
          800: "#CECECE",
          900: "#D8D8D8",
        },
        mintGreen: {
          DEFAULT: "#A9FFA7",
          100: "#06FE00",
          200: "#3BFF37",
          300: "#72FF6F",
          400: "#A9FFA7",
          500: "#D1FFD0",
          600: "#F9FFF9",
          700: "#FFFFFF",
          800: "#FFFFFF",
          900: "#FFFFFF",
        },
        white: {
          DEFAULT: "#FFFFFF",
          100: "#F7F7F7",
        },
      }
    : {
      seconddary:{
        DEFAULT: "#7C7C7C",
      },
        white: {
          DEFAULT: "#FFFFFF",
          100: "#F7F7F7",
          200: "#D1D1D1",
        },
        primary: {
          DEFAULT: "#FFFFFF",
          600: "#F7F7F7",
        },
        accentBlue: {
          DEFAULT: "#1900D5",
          100: "#8979FF",
          200: "#6550FF",
          300: "#4128FF",
          400: "#1E00FE",
          500: "#1900D5",
          600: "#12009D",
          700: "#0C0065",
          800: "#05002D",
          900: "#000000",
        },
        lime: {
          DEFAULT: "#C1EF00",
          100: "#EAFF93",
          200: "#E2FF6A",
          300: "#DBFF42",
          400: "#D3FF19",
          500: "#C1EF00",
          600: "#94B700",
          700: "#667F00",
          800: "#394700",
          900: "#0C0F00",
        },
        cinnabar: {
          DEFAULT: "#E8502F",
          100: "#F8CCC2",
          200: "#F4AD9D",
          300: "#F08E78",
          400: "#EC6F54",
          500: "#E8502F",
          600: "#C93616",
          700: "#962811",
          800: "#641B0B",
          900: "#310D05",
        },
        black: {
          DEFAULT: "#000000",
          100: "#525252",
          200: "#3D3D3D",
          300: "#292929",
          400: "#141414",
          500: "#000000",
          600: "#000000",
          700: "#000000",
          800: "#000000",
          900: "#000000",
        },
        mineShaft: {
          DEFAULT: "#3C3C3C",
          100: "#8E8E8E",
          200: "#797979",
          300: "#656565",
          400: "#505050",
          500: "#3C3C3C",
          600: "#202020",
          700: "#040404",
          800: "#000000",
          900: "#000000",
        },
        gray: {
          DEFAULT: "#7C7C7C",
          100: "#CECECE",
          200: "#B9B9B9",
          300: "#A5A5A5",
          400: "#909090",
          500: "#7C7C7C",
          600: "#606060",
          700: "#444444",
          800: "#282828",
          900: "#0C0C0C",
        },
        mintGreen: {
          DEFAULT: "#A9FFA7",
          100: "#FFFFFF",
          200: "#FFFFFF",
          300: "#F9FFF9",
          400: "#D1FFD0",
          500: "#A9FFA7",
          600: "#72FF6F",
          700: "#3BFF37",
          800: "#06FE00",
          900: "#04C600",
        },
      }),
});
export const themeSettings: any = (mode: string) => {
  const colors = tokens(mode);
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            primary: {
              main: colors.primary.DEFAULT,
            },
            secondary: {
              main: colors.seconddary.DEFAULT,
            },
            neutral: {
              dark: colors.black[500],
              light: colors.white[100],
            },
          }
        : {
            primary: {
              main: colors.primary.DEFAULT,
            },
            secondary: {
              main: colors.seconddary.DEFAULT,
            },
            neutral: {
              dark: colors.black[500],
              light: colors.white[100],
            },
          }),
    },
    typography: {
      fontFamily: ["Poppins", "sans-serif"].join(","),
      fontSize: 14,
      fontWeight: 500,
      h1: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
        fontSize: 28,
        fontWeight: 600,
      },
      h2: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
        fontSize: 20,
        fontWeight: 600,
      },
      h3: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
        fontSize: 18,
        fontWeight: 600,
      },
      p: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
        fontSize: 14,
        fontWeight: 500,
      },
    },
  };
};
export const ColorModeContext: any = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState("dark");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );
  const theme: any = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return [theme, colorMode];
};
