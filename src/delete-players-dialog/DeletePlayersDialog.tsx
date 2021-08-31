import Dialog from '@material-ui/core/Dialog';
import {PlayerModel} from "../models/player.model";
import {Button, Divider, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';


interface DeletePlayersDialogProps {
  players: PlayerModel[];
  open: boolean;
  onClose: () => void;
  onDelete: (index: number) => void;
}

export function DeletePlayersDialog({players, open, onClose, onDelete}: DeletePlayersDialogProps) {
  return (
    <Dialog open={open} fullWidth onClose={onClose}>
      <List>
        {players.map((player, index) => (
          <ListItem key={index}>
            <ListItemText primary={player.name}/>
            <ListItemSecondaryAction>
              <IconButton onClick={() => onDelete(index)}>
                <DeleteIcon color="primary"/>
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <Divider/>
      <Button color="primary" onClick={onClose}> Close </Button>
    </Dialog>
  );
}
