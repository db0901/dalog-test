import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Card,
  CardContent,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useTodos } from "../store/TodoContext";
import { Todo, TodoStatus } from "../types/todo";
import ApprovalDialog from "./ApprovalDialog";

interface TodoItemProps {
  todo: Todo;
}

function TodoItem({ todo }: TodoItemProps) {
  const { deleteTodo, updateTodoStatus } = useTodos();
  const [approvalOpen, setApprovalOpen] = useState(false);
  const [pendingStatus, setPendingStatus] = useState<TodoStatus | null>(null);

  const handleStatusChange = (event: SelectChangeEvent<TodoStatus>) => {
    const newStatus = event.target.value as TodoStatus;
    if (newStatus === "Done") {
      setPendingStatus(newStatus);
      setApprovalOpen(true);
    } else {
      updateTodoStatus(todo.id, newStatus);
    }
  };

  const handleApprove = () => {
    if (pendingStatus) {
      updateTodoStatus(todo.id, pendingStatus);
      setApprovalOpen(false);
      setPendingStatus(null);
    }
  };

  return (
    <>
      <Card sx={{ mb: 1 }}>
        <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="body1">{todo.title}</Typography>
            <Box display="flex" alignItems="center" gap={1}>
              <Select
                size="small"
                value={todo.status}
                onChange={handleStatusChange}
                sx={{ minWidth: 100 }}
              >
                <MenuItem value="Todo">Todo</MenuItem>
                <MenuItem value="Doing">Doing</MenuItem>
                <MenuItem value="Done">Done</MenuItem>
              </Select>
              <IconButton
                size="small"
                onClick={() => deleteTodo(todo.id)}
                aria-label="delete todo"
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>
        </CardContent>
      </Card>
      <ApprovalDialog
        open={approvalOpen}
        onClose={() => {
          setApprovalOpen(false);
          setPendingStatus(null);
        }}
        onApprove={handleApprove}
        todoTitle={todo.title}
      />
    </>
  );
}

export default TodoItem;
