import './PointsTable.scss';
import Player from './player/Player';
import type {PlayerModel, PointModel} from '../models/player.model';
import React, {useEffect, useRef, useState} from 'react';
import { Autocomplete } from '@mui/material';

interface PointsTableProps {
  players: PlayerModel[];
  playerNames: string[];
  onPlayerNameChange?: (name: string, id: string) => void;
  onPointsChange?: (points: PointModel[], id: string) => void;
  readonly: boolean;
  showRows: boolean;
  commentFields: boolean;
  showStartingPlayer: boolean;
}

export function PointsTable({
                              players,
                              playerNames,
                              onPlayerNameChange,
                              onPointsChange,
                              readonly,
                              showRows,
                              commentFields,
                              showStartingPlayer
                            }: PointsTableProps): React.JSX.Element {
  const [rounds, setRounds] = useState<null[]>([]);
  const playerTableContainerRef = useRef<HTMLDivElement>(null);
  const [innerPlayers, setInnerPlayers] = useState<PlayerModel[]>(players);
  const [screenWidth, setScreenWidth] = useState(window.screen.width);

  useEffect(() => {
    window.addEventListener('resize', () => setScreenWidth(window.screen.width), true);
  }, [])

  useEffect(() => setInnerPlayers(players), [players]);

  const filteredPoints = players
    .map(pl => pl.points.filter(p => typeof p.points === 'number'));
  const turn = filteredPoints
    .reduce((minLength, points) => minLength > points.length ? points.length : minLength, filteredPoints[0].length) % players.length;

  useEffect(() => {
    const max = players.reduce((m, {points}) => points.length > m ? points.length : m, 0);
    setRounds(new Array(max).fill(null));
  }, [players]);

  const handlePlayerNameChange = (name: string, id: string): void => {
    setInnerPlayers(players.map(player => player.id === id ? {...player, name} : player));
  }

  const handleBlur = (playerId: string) => {
    if (!onPlayerNameChange) return;
    const innerPlayer = innerPlayers.find(p => p.id === playerId);
    if (innerPlayer?.name) {
      onPlayerNameChange(innerPlayer.name, playerId);
    } else {
      setInnerPlayers(players);
    }
  }

  const scrollToInput = (index: number): void => {
    const top = 40 * (index - 1);
    window.scrollTo({top: 0});
    playerTableContainerRef.current?.scrollTo({top, behavior: 'smooth'});
  }

  const handleChangePointsFocus = (playerIndex: number, inputIndex: number): void => {
    const newPlayerIndex = (playerIndex + 1) % players.length;
    const isMaxInput = inputIndex === players[playerIndex].points.length - 1;
    const maxIndex = players[newPlayerIndex].points.length - 1;
    const maxInputIndex = !isMaxInput && inputIndex < maxIndex ? inputIndex : maxIndex;
    document.getElementById(`points-input-${newPlayerIndex}-${maxInputIndex}`)?.focus();
  }

  const handleChangeCommentFocus = (playerIndex: number, inputIndex: number): void => {
    const newPlayerIndex = (playerIndex + 1) % players.length;
    const isMaxInput = inputIndex === players[playerIndex].points.length - 1;
    const maxIndex = players[newPlayerIndex].points.length - 1;
    const maxInputIndex = !isMaxInput && inputIndex < maxIndex ? inputIndex : maxIndex;
    document.getElementById(`comment-input-${newPlayerIndex}-${maxInputIndex}`)?.focus();
  }

/*
<input className={`player-name ${showStartingPlayer && turn === index ? 'highlighted' : 'non-highlighted'}`}
        type="text"
        disabled={readonly}
        key={index}
        value={player.name}
        onBlur={() => handleBlur(player.id)}
        onChange={(e): void => onPlayerNameChange && handlePlayerNameChange(e.target.value, player.id)}
        onClick={(e): void => {e.currentTarget.select()}}
/>
*/

  return (
    <div className="player-table-container" ref={playerTableContainerRef}>
      <div className="player-names">
        <div className={`player-row-placeholder-names ${showRows ? 'placeholder-open' : 'placeholder-closed'}`}/>
        {innerPlayers.map((player, index) => (
          <Autocomplete
            key={player.id}
            freeSolo
            inputValue={player.name}
            onBlur={() => handleBlur(player.id)}
            onInputChange={(_, value): void => onPlayerNameChange && handlePlayerNameChange(value, player.id)}
            options={playerNames}
            disabled={readonly}
            style={{flex: '1', display: 'flex'}}
            renderInput={(params) => (
              <div ref={params.slotProps.input.ref} className='player-name-container'>
                <input
                  type="text"
                  {...params.slotProps.htmlInput}
                  onClick={(e): void => {e.currentTarget.select()}}
                  style={{width: `${screenWidth / players.length}px`}}
                  className={`player-name ${showStartingPlayer && turn === index ? 'highlighted' : 'non-highlighted'}`}
                />
              </div>
            )}
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
          {players.map((player, playerIndex) => (
            <Player key={playerIndex}
                    player={player}
                    playerIndex={playerIndex}
                    onPointsChange={(points): void => onPointsChange && onPointsChange(points, player.id)}
                    onInputFocus={scrollToInput}
                    handleChangePointsFocus={(inputIndex) => handleChangePointsFocus(playerIndex, inputIndex)}
                    handleChangeCommentFocus={(inputIndex) => handleChangeCommentFocus(playerIndex, inputIndex)}
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
