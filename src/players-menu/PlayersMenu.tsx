import React from "react";
import "./PlayersMenu.scss";
import {Fab, ListItemIcon, ListItemText, Menu, MenuItem, Typography} from "@material-ui/core";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import PeopleIcon from '@material-ui/icons/People';

interface PlayersMenuProps {
  onAddPlayer: () => void;
  onClearPoints: () => void;
}

export function PlayersMenu({onAddPlayer, onClearPoints}: PlayersMenuProps) {
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
      <Menu anchorEl={anchorEl}
            open={!!anchorEl}
            onClose={handleClose}
      >
        <MenuItem onClick={onAddPlayer}>
          <ListItemIcon> <AddIcon color="secondary"/> </ListItemIcon>
          <ListItemText primary={<Typography color="primary"> Add Player </Typography> } />
        </MenuItem>
        <MenuItem onClick={() => {}}>
          <ListItemIcon> <PeopleIcon color="secondary"/> </ListItemIcon>
          <ListItemText primary={<Typography color="primary"> Set Number of Players </Typography>} />
        </MenuItem>
        <MenuItem onClick={onClearPoints}>
          <ListItemIcon> <RotateLeftIcon color="secondary"/> </ListItemIcon>
          <ListItemText primary={<Typography color="primary"> Clear Points </Typography>} />
        </MenuItem>
        <MenuItem onClick={() => {}}>
          <ListItemIcon> <ClearIcon color="secondary"/> </ListItemIcon>
          <ListItemText primary={<Typography color="primary"> Remove Players </Typography>} />
        </MenuItem>
      </Menu>
    </>
  );
}
