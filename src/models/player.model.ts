export interface PlayerModel {
  id: string;
  name: string;
  points: Points[];
}

export type Points = number|null;
