import { Box, Grid2, Skeleton } from "@mui/material";
import { TodoStatus } from "../types/todo";

const columns: TodoStatus[] = ["Todo", "Doing", "Done"];

function LoadingSkeleton() {
  return (
    <Grid2 container spacing={2} data-testid="loading-skeleton">
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
            <Skeleton variant="text" width={100} height={32} />
            {[1, 2, 3].map((i) => (
              <Skeleton
                key={i}
                variant="rectangular"
                height={80}
                sx={{ mb: 1, borderRadius: 1 }}
              />
            ))}
          </Box>
        </Grid2>
      ))}
    </Grid2>
  );
}

export default LoadingSkeleton;
