import './StatsDialog.scss';
import { AppBar, Chip, Dialog, IconButton, Toolbar, Typography } from '@mui/material';
import { PlayerModel, ColorPlayerModel } from '../../models/player.model';
import { MinMaxTable } from './min-max-table/MinMaxTable';
import { LineGraph } from './line-graph/LineGraph';
import { StandingsGraph } from './standings-graph/StandingsGraph';
import { UpTransition } from '../up-transition/UpTransition';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

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

export function StatsDialog({ open, players, onClose }: StatsDialogProps): JSX.Element {
  const {t} = useTranslation();
  const [selected, setSelected] = useState<string[]>([]);
  const coloredPlayers = players.map<ColorPlayerModel>((p, i) => ({color: colors[i%colors.length], ...p}));
  const selectedPlayers = selected.length ? coloredPlayers.filter(p => selected.includes(p.id)) : coloredPlayers;

  const playerClicked = (player: PlayerModel): void => {
    if (selected.includes(player.id)) {
      setSelected(selected.filter(id => id !== player.id));
    } else {
      const newSelected = selected.concat(player.id);
      setSelected(newSelected.length !== players.length ? newSelected : []);
    }
  }

  const isHighlighted = (player: PlayerModel): boolean => {
    return !selected.length || selected.includes(player.id);
  }

  return (
    <Dialog open={open} onClose={onClose} fullScreen TransitionComponent={UpTransition}>
      <AppBar position="static">
        <Toolbar className="tool-bar">
          <div/>
          <Typography variant="h6"> {t('headers.statistics')} </Typography>
          <IconButton onClick={onClose} color="inherit"> <CloseIcon/> </IconButton>
        </Toolbar>
      </AppBar>
      <div style={{position: 'relative'}}>
        <div className='player-chips-container'>
          {selected.length ?
            <Chip
              label='X'
              style={{border: 'solid 1px black', backgroundColor: 'grey', color: 'white'}}
              className="select-none"
              onClick={() => setSelected([])}
            /> : <></>}
          {coloredPlayers.map((player, i) => (
            <Chip
              label={player.name}
              key={i}
              style={{border: 'solid 1px black', backgroundColor: player.color, color: 'white', opacity: isHighlighted(player) ? '1' : '0.5'}}
              className="select-none"
              onClick={() => playerClicked(player)}
            />
          ))}
        </div>
        <div className="content-container content-padding">
          <Typography variant="h6"> {t('stats.gameProgress')} </Typography>
          <div style={{ overflow: 'hidden', overflowX: 'auto', paddingBottom: '1rem' }}>
            <LineGraph players={selectedPlayers} accumalate />
          </div>
          <Typography variant="h6"> {t('stats.pointsPerRound')} </Typography>
          <div style={{ overflow: 'hidden', overflowX: 'auto', paddingBottom: '1rem' }}>
            <LineGraph players={selectedPlayers} />
          </div>
          <Typography variant="h6"> {t('stats.standingsPerRound')} </Typography>
          <div style={{ overflow: 'hidden', overflowX: 'auto', paddingBottom: '1rem' }}>
            <StandingsGraph players={selectedPlayers} />
          </div>
          <Typography variant="h6"> {t('stats.minMax')} </Typography>
          <div style={{ overflow: 'auto', paddingBottom: '1rem' }}>
            <MinMaxTable players={players} />
          </div>
        </div>
      </div>
    </Dialog>
  );
}
