import "./ConfirmationDialog.scss";
import React from "react";
import Dialog from "@material-ui/core/Dialog";
import {Button, DialogActions, DialogContent} from "@material-ui/core";

interface LeaderboardDialogProps {
  message: string;
  open: boolean;
  onConfirm: () => void;
  onDecline: () => void;
  onCancel: () => void;
}

export function ConfirmationDialog({message, open, onConfirm, onDecline, onCancel}: LeaderboardDialogProps) {
  return (
    <Dialog open={open} fullWidth onClose={onCancel}>
      <DialogContent>
        {message}
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={onCancel}> Cancel </Button>
        <div>
          <Button color="primary" onClick={onDecline}> No </Button>
          <Button color="primary" onClick={onConfirm}> Yes </Button>
        </div>
      </DialogActions>
    </Dialog>
  );
}
