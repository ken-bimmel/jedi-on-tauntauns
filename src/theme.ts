import { createTheme } from "@mui/material/styles";

export function getTheme(mode: "light" | "dark") {
  return createTheme({
    palette: {
      mode,
    },
  });
}
