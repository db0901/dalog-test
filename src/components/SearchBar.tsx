import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment, TextField } from "@mui/material";
import { useTodoActions, useTodoState } from "../store/TodoContext";

function SearchBar() {
  const { searchTerm } = useTodoState();
  const { setSearchTerm } = useTodoActions();

  return (
    <TextField
      fullWidth
      size="small"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search todos..."
      sx={{ mb: 3 }}
      slotProps={{
        input: {
          "aria-label": "Search todos",
          role: "searchbox",
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        },
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          setSearchTerm("");
        }
      }}
    />
  );
}

export default SearchBar;
