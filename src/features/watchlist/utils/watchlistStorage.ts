import type { MediaType } from '@/api/tmdb/types';

export interface WatchlistItem {
  id: number;
  title: string;
  posterPath: string | null;
  voteAverage: number;
  mediaType: MediaType;
  addedAt: string;
}

const WATCHLIST_KEY = 'cinevibe_watchlist';

export const watchlistStorage = {
  getAll: (): WatchlistItem[] => {
    try {
      const data = localStorage.getItem(WATCHLIST_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Failed to load watchlist:', error);
      return [];
    }
  },

  add: (item: Omit<WatchlistItem, 'addedAt'>): void => {
    try {
      const watchlist = watchlistStorage.getAll();
      const newItem: WatchlistItem = {
        ...item,
        addedAt: new Date().toISOString(),
      };
      const updated = [newItem, ...watchlist];
      localStorage.setItem(WATCHLIST_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error('Failed to add to watchlist:', error);
    }
  },

  remove: (id: number): void => {
    try {
      const watchlist = watchlistStorage.getAll();
      const updated = watchlist.filter(item => item.id !== id);
      localStorage.setItem(WATCHLIST_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error('Failed to remove from watchlist:', error);
    }
  },

  has: (id: number): boolean => {
    const watchlist = watchlistStorage.getAll();
    return watchlist.some(item => item.id === id);
  },

  clear: (): void => {
    try {
      localStorage.removeItem(WATCHLIST_KEY);
    } catch (error) {
      console.error('Failed to clear watchlist:', error);
    }
  },
};
