import {PlayerModel} from './player.model';

export interface GameModel {
  id: string;
  commentFields: boolean;
  showStartingPlayer: boolean;
  timestamp: Date;
  name: string;
  players: PlayerModel[];
}
