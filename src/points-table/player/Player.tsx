import React from 'react';
import './Player.scss';
import {PlayerModel, Points} from '../../models/player.model';

interface PlayerProps {
  player: PlayerModel;
  onPointsChange: (points: Points[]) => void;
  commentFields: boolean;
  readonly: boolean;
}

function Player({
                  player,
                  onPointsChange,
                  readonly,
                  commentFields
                }: PlayerProps): JSX.Element {

  if (player.points.length === 0 || player.points[player.points.length - 1] !== null) {
    onPointsChange(player.points.concat(null));
  }

  const handlePointsChange = (e: React.ChangeEvent<HTMLInputElement>, index: number): void => {
    const points = e.target.value ? +e.target.value : undefined;
    const newPoints = player.points.map((p, i) => i === index ? {comment: p?.comment, points} : p);
    onPointsChange(trimPoints(newPoints));
  }

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>, index: number): void => {
    const comment = e.target.value;
    const newPoints = player.points.map((p, i) => i === index ? {points: p?.points, comment} : p);
    onPointsChange(trimPoints(newPoints));
  }

  const trimPoints = (points: Points[]): Points[] => {
    const reverseIndex = points.concat().reverse().findIndex(p =>
      !!p?.points?.toString() || (commentFields && !!p?.comment?.trim()));
    if (reverseIndex < 0) {
      return [null];
    }
    return points.slice(0, points.length - reverseIndex).concat(null);
  }

  return (
    <div className="player-container">
      {player.points.map((p, i) => (
        <div className="player-points player-input-cell" key={i}>
          <input className={p !== null ? 'points-input' : 'points-input empty-input'}
                 type="number"
                 value={p && typeof p.points === 'number' ? p.points : ''}
                 onChange={(e): void => handlePointsChange(e, i)}
                 onClick={(e): void => {
                   e.currentTarget.select()
                 }}
                 disabled={readonly}
          />
          {commentFields && !(readonly && typeof p?.points !== 'number') && (
            <input className="comment-input"
                   type="text"
                   value={p?.comment || ''}
                   onChange={(e): void => handleCommentChange(e, i)}
                   onClick={(e): void => {
                     e.currentTarget.select()
                   }}
                   disabled={readonly}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default Player;
