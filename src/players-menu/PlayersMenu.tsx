import React from "react";
import "./PlayersMenu.scss";
import {Fab, ListItemIcon, ListItemText, Menu, MenuItem} from "@material-ui/core";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

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
          <ListItemIcon> <AddCircleOutlineIcon/> </ListItemIcon>
          <ListItemText primary="Add Player" />
        </MenuItem>
        <MenuItem onClick={onClearPoints}>
          <ListItemIcon> <HighlightOffIcon/> </ListItemIcon>
          <ListItemText primary="Clear Points" />
        </MenuItem>
      </Menu>
    </>
  );
}
