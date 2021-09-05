import {GameModel} from "../models/game.model";
import {useEffect, useState} from "react";
import localForage from "localforage";

const gamesKey = 'games';

export interface GameStateProps {
  games: GameModel[],
  setGames: (games: GameModel[]) => void,
  deleteGame: (id: string) => void
  addGame: (game: GameModel) => void,
}

export const useGamesState = (): GameStateProps => {
  const [games, setStateGames] = useState<GameModel[]>([]);

  useEffect(() => {
    localForage
      .getItem<GameModel[]>(gamesKey)
      .then((games) => games && setStateGames(games));
  }, []);

  const setGames = async (newGames: GameModel[]) => {
    await localForage.setItem(gamesKey, newGames);
    setStateGames(newGames);
  }

  const deleteGame = async (id: string) => {
    const filteredGames = games.filter(game => game.id !== id);
    await localForage.setItem(gamesKey, filteredGames);
    setStateGames(filteredGames);
  }

  const addGame = async (game: GameModel) => {
    const newGames = games.concat(game);
    await localForage.setItem(gamesKey, newGames);
    setStateGames(newGames);
  }

  return {games, setGames, deleteGame, addGame};
}
