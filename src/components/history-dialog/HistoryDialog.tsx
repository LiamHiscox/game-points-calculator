import './HistoryDialog.scss';
import {
  AppBar,
  Dialog,
  TableHead,
  Table,
  TableRow,
  TableCell,
  TableBody,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  AccordionActions,
  IconButton,
  Toolbar
} from "@mui/material";
import React, {useState} from "react";
import {GameModel} from "../../models/game.model";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Points} from "../../models/player.model";
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import DeleteIcon from '@mui/icons-material/Delete';
import ReplayIcon from '@mui/icons-material/Replay';
import CloseIcon from '@mui/icons-material/Close';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import {PointsTable} from "../../points-table/PointsTable";
import {ConfirmationDialog} from "../confirmation-dialog/ConfirmationDialog";
import {StatsDialog} from "../stats-dialog/StatsDialog"
import {UpTransition} from "../up-transition/UpTransition";
import {useTranslation} from "react-i18next";

interface NewGameDialogProps {
  open: boolean;
  onClose: () => void;
  onReturnPlaying: (game: GameModel) => void;
  onDeleteGame: (id: string) => void;
  games: GameModel[];
}

export function HistoryDialog({open, onClose, onReturnPlaying, onDeleteGame, games}: NewGameDialogProps) {
  const [game, setGame] = useState<GameModel | null>(null);
  const [showGame, setShowGame] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showConfirmReplay, setShowConfirmReplay] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(null);
  const {t} = useTranslation();

  const handleClose = () => {
    setExpanded(null);
    onClose();
  }

  const handleDetailClick = (game: GameModel) => {
    setGame(game);
    setShowGame(true);
  }

  const handleStatsClick = (game: GameModel) => {
    setGame(game);
    setShowStats(true);
  }

  const handleReplayClick = (game: GameModel) => {
    setGame(game);
    setShowConfirmReplay(true);
  }

  const handleReplay = () => {
    setShowConfirmReplay(false);
    game && onReturnPlaying(game);
    setExpanded(null);
  }

  const handleDeleteClick = (game: GameModel) => {
    setGame(game);
    setShowConfirm(true);
  }

  const handleDelete = () => {
    setShowConfirm(false);
    game && onDeleteGame(game.id);
    setExpanded(null);
  }

  const handleExpandedChange = (index: number) => {
    setExpanded(expanded === index ? null : index);
  }

  return (
    <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={UpTransition}>
      <AppBar position="static">
        <Toolbar className="tool-bar">
          <div></div>
          <Typography variant="h6"> {t("headers.history")} </Typography>
          <IconButton onClick={handleClose} color="inherit"> <CloseIcon/> </IconButton>
        </Toolbar>
      </AppBar>
      <div className="content-container">
      {games.length <= 0 && (
        <Typography>{t("history.noPastGamesFound")}</Typography>
      )}
      {games.map((game, i) => (
        <Accordion key={i} expanded={expanded === i} onChange={() => handleExpandedChange(i)}>
          <AccordionSummary expandIcon={<ExpandMoreIcon color="primary"/>}>
            <div className="summary-container">
              <Typography>{game.name}</Typography>
              <Typography className="summary-subtitle" variant="caption">
                {game.timestamp.toLocaleDateString()} - {game.timestamp.toLocaleTimeString()}
              </Typography>
            </div>
          </AccordionSummary>
          <AccordionDetails style={{overflow: "auto"}}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  {game.players.map((player, pi) => (
                    <TableCell key={pi}>{player.name}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  {game.players.map((player, pi) => (
                    <TableCell key={pi} component="th" scope="row">
                      {player.points.reduce((sum: number, points: Points) => sum + (points?.points || 0), 0)}
                    </TableCell>
                  ))}
                </TableRow>
              </TableBody>
            </Table>
          </AccordionDetails>
          <AccordionActions>
            <div className="history-actions">
              <IconButton onClick={() => handleDeleteClick(game)}>
                <DeleteIcon color="primary"/>
              </IconButton>
              <IconButton onClick={() => handleReplayClick(game)}>
                <ReplayIcon color="primary"/>
              </IconButton>
              <IconButton onClick={() => handleDetailClick(game)}>
                <ZoomInIcon color="primary"/>
              </IconButton>
              <IconButton onClick={() => handleStatsClick(game)}>
                <ShowChartIcon color="primary"/>
              </IconButton>
            </div>
          </AccordionActions>
        </Accordion>
      ))}
      <Dialog open={showGame} onClose={() => setShowGame(false)} fullScreen TransitionComponent={UpTransition}>
        <AppBar position="static">
          <Toolbar className="history-points-bar">
            <div/>
            <Typography variant="h6"> {game?.name} </Typography>
            <IconButton onClick={() => setShowGame(false)} color="inherit">
              <CloseIcon/>
            </IconButton>
          </Toolbar>
        </AppBar>
        <PointsTable players={game?.players || []}
                     readonly={true}
                     showRows={false}
                     commentFields={!!game?.commentFields}
        />
      </Dialog>
      <StatsDialog open={showStats}
                   onClose={() => setShowStats(false)}
                   players={game?.players || []}
      />
      <ConfirmationDialog message={`${t("confirmationDialog.deleteGame")} ${game?.name}?`}
                          open={showConfirm}
                          onConfirm={handleDelete}
                          onDecline={() => setShowConfirm(false)}
                          onCancel={() => setShowConfirm(false)}
      />
      <ConfirmationDialog message={`${t("confirmationDialog.replayGame")} ${game?.name}?`}
                          open={showConfirmReplay}
                          onConfirm={handleReplay}
                          onDecline={() => setShowConfirmReplay(false)}
                          onCancel={() => setShowConfirmReplay(false)}
      />
      </div>
    </Dialog>
  );
}
