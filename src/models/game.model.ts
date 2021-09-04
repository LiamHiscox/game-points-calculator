import {PlayerModel} from "./player.model";

export interface GameModel {
  name: string;
  players: PlayerModel[];
}
