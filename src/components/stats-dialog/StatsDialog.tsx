import './StatsDialog.scss';
import {AppBar, Chip, Dialog, IconButton, Toolbar, Typography} from "@mui/material";
import { PlayerModel } from "../../models/player.model";
import { MinMaxTable } from './min-max-table/MinMaxTable';
import { LineGraph } from './line-graph/LineGraph';
import { BarChart } from './bar-chart/BarChart';
import {UpTransition} from "../up-transition/UpTransition";
import CloseIcon from "@mui/icons-material/Close";
import {useTranslation} from "react-i18next";

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
  const {t} = useTranslation();

  return (
    <Dialog open={open} onClose={onClose} fullScreen TransitionComponent={UpTransition}>
      <AppBar position="static">
        <Toolbar className="tool-bar">
          <div/>
          <Typography variant="h6"> {t("headers.statistics")} </Typography>
          <IconButton onClick={onClose} color="inherit"> <CloseIcon/> </IconButton>
        </Toolbar>
      </AppBar>
      <div className="content-container content-padding">
      <Typography variant="h6"> {t("stats.gameProgress")} </Typography>
        <div style={{ overflow: 'hidden', overflowX: 'auto' }}>
          <LineGraph players={players} colors={colors} />
        </div>
        <div style={{ margin: '1rem 0' }}>
          {players.map((player, i) => (
            <Chip label={player.name} key={i} style={{backgroundColor: colors[i%colors.length], color: 'white'}} />
          ))}
        </div>
        <Typography variant="h6"> {t("stats.pointsPerRound")} </Typography>
        <div style={{ overflow: 'hidden', overflowX: 'auto' }}>
          <BarChart players={players} colors={colors} />
        </div>
        <div style={{ margin: '1rem 0' }}>
          {players.map((player, i) => (
            <Chip label={player.name} key={i} style={{backgroundColor: colors[i%colors.length], color: 'white'}} />
          ))}
        </div>
        <Typography variant="h6"> {t("stats.minMax")} </Typography>
        <div style={{ overflow: 'auto' }}>
          <MinMaxTable players={players} />
        </div>
      </div>
    </Dialog>
  );
}
