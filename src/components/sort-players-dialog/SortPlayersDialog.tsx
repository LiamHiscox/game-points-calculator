import './SortPlayersDialog.scss';
import {
  Button,
  Dialog,
  DialogActions,
  List,
  ListItem,
  ListItemText
} from "@mui/material";
import {PlayerModel} from "../../models/player.model";
import {UpTransition} from "../up-transition/UpTransition";
import {useEffect, useState} from "react";
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import {DragDropContext, Draggable, Droppable, DropResult} from "react-beautiful-dnd";

interface SortPlayersDialogProps {
  open: boolean;
  players: PlayerModel[];
  onClose: () => void;
  onSubmit: (players: PlayerModel[]) => void;
}

export function SortPlayersDialog({open, players, onClose, onSubmit}: SortPlayersDialogProps) {
  const [sortedPlayers, setSortedPlayers] = useState<PlayerModel[]>([]);

  useEffect(() => setSortedPlayers(players), [players]);

  const handleDrop = (droppedItem: DropResult) => {
    if (!droppedItem.destination) {
      return;
    }
    const sourceIndex = droppedItem.source.index;
    const droppedPlayer = sortedPlayers[sourceIndex];
    const updatedPlayers = sortedPlayers.filter((_, i) => i !== sourceIndex);
    updatedPlayers.splice(droppedItem.destination.index, 0, droppedPlayer);
    setSortedPlayers(updatedPlayers);
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth TransitionComponent={UpTransition}>
      <DragDropContext onDragEnd={handleDrop}>
        <Droppable droppableId="list-container">
          {(provided) => (
            <List className="list-container"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
            >
              {sortedPlayers.map((player, index) => (
                <Draggable key={player.id} draggableId={player.id} index={index}>
                  {(provided, snapshot) => (
                    <ListItem className={`item-container ${snapshot.isDragging ? 'selected' : ''}`}
                              ref={provided.innerRef}
                              {...provided.dragHandleProps}
                              {...provided.draggableProps}
                    >
                      <ListItemText primary={player.name}/>
                      <DragIndicatorIcon color="primary"/>
                    </ListItem>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </List>
          )}
        </Droppable>
      </DragDropContext>
      <DialogActions>
        <Button onClick={onClose} color="primary"> Cancel </Button>
        <Button onClick={() => onSubmit(sortedPlayers)} color="primary" variant="contained"> Save </Button>
      </DialogActions>
    </Dialog>
  );
}
