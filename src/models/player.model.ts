export interface PlayerModel {
  id: string;
  name: string;
  points: Points[];
}

export type Points = PointModel | null;

export interface PointModel {
  points?: number;
  comment?: string;
}
