import "./LeaderboardDialog.scss";
import {PlayerModel, Points} from "../models/player.model";
import React, {useState} from "react";
import Dialog from "@material-ui/core/Dialog";
import {
  Avatar,
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText
} from "@material-ui/core";
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

interface LeaderboardDialogProps {
  players: PlayerModel[];
  open: boolean;
  onClose: () => void;
}

interface PlayerScores {
  name: string;
  score: number;
}

export function LeaderboardDialog({players, open, onClose}: LeaderboardDialogProps) {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  let sortedPlayers = players
    .map<PlayerScores>(player => ({
      name: player.name,
      score: player.points.reduce((a: number, b: Points) => a + (b || 0), 0)
    }))
    .sort((a, b) => a.score - b.score);

  if (sortOrder === 'desc') {
    sortedPlayers.reverse();
  }

  return (
    <Dialog open={open} fullWidth onClose={onClose}>
      {
        sortOrder === 'asc' ? (
          <Button
            color="primary"
            endIcon={<ArrowUpwardIcon/>}
            onClick={() => setSortOrder('desc')}
          >
            Highest First
          </Button>
        ) : (
          <Button
            color="primary"
            endIcon={<ArrowDownwardIcon/>}
            onClick={() => setSortOrder('asc')}
          >
            Lowest First
          </Button>
        )
      }
      <Divider/>
      <List>
        {sortedPlayers.map((player, index) => (
          <ListItem key={index}>
            <ListItemAvatar className={index < 3 ? 'place-' + (index + 1) : 'default-place'}>
              <Avatar> {player.score} </Avatar>
            </ListItemAvatar>
            <ListItemText primary={player.name}/>
          </ListItem>
        ))}
      </List>
      <Divider/>
      <Button color="primary" onClick={onClose}> Close </Button>
    </Dialog>
  );
}
