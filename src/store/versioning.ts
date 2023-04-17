import {gameKey} from "./game.store";
import {GameModel} from "../models/game.model";
import {PlayerModel, Points} from "../models/player.model";
import {GamesDatabase} from "./games.store";

const currentVersion = 1;

export async function migrate(): Promise<void> {
  const version = +(localStorage.getItem('version') || '');
  if (version < 1) {
    const storedGame = localStorage.getItem(gameKey);
    if (storedGame) {
      const parsed = JSON.parse(storedGame) as GameModel;
      const updated = updateGame(parsed);
      localStorage.setItem(gameKey, JSON.stringify(updated));
      const db = new GamesDatabase();
      const storedGames = await db.games.orderBy("timestamp").reverse().toArray();
      storedGames.forEach(game => {
        const updatedGame = updateGame(game);
        db.games.where("id").equals(game.id).modify(updatedGame);
      });
    }
  }
  localStorage.setItem('version', '' + currentVersion);
}


const updateGame = (game: GameModel): GameModel => {
  const players = game.players.map<PlayerModel>(player => {
    const newPoints = player.points.map(_p => {
      const points = _p as Points | number;
      if (typeof points === "number") {
        return {points};
      }
      return _p;
    });
    return {...player, points: newPoints};
  });
  return {...game, players};
}
