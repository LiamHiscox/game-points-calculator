import "./LeaderboardDialog.scss";
import {PlayerModel, Points} from "../../models/player.model";
import React, {useEffect, useState} from "react";
import Dialog from "@mui/material/Dialog";
import {
  Avatar,
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText
} from "@mui/material";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import logo from './poop.png';

interface LeaderboardDialogProps {
  players: PlayerModel[];
  open: boolean;
  onClose: () => void;
}

interface PlayerScores {
  position: number;
  name: string;
  score: number;
  last: boolean;
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
      score: player.points.reduce((sum: number, points: Points) => sum + (points?.points || 0), 0),
      last: false
    }))
    .sort((a, b) => sortOrder === 'asc' ? (a.score - b.score) : (b.score - a.score))
    .reduce((acc, cur, i) => {
      if (i > 0 && acc[i-1].score === cur.score) {
        return acc.concat({...cur, position: acc[i-1].position});
      } else {
        return acc.concat({...cur, position: i+1});
      }
    }, Array<PlayerScores>())
    .reduceRight((acc, cur, i, players) => {
      if (players.length - 1 === i && cur.position > 3) {
        return acc.concat({...cur, last: true});
      } else if ((acc.length-1) >= 0 && acc[acc.length-1].last && acc[acc.length-1].score === cur.score) {
        return acc.concat({...cur, last: true});
      } else {
        return acc.concat(cur);
      }
    }, Array<PlayerScores>())
    .reverse();

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
            {player.last && <img src={logo} alt="poop emoji"/>}
          </ListItem>
        ))}
      </List>
      <Divider/>
      <Button color="primary" onClick={onClose}> Close </Button>
    </Dialog>
  );
}
