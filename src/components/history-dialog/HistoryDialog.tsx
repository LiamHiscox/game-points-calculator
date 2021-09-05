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
  AccordionDetails, AccordionActions, Button
} from "@material-ui/core";
import {useEffect, useState} from "react";
import {GameModel} from "../../models/game.model";
import {getAllGames, openGamesDB} from "../../store/game.db";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {Points} from "../../models/player.model";

interface NewGameDialogProps {
  open: boolean;
  onClose: () => void;
  onReturnPlaying: (game: GameModel) => void;
  onDeleteGame: (id: string) => void;
}

export function HistoryDialog({open, onClose, onReturnPlaying, onDeleteGame}: NewGameDialogProps) {
  const [games, setGames] = useState<GameModel[] | null>(null);

  useEffect(() => {
    if (open) {
      (async () => {
        const db = await openGamesDB();
        const storedGames = await getAllGames(db);
        setGames(storedGames);
      })()
    }
    return () => {
    };
  }, [open]);

  return (
    <Dialog fullWidth
            open={open}
            onClose={onClose}>
      {(!games || games.length <= 0) && (
        <Typography>No past games found!</Typography>
      )}
      {games?.map((game, i) => (
        <Accordion key={i}>
          <AccordionSummary expandIcon={<ExpandMoreIcon color="primary"/>}>
            <div className="summary-container">
              <Typography>{game.name}</Typography>
              <Typography className="summary-subtitle" variant="caption">
                {game.timestamp.toLocaleDateString()} - {game.timestamp.toLocaleTimeString()}
              </Typography>
            </div>
          </AccordionSummary>
          <AccordionDetails>
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
            <Button color="primary" onClick={() => onDeleteGame(game.id)}> Delete </Button>
            <Button color="primary" variant="contained" onClick={() => onReturnPlaying(game)}> Return Playing </Button>
          </AccordionActions>
        </Accordion>
      ))}
    </Dialog>
  );
}
