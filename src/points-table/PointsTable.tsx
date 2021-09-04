import './PointsTable.scss';
import Player from "./player/Player";
import {PlayerModel, Points} from "../models/player.model";
import React from "react";

interface PointsTableProps {
  players: PlayerModel[];
  onPlayerNameChange: (name: string, id: string) => void;
  onPointsChange: (points: Points[], id: string) => void;
}

export function PointsTable({players, onPlayerNameChange, onPointsChange}: PointsTableProps) {
  return (
    <div className="player-table-container">
      <div className="player-names">
        {players.map((player, index) => (
          <input className="player-name" type="text"
                 key={index}
                 value={player.name}
                 onChange={(e) => onPlayerNameChange(e.target.value, player.id)}
                 onClick={(e) => {e.currentTarget.select()}}
          />
        ))}
      </div>
      <div className="player-table">
        {players.map((player, i) => (
          <Player key={i}
                  player={player}
                  onPointsChange={(points) => onPointsChange(points, player.id)}/>
        ))}
      </div>
      <div className="player-scores">
        {players.map((player, i) =>
          <div className="player-score player-header-cell" key={i}>
            {player.points.reduce((a: number, b: Points) => a + (b || 0), 0)}
          </div>
        )}
      </div>
    </div>
  );
}
