import './NewGameDialog.scss';
import {
  Button,
  Dialog,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  TextField
} from "@material-ui/core";
import {PlayerModel} from "../../models/player.model";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import {useEffect, useState} from "react";
import {v4 as uuidv4} from "uuid";

interface NewGameDialogProps {
  open: boolean;
  players: PlayerModel[];
  onClose: () => void;
  onSubmit: (players: PlayerModel[]) => void;
}

export function NewGameDialog({open, players, onClose, onSubmit}: NewGameDialogProps) {
  const [newPlayers, setNewPlayers] = useState<PlayerModel[]>(players.map(player => ({...player, points: []})));

  useEffect(() => setNewPlayers(players.map(player => ({...player, points: [null]}))), [players, open]);

  const handleDelete = (index: number) => {
    setNewPlayers(newPlayers.filter((_, i) => i !== index));
  }

  const handleNameChange = (name: string, index: number) => {
    setNewPlayers(newPlayers.map((player, i) => index === i ? {...player, name} : player));
  }

  const addPlayer = () => {
    setNewPlayers(newPlayers.concat({id: uuidv4(), name: `Player ${newPlayers.length + 1}`, points: []}));
  }

  return (
    <Dialog fullWidth
            open={open}
            onClose={onClose}>
      <List>
        {newPlayers.map((player, index) => (
          <ListItem key={index}>
            <TextField label="Name" variant="outlined"
                       value={player.name}
                       onChange={(e) => handleNameChange(e.target.value, index)}/>
            <ListItemSecondaryAction>
              <IconButton onClick={() => handleDelete(index)}>
                <DeleteIcon color="primary"/>
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
        <ListItem button style={{justifyContent: "center"}} onClick={addPlayer}>
          <AddIcon color="primary"/>
        </ListItem>
      </List>
      <Divider/>
      <Button color="primary" onClick={() => onSubmit(newPlayers)}> New Game </Button>
    </Dialog>
  );
}
