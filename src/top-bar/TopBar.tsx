import './TopBar.scss';
import {IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Typography} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import GradeIcon from "@material-ui/icons/Grade";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import HistoryIcon from '@material-ui/icons/History';
import {ConfirmationDialog} from "../components/confirmation-dialog/ConfirmationDialog";
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import React from "react";

interface TopBarProps {
  gameName: string;
  onAddPlayer: () => void;
  onClearPoints: () => void;
  onOpenDelete: () => void;
  onOpenLeaderBoard: () => void;
  onNewGame: () => void;
  onNameChange: (name: string) => void;
  onOpenHistory: () => void;
  showRows: boolean;
  onToggleRows: () => void;
}

export function TopBar({
                         gameName,
                         onAddPlayer,
                         onClearPoints,
                         onOpenDelete,
                         onOpenLeaderBoard,
                         onNewGame,
                         onNameChange,
                         onOpenHistory,
                         showRows,
                         onToggleRows
                       }: TopBarProps) {
  const [confirmationOpen, setConfirmationOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClearPoints = () => {
    setConfirmationOpen(true);
  }

  const handleClearConfirmation = () => {
    setConfirmationOpen(false);
    onClearPoints();
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
      </Menu>
      <ConfirmationDialog message="Are you sure you want to clear all points?"
                          open={confirmationOpen}
                          onConfirm={handleClearConfirmation}
                          onDecline={() => setConfirmationOpen(false)}
      />
    </>
  );
}
