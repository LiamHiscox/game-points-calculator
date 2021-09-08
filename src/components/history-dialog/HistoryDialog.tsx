import './HistoryDialog.scss';
import {
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
  IconButton
} from "@material-ui/core";
import {useState} from "react";
import {GameModel} from "../../models/game.model";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {Points} from "../../models/player.model";
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import DeleteIcon from '@material-ui/icons/Delete';
import ReplayIcon from '@material-ui/icons/Replay';
import {PointsTable} from "../../points-table/PointsTable";
import {ConfirmationDialog} from "../confirmation-dialog/ConfirmationDialog";
import {useSnackbar} from "notistack";

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
  const {enqueueSnackbar} = useSnackbar();

  const handleDetailClick = (game: GameModel) => {
    setGame(game);
    setShowGame(true);
  }

  const handleReplayClick = (game: GameModel) => {
    setGame(game);
    setShowConfirmReplay(true);
  }

  const handleReplay = () => {
    game && onReturnPlaying(game);
    setShowConfirmReplay(false);
  }

  const handleDeleteClick = (game: GameModel) => {
    setGame(game);
    setShowConfirm(true);
  }

  const handleDelete = () => {
    setShowConfirm(false);
    game && onDeleteGame(game.id);
    game && enqueueSnackbar(`Successfully deleted game ${game.name}`, {variant: "success"})
  }

  return (
    <Dialog fullWidth
            open={open}
            onClose={onClose}>
      {games.length <= 0 && (
        <Typography>No past games found!</Typography>
      )}
      {games.map((game, i) => (
        <Accordion key={i}>
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
                      {player.points.reduce((a: number, b: Points) => a + (b || 0), 0)}
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
            </div>
          </AccordionActions>
        </Accordion>
      ))}
      <Dialog open={showGame}
              onClose={() => setShowGame(false)}>
        <PointsTable players={game?.players || []}
                     onPlayerNameChange={() => {}}
                     onPointsChange={() => {}}
                     readonly={true}
        />
      </Dialog>
      <ConfirmationDialog message={`Are you sure you want to delete ${game?.name}?`}
                          open={showConfirm}
                          onConfirm={handleDelete}
                          onDecline={() => setShowConfirm(false)}
      />
      <ConfirmationDialog message={`Are you sure you want to replay ${game?.name}?`}
                          open={showConfirmReplay}
                          onConfirm={handleReplay}
                          onDecline={() => setShowConfirmReplay(false)}
      />
    </Dialog>
  );
}
