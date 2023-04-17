import React from "react";
import Dialog from "@mui/material/Dialog";
import {Button, DialogActions, DialogContent} from "@mui/material";
import {UpTransition} from "../up-transition/UpTransition";
import {useTranslation} from "react-i18next";

interface LeaderboardDialogProps {
  message: string;
  open: boolean;
  onConfirm: () => void;
  onDecline: () => void;
  onCancel: () => void;
}

export function ConfirmationDialog({message, open, onConfirm, onDecline, onCancel}: LeaderboardDialogProps): JSX.Element {
  const {t} = useTranslation();

  return (
    <Dialog open={open} fullWidth onClose={onCancel} TransitionComponent={UpTransition}>
      <DialogContent className="select-none">
        {message}
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={onCancel}> {t("common.cancel")} </Button>
        <div>
          <Button color="primary" onClick={onDecline}> {t("common.no")} </Button>
          <Button color="primary" onClick={onConfirm}> {t("common.yes")} </Button>
        </div>
      </DialogActions>
    </Dialog>
  );
}
