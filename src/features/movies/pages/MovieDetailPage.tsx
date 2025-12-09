import { useQuery } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router';
import { tmdbApi } from '@/api/tmdb/endpoints';
import { getTMDBImageUrl } from '@/api/tmdb/client';
import { LoadingSpinner } from '@/shared/components/LoadingSpinner';
import { useWatchlist } from '@/features/watchlist/hooks/useWatchlist';
import { MovieCard } from '../components/MovieCard';
import styles from './MovieDetailPage.module.scss';

export function MovieDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();

  const { data: movie, isLoading: movieLoading } = useQuery({
    queryKey: ['movie', id],
    queryFn: () => tmdbApi.getMovieDetails(Number(id)),
    enabled: !!id,
  });

  const { data: credits } = useQuery({
    queryKey: ['movie', id, 'credits'],
    queryFn: () => tmdbApi.getMovieCredits(Number(id)),
    enabled: !!id,
  });

  const { data: videos } = useQuery({
    queryKey: ['movie', id, 'videos'],
    queryFn: () => tmdbApi.getMovieVideos(Number(id)),
    enabled: !!id,
  });

  const { data: similar } = useQuery({
    queryKey: ['movie', id, 'similar'],
    queryFn: () => tmdbApi.getSimilarMovies(Number(id)),
    enabled: !!id,
  });

  if (movieLoading) {
    return <LoadingSpinner />;
  }

  if (!movie) {
    return <div className={styles.error}>Movie not found</div>;
  }

  const inWatchlist = isInWatchlist(movie.id);
  const trailer = videos?.results.find(v => v.type === 'Trailer' && v.site === 'YouTube');
  const topCast = credits?.cast.slice(0, 6) || [];

  const handleWatchlistToggle = () => {
    if (inWatchlist) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist({
        id: movie.id,
        title: movie.title,
        posterPath: movie.poster_path,
        voteAverage: movie.vote_average,
        mediaType: 'movie',
      });
    }
  };

  return (
    <div className={styles.detailPage}>
      <div
        className={styles.hero}
        style={{
          backgroundImage: movie.backdrop_path
            ? `url(${getTMDBImageUrl(movie.backdrop_path, 'original')})`
            : 'none',
        }}
      >
        <div className={styles.heroOverlay}>
          <div className={styles.container}>
            <button onClick={() => navigate(-1)} className={styles.backButton}>
              ← Back
            </button>
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.container}>
          <div className={styles.mainInfo}>
            <div className={styles.poster}>
              {movie.poster_path ? (
                <img src={getTMDBImageUrl(movie.poster_path, 'w500')} alt={movie.title} />
              ) : (
                <div className={styles.placeholderPoster}>🎬</div>
              )}
            </div>

            <div className={styles.details}>
              <h1 className={styles.title}>{movie.title}</h1>

              <div className={styles.meta}>
                <span className={styles.rating}>⭐ {movie.vote_average.toFixed(1)}</span>
                <span>{new Date(movie.release_date).getFullYear()}</span>
                {movie.runtime && <span>{movie.runtime} min</span>}
              </div>

              <div className={styles.genres}>
                {movie.genres.map(genre => (
                  <span key={genre.id} className={styles.genre}>
                    {genre.name}
                  </span>
                ))}
              </div>

              {movie.tagline && <p className={styles.tagline}>{movie.tagline}</p>}

              <div className={styles.overview}>
                <h3>Overview</h3>
                <p>{movie.overview}</p>
              </div>

              <button onClick={handleWatchlistToggle} className={styles.watchlistBtn}>
                {inWatchlist ? '❤️ Remove from Watchlist' : '🤍 Add to Watchlist'}
              </button>
            </div>
          </div>

          {trailer && (
            <div className={styles.trailerSection}>
              <h2>Official Trailer</h2>
              <div className={styles.videoWrapper}>
                <iframe
                  src={`https://www.youtube.com/embed/${trailer.key}`}
                  title="Movie Trailer"
                  allowFullScreen
                />
              </div>
            </div>
          )}

          {topCast.length > 0 && (
            <div className={styles.castSection}>
              <h2>Top Cast</h2>
              <div className={styles.castGrid}>
                {topCast.map(member => (
                  <div key={member.id} className={styles.castCard}>
                    <div className={styles.castAvatar}>
                      {member.profile_path ? (
                        <img src={getTMDBImageUrl(member.profile_path, 'w500')} alt={member.name} />
                      ) : (
                        <div className={styles.placeholderAvatar}>👤</div>
                      )}
                    </div>
                    <h4>{member.name}</h4>
                    <p>{member.character}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {similar && similar.results.length > 0 && (
            <div className={styles.similarSection}>
              <h2>Similar Movies</h2>
              <div className={styles.similarGrid}>
                {similar.results.slice(0, 6).map(item => (
                  <MovieCard key={item.id} movie={item} mediaType="movie" />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
