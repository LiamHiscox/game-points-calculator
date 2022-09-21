import './StatsDialog.scss';
import React, {useEffect, useState} from 'react';
import {Dialog} from "@mui/material";
import {PlayerModel} from "../../models/player.model";
import {CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis, ResponsiveContainer} from "recharts";
import randomcolor from "randomcolor";

interface StatsDialogProps {
  open: boolean;
  players: PlayerModel[];
  onClose: () => void;
}

interface FilteredPlayerModel {
  id: string;
  name: string;
  points: number[];
}

interface PointsDataModel {
  round: number;
  [name: string]: number;
}

export function StatsDialog({open, players, onClose}: StatsDialogProps) {
  const [data, setData] = useState<PointsDataModel[]>([]);

  useEffect(() => {
    const newPlayers = players.map<FilteredPlayerModel>(player => {
      const points = player.points.reduce((acc: number[], cur) => {
        if (typeof cur?.points !== 'number') {
          return acc;
        }
        if (acc.length === 0) {
          return acc.concat(cur.points);
        }
        const lastSum = acc[acc.length - 1];
        return acc.concat(cur.points + lastSum);
      }, []);
      return {...player, points};
    });

    const maxRounds = newPlayers.reduce((max, cur) => cur.points.length > max ? cur.points.length : max, 0);

    const paddedPlayers = newPlayers.map(player => {
      const length = player.points.length;
      if (length < maxRounds) {
        const diff = maxRounds - length;
        const lastPoints = length > 0 ? player.points[length - 1] : 0;
        const diffArray = new Array(diff).fill(lastPoints);
        const padded = player.points.concat(...diffArray);
        return {...player, points: padded};
      }
      return player;
    });

    const newData = new Array(maxRounds)
      .fill(null)
      .map<PointsDataModel>((_, index) => {
        const playerPoints = paddedPlayers.reduce((acc: {[name: string]: number}, cur) => ({...acc, [cur.name]: cur.points[index]}), {});
        return {
          round: index+1,
          ...playerPoints
        };
      });

      console.log({newData, paddedPlayers, maxRounds, newPlayers, players});

      setData(newData);
  }, [players]);

  return (
    <Dialog open={open}
            onClose={onClose}
            fullWidth
    >
      <div style={{overflow: 'hidden', padding: '2rem 2rem 2rem 0'}}>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="round" label="Round" />
          <YAxis/>
          <Tooltip />
          <Legend />
          {players.map(player => (
            <Line type="monotone" dataKey={player.name} stroke={randomcolor({luminosity: 'dark'})} key={player.id}/>
          ))}
        </LineChart>
      </ResponsiveContainer>
      </div>
    </Dialog>
  );
}
