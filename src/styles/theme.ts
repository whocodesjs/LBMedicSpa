import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#1976D2", // Deep blue
      light: "#E3F2FD", // Light blue
      dark: "#1565C0",
    },
    secondary: {
      main: "#FFD700", // Gold
      light: "#FFE44D",
      dark: "#B2A300",
    },
    background: {
      default: "#FFFFFF",
      paper: "#F5F5F5",
    },
    text: {
      primary: "#333333",
      secondary: "#666666",
    },
  },
  typography: {
    fontFamily: '"Open Sans", "Roboto", "Lato", sans-serif',
    h1: {
      fontFamily: '"Montserrat", "Poppins", sans-serif',
      fontSize: "2.5rem",
      fontWeight: 700,
    },
    h2: {
      fontFamily: '"Montserrat", "Poppins", sans-serif',
      fontSize: "2rem",
      fontWeight: 600,
    },
    h3: {
      fontFamily: '"Montserrat", "Poppins", sans-serif',
      fontSize: "1.75rem",
      fontWeight: 600,
    },
    body1: {
      fontSize: "16px",
      lineHeight: 1.6,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          fontWeight: 600,
          padding: "10px 24px",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        },
      },
    },
  },
});
