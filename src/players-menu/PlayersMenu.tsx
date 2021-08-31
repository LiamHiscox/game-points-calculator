import React from "react";
import "./PlayersMenu.scss";
import {Fab, ListItemIcon, ListItemText, MenuItem, Popover, Typography} from "@material-ui/core";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
// import PeopleIcon from '@material-ui/icons/People';
import GradeIcon from '@material-ui/icons/Grade';

interface PlayersMenuProps {
  onAddPlayer: () => void;
  onClearPoints: () => void;
  onOpenDelete: () => void;
  onOpenLeaderBoard: () => void;
}

export function PlayersMenu({onAddPlayer, onClearPoints, onOpenDelete, onOpenLeaderBoard}: PlayersMenuProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <div className="fab-container">
        <Fab color="primary" onClick={handleClick}>
          <MoreVertIcon/>
        </Fab>
      </div>
      <Popover anchorEl={anchorEl}
               open={!!anchorEl}
               onClose={handleClose}
               anchorOrigin={{
                 vertical: 'top',
                 horizontal: 'right',
               }}
               transformOrigin={{
                 vertical: 'bottom',
                 horizontal: 'right',
               }}
      >
        <MenuItem onClick={onClearPoints}>
          <ListItemIcon> <RotateLeftIcon color="secondary"/> </ListItemIcon>
          <ListItemText primary={<Typography color="primary"> Clear Points </Typography>} />
        </MenuItem>
        <MenuItem onClick={onOpenDelete}>
          <ListItemIcon> <DeleteIcon color="secondary"/> </ListItemIcon>
          <ListItemText primary={<Typography color="primary"> Remove Players </Typography>} />
        </MenuItem>
        <MenuItem onClick={onAddPlayer}>
          <ListItemIcon> <AddIcon color="secondary"/> </ListItemIcon>
          <ListItemText primary={<Typography color="primary"> Add Player </Typography> } />
        </MenuItem>
        <MenuItem onClick={onOpenLeaderBoard}>
          <ListItemIcon> <GradeIcon color="secondary"/> </ListItemIcon>
          <ListItemText primary={<Typography color="primary"> Show Leaderboard </Typography>} />
        </MenuItem>
        {/*
        <MenuItem onClick={() => {}}>
          <ListItemIcon> <PeopleIcon color="secondary"/> </ListItemIcon>
          <ListItemText primary={<Typography color="primary"> Set Number of Players </Typography>} />
        </MenuItem>
        */}
      </Popover>
    </>
  );
}
