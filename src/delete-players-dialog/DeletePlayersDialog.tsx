import Dialog from '@material-ui/core/Dialog';
import {PlayerModel} from "../models/player.model";
import {IconButton, List, ListItem, ListItemSecondaryAction, ListItemText} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';


interface DeletePlayersDialogProps {
  players: PlayerModel[];
  open: boolean;
}

export function DeletePlayersDialog({players, open}: DeletePlayersDialogProps) {
  return (
    <Dialog open={open} fullWidth>
      <List>
        {players.map(player => (
          <ListItem>
            <ListItemText primary={player.name} />
            <ListItemSecondaryAction>
              <IconButton onClick={() => {}}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}
