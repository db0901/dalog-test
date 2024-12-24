import { Snackbar } from "@mui/material";
import Alert from "@mui/material/Alert";
import { useTodoActions, useTodoState } from "../store/TodoContext";

function ErrorSnackbar() {
  const { error } = useTodoState();
  const { clearError } = useTodoActions();

  return (
    <Snackbar
      open={!!error}
      autoHideDuration={6000}
      onClose={clearError}
      aria-label="Error notification"
    >
      <Alert
        onClose={clearError}
        severity="error"
        sx={{ width: "100%" }}
        role="alert"
      >
        {error ?? "An error occurred"}
      </Alert>
    </Snackbar>
  );
}

export default ErrorSnackbar;
