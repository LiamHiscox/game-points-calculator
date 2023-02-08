import "./ConfirmationDialog.scss";
import React from "react";
import Dialog from "@mui/material/Dialog";
import {Button, DialogActions, DialogContent} from "@mui/material";
import {UpTransition} from "../up-transition/UpTransition";

interface LeaderboardDialogProps {
  message: string;
  open: boolean;
  onConfirm: () => void;
  onDecline: () => void;
  onCancel: () => void;
}

export function ConfirmationDialog({message, open, onConfirm, onDecline, onCancel}: LeaderboardDialogProps) {
  return (
    <Dialog open={open} fullWidth onClose={onCancel} TransitionComponent={UpTransition}>
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
