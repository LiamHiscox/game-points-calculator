import './SortPlayersDialog.scss';
import {
  Button,
  Dialog,
  DialogActions,
  ListItemText
} from "@mui/material";
import {PlayerModel} from "../../models/player.model";
import {UpTransition} from "../up-transition/UpTransition";
import {useEffect, useState} from "react";
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import {DraggableList} from "../draggable-list/DraggableList";

interface SortPlayersDialogProps {
  open: boolean;
  players: PlayerModel[];
  onClose: () => void;
  onSubmit: (players: PlayerModel[]) => void;
}

export function SortPlayersDialog({open, players, onClose, onSubmit}: SortPlayersDialogProps) {
  const [sortedPlayers, setSortedPlayers] = useState<PlayerModel[]>([]);

  useEffect(() => setSortedPlayers(players), [players]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth TransitionComponent={UpTransition}>
      <DraggableList items={sortedPlayers}
                     onSortChange={(sorted) => setSortedPlayers(sorted)}
                     listItemId={(player) => player.id}
                     renderListItem={(player) => (<>
                       <ListItemText primary={player.name}/>
                       <DragIndicatorIcon color="primary"/>
                     </>)}
      />
      <DialogActions>
        <Button onClick={onClose} color="primary"> Cancel </Button>
        <Button onClick={() => onSubmit(sortedPlayers)} color="primary" variant="contained"> Save </Button>
      </DialogActions>
    </Dialog>
  );
}
