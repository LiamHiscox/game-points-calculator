import './Player.scss';
import {PlayerModel, Points} from "../models/player.model";
import React from "react";

interface PlayerProps {
  player: PlayerModel;
  onPointsChange: (points: Points[]) => void;
}

function Player({player, onPointsChange}: PlayerProps) {

  if (player.points.length === 0 || player.points[player.points.length-1] !== null) {
    onPointsChange(player.points.concat(null));
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newPoints = player.points.map((p, i) => i === index ? +e.target.value : p);
    if (index === player.points.length-1) {
      onPointsChange(newPoints.concat(null));
    } else {
      onPointsChange(newPoints);
    }
  }

  return (
    <div className="player-container">
      <div className="player-name">
        {player.name}
      </div>
      { player.points.map((p, i) => (
        <div className="player-points">
          <input className="points-input"
                 type="number"
                 value={p || undefined}
                 onChange={(e) => handleChange(e, i)}/>
        </div>
      )) }
    </div>
  );
}

export default Player;
