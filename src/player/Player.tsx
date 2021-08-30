import React from "react";
import './Player.scss';
import {PlayerModel, Points} from "../models/player.model";

interface PlayerProps {
  player: PlayerModel;
  onPointsChange: (points: Points[]) => void;
}

function Player({player, onPointsChange}: PlayerProps) {

  if (player.points.length === 0 || player.points[player.points.length-1] !== null) {
    onPointsChange(player.points.concat(null));
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    if (e.target.value) {
      const newPoints = player.points.map((p, i) => i === index ? +e.target.value : p);
      if (index === player.points.length-1) {
        onPointsChange(newPoints.concat(null));
      } else {
        onPointsChange(newPoints);
      }
    }
  }

  return (
    <div className="player-container">
      <div className="player-name">
        {player.name}
      </div>
      { player.points.map((p, i) => (
        <div className="player-points" key={i}>
          <input className="points-input"
                 type="number"
                 defaultValue={p !== null ? p : undefined}
                 onBlur={(e) => handleChange(e, i)}/>
        </div>
      )) }
      <div className="player-scores">
        { player.points.reduce((a: number, b: Points) => a + (b || 0), 0) }
      </div>
    </div>
  );
}

export default Player;
