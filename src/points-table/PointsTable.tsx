import './PointsTable.scss';
import Player from "./player/Player";
import {PlayerModel, Points} from "../models/player.model";
import React, {useEffect, useState} from "react";

interface PointsTableProps {
  players: PlayerModel[];
  onPlayerNameChange?: (name: string, id: string) => void;
  onPointsChange?: (points: Points[], id: string) => void;
  readonly: boolean;
  showRows: boolean;
  commentFields: boolean;
}

export function PointsTable({
                              players,
                              onPlayerNameChange,
                              onPointsChange,
                              readonly,
                              showRows,
                              commentFields
                            }: PointsTableProps): JSX.Element {
  const [rounds, setRounds] = useState<null[]>([]);

  useEffect(() => {
    const max = players.reduce((m, {points}) => points.length > m ? points.length : m, 0);
    setRounds(new Array(max).fill(null));
  }, [players]);

  return (
    <div className="player-table-container">
      <div className="player-names">
        <div className={`player-row-placeholder-names ${showRows ? "placeholder-open" : "placeholder-closed"}`}/>
        {players.map((player, index) => (
          <input className="player-name"
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
        <div className={`points-rows-container ${showRows ? "rows-open" : "rows-closed"}`}>
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
                    readonly={readonly}
                    commentFields={commentFields}
            />
          ))}
        </div>
      </div>
      <div className="player-scores">
        <div className={`player-row-placeholder-points ${showRows ? "placeholder-open" : " placeholder-closed"}`}/>
        {players.map((player, i) =>
          <div className="player-score player-header-cell" key={i}>
            {player.points.reduce((sum: number, model: Points) => sum + (model?.points || 0), 0)}
          </div>
        )}
      </div>
    </div>
  );
}
