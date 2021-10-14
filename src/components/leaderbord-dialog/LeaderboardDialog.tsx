import "./LeaderboardDialog.scss";
import {PlayerModel, Points} from "../../models/player.model";
import React, {useEffect, useState} from "react";
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
  position: number;
  name: string;
  score: number;
}

type Order = 'asc' | 'desc';

const initialOrder = (): Order => {
  const order = localStorage.getItem('order');
  return order === 'asc' || order === 'desc' ? order : 'asc';
}

export function LeaderboardDialog({players, open, onClose}: LeaderboardDialogProps) {
  const [sortOrder, setSortOrder] = useState<Order>(initialOrder());

  useEffect(() => localStorage.setItem('order', sortOrder), [sortOrder]);

  let sortedPlayers = players
    .map<PlayerScores>(player => ({
      position: 0,
      name: player.name,
      score: player.points.reduce((a: number, b: Points) => a + (b || 0), 0)
    }))
    .sort((a, b) => sortOrder === 'asc' ? (a.score - b.score) : (b.score - a.score))
    .reduce((acc, cur, i) => {
      if (i > 0 && acc[i-1].score === cur.score) {
        return acc.concat({...cur, position: acc[i-1].position});
      } else {
        return acc.concat({...cur, position: i+1});
      }
    }, Array<PlayerScores>());

  return (
    <Dialog open={open} fullWidth onClose={onClose} className="leaderboard-dialog">
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
      <List className="leaderboard-list">
        {sortedPlayers.map((player, index) => (
          <ListItem key={index}>
            <ListItemAvatar className={player.position <= 3 ? ('place-' + player.position) : 'default-place'}>
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
