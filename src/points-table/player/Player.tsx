import React from "react";
import './Player.scss';
import {PlayerModel, Points} from "../../models/player.model";

interface PlayerProps {
  player: PlayerModel;
  onPointsChange: (points: Points[]) => void;
  readonly: boolean;
}

function Player({player, onPointsChange, readonly}: PlayerProps) {

  if (player.points.length === 0 || player.points[player.points.length-1] !== null) {
    onPointsChange(player.points.concat(null));
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newValue = e.target.value ? +e.target.value : null;
    const newPoints = player.points.map((p, i) => i === index ? newValue : p);
    if (index === player.points.length-1) {
      onPointsChange(newPoints.concat(null));
    } else {
      onPointsChange(newPoints);
    }
  }

  return (
    <div className="player-container">
      { player.points.map((p, i) => (
        <div className="player-points player-input-cell" key={i}>
          {(!readonly || p !== null) && (
            <input className={p !== null ? "points-input" : "points-input empty-input"}
                   type="number"
                   value={p !== null ? p : ""}
                   onChange={(e) => handleChange(e, i)}
                   onClick={(e) => {e.currentTarget.select()}}
                   disabled={readonly}
            />
          )}
        </div>
      )) }
    </div>
  );
}

export default Player;
