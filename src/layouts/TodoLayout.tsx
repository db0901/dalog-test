import { Box, Typography } from "@mui/material";
import CreateTodo from "../components/CreateTodo";
import TodoList from "../components/TodoList";

function TodoLayout() {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Todo Application
      </Typography>
      <CreateTodo />
      <TodoList />
    </Box>
  );
}

export default TodoLayout;
