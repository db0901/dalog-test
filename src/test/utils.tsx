import { ThemeProvider, createTheme } from "@mui/material";
import { render } from "@testing-library/react";
import { TodoProvider } from "../store/TodoContext";

const theme = createTheme({
  palette: { mode: "light" },
});

export function renderWithProviders(ui: React.ReactElement) {
  return render(
    <ThemeProvider theme={theme}>
      <TodoProvider>{ui}</TodoProvider>
    </ThemeProvider>
  );
}
