import {gameKey} from './game.store';
import {GameModel} from '../models/game.model';
import {PlayerModel, PointModel} from '../models/player.model';
import {GamesDatabase} from './games.store';

const currentVersion = 2;

export async function migrate(): Promise<void> {
  const version = +(localStorage.getItem('version') || '');
  if (version < 2) {
    const storedGame = localStorage.getItem(gameKey);
    if (storedGame) {
      const parsed = JSON.parse(storedGame) as GameModel;
      const updated = updateGamePoints(parsed);
      localStorage.setItem(gameKey, JSON.stringify(updated));
      const db = new GamesDatabase();
      const storedGames = await db.games.orderBy('timestamp').reverse().toArray();
      storedGames.forEach(game => {
        const updatedGame = updateGamePoints(game);
        db.games.where('id').equals(game.id).modify(updatedGame);
      });
    }
  }
  if (version < 2) {
    const storedGame = localStorage.getItem(gameKey);
    if (storedGame) {
      const parsed = JSON.parse(storedGame) as GameModel;
      const updated = updateGamePointsModel(parsed);
      localStorage.setItem(gameKey, JSON.stringify(updated));
      const db = new GamesDatabase();
      const storedGames = await db.games.orderBy('timestamp').reverse().toArray();
      storedGames.forEach(game => {
        const updatedGame = updateGamePointsModel(game);
        db.games.where('id').equals(game.id).modify(updatedGame);
      });
    }
  }
  localStorage.setItem('version', '' + currentVersion);
}


const updateGamePoints = (game: GameModel): GameModel => {
  const players = game.players.map<PlayerModel>(player => {
    const newPoints = player.points.map(_p => {
      const points = _p as PointModel | number;
      if (typeof points === 'number') {
        return {points};
      }
      return points;
    });
    return {...player, points: newPoints};
  });
  return {...game, players};
}

const updateGamePointsModel = (game: GameModel): GameModel => {
  const players = game.players.map<PlayerModel>(player => {
    const newPoints = player.points.map(_p => {
      const points = _p as PointModel | null;
      if (points === null) {
        return {};
      }
      return points;
    });
    return {...player, points: newPoints};
  });
  return {...game, players};
}
