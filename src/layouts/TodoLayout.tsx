import { Box, Typography } from "@mui/material";
import CreateTodo from "../components/CreateTodo";
import ErrorSnackbar from "../components/ErrorSnackbar";
import SearchBar from "../components/SearchBar";
import TodoList from "../components/TodoList";

function TodoLayout() {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Todo Application
      </Typography>
      <CreateTodo />
      <SearchBar />
      <TodoList />
      <ErrorSnackbar />
    </Box>
  );
}

export default TodoLayout;
