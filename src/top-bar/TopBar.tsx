import './TopBar.scss';
import {IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Typography} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import GradeIcon from "@mui/icons-material/Grade";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import HistoryIcon from '@mui/icons-material/History';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import {ConfirmationDialog} from "../components/confirmation-dialog/ConfirmationDialog";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import LanguageIcon from '@mui/icons-material/Language';
import SortIcon from '@mui/icons-material/Sort';
import React from "react";
import {useTranslation} from "react-i18next";
import i18n from "i18next";

interface TopBarProps {
  gameName: string;
  canSaveGame: boolean;
  commentField: boolean;
  onAddPlayer: () => void;
  onClearPoints: (save: boolean) => void;
  onOpenDelete: () => void;
  onOpenLeaderBoard: () => void;
  onNewGame: () => void;
  onNameChange: (name: string) => void;
  onOpenHistory: () => void;
  showRows: boolean;
  onToggleRows: () => void;
  onOpenStats: () => void;
  onToggleCommentField: () => void;
  onSortPlayers: () => void;
}

export function TopBar({
                         commentField,
                         gameName,
                         canSaveGame,
                         onAddPlayer,
                         onClearPoints,
                         onOpenDelete,
                         onOpenLeaderBoard,
                         onNewGame,
                         onNameChange,
                         onOpenHistory,
                         showRows,
                         onToggleRows,
                         onOpenStats,
                         onToggleCommentField,
                         onSortPlayers
                       }: TopBarProps) {
  const [confirmationOpen, setConfirmationOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const {t} = useTranslation();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClearPoints = () => {
    setConfirmationOpen(true);
  }

  const handleClearConfirmation = (save: boolean) => {
    setConfirmationOpen(false);
    onClearPoints(save);
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  const nextLanguage = () => {
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
        <input type="text"
               className="game-name-input"
               value={gameName}
               onChange={e => onNameChange(e.target.value)}
               onClick={e => {
                 e.currentTarget.select()
               }}
        />
        <IconButton onClick={handleClick}>
          <MoreVertIcon className="top-bar-icon"/>
        </IconButton>
      </div>
      <Menu anchorEl={anchorEl}
            open={!!anchorEl}
            onClose={handleClose}
      >
        <MenuItem onClick={handleClearPoints}>
          <ListItemIcon> <RotateLeftIcon color="primary"/> </ListItemIcon>
          <ListItemText primary={<Typography> {t("headers.clearPoints")} </Typography>}/>
        </MenuItem>
        <MenuItem onClick={onOpenDelete}>
          <ListItemIcon> <DeleteIcon color="primary"/> </ListItemIcon>
          <ListItemText primary={<Typography> {t("headers.removePlayers")} </Typography>}/>
        </MenuItem>
        <MenuItem onClick={onAddPlayer}>
          <ListItemIcon> <AddIcon color="primary"/> </ListItemIcon>
          <ListItemText primary={<Typography> {t("headers.addPlayer")} </Typography>}/>
        </MenuItem>
        <MenuItem onClick={onSortPlayers}>
          <ListItemIcon> <SortIcon color="primary"/> </ListItemIcon>
          <ListItemText primary={<Typography> {t("headers.sortPlayers")} </Typography>}/>
        </MenuItem>
        <MenuItem onClick={onOpenLeaderBoard}>
          <ListItemIcon> <GradeIcon color="primary"/> </ListItemIcon>
          <ListItemText primary={<Typography> {t("headers.leaderboard")} </Typography>}/>
        </MenuItem>
        <MenuItem onClick={onNewGame}>
          <ListItemIcon> <AddCircleIcon color="primary"/> </ListItemIcon>
          <ListItemText primary={<Typography> {t("headers.newGame")} </Typography>}/>
        </MenuItem>
        <MenuItem onClick={onOpenHistory}>
          <ListItemIcon> <HistoryIcon color="primary"/> </ListItemIcon>
          <ListItemText primary={<Typography> {t("headers.history")} </Typography>}/>
        </MenuItem>
        <MenuItem onClick={onOpenStats}>
          <ListItemIcon> <ShowChartIcon color="primary"/> </ListItemIcon>
          <ListItemText primary={<Typography> {t("headers.statistics")} </Typography>}/>
        </MenuItem>
        <MenuItem onClick={onToggleCommentField}>
          {commentField ?
            (<ListItemIcon> <CheckBoxIcon color="primary"/> </ListItemIcon>) :
            (<ListItemIcon> <CheckBoxOutlineBlankIcon color="primary"/> </ListItemIcon>)
          }
          <ListItemText primary={<Typography> {t("headers.additionalTextField")} </Typography>}/>
        </MenuItem>
        <MenuItem onClick={nextLanguage}>
          <ListItemIcon> <LanguageIcon color="primary"/> </ListItemIcon>
          <ListItemText primary={<Typography>
            {i18n.language.startsWith('de') && 'English'}
            {i18n.language.startsWith('en') && 'Deutsch'}
          </Typography>}/>
        </MenuItem>
      </Menu>
      <ConfirmationDialog
        message={canSaveGame ? t("confirmationDialog.saveCurrentGame") : t("confirmationDialog.clearAllPoints")}
        open={confirmationOpen}
        onConfirm={() => handleClearConfirmation(true)}
        onDecline={() => canSaveGame ? handleClearConfirmation(false) : setConfirmationOpen(false)}
        onCancel={() => setConfirmationOpen(false)}
      />
    </>
  );
}
