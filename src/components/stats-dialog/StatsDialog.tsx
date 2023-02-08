import './StatsDialog.scss';
import { Chip, Dialog, Typography } from "@mui/material";
import { PlayerModel } from "../../models/player.model";
import { MinMaxTable } from './min-max-table/MinMaxTable';
import { LineGraph } from './line-graph/LineGraph';
import { BarChart } from './bar-chart/BarChart';
import {UpTransition} from "../up-transition/UpTransition";

interface StatsDialogProps {
  open: boolean;
  players: PlayerModel[];
  onClose: () => void;
}

const colors = [
  '#ff0000',
  '#009933',
  '#0040ff',
  '#00cc99',  
  '#ff66ff',
  '#00ccff',
  '#cc9900',
  '#664400',
  '#ff00ff',
  '#666666',
  '#000066',
  '#660066',
  '#e6e600',
  '#006666',
  '#000000'
];

export function StatsDialog({ open, players, onClose }: StatsDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth TransitionComponent={UpTransition}>
      <div style={{ padding: '1rem' }}>
      <Typography variant="h6"> Game Progress </Typography>
        <div style={{ overflow: 'hidden', overflowX: 'auto' }}>
          <LineGraph players={players} colors={colors} />
        </div>
        <div style={{ margin: '1rem 0' }}>
          {players.map((player, i) => (
            <Chip label={player.name} key={i} style={{backgroundColor: colors[i%colors.length], color: 'white'}} />
          ))}
        </div>
        <Typography variant="h6"> Points Per Round </Typography>
        <div style={{ overflow: 'hidden', overflowX: 'auto' }}>
          <BarChart players={players} colors={colors} />
        </div>
        <div style={{ margin: '1rem 0' }}>
          {players.map((player, i) => (
            <Chip label={player.name} key={i} style={{backgroundColor: colors[i%colors.length], color: 'white'}} />
          ))}
        </div>
        <Typography variant="h6"> Min/Max </Typography>
        <div style={{ overflow: 'auto' }}>
          <MinMaxTable players={players} />
        </div>
      </div>
    </Dialog>
  );
}
