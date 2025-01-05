export interface IPallet {
  black: string;
  white: string;
  primary: ColorTone;
  secondary: ColorTone;
  error: ColorTone;
  success: ColorTone;
  gray: Gray;
}

interface Gray {
  "100": string;
  "200": string;
  "300": string;
  "400": string;
  "500": string;
  "600": string;
  "700": string;
  "800": string;
  "900": string;
}

interface ColorTone {
  main: string;
  dark: string;
  light: string;
}

export const palettes = {
  black: "#1b1b1f",
  white: "#fafafa",
  primary: {
    main: "#52C1CC",
    dark: "#33A0AB",
    light: "#6DCED7",
  },
  secondary: {
    main: "#FF8C00",
    dark: "#F27100",
    light: "#FF9D26",
  },
  error: {
    main: "#f4364c",
    dark: "#D32F42",
    light: "#E57380",
  },
  success: {
    main: "#4CAF50",
    dark: "#388E3C",
    light: "#81C784",
  },
  gray: {
    100: "#F3F3F6",
    200: "#E9E9EE",
    300: "#CCCAD2",
    400: "#B0AFBA",
    500: "#9191A1",
    600: "#6B7280",
    700: "#595C6C",
    800: "#474758",
    900: "#2b2b33",
  },
};
