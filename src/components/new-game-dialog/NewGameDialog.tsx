import './NewGameDialog.scss';
import {
  AppBar,
  Button,
  Dialog,
  IconButton,
  List,
  ListItem,
  TextField,
  Toolbar,
  Typography,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Autocomplete,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import React, {useEffect, useRef, useState} from 'react';
import {v4 as uuidv4} from 'uuid';
import type {GameModel} from '../../models/game.model';
import type {PlayerModel} from '../../models/player.model';
import {UpTransition} from '../up-transition/UpTransition';
import {DraggableList} from '../draggable-list/DraggableList';
import {useTranslation} from 'react-i18next';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { HelpTooltip } from '../help-tooltip/HelpTooltip';
import { useViewportHeightState } from '../../util/viewport-height.util';

interface NewGameDialogProps {
  open: boolean;
  gameNames: string[];
  playerNames: string[];
  onClose: () => void;
  onSubmit: (game: GameModel) => void;
}

export function NewGameDialog({open, gameNames, playerNames, onClose, onSubmit}: NewGameDialogProps): React.JSX.Element {
  const [id, setId] = useState<string>('');
  const [timestamp, setTimestamp] = useState<Date>(new Date());
  const [commentFields, setCommentFields] = useState<boolean>(false);
  const [showStartingPlayer, setShowStartingPlayer] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [players, setPlayers] = useState<PlayerModel[]>([{ id: uuidv4(), name: '', points: [] }]);
  const [focus, setFocus] = useState<boolean>(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const {t} = useTranslation();
  const {height} = useViewportHeightState();

  useEffect(() => {
    if (open) {
      setId(uuidv4());
      setTimestamp(new Date());
    }
  }, [open]);

  const handleDelete = (index: number): void => {
    setPlayers(players.filter((_, i) => i !== index));
  }

  const handleNameChange = (name: string, index: number): void => {
    setPlayers(players.map((player, i) => index === i ? {...player, name} : player));
  }

  const handleKeyUp = (key: string, index: number): void => {
    if (key != 'Enter') return;
    if (index == players.length - 1) {
      addPlayer()
    } else {
      document.getElementById(`player-name-input-${index + 1}`)?.focus()
    }
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

  const handlePlayerFocus = (index: number): void => {
    const top = 155 + 72 * index;
    dialogRef.current?.scrollTo({top, behavior: 'smooth'});
  }

  const reset = () => {
    setName('');
    setPlayers([{
      id: uuidv4(),
      name: '',
      points: []
    }]);
    setCommentFields(false);
    setShowStartingPlayer(false);
  }

  const handleSubmit = (): void => {
    reset();
    onSubmit({id, timestamp, commentFields, name, players, showStartingPlayer});
  } 

  return (
    <Dialog fullScreen
            open={open}
            onClose={onClose}
            slots={{transition: UpTransition}}
    >
      <div ref={dialogRef} className='new-game-form' style={{height: height }}>
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
            <ListItem className="reset-item">
              <Button onClick={reset}>{t('common.reset')}</Button>
            </ListItem>
            <ListItem>
              <Autocomplete
                freeSolo
                fullWidth
                options={gameNames}
                onInputChange={(_, value) => setName(value)}
                inputValue={name}
                renderInput={(props) => (
                  <TextField {...props} error={!name} label={t('newGame.game')} />
                )}
              />
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
                          renderListItem={(player, index): React.JSX.Element => (
                            <>
                              <div className="drag-icon-container">
                                <DragIndicatorIcon color="primary"/>
                              </div>
                              <Autocomplete
                                freeSolo
                                fullWidth
                                options={playerNames}
                                inputValue={player.name}
                                onInputChange={(_, value): void => handleNameChange(value, index)}
                                renderInput={(props) => (
                                  <TextField
                                    {...props}
                                    id={`player-name-input-${index}`}
                                    label={t('newGame.name')}
                                    variant="outlined"
                                    autoFocus={focus && index === players.length - 1}
                                    onKeyUp={(event) => handleKeyUp(event.key, index)}
                                    onSubmit={() => console.log('onSubmit')}
                                    onFocus={(): void => handlePlayerFocus(index)}
                                    error={!player.name}
                                  />
                                )}
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
                onClick={handleSubmit}
                disabled={canSubmit()}
        >
          {t('newGame.start')}
        </Button>
      </div>
    </Dialog>
  );
}
