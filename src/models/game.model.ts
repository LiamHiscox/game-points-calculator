import type { PlayerModel } from "./player.model";

export interface GameModel {
  id: string;
  commentFields: boolean;
  showStartingPlayer: boolean;
  showIncrement: boolean;
  stepSize: number;
  timestamp: Date;
  name: string;
  players: PlayerModel[];
}
