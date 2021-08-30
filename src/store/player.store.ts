import {useEffect, useState} from "react";
import {PlayerModel} from "../models/player.model";

// const defaultState: PlayerModel[] = [];
const playersKey = 'players';

export const usePlayersState = (): [PlayerModel[], (players: PlayerModel[]) => void] => {
  const getPlayers = (): PlayerModel[] => {
    return JSON.parse(localStorage.getItem(playersKey) || '[]') as PlayerModel[];
  };

  const setPlayers = (players: PlayerModel[]) => {
    // localStorage.setItem(playersKey, JSON.stringify(players));
    setStatePlayers(players);
  }

  useEffect(() => {
    const timeout = setTimeout(() => localStorage.setItem(playersKey, JSON.stringify(players)), 1000);
    return () => clearTimeout(timeout);
  });

  const [players, setStatePlayers] = useState<PlayerModel[]>(getPlayers());

  return [players, setPlayers];
}
