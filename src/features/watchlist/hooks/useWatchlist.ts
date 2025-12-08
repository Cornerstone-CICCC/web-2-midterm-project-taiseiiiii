import { useState, useEffect } from 'react';
import { watchlistStorage, type WatchlistItem } from '../utils/watchlistStorage';

export function useWatchlist() {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);

  useEffect(() => {
    setWatchlist(watchlistStorage.getAll());
  }, []);

  const addToWatchlist = (item: Omit<WatchlistItem, 'addedAt'>) => {
    watchlistStorage.add(item);
    setWatchlist(watchlistStorage.getAll());
  };

  const removeFromWatchlist = (id: number) => {
    watchlistStorage.remove(id);
    setWatchlist(watchlistStorage.getAll());
  };

  const isInWatchlist = (id: number) => {
    return watchlistStorage.has(id);
  };

  const clearWatchlist = () => {
    watchlistStorage.clear();
    setWatchlist([]);
  };

  return {
    watchlist,
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist,
    clearWatchlist,
  };
}
