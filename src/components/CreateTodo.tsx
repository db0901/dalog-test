import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { useTodos } from "../store/TodoContext";

function CreateTodo() {
  const [title, setTitle] = useState("");
  const { addTodo } = useTodos();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      await addTodo(title.trim());
      setTitle("");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ mb: 4, display: "flex", gap: 2 }}
    >
      <TextField
        fullWidth
        label="New Todo"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        variant="outlined"
        size="small"
      />
      <Button type="submit" variant="contained" disabled={!title.trim()}>
        Add
      </Button>
    </Box>
  );
}

export default CreateTodo;
