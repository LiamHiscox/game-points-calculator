import './NewGameDialog.scss';
import {
  AppBar,
  Button,
  Dialog,
  Fade,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  List,
  ListItem,
  OutlinedInput,
  TextField,
  Toolbar,
  Typography
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from '@material-ui/icons/Close';
import React, {useEffect, useRef, useState} from "react";
import {v4 as uuidv4} from "uuid";
import {GameModel} from "../../models/game.model";

interface NewGameDialogProps {
  open: boolean;
  game: GameModel;
  onClose: () => void;
  onSubmit: (game: GameModel) => void;
}

export function NewGameDialog({open, game, onClose, onSubmit}: NewGameDialogProps) {
  const [newGame, setNewGame] = useState<GameModel>({id: '', timestamp: new Date(), name: '', players: []});
  const [focus, setFocus] = useState<boolean>(false);
  const inputEl = useRef<HTMLInputElement>(null);

  useEffect(() => {
    open && setNewGame({
      id: uuidv4(),
      timestamp: new Date(),
      name: game.name,
      players: game.players.map(player => ({...player, points: [null]}))
    });
  }, [game, open]);

  const handleDelete = (index: number) => {
    setNewGame({
      ...newGame,
      players: newGame.players.filter((_, i) => i !== index)
    });
  }

  const handleClear = () => {
    inputEl?.current?.focus();
    setNewGame({...newGame, name: ''});
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
    setFocus(true);
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
    <Dialog fullScreen
            open={open}
            onClose={onClose}>
      <AppBar position="static">
        <Toolbar className="new-game-toolbar">
          <IconButton onClick={onClose} color="inherit">
            <CloseIcon/>
          </IconButton>
        </Toolbar>
      </AppBar>
      <div className="new-game-list">
        <List>
          <ListItem>
            <FormControl variant="outlined" className="player-name-form-control">
              <InputLabel> Game Name </InputLabel>
              <OutlinedInput type="text"
                             inputRef={inputEl}
                             value={newGame.name}
                             error={!newGame.name}
                             onChange={e => handleGameNameChange(e.target.value)}
                             endAdornment={
                               <InputAdornment position="end">
                                 <IconButton onClick={handleClear}>
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
          {newGame.players.map((player, index, players) => (
            <Fade key={index} in>
              <ListItem>
                <TextField label="Player Name" variant="outlined"
                           autoFocus={focus && index === players.length - 1}
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
      </div>
      <Button color="primary"
              variant="contained"
              onClick={() => onSubmit(newGame)}
              disabled={canSubmit()}
      >
        New Game
      </Button>
    </Dialog>
  );
}
