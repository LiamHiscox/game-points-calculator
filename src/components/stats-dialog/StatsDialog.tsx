import './StatsDialog.scss';
import React, {useEffect, useState} from 'react';
import {Dialog, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import {PlayerModel} from "../../models/player.model";
import {CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis, ResponsiveContainer} from "recharts";
import randomcolor from "randomcolor";
import {Payload} from 'recharts/types/component/DefaultTooltipContent';

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
  const [maxRounds, setMaxRounds] = useState<number>(0);

  useEffect(() => {
    if (open) {
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
    }
  }, [players, open]);

  useEffect(() => {
    if (open) {
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

      setData(newData);
      setMaxRounds(maxRounds);
    }
  }, [players, open]);

  const height = window.innerHeight * 0.75 > 300 ? 300 : window.innerHeight * 0.75;
  const width = maxRounds * 30 > window.innerWidth * 0.75 ? maxRounds * 30 : "100%";

  return (
    <Dialog open={open}
            onClose={onClose}
            fullWidth
    >
      <div style={{padding: '1rem'}}>
        <div style={{marginLeft: '-2.5rem', overflow: 'hidden', overflowX: 'auto'}}>
          <ResponsiveContainer width={width} height={height > 300 ? 300 : height}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="round" label="Round" />
              <YAxis/>
              <Tooltip isAnimationActive={false}
                       labelFormatter={(label) => `Round ${label}`}
                       itemSorter={(item: Payload<number, string>) => -(item.value || 0)}
              />
              <Legend />
              {players.map(player => (
                <Line type="monotone" dataKey={player.name} stroke={randomcolor({luminosity: 'dark'})} key={player.id}/>
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div style={{overflow: 'auto'}}>
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
