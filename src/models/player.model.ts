export interface PlayerModel {
  id: string;
  name: string;
  points: Points[];
}

export interface ColorPlayerModel {
  id: string;
  name: string;
  points: Points[];
  color: string;
}

export type Points = PointModel | null;

export interface PointModel {
  points?: number;
  comment?: string;
}
