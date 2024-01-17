import React from 'react';
import './Player.scss';
import {PlayerModel, PointModel} from '../../models/player.model';

interface PlayerProps {
  player: PlayerModel;
  onPointsChange: (points: PointModel[]) => void;
  onInputFocus: (index: number) => void;
  commentFields: boolean;
  readonly: boolean;
}

function Player({
                  player,
                  onPointsChange,
                  onInputFocus,
                  readonly,
                  commentFields
                }: PlayerProps): JSX.Element {

  if (
    player.points.length === 0
    || typeof player.points[player.points.length - 1].points === 'number'
    || typeof player.points[player.points.length - 1].comment === 'string'
  ) {
    onPointsChange(player.points.concat({}));
  }

  const handlePointsChange = (e: React.ChangeEvent<HTMLInputElement>, index: number): void => {
    const points = e.target.value ? +e.target.value : undefined;
    const newPoints = player.points.map((p, i) => i === index ? {comment: p.comment, points} : p);
    onPointsChange(trimPoints(newPoints));
  }

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>, index: number): void => {
    const comment = e.target.value;
    const newPoints = player.points.map((p, i) => i === index ? {points: p.points, comment} : p);
    onPointsChange(trimPoints(newPoints));
  }

  const trimPoints = (points: PointModel[]): PointModel[] => {
    const reverseIndex = points
      .concat()
      .reverse()
      .findIndex(p => !!p.points?.toString() || (commentFields && !!p?.comment?.trim()));
    if (reverseIndex < 0) {
      return [{}];
    }
    return points.slice(0, points.length - reverseIndex).concat({});
  }

  return (
    <div className={readonly ? 'player-container' : 'player-container player-container-padding'}>
      {player.points.map((p, i) => (
        <div className="player-points player-input-cell" key={i}>
          <input className={typeof p.points === 'number' ? 'points-input' : 'points-input empty-input'}
                 type="number"
                 value={typeof p.points === 'number' ? p.points : ''}
                 onChange={(e): void => handlePointsChange(e, i)}
                 onClick={(e): void => { 
                   e.currentTarget.select();
                   onInputFocus(i);
                 }}
                 disabled={readonly}
          />
          {commentFields && !(readonly && typeof p.points !== 'number') && (
            <input className="comment-input"
                   type="text"
                   value={p?.comment || ''}
                   onChange={(e): void => handleCommentChange(e, i)}
                   onClick={(e): void => {
                     e.currentTarget.select();
                     onInputFocus(i);
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
