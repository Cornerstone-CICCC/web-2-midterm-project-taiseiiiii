import { useWatchlist } from '../hooks/useWatchlist';
import { MovieCard } from '@/features/movies/components/MovieCard';
import styles from './WatchlistPage.module.scss';

export function WatchlistPage() {
  const { watchlist, clearWatchlist } = useWatchlist();

  if (watchlist.length === 0) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyContent}>
          <span className={styles.emptyIcon}>🤍</span>
          <h2>Your Watchlist is Empty</h2>
          <p>Start adding movies and TV shows you want to watch!</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.watchlistPage}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <h1>My Watchlist</h1>
            <p>{watchlist.length} items</p>
          </div>
          <button onClick={clearWatchlist} className={styles.clearButton}>
            Clear All
          </button>
        </div>

        <div className={styles.grid}>
          {watchlist.map(item => (
            <MovieCard
              key={item.id}
              movie={{
                id: item.id,
                title: item.title,
                name: item.title,
                poster_path: item.posterPath,
                vote_average: item.voteAverage,
                overview: '',
                backdrop_path: null,
                popularity: 0,
                genre_ids: [],
                original_language: '',
                vote_count: 0,
                adult: false,
                video: false,
                original_title: item.title,
                original_name: item.title,
                release_date: '',
                first_air_date: '',
                origin_country: [],
              }}
              mediaType={item.mediaType}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
