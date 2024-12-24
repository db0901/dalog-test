import { Box, Grid2, Typography } from "@mui/material";
import { useTodoState } from "../store/TodoContext";
import { TodoStatus } from "../types/todo";
import LoadingSkeleton from "./LoadingSkeleton";
import TodoItem from "./TodoItem";

const columns: TodoStatus[] = ["Todo", "Doing", "Done"];

function TodoList() {
  const { filteredTodos, isLoading, error } = useTodoState();

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight={400}
        sx={{ bgcolor: "background.paper", borderRadius: 1, p: 3 }}
      >
        <Typography color="error" variant="h6" align="center">
          {error}
        </Typography>
      </Box>
    );
  }

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (filteredTodos.length === 0) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight={400}
        sx={{ bgcolor: "background.paper", borderRadius: 1, p: 3 }}
      >
        <Typography variant="h6" color="text.secondary" align="center">
          No todos yet! Click the "Add" button above to create your first todo.
        </Typography>
      </Box>
    );
  }

  return (
    <Grid2 container spacing={2}>
      {columns.map((status) => (
        <Grid2 size={{ xs: 12, md: 4 }} key={status}>
          <Box
            sx={{
              bgcolor: "background.paper",
              borderRadius: 1,
              minHeight: 400,
            }}
          >
            <Typography variant="h6" gutterBottom>
              {status}
            </Typography>
            {filteredTodos
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
