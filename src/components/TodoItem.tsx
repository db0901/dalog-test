import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Fade,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { Suspense, lazy, memo, useCallback, useEffect, useState } from "react";
import { useTodoActions } from "../store/TodoContext";
import { Todo, TodoStatus } from "../types/todo";

const ApprovalDialog = lazy(() => import("./ApprovalDialog"));

interface TodoItemProps {
  todo: Todo;
}

const TodoItem = memo(function TodoItem({ todo }: TodoItemProps) {
  const { deleteTodo, updateTodoStatus, updateTodoTitle } = useTodoActions();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const [approvalOpen, setApprovalOpen] = useState(false);
  const [pendingStatus, setPendingStatus] = useState<TodoStatus | null>(null);

  const handleEdit = async () => {
    if (isEditing && editedTitle.trim() !== todo.title) {
      await updateTodoTitle(todo.id, editedTitle.trim());
    }
    setIsEditing(!isEditing);
  };

  const handleCancel = () => {
    setEditedTitle(todo.title);
    setIsEditing(false);
  };

  const handleStatusChange = useCallback(
    (event: SelectChangeEvent<TodoStatus>) => {
      const newStatus = event.target.value as TodoStatus;
      if (newStatus === "Done") {
        setPendingStatus(newStatus);
        setApprovalOpen(true);
      } else {
        updateTodoStatus(todo.id, newStatus);
      }
    },
    [todo.id, updateTodoStatus]
  );

  const handleApprove = () => {
    if (pendingStatus) {
      updateTodoStatus(todo.id, pendingStatus);
      setApprovalOpen(false);
      setPendingStatus(null);
    }
  };

  useEffect(() => {
    const handleKeyPress = async (e: KeyboardEvent) => {
      if (isEditing) {
        if (e.key === "Enter") {
          await handleEdit();
        } else if (e.key === "Escape") {
          handleCancel();
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isEditing, handleEdit]);

  return (
    <>
      <Fade in={true} timeout={300}>
        <Card
          sx={{ mb: 1 }}
          role="listitem"
          aria-label={`Todo item: ${todo.title}`}
        >
          <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              {isEditing ? (
                <TextField
                  fullWidth
                  size="small"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  autoFocus
                  sx={{ mr: 1 }}
                  aria-label="Edit todo title"
                  slotProps={{
                    input: {
                      "aria-label": "Edit todo title input",
                    },
                  }}
                />
              ) : (
                <Typography variant="body1">{todo.title}</Typography>
              )}
              <Box display="flex" alignItems="center" gap={1}>
                {isEditing ? (
                  <>
                    <IconButton
                      size="small"
                      onClick={handleEdit}
                      color="primary"
                      aria-label="Save todo"
                    >
                      <CheckIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={handleCancel}
                      color="error"
                      aria-label="Cancel editing"
                    >
                      <CloseIcon />
                    </IconButton>
                  </>
                ) : (
                  <IconButton
                    size="small"
                    onClick={() => setIsEditing(true)}
                    aria-label="Edit todo"
                  >
                    <EditIcon />
                  </IconButton>
                )}
                <Select
                  size="small"
                  value={todo.status}
                  onChange={handleStatusChange}
                  sx={{ minWidth: 100 }}
                  aria-label="Todo status"
                >
                  <MenuItem value="Todo">Todo</MenuItem>
                  <MenuItem value="Doing">Doing</MenuItem>
                  <MenuItem value="Done">Done</MenuItem>
                </Select>
                <IconButton
                  size="small"
                  onClick={() => deleteTodo(todo.id)}
                  aria-label={`Delete todo: ${todo.title}`}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Fade>
      <Suspense fallback={<CircularProgress size={20} />}>
        <ApprovalDialog
          open={approvalOpen}
          onClose={() => {
            setApprovalOpen(false);
            setPendingStatus(null);
          }}
          onApprove={handleApprove}
          todoTitle={todo.title}
        />
      </Suspense>
    </>
  );
});

export default TodoItem;
