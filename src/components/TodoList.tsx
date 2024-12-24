import { Box, Grid2, Typography } from "@mui/material";
import { useTodos } from "../store/TodoContext";
import { TodoStatus } from "../types/todo";
import TodoItem from "./TodoItem";

const columns: TodoStatus[] = ["Todo", "Doing", "Done"];

function TodoList() {
  const { todos, isLoading, error } = useTodos();

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Grid2 container spacing={2}>
      {columns.map((status) => (
        <Grid2 size={{ xs: 12, md: 4 }} key={status}>
          <Box
            sx={{
              bgcolor: "background.paper",
              p: 2,
              borderRadius: 1,
              minHeight: 400,
            }}
          >
            <Typography variant="h6" gutterBottom>
              {status}
            </Typography>
            {todos
              .filter((todo) => todo.status === status)
              .map((todo) => (
                <TodoItem key={todo.id} todo={todo} />
              ))}
          </Box>
        </Grid2>
      ))}
    </Grid2>
  );
}

export default TodoList;
