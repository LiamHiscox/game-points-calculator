import {GameModel} from "../models/game.model";


export const openGamesDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("games");

    request.onupgradeneeded = () => {
      request.result.createObjectStore("games", {keyPath: "id"});
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export const getAllGames = (db: IDBDatabase): Promise<GameModel[]> => {
  return new Promise((resolve, reject) => {
    const tx = db.transaction("games", "readonly");
    const store = tx.objectStore("games");
    const request = store.getAll();

    request.onsuccess = () => {
      const games = (request.result as GameModel[]).map(game => ({...game, timestamp: new Date(game.timestamp)}));
      games
        .sort((a: GameModel, b: GameModel) =>  b.timestamp.getTime() - a.timestamp.getTime());
      resolve(games);
    };
    request.onerror = () => reject(request.error);
  });
}

export const saveGame = (game: GameModel) => {
  const request = indexedDB.open("games");
  request.onsuccess = () => {
    const tx = request.result.transaction("games", "readwrite");
    const store = tx.objectStore("games");
    store.put(game);
  };
}

export const deleteGame = (id: string) => {
  const request = indexedDB.open("games");
  request.onsuccess = () => {
    const tx = request.result.transaction("games", "readwrite");
    const store = tx.objectStore("games").delete(id);
  };
}

