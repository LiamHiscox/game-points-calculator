import React from 'react';
import './Player.scss';
import type {PlayerModel, PointModel} from '../../models/player.model';

interface PlayerProps {
  player: PlayerModel;
  playerIndex: number;
  onPointsChange: (points: PointModel[]) => void;
  onInputFocus: (index: number) => void;
  handleChangePointsFocus: (index: number) => void;
  handleChangeCommentFocus: (index: number) => void;
  commentFields: boolean;
  readonly: boolean;
}

function Player({
                  player,
                  playerIndex,
                  onPointsChange,
                  onInputFocus,
                  handleChangePointsFocus,
                  handleChangeCommentFocus,
                  readonly,
                  commentFields
                }: PlayerProps): React.JSX.Element {

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

  const handlePointsKeyUp = (key: string, index: number) => {
    if (key !== 'Enter') return;
    handleChangePointsFocus(index);
  }

  const handleCommentKeyUp = (key: string, index: number) => {
    if (key !== 'Enter') return;
    handleChangeCommentFocus(index);
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
    <div className="player-container">
      {player.points.map((p, i) => (
        <div className="player-points player-input-cell" key={i}>
          <form className="points-input-form" onSubmit={e => e.preventDefault()}>
            <input className={typeof p.points === 'number' ? 'points-input' : 'points-input empty-input'}
                  enterKeyHint='go'
                  id={`points-input-${playerIndex}-${i}`}
                  type="number"
                  value={typeof p.points === 'number' ? p.points : ''}
                  onSubmit={e => e.preventDefault()}
                  onKeyUp={(e) => handlePointsKeyUp(e.key, i)}
                  onChange={(e): void => handlePointsChange(e, i)}
                  onClick={(e): void => { 
                    e.currentTarget.select();
                    onInputFocus(i);
                  }}
                  disabled={readonly}
            />
          </form>
          {commentFields && !(readonly && typeof p.points !== 'number') && (
            <form className="comment-input-form" onSubmit={e => e.preventDefault()}>
              <input className="comment-input"
                    id={`comment-input-${playerIndex}-${i}`}
                    type="text"
                    value={p?.comment || ''}
                    onKeyUp={(e) => handleCommentKeyUp(e.key, i)}
                    onChange={(e): void => handleCommentChange(e, i)}
                    onClick={(e): void => {
                      e.currentTarget.select();
                      onInputFocus(i);
                    }}
                    disabled={readonly}
              />
            </form>
          )}
        </div>
      ))}
    </div>
  );
}

export default Player;
