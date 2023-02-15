import Dialog from "@mui/material/Dialog";
import {PlayerModel} from "../../models/player.model";
import {Button, Divider, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {useState} from "react";
import {ConfirmationDialog} from "../confirmation-dialog/ConfirmationDialog";
import {UpTransition} from "../up-transition/UpTransition";
import {useTranslation} from "react-i18next";


interface DeletePlayersDialogProps {
  players: PlayerModel[];
  open: boolean;
  onClose: () => void;
  onDelete: (id: string) => void;
}

export function DeletePlayersDialog({players, open, onClose, onDelete}: DeletePlayersDialogProps) {
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const [deleteName, setDeleteName] = useState('');
  const {t} = useTranslation();

  const handleDelete = (id: string, name: string) => {
    setDeleteId(id);
    setDeleteName(name);
    setConfirmationOpen(true);
  }

  const handleConfirm = () => {
    setConfirmationOpen(false);
    onDelete(deleteId);
  }

  return (
    <Dialog open={open} fullWidth onClose={onClose} TransitionComponent={UpTransition}>
      <List>
        {players.map((player, i) => (
          <ListItem key={i}>
            <ListItemText primary={player.name} className="select-none"/>
            <ListItemSecondaryAction>
              <IconButton onClick={() => handleDelete(player.id, player.name)}>
                <DeleteIcon color="primary"/>
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <Divider/>
      <Button color="primary" onClick={onClose}> Close </Button>
      <ConfirmationDialog message={`${t("confirmationDialog.deletePlayer")} ${deleteName}?`}
                          open={confirmationOpen}
                          onConfirm={handleConfirm}
                          onDecline={() => setConfirmationOpen(false)}
                          onCancel={() => setConfirmationOpen(false)}
      />
    </Dialog>
  );
}
