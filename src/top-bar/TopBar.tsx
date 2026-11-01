import './TopBar.scss';
import {
  Autocomplete,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
  SwipeableDrawer,
  List,
  ListItem,
  ListItemButton
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import GradeIcon from '@mui/icons-material/Grade';
import HistoryIcon from '@mui/icons-material/History';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import MenuIcon from '@mui/icons-material/Menu';
import LanguageIcon from '@mui/icons-material/Language';
import SortIcon from '@mui/icons-material/Sort';
import StartIcon from '@mui/icons-material/Start';
import ShareIcon from '@mui/icons-material/Share';
import React, { useEffect, useState } from 'react';
import {useTranslation} from 'react-i18next';
import i18n from 'i18next';
import packageJson from '../../package.json';
import { useSnackbar } from 'notistack';

interface TopBarProps {
  gameName: string;
  gameNames: string[];
  commentField: boolean;
  showStartingPlayer: boolean;
  showMenu: boolean;
  onAddPlayer: () => void;
  onStartNewRound: () => void;
  onOpenDelete: () => void;
  onOpenLeaderBoard: () => void;
  onNewGame: () => void;
  onNameChange: (name: string) => void;
  onOpenHistory: () => void;
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
                         showMenu,
                         onAddPlayer,
                         onStartNewRound,
                         onOpenDelete,
                         onOpenLeaderBoard,
                         onNewGame,
                         onNameChange,
                         onOpenHistory,
                         onOpenStats,
                         onToggleCommentField,
                         onToggleShowStartingPlayer,
                         onSortPlayers
                       }: TopBarProps): React.JSX.Element {
  const [innerGameName, setInnerGameName] = useState(gameName);
  const [showDrawer, setShowDrawer] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const {t} = useTranslation();
  const {enqueueSnackbar} = useSnackbar();

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

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText("https://liamhiscox.github.io/game-points-calculator/build/");
      enqueueSnackbar(t("headers.copiedUrl"));
    } catch (error) {
      enqueueSnackbar(t("headers.failedCopy"), {variant: "warning"});
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
        <IconButton onClick={() => setShowDrawer(true)}>
          <MenuIcon className="top-bar-icon"/>
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
          <SettingsIcon className="top-bar-icon"/>
        </IconButton>
      </div>
      <SwipeableDrawer open={showDrawer}
                       onClose={() => setShowDrawer(false)}
                       onOpen={() => setShowDrawer(true)}
      >
        <div className="drawer-container">
          <List>
            <ListItem disablePadding onClick={onNewGame}>
              <ListItemButton>
                <ListItemIcon> <StartIcon color="primary" /> </ListItemIcon>
                <ListItemText primary={<Typography> {t('headers.newGame')} </Typography>} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding onClick={onStartNewRound}>
              <ListItemButton>
                <ListItemIcon> <RotateLeftIcon color="primary" /> </ListItemIcon>
                <ListItemText primary={<Typography> {t('headers.newRound')} </Typography>} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding onClick={onOpenDelete}>
              <ListItemButton>
                <ListItemIcon> <DeleteIcon color="primary" /> </ListItemIcon>
                <ListItemText primary={<Typography> {t('headers.removePlayers')} </Typography>} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding onClick={onAddPlayer}>
              <ListItemButton>
                <ListItemIcon> <AddIcon color="primary" /> </ListItemIcon>
                <ListItemText primary={<Typography> {t('headers.addPlayer')} </Typography>} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding onClick={onSortPlayers}>
              <ListItemButton>
                <ListItemIcon> <SortIcon color="primary" /> </ListItemIcon>
                <ListItemText primary={<Typography> {t('headers.sortPlayers')} </Typography>} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding onClick={onOpenLeaderBoard}>
              <ListItemButton>
                <ListItemIcon> <GradeIcon color="primary" /> </ListItemIcon>
                <ListItemText primary={<Typography> {t('headers.leaderboard')} </Typography>} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding onClick={onOpenHistory}>
              <ListItemButton>
                <ListItemIcon> <HistoryIcon color="primary" /> </ListItemIcon>
                <ListItemText primary={<Typography> {t('headers.history')} </Typography>} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding onClick={onOpenStats}>
              <ListItemButton>
                <ListItemIcon> <ShowChartIcon color="primary" /> </ListItemIcon>
                <ListItemText primary={<Typography> {t('headers.statistics')} </Typography>} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding onClick={handleShare}>
              <ListItemButton>
                <ListItemIcon> <ShareIcon color="primary" /> </ListItemIcon>
                <ListItemText primary={<Typography> {t('headers.shareGame')} </Typography>} />
              </ListItemButton>
            </ListItem>
          </List>
          <Typography align='right' variant='overline' component='div' color='secondary' className='version-text'>
            {packageJson.version}
          </Typography>
        </div>
      </SwipeableDrawer>

      <Menu anchorEl={anchorEl}
            open={!!anchorEl}
            onClose={handleClose}
      >
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
      </Menu>
    </>
  );
}
