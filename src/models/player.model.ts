export interface PlayerModel {
  id: string;
  name: string;
  points: PointModel[];
}

export interface ColorPlayerModel {
  id: string;
  name: string;
  points: PointModel[];
  color: string;
}

export interface PointModel {
  points?: number;
  comment?: string;
}
