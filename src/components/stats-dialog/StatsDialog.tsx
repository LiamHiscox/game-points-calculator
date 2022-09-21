import './StatsDialog.scss';
import React, {useEffect, useState} from 'react';
import {Dialog, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import {PlayerModel, Points} from "../../models/player.model";
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

interface MinMaxPointsModel {
  name: string;
  min: number;
  max: number;
}

export function StatsDialog({open, players, onClose}: StatsDialogProps) {
  const [data, setData] = useState<PointsDataModel[]>([]);
  const [minMaxData, setMinMaxData] = useState<MinMaxPointsModel[]>([]);
  const [min, setMin] = useState<number>(0);
  const [max, setMax] = useState<number>(0);

  useEffect(() => {
    const minMax = players.reduce((acc: MinMaxPointsModel[], player) => {
      const points = player.points.reduce((total: number[], p) => typeof p?.points === 'number' ? total.concat(p?.points) : total, []);
      const min = points.reduce((min, cur) => cur < min ? cur : min, points[0] || 0);
      const max = points.reduce((max, cur) => cur > max ? cur : max, points[0] || 0);
      return acc.concat({name: player.name, min, max});
    }, []);
    const min = minMax.reduce((min, cur) => cur.min < min ? cur.min : min, minMax[0]?.min || 0);
    const max = minMax.reduce((max, cur) => cur.max > max ? cur.max : max, minMax[0]?.max || 0);

    setMin(min);
    setMax(max);
    setMinMaxData(minMax);
  }, [players]);

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
      <div style={{overflow: 'hidden', padding: '2rem'}}>
        <div style={{marginLeft: '-2rem'}}>
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
        <div>
          <Table size="small">
            <TableHead>
              <TableRow>
              <TableCell/>
                {minMaxData.map((minMax, pi) => (
                  <TableCell key={pi}>{minMax.name}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Max</TableCell>
                {minMaxData.map((minMax, pi) => (
                  <TableCell key={pi} component="th" scope="row">
                    {minMax.max === max ? <strong>{minMax.max}</strong> : minMax.max}
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell>Min</TableCell>
                {minMaxData.map((minMax, pi) => (
                  <TableCell key={pi} component="th" scope="row">
                    {minMax.min === min ? <strong>{minMax.min}</strong> : minMax.min}
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </Dialog>
  );
}
