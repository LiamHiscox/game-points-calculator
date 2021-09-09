import {GameModel} from "../models/game.model";
import {useEffect, useState} from "react";
import Dexie from "dexie";
import {useSnackbar} from "notistack";

class GamesDatabase extends Dexie {
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
  games: GameModel[],
  deleteGame: (id: string) => void
  addGame: (game: GameModel) => void,
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

  const loadGames = async () => {
    const storedGames = await db.games.orderBy("timestamp").reverse().toArray();
    setStateGames(storedGames);
  }

  const addGame = (newGame: GameModel) => {
    db.transaction('rw', db.games, async () => {
      await db.games.add(newGame);
      await loadGames();
    });
  }

  const deleteGame = async (id: string) => {
    db.transaction('rw', db.games, async () => {
      await db.games.where("id").equals(id).delete();
      await loadGames();
      enqueueSnackbar(`Successfully deleted game`, {variant: "success"});
    });
  }

  return {games, deleteGame, addGame};
}
