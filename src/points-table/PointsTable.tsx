import './PointsTable.scss';
import Player from "./player/Player";
import {PlayerModel, Points} from "../models/player.model";
import React, {useEffect, useState} from "react";

interface PointsTableProps {
  players: PlayerModel[];
  onPlayerNameChange: (name: string, id: string) => void;
  onPointsChange: (points: Points[], id: string) => void;
  readonly: boolean;
  showRows: boolean;
}

export function PointsTable({
                              players,
                              onPlayerNameChange,
                              onPointsChange,
                              readonly,
                              showRows
                            }: PointsTableProps) {
  const [rounds, setRounds] = useState<null[]>([]);
  useEffect(() => {
    const max = players.reduce((m, {points}) => points.length > m ? points.length : m, 0);
    setRounds(new Array(max).fill(null));
  }, [players]);

  return (
    <div className="player-table-container">
      <div className="player-names">
        {!readonly && <div
          className={showRows ? "player-row-placeholder-names placeholder-open" : "player-row-placeholder-names placeholder-closed"}/>}
        {players.map((player, index) => (
          <input className="player-name" type="text"
                 disabled={readonly}
                 key={index}
                 value={player.name}
                 onChange={(e) => onPlayerNameChange(e.target.value, player.id)}
                 onClick={(e) => {
                   e.currentTarget.select()
                 }}
          />
        ))}
      </div>
      <div className="row-players-container">
        {!readonly && (
          <div className={showRows ? "points-rows-container rows-open" : "points-rows-container rows-closed"}>
            {rounds.map((_, index) => (
              <div className="points-row-index" key={index}>
                {index + 1}
              </div>
            ))}
          </div>
        )}
        <div className="player-table">
          {players.map((player, i) => (
            <Player key={i}
                    player={player}
                    onPointsChange={(points) => onPointsChange(points, player.id)}
                    readonly={readonly}
            />
          ))}
        </div>
      </div>
      <div className="player-scores">
        {!readonly && <div
          className={showRows ? "player-row-placeholder-points placeholder-open" : "player-row-placeholder-points placeholder-closed"}/>}
        {players.map((player, i) =>
          <div className="player-score player-header-cell" key={i}>
            {player.points.reduce((a: number, b: Points) => a + (b || 0), 0)}
          </div>
        )}
      </div>
    </div>
  );
}
