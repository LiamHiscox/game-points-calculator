import {GameModel} from "../models/game.model";
import {useEffect, useState} from "react";
import Dexie from "dexie";
import {useSnackbar} from "notistack";

export class GamesDatabase extends Dexie {
  public games: Dexie.Table<GameModel, string>;

  public constructor() {
    super("GamesDatabase");
    this.version(1).stores({
      games: "id,timestamp,name,players"
    });
    this.games = this.table('games');
  }
}

export interface GameStateProps {
  games: GameModel[];
  deleteGame: (id: string) => void;
  replayGame: (id: string) => void;
  addGame: (game: GameModel) => void;
}

export const useGamesState = (): GameStateProps => {
  const [games, setStateGames] = useState<GameModel[]>([]);
  const [db] = useState(new GamesDatabase());
  const {enqueueSnackbar} = useSnackbar();

  useEffect(() => {
    db.transaction('r', db.games, async () => {
      const storedGames = await db.games.orderBy("timestamp").reverse().toArray();
      setStateGames(storedGames);
    });
  }, [db]);

  const loadGames = async (): Promise<void> => {
    const storedGames = await db.games.orderBy("timestamp").reverse().toArray();
    setStateGames(storedGames);
  }

  const addGame = (newGame: GameModel): void => {
    db.transaction('rw', db.games, async () => {
      await db.games.add(newGame);
      await loadGames();
    });
  }

  const deleteGame = async (id: string): Promise<void> => {
    db.transaction('rw', db.games, async () => {
      await db.games.where("id").equals(id).delete();
      await loadGames();
      enqueueSnackbar(`Successfully deleted game`, {variant: "success"});
    });
  }

  const replayGame = async (id: string): Promise<void> => {
    db.transaction('rw', db.games, async () => {
      await db.games.where("id").equals(id).delete();
      await loadGames();
      enqueueSnackbar(`Successfully loaded old game`, {variant: "success"});
    });
  }

  return {games, deleteGame, replayGame, addGame};
}
