import './TopBar.scss';
import {Autocomplete, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Typography} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import GradeIcon from '@mui/icons-material/Grade';
import HistoryIcon from '@mui/icons-material/History';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import LanguageIcon from '@mui/icons-material/Language';
import SortIcon from '@mui/icons-material/Sort';
import StartIcon from '@mui/icons-material/Start';
import React, { useEffect, useState } from 'react';
import {useTranslation} from 'react-i18next';
import i18n from 'i18next';
import packageJson from '../../package.json';

interface TopBarProps {
  gameName: string;
  gameNames: string[];
  commentField: boolean;
  showStartingPlayer: boolean;
  showRows: boolean;
  showMenu: boolean;
  onAddPlayer: () => void;
  onStartNewRound: () => void;
  onOpenDelete: () => void;
  onOpenLeaderBoard: () => void;
  onNewGame: () => void;
  onNameChange: (name: string) => void;
  onOpenHistory: () => void;
  onToggleRows: () => void;
  onOpenStats: () => void;
  onToggleCommentField: () => void;
  onToggleShowStartingPlayer: () => void;
  onSortPlayers: () => void;
}

export function TopBar({
                         commentField,
                         showStartingPlayer,
                         gameName,
                         gameNames,
                         showRows,
                         showMenu,
                         onAddPlayer,
                         onStartNewRound,
                         onOpenDelete,
                         onOpenLeaderBoard,
                         onNewGame,
                         onNameChange,
                         onOpenHistory,
                         onToggleRows,
                         onOpenStats,
                         onToggleCommentField,
                         onToggleShowStartingPlayer,
                         onSortPlayers
                       }: TopBarProps): React.JSX.Element {
  const [innerGameName, setInnerGameName] = useState(gameName);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const {t} = useTranslation();

  useEffect(() => setInnerGameName(gameName), [gameName]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleBlur = () => {
    if (innerGameName) {
      onNameChange(innerGameName);
    } else {
      setInnerGameName(gameName);
    }
  }

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const nextLanguage = (): void => {
    const languages = Object.keys(i18n.services.resourceStore.data);
    const index = languages.indexOf(i18n.language);
    const newLanguage = languages[(index + 1) % languages.length];
    i18n.changeLanguage(newLanguage);
  }

  return (
    <>
      <div className="top-bar">
        <IconButton onClick={onToggleRows}>
          {showRows ?
            <KeyboardArrowLeftIcon className="top-bar-icon"/> :
            <KeyboardArrowRightIcon className="top-bar-icon"/>
          }
        </IconButton>
        <Autocomplete
          freeSolo
          fullWidth
          inputValue={innerGameName}
          onBlur={handleBlur}
          onInputChange={(_, value): void => setInnerGameName(value)}
          options={gameNames}
          renderInput={(params) => (
            <div ref={params.slotProps.input.ref} className='game-name-container'>
              <input type="text" {...params.slotProps.htmlInput} onClick={(e): void => {e.currentTarget.select()}} className="game-name-input" />
            </div>
          )}
      />
        <IconButton onClick={handleClick} style={{opacity: showMenu ? '1' : '0' }}>
          <MoreVertIcon className="top-bar-icon"/>
        </IconButton>
      </div>
      <Menu anchorEl={anchorEl}
            open={!!anchorEl}
            onClose={handleClose}
      >
        <MenuItem onClick={onStartNewRound}>
          <ListItemIcon> <RotateLeftIcon color="primary"/> </ListItemIcon>
          <ListItemText primary={<Typography> {t('headers.newRound')} </Typography>}/>
        </MenuItem>
        <MenuItem onClick={onOpenDelete}>
          <ListItemIcon> <DeleteIcon color="primary"/> </ListItemIcon>
          <ListItemText primary={<Typography> {t('headers.removePlayers')} </Typography>}/>
        </MenuItem>
        <MenuItem onClick={onAddPlayer}>
          <ListItemIcon> <AddIcon color="primary"/> </ListItemIcon>
          <ListItemText primary={<Typography> {t('headers.addPlayer')} </Typography>}/>
        </MenuItem>
        <MenuItem onClick={onSortPlayers}>
          <ListItemIcon> <SortIcon color="primary"/> </ListItemIcon>
          <ListItemText primary={<Typography> {t('headers.sortPlayers')} </Typography>}/>
        </MenuItem>
        <MenuItem onClick={onOpenLeaderBoard}>
          <ListItemIcon> <GradeIcon color="primary"/> </ListItemIcon>
          <ListItemText primary={<Typography> {t('headers.leaderboard')} </Typography>}/>
        </MenuItem>
        <MenuItem onClick={onNewGame}>
          <ListItemIcon> <StartIcon color="primary"/> </ListItemIcon>
          <ListItemText primary={<Typography> {t('headers.newGame')} </Typography>}/>
        </MenuItem>
        <MenuItem onClick={onOpenHistory}>
          <ListItemIcon> <HistoryIcon color="primary"/> </ListItemIcon>
          <ListItemText primary={<Typography> {t('headers.history')} </Typography>}/>
        </MenuItem>
        <MenuItem onClick={onOpenStats}>
          <ListItemIcon> <ShowChartIcon color="primary"/> </ListItemIcon>
          <ListItemText primary={<Typography> {t('headers.statistics')} </Typography>}/>
        </MenuItem>
        <MenuItem onClick={onToggleCommentField}>
          {commentField ?
            (<ListItemIcon> <CheckBoxIcon color="primary"/> </ListItemIcon>) :
            (<ListItemIcon> <CheckBoxOutlineBlankIcon color="primary"/> </ListItemIcon>)
          }
          <ListItemText primary={<Typography> {t('headers.additionalTextField')} </Typography>}/>
        </MenuItem>
        <MenuItem onClick={onToggleShowStartingPlayer}>
          {showStartingPlayer ?
            (<ListItemIcon> <CheckBoxIcon color="primary"/> </ListItemIcon>) :
            (<ListItemIcon> <CheckBoxOutlineBlankIcon color="primary"/> </ListItemIcon>)
          }
          <ListItemText primary={<Typography> {t('headers.showStartingPlayer')} </Typography>}/>
        </MenuItem>
        <MenuItem onClick={nextLanguage}>
          <ListItemIcon> <LanguageIcon color="primary"/> </ListItemIcon>
          <ListItemText primary={<Typography>
            {i18n.language.startsWith('de') && 'English'}
            {i18n.language.startsWith('en') && 'Deutsch'}
          </Typography>}/>
        </MenuItem>
        <Typography align='right' variant='overline' component='div' color='secondary' className='version-text'>
          {packageJson.version}
        </Typography>
      </Menu>
    </>
  );
}
