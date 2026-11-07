import './PointsTable.scss';
import Player from './player/Player';
import type {PlayerModel, PointModel} from '../models/player.model';
import React, {useEffect, useRef, useState} from 'react';
import { Autocomplete } from '@mui/material';
import { useViewportHeightState } from '../util/viewport-height.util';
import { getWidth, getWidthBorderClass } from '../util/width-class.util';

interface PointsTableProps {
  players: PlayerModel[];
  playerNames: string[];
  onPlayerNameChange?: (name: string, id: string) => void;
  onPointsChange?: (points: PointModel[], id: string) => void;
  readonly: boolean;
  commentFields: boolean;
  showStartingPlayer: boolean;
  showIncrement: boolean;
  stepSize: number;
}

export function PointsTable({
                              players,
                              playerNames,
                              onPlayerNameChange,
                              onPointsChange,
                              readonly,
                              commentFields,
                              showStartingPlayer,
                              showIncrement,
                              stepSize
                            }: PointsTableProps): React.JSX.Element {
  const [rounds, setRounds] = useState<null[]>([]);
  const playerTableContainerRef = useRef<HTMLDivElement>(null);
  const [innerPlayers, setInnerPlayers] = useState<PlayerModel[]>(players);
  const [screenWidth, setScreenWidth] = useState(window.screen.width - 40);
  const [scrollTimeoutRef, setScrollTimeoutRef] = useState<number | null>(null);
  const [focusedInput, setFocusedInput] = useState<number | null>(null);
  const [focusedPlayer, setFocusedPlayer] = useState<number | null>(null);
  const {height} = useViewportHeightState();

  useEffect(() => {
    window.addEventListener('resize', () => setScreenWidth(window.screen.width), true);
  }, [])

  useEffect(() => setInnerPlayers(players), [players]);

  useEffect(() => {
    clearTimeout(scrollTimeoutRef ?? undefined);
    const ref = setTimeout(() => {
      window.scrollTo({top: 0});
      if (focusedInput !== null && focusedPlayer !== null) {
        const width = getWidth(showIncrement, commentFields);
        const height = 40;
        const top = height * (focusedInput - 1);
        const screenWidth = (window.screen.width / 2) - 20;
        const center = screenWidth - (width / 2);
        const left = (focusedPlayer * getWidth(showIncrement, commentFields)) - center;
        playerTableContainerRef.current?.scrollTo({left, top, behavior: 'smooth'});
      }
    }, 300);
    setScrollTimeoutRef(ref);
  }, [height, focusedInput, focusedPlayer]);

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

  const handleChangePointsFocus = (playerIndex: number, inputIndex: number): void => {
    const newPlayerIndex = (playerIndex + 1) % players.length;
    const isMaxInput = inputIndex === players[playerIndex].points.length - 1;
    const maxIndex = players[newPlayerIndex].points.length - 1;
    const maxInputIndex = !isMaxInput && inputIndex < maxIndex ? inputIndex : maxIndex;
    document.getElementById(`points-input-${newPlayerIndex}-${maxInputIndex}`)?.focus();
    handleInputFocus(maxInputIndex, newPlayerIndex)
  }

  const handleChangeCommentFocus = (playerIndex: number, inputIndex: number): void => {
    console.log('handleChangeCommentFocus', playerIndex, inputIndex)
    const newPlayerIndex = (playerIndex + 1) % players.length;
    const isMaxInput = inputIndex === players[playerIndex].points.length - 1;
    const maxIndex = players[newPlayerIndex].points.length - 1;
    const maxInputIndex = !isMaxInput && inputIndex < maxIndex ? inputIndex : maxIndex;
    document.getElementById(`comment-input-${newPlayerIndex}-${maxInputIndex}`)?.focus();
    handleInputFocus(maxInputIndex, newPlayerIndex)
  }

  const handleInputFocus = (inputIndex: number, playerIndex: number) => {
    setFocusedInput(inputIndex);
    setFocusedPlayer(playerIndex);
  }

  return (
    <div className="player-table-container-outer" ref={playerTableContainerRef}>
      <div className="points-rows-container rows-open">
        <div className='inner-points-rows-container'>
          <div className="player-row-placeholder-names"/>
          <div>
            {rounds.map((_, index) => (
              <div className="points-row-index" key={index}>
                {index + 1}
              </div>
            ))}
          </div>
          <div style={{flex: '1'}}/>
          <div className="player-row-placeholder-points"/>
        </div>
      </div>
      <div className="player-table-container">
        <div className="player-names">
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
                    onClick={(e): void => {
                      e.currentTarget.select()
                      handleInputFocus(0, index)
                    }}
                    style={{width: `${screenWidth / players.length}px`}}
                    className={`player-name ${getWidthBorderClass(showIncrement, commentFields)} ${showStartingPlayer && turn === index ? 'highlighted' : 'non-highlighted'}`}
                  />
                </div>
              )}
            />
          ))}
        </div>
        <div className="row-players-container">
          <div className="player-table">
            {players.map((player, playerIndex) => (
              <Player key={playerIndex}
                      player={player}
                      playerIndex={playerIndex}
                      onPointsChange={(points): void => onPointsChange && onPointsChange(points, player.id)}
                      onInputFocus={(inputIndex) => handleInputFocus(inputIndex, playerIndex)}
                      handleChangePointsFocus={(inputIndex) => handleChangePointsFocus(playerIndex, inputIndex)}
                      handleChangeCommentFocus={(inputIndex) => handleChangeCommentFocus(playerIndex, inputIndex)}
                      readonly={readonly}
                      commentFields={commentFields}
                      showIncrement={showIncrement}
                      stepSize={stepSize}
              />
            ))}
          </div>
        </div>
        <div className="player-scores">
          {players.map((player, i) =>
            <div className={`player-score player-header-cell ${getWidthBorderClass(showIncrement, commentFields)}`} key={i}>
              {player.points.reduce((sum: number, model: PointModel) => sum + (model.points || 0), 0)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
