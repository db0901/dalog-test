import {
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import TodoLayout from "./layouts/TodoLayout";
import { TodoProvider } from "./store/TodoContext";

const theme = createTheme({
  palette: {
    mode: "light",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <TodoProvider>
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <TodoLayout />
        </Container>
      </TodoProvider>
    </ThemeProvider>
  );
}

export default App;
