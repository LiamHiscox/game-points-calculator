import type { GameModel } from "../models/game.model";

export function getGameNames(games: GameModel[]): string[] {
    const gameNameMap = new Map<string, string>();
    games.forEach(game => {
        const gameName = game.name.trim();
        gameNameMap.set(gameName.toLowerCase(), gameName);
    });
    return Array.from(gameNameMap.values());
}

export function getPlayerNames(games: GameModel[]): string[] {
    const playerNameMap = new Map<string, string>();
    games.flatMap(game => game.players).forEach(player => {
        const playerName = player.name.trim();
        playerNameMap.set(playerName.toLowerCase(), playerName);
    });
    return Array.from(playerNameMap.values());
}