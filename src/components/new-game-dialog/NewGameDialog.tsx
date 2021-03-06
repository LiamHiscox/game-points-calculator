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
  Typography,
  Slide,
  Checkbox,
  FormControlLabel,
  FormGroup
} from "@mui/material";
import {TransitionProps} from "@mui/material/transitions";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from '@mui/icons-material/Close';
import React, {useEffect, useRef, useState} from "react";
import {v4 as uuidv4} from "uuid";
import {GameModel} from "../../models/game.model";
import {PlayerModel} from "../../models/player.model";

interface NewGameDialogProps {
  open: boolean;
  game: GameModel;
  onClose: () => void;
  onSubmit: (game: GameModel) => void;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props}/>;
});

export function NewGameDialog({open, game, onClose, onSubmit}: NewGameDialogProps) {
  const [id, setId] = useState<string>('');
  const [timestamp, setTimestamp] = useState<Date>(new Date());
  const [commentFields, setCommentFields] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [players, setPlayers] = useState<PlayerModel[]>([]);
  const [focus, setFocus] = useState<boolean>(false);
  const inputEl = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if(open) {
      setId(uuidv4());
      setTimestamp(new Date());
      setName(game.name);
      setPlayers(game.players.map(player => ({...player, points: [null]})));
    }
  }, [game, open]);

  const handleDelete = (index: number) => {
    setPlayers(players.filter((_, i) => i !== index));
  }

  const handleClear = () => {
    inputEl?.current?.focus();
    setName('');
  }

  const handleGameNameChange = (newName: string) => {
    setName(newName);
  }

  const handleNameChange = (name: string, index: number) => {
    setPlayers(players.map((player, i) => index === i ? {...player, name} : player));
  }

  const addPlayer = () => {
    setFocus(true);
    setPlayers(players.concat({id: uuidv4(), name: '', points: [null]}));
  }

  const canSubmit = (): boolean => {
    const emptyPlayerName = !!players.find(player => !player.name);
    const emptyGameName = !name;
    return emptyPlayerName || emptyGameName;
  }

  return (
    <Dialog fullScreen
            open={open}
            onClose={onClose}
            TransitionComponent={Transition}
    >
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
              <InputLabel> Game </InputLabel>
              <OutlinedInput type="text"
                             inputRef={inputEl}
                             value={name}
                             error={!name}
                             onChange={e => handleGameNameChange(e.target.value)}
                             endAdornment={
                               <InputAdornment position="end">
                                 <IconButton onClick={handleClear}>
                                   <CloseIcon color="primary"/>
                                 </IconButton>
                               </InputAdornment>
                             }
                             label="Game"
              />
            </FormControl>
          </ListItem>
          <ListItem>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox checked={commentFields} onClick={() => setCommentFields(!commentFields)} />
                }
                label="Additional Text Field"
              />
            </FormGroup>
          </ListItem>
          <ListItem>
            <Typography style={{fontWeight: "bold"}}> Players </Typography>
          </ListItem>
          {players.map((player, index, players) => (
            <Fade key={index} in>
              <ListItem>
                <TextField label="Name"
                           variant="outlined"
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
              onClick={() => onSubmit({id, timestamp, commentFields, name, players})}
              disabled={canSubmit()}
      >
        New Game
      </Button>
    </Dialog>
  );
}
