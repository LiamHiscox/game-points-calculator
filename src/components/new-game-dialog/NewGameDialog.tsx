import './NewGameDialog.scss';
import {
  AppBar,
  Button,
  Dialog,
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
  Checkbox,
  FormControlLabel,
  FormGroup
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import React, {useEffect, useRef, useState} from 'react';
import {v4 as uuidv4} from 'uuid';
import {GameModel} from '../../models/game.model';
import {PlayerModel} from '../../models/player.model';
import {UpTransition} from '../up-transition/UpTransition';
import {DraggableList} from '../draggable-list/DraggableList';
import {useTranslation} from 'react-i18next';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { HelpTooltip } from '../help-tooltip/HelpTooltip';

interface NewGameDialogProps {
  open: boolean;
  game: GameModel;
  onClose: () => void;
  onSubmit: (game: GameModel) => void;
}

export function NewGameDialog({open, game, onClose, onSubmit}: NewGameDialogProps): JSX.Element {
  const [id, setId] = useState<string>('');
  const [timestamp, setTimestamp] = useState<Date>(new Date());
  const [commentFields, setCommentFields] = useState<boolean>(false);
  const [showStartingPlayer, setShowStartingPlayer] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [players, setPlayers] = useState<PlayerModel[]>([]);
  const [focus, setFocus] = useState<boolean>(false);
  const inputEl = useRef<HTMLInputElement>(null);
  const {t} = useTranslation();

  useEffect(() => {
    if (open) {
      setId(uuidv4());
      setTimestamp(new Date());
      setName(game.name);
      setPlayers(game.players.map(player => ({...player, points: [{}]})));
      setCommentFields(game.commentFields);
      setShowStartingPlayer(game.showStartingPlayer);
    }
  }, [game, open]);

  const handleDelete = (index: number): void => {
    setPlayers(players.filter((_, i) => i !== index));
  }

  const handleClear = (): void => {
    inputEl?.current?.focus();
    setName('');
  }

  const handleGameNameChange = (newName: string): void => {
    setName(newName);
  }

  const handleNameChange = (name: string, index: number): void => {
    setPlayers(players.map((player, i) => index === i ? {...player, name} : player));
  }

  const addPlayer = (): void => {
    setFocus(true);
    setPlayers(players.concat({id: uuidv4(), name: '', points: [{}]}));
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
            TransitionComponent={UpTransition}
    >
      <AppBar position="static">
        <Toolbar className="new-game-toolbar">
          <div/>
          <Typography variant="h6"> {t('newGame.startNewGame')} </Typography>
          <IconButton onClick={onClose} color="inherit">
            <CloseIcon/>
          </IconButton>
        </Toolbar>
      </AppBar>
      <div className="new-game-list">
        <List>
          <ListItem>
            <FormControl variant="outlined" className="player-name-form-control">
              <InputLabel> {t('newGame.game')} </InputLabel>
              <OutlinedInput type="text"
                             inputRef={inputEl}
                             value={name}
                             error={!name}
                             onChange={(e): void => handleGameNameChange(e.target.value)}
                             endAdornment={
                               <InputAdornment position="end">
                                 <IconButton onClick={handleClear}>
                                   <CloseIcon color="primary"/>
                                 </IconButton>
                               </InputAdornment>
                             }
                             label={t('newGame.game')}
              />
            </FormControl>
          </ListItem>
          <ListItem>
            <FormGroup>
              <FormControlLabel
                className="checkbox-form"
                control={
                  <Checkbox checked={commentFields} onClick={(): void => setCommentFields(!commentFields)}/>
                }
                label={t('newGame.showAdditionalTextField')}
              />
            </FormGroup>
            <HelpTooltip title={t('newGame.showAdditionalTextFieldHelp')}/>
          </ListItem>
          <ListItem>
            <FormGroup>
              <FormControlLabel
                className="checkbox-form"
                control={
                  <Checkbox checked={showStartingPlayer} onClick={(): void => setShowStartingPlayer(!showStartingPlayer)}/>
                }
                label={t('newGame.showStartingPlayer')}
              />
            </FormGroup>
            <HelpTooltip title={t('newGame.showStartingPlayerHelp')}/>
          </ListItem>
          <ListItem>
            <Typography style={{fontWeight: 'bold'}}> {t('newGame.players')} </Typography>
          </ListItem>
          <DraggableList items={players}
                         onSortChange={(sorted): void => setPlayers(sorted)}
                         listItemId={(player): string => player.id}
                         renderListItem={(player, index): JSX.Element => (
                           <>
                             <div className="drag-icon-container">
                               <DragIndicatorIcon color="primary"/>
                             </div>
                             <TextField label={t('newGame.name')}
                                        variant="outlined"
                                        autoFocus={focus && index === players.length - 1}
                                        value={player.name}
                                        style={{flex: '1'}}
                                        onChange={(e): void => handleNameChange(e.target.value, index)}
                                        error={!player.name}
                             />
                             <IconButton onClick={(): void => handleDelete(index)}>
                               <DeleteIcon color="primary"/>
                             </IconButton>
                           </>
                         )}
          />
          <ListItem style={{justifyContent: 'center'}}>
            <IconButton onClick={addPlayer}>
              <AddIcon color="primary"/>
            </IconButton>
          </ListItem>
        </List>
      </div>
      <Button color="primary"
              variant="contained"
              onClick={(): void => onSubmit({id, timestamp, commentFields, name, players, showStartingPlayer})}
              disabled={canSubmit()}
      >
        {t('newGame.start')}
      </Button>
    </Dialog>
  );
}
