import {PlayerModel} from "./player.model";

export interface GameModel {
  id: string;
  timestamp: Date;
  name: string;
  players: PlayerModel[];
}
