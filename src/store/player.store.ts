import {useEffect, useState} from "react";
import {PlayerModel} from "../models/player.model";

const playersKey = 'players';
const initialPlayers: PlayerModel[] = JSON.parse(localStorage.getItem(playersKey) || '[]') as PlayerModel[];

export const usePlayersState = (): [PlayerModel[], (players: PlayerModel[]) => void] => {
  const setPlayers = (players: PlayerModel[]) => {
    setStatePlayers(players);
  }

  useEffect(() => {
    const timeout = setTimeout(() => localStorage.setItem(playersKey, JSON.stringify(players)), 1000);
    return () => clearTimeout(timeout);
  });

  const [players, setStatePlayers] = useState<PlayerModel[]>(initialPlayers);

  return [players, setPlayers];
}
