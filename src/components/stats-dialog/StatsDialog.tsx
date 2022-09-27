import './StatsDialog.scss';
import { Chip, Dialog, Typography } from "@mui/material";
import { PlayerModel } from "../../models/player.model";
import { MinMaxTable } from './min-max-table/MinMaxTable';
import { LineGraph } from './line-graph/LineGraph';
import { BarChart } from './bar-chart/BarChart';
import randomcolor from "randomcolor";

interface StatsDialogProps {
  open: boolean;
  players: PlayerModel[];
  onClose: () => void;
}

export function StatsDialog({ open, players, onClose }: StatsDialogProps) {
  const colors = randomcolor({count: players.length, luminosity: 'dark'});

  return (
    <Dialog open={open}
      onClose={onClose}
      fullWidth
    >
      <div style={{ padding: '1rem' }}>
      <Typography variant="h6"> Game Progress </Typography>
        <div style={{ overflow: 'hidden', overflowX: 'auto' }}>
          <LineGraph players={players} colors={colors} />
        </div>
        <div style={{ margin: '1rem 0' }}>
          {players.map((player, i) => (
            <Chip label={player.name} style={{backgroundColor: colors[i], color: 'white'}} />
          ))}
        </div>
        <Typography variant="h6"> Points Per Round </Typography>
        <div style={{ overflow: 'hidden', overflowX: 'auto' }}>
          <BarChart players={players} colors={colors} />
        </div>
        <div style={{ margin: '1rem 0' }}>
          {players.map((player, i) => (
            <Chip label={player.name} style={{backgroundColor: colors[i], color: 'white'}} />
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
