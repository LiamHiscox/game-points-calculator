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
import {ConfirmationDialog} from "../components/confirmation-dialog/ConfirmationDialog";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import React from "react";

interface TopBarProps {
  gameName: string;
  canSaveGame: boolean;
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
}

export function TopBar({
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
                         onOpenStats
                       }: TopBarProps) {
  const [confirmationOpen, setConfirmationOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

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

  return (
    <>
      <div className="top-bar">
        <IconButton onClick={onToggleRows}>
          {showRows ?
            <KeyboardArrowLeftIcon className="top-bar-icon"/> :
            <KeyboardArrowRightIcon className="top-bar-icon"/>
          }
        </IconButton>
        <input type="text" className="game-name-input"
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
          <ListItemIcon> <RotateLeftIcon color="secondary"/> </ListItemIcon>
          <ListItemText primary={<Typography color="primary"> Clear Points </Typography>}/>
        </MenuItem>
        <MenuItem onClick={onOpenDelete}>
          <ListItemIcon> <DeleteIcon color="secondary"/> </ListItemIcon>
          <ListItemText primary={<Typography color="primary"> Remove Players </Typography>}/>
        </MenuItem>
        <MenuItem onClick={onAddPlayer}>
          <ListItemIcon> <AddIcon color="secondary"/> </ListItemIcon>
          <ListItemText primary={<Typography color="primary"> Add Player </Typography>}/>
        </MenuItem>
        <MenuItem onClick={onOpenLeaderBoard}>
          <ListItemIcon> <GradeIcon color="secondary"/> </ListItemIcon>
          <ListItemText primary={<Typography color="primary"> Leaderboard </Typography>}/>
        </MenuItem>
        <MenuItem onClick={onNewGame}>
          <ListItemIcon> <AddCircleIcon color="secondary"/> </ListItemIcon>
          <ListItemText primary={<Typography color="primary"> New Game </Typography>}/>
        </MenuItem>
        <MenuItem onClick={onOpenHistory}>
          <ListItemIcon> <HistoryIcon color="secondary"/> </ListItemIcon>
          <ListItemText primary={<Typography color="primary"> History </Typography>}/>
        </MenuItem>
        <MenuItem onClick={onOpenStats}>
          <ListItemIcon> <ShowChartIcon color="secondary"/> </ListItemIcon>
          <ListItemText primary={<Typography color="primary"> Stats </Typography>}/>
        </MenuItem>
      </Menu>
      <ConfirmationDialog message={canSaveGame ? "Do you want to save the current game to the history?" : "Are you sure you want to clear all points?"}
                          open={confirmationOpen}
                          onConfirm={() => handleClearConfirmation(true)}
                          onDecline={() => canSaveGame ? handleClearConfirmation(false) : setConfirmationOpen(false)}
                          onCancel={() => setConfirmationOpen(false)}
      />
    </>
  );
}
