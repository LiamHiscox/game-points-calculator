import React from 'react';
import './Player.scss';
import type {PlayerModel, PointModel} from '../../models/player.model';
import { IconButton } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { getWidthClass } from '../../util/width-class.util';

interface PlayerProps {
  player: PlayerModel;
  playerIndex: number;
  onPointsChange: (points: PointModel[]) => void;
  onInputFocus: (index: number) => void;
  handleChangePointsFocus: (index: number) => void;
  handleChangeCommentFocus: (index: number) => void;
  commentFields: boolean;
  readonly: boolean;
  showIncrement: boolean;
  stepSize: number;
}

function Player({
                  player,
                  playerIndex,
                  onPointsChange,
                  onInputFocus,
                  handleChangePointsFocus,
                  handleChangeCommentFocus,
                  readonly,
                  commentFields,
                  showIncrement,
                  stepSize
                }: PlayerProps): React.JSX.Element {

  if (
    player.points.length === 0
    || typeof player.points[player.points.length - 1].points === 'number'
    || typeof player.points[player.points.length - 1].comment === 'string'
  ) {
    onPointsChange(player.points.concat({}));
  }

  const handleRemoveClick = (index: number): void => {
    const newPoints = player.points.map((p, i) => i === index ? {comment: p.comment, points: (p.points ?? 0) - stepSize} : p);
    onPointsChange(trimPoints(newPoints));
  }


  const handleAddClick = (index: number): void => {
    const newPoints = player.points.map((p, i) => i === index ? {comment: p.comment, points: (p.points ?? 0) + stepSize} : p);
    onPointsChange(trimPoints(newPoints));
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
    <div className={`player-container ${getWidthClass(showIncrement, commentFields)}`}>
      {player.points.map((p, i) => (
        <div className={`player-points player-input-cell  ${getWidthClass(showIncrement, commentFields)}`} key={i}>
          <form className={typeof p.points === 'number' ? 'points-input-form' : 'points-input-form empty-input'} onSubmit={e => e.preventDefault()}>
            {showIncrement && (<IconButton onClick={() => handleRemoveClick(i)}><RemoveIcon/></IconButton>)}
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
            {showIncrement && (<IconButton onClick={() => handleAddClick(i)}><AddIcon/></IconButton>)}
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
