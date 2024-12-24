import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

interface ApprovalDialogProps {
  open: boolean;
  onClose: () => void;
  onApprove: () => void;
  todoTitle: string;
}

function ApprovalDialog({
  open,
  onClose,
  onApprove,
  todoTitle,
}: ApprovalDialogProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Status Change</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to mark "{todoTitle}" as Done? This action
          requires approval.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onApprove} variant="contained" color="primary">
          Approve
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ApprovalDialog;
