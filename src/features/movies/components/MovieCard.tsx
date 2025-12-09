import { Link } from 'react-router';
import { getTMDBImageUrl } from '@/api/tmdb/client';
import type { TMDBMovie, TMDBTVShow, MediaType } from '@/api/tmdb/types';
import { useWatchlist } from '@/features/watchlist/hooks/useWatchlist';
import styles from './MovieCard.module.scss';

interface MovieCardProps {
  movie: TMDBMovie | TMDBTVShow;
  mediaType: MediaType;
}

export function MovieCard({ movie, mediaType }: MovieCardProps) {
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();
  const inWatchlist = isInWatchlist(movie.id);

  const title = 'title' in movie ? movie.title : movie.name;
  const releaseDate = 'release_date' in movie ? movie.release_date : movie.first_air_date;
  const year = releaseDate ? new Date(releaseDate).getFullYear() : 'N/A';

  const handleWatchlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (inWatchlist) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist({
        id: movie.id,
        title,
        posterPath: movie.poster_path,
        voteAverage: movie.vote_average,
        mediaType,
      });
    }
  };

  return (
    <Link to={`/${mediaType}/${movie.id}`} className={styles.movieCard}>
      <button
        className={styles.favoriteBtn}
        onClick={handleWatchlistToggle}
        aria-label={inWatchlist ? 'Remove from watchlist' : 'Add to watchlist'}
      >
        {inWatchlist ? '❤️' : '🤍'}
      </button>
      <div className={styles.moviePoster}>
        {movie.poster_path ? (
          <img src={getTMDBImageUrl(movie.poster_path, 'w500')} alt={title} loading="lazy" />
        ) : (
          <div className={styles.placeholderPoster}>{mediaType === 'movie' ? '🎬' : '📺'}</div>
        )}
      </div>
      <div className={styles.movieInfo}>
        <h3 className={styles.movieTitle}>{title}</h3>
        <div className={styles.movieMeta}>
          {movie.vote_average > 0 && (
            <span className={styles.rating}>⭐ {movie.vote_average.toFixed(1)}</span>
          )}
          <span>{year}</span>
        </div>
      </div>
    </Link>
  );
}
