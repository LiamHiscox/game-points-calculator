import './NewGameDialog.scss';
import {
  Button,
  Dialog,
  Divider,
  Fade,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  List,
  ListItem,
  OutlinedInput,
  TextField,
  Typography
} from "@material-ui/core";
import {PlayerModel} from "../../models/player.model";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from '@material-ui/icons/Close';
import {useEffect, useState} from "react";
import {v4 as uuidv4} from "uuid";
import {GameModel} from "../../models/game.model";

interface NewGameDialogProps {
  open: boolean;
  players: PlayerModel[];
  onClose: () => void;
  onSubmit: (game: GameModel) => void;
}

export function NewGameDialog({open, players, onClose, onSubmit}: NewGameDialogProps) {
  const [newGame, setNewGame] = useState<GameModel>({id: '', timestamp: new Date(), name: '', players: []});

  useEffect(() => {
      open && setNewGame({
        id: uuidv4(),
        timestamp: new Date(),
        name: '',
        players: players.map(player => ({...player, points: [null]}))
      });
  }, [players, open]);

  const handleDelete = (index: number) => {
    setNewGame({
      ...newGame,
      players: newGame.players.filter((_, i) => i !== index)
    });
  }

  const handleGameNameChange = (newName: string) => {
    setNewGame({
      ...newGame,
      name: newName
    });
  }

  const handleNameChange = (name: string, index: number) => {
    setNewGame({
      ...newGame,
      players: newGame.players.map((player, i) => index === i ? {...player, name} : player)
    });
  }

  const addPlayer = () => {
    setNewGame({
      ...newGame,
      players: newGame.players.concat({id: uuidv4(), name: '', points: [null]})
    });
  }

  const canSubmit = (): boolean => {
    const emptyPlayerName = !!newGame.players.find(player => !player.name);
    const emptyGameName = !newGame.name;
    return emptyPlayerName || emptyGameName;
  }

  return (
    <Dialog fullWidth
            open={open}
            onClose={onClose}>
      <List>
        <ListItem>
          <FormControl variant="outlined" className="player-name-form-control">
            <InputLabel> Game Name </InputLabel>
            <OutlinedInput
              type="text"
              value={newGame.name}
              error={!newGame.name}
              onChange={e => handleGameNameChange(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={() => handleGameNameChange('')}>
                    <CloseIcon color="primary"/>
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={93}
            />
          </FormControl>
        </ListItem>
        <ListItem>
          <Typography style={{fontWeight: "bold"}}> Players </Typography>
        </ListItem>
        {newGame.players.map((player, index) => (
          <Fade key={index} in>
            <ListItem>
              <TextField label="Player Name" variant="outlined"
                         value={player.name}
                         style={{flex: "1"}}
                         onChange={(e) => handleNameChange(e.target.value, index)}
                         error={!player.name}
              />
              <IconButton onClick={() => handleDelete(index)}>
                <DeleteIcon color="primary"/>
              </IconButton>
            </ListItem>
          </Fade>
        ))}
        <ListItem style={{justifyContent: "center"}}>
          <IconButton onClick={addPlayer}>
            <AddIcon color="primary"/>
          </IconButton>
        </ListItem>
      </List>
      <Divider/>
      <Button color="primary"
              onClick={() => onSubmit(newGame)}
              disabled={canSubmit()}
      >
        New Game
      </Button>
    </Dialog>
  );
}
