import './PointsTable.scss';
import Player from './player/Player';
import {PlayerModel, PointModel} from '../models/player.model';
import React, {useEffect, useRef, useState} from 'react';

interface PointsTableProps {
  players: PlayerModel[];
  onPlayerNameChange?: (name: string, id: string) => void;
  onPointsChange?: (points: PointModel[], id: string) => void;
  readonly: boolean;
  showRows: boolean;
  commentFields: boolean;
  showStartingPlayer: boolean;
}

export function PointsTable({
                              players,
                              onPlayerNameChange,
                              onPointsChange,
                              readonly,
                              showRows,
                              commentFields,
                              showStartingPlayer
                            }: PointsTableProps): JSX.Element {
  const [rounds, setRounds] = useState<null[]>([]);
  const playerTableContainerRef = useRef<HTMLDivElement>(null);

  const filteredPoints = players
    .map(pl => pl.points.filter(p => typeof p.points === 'number'));
  const turn = filteredPoints
    .reduce((minLength, points) => minLength > points.length ? points.length : minLength, filteredPoints[0].length) % players.length;

  useEffect(() => {
    const max = players.reduce((m, {points}) => points.length > m ? points.length : m, 0);
    setRounds(new Array(max).fill(null));
  }, [players]);

  const scrollToInput = (index: number): void => {
    const top = 40 * (index - 1);
    window.scrollTo({top: 0});
    playerTableContainerRef.current?.scrollTo({top, behavior: 'smooth'});
  }

  return (
    <div className="player-table-container" ref={playerTableContainerRef}>
      <div className="player-names">
        <div className={`player-row-placeholder-names ${showRows ? 'placeholder-open' : 'placeholder-closed'}`}/>
        {players.map((player, index) => (
          <input className={`player-name ${showStartingPlayer && turn === index ? 'highlighted' : 'non-highlighted'}`}
                 type="text"
                 disabled={readonly}
                 key={index}
                 value={player.name}
                 onChange={(e): void => onPlayerNameChange && onPlayerNameChange(e.target.value, player.id)}
                 onClick={(e): void => {e.currentTarget.select()}}
          />
        ))}
      </div>
      <div className="row-players-container">
        <div className={`points-rows-container ${showRows ? 'rows-open' : 'rows-closed'}`}>
          {rounds.map((_, index) => (
            <div className="points-row-index" key={index}>
              {index + 1}
            </div>
          ))}
        </div>
        <div className="player-table">
          {players.map((player, i) => (
            <Player key={i}
                    player={player}
                    onPointsChange={(points): void => onPointsChange && onPointsChange(points, player.id)}
                    onInputFocus={scrollToInput}
                    readonly={readonly}
                    commentFields={commentFields}
            />
          ))}
        </div>
      </div>
      <div className="player-scores">
        <div className={`player-row-placeholder-points ${showRows ? 'placeholder-open' : ' placeholder-closed'}`}/>
        {players.map((player, i) =>
          <div className="player-score player-header-cell" key={i}>
            {player.points.reduce((sum: number, model: PointModel) => sum + (model.points || 0), 0)}
          </div>
        )}
      </div>
    </div>
  );
}
