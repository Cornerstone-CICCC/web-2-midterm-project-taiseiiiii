import { useQuery } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router';
import { tmdbApi } from '@/api/tmdb/endpoints';
import { getTMDBImageUrl } from '@/api/tmdb/client';
import { LoadingSpinner } from '@/shared/components/LoadingSpinner';
import { useWatchlist } from '@/features/watchlist/hooks/useWatchlist';
import { MovieCard } from '../components/MovieCard';
import styles from './MovieDetailPage.module.scss';

export function TVDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();

  const { data: tvShow, isLoading } = useQuery({
    queryKey: ['tv', id],
    queryFn: () => tmdbApi.getTVDetails(Number(id)),
    enabled: !!id,
  });

  const { data: credits } = useQuery({
    queryKey: ['tv', id, 'credits'],
    queryFn: () => tmdbApi.getTVCredits(Number(id)),
    enabled: !!id,
  });

  const { data: videos } = useQuery({
    queryKey: ['tv', id, 'videos'],
    queryFn: () => tmdbApi.getTVVideos(Number(id)),
    enabled: !!id,
  });

  const { data: similar } = useQuery({
    queryKey: ['tv', id, 'similar'],
    queryFn: () => tmdbApi.getSimilarTV(Number(id)),
    enabled: !!id,
  });

  if (isLoading) return <LoadingSpinner />;
  if (!tvShow) return <div className={styles.error}>TV Show not found</div>;

  const inWatchlist = isInWatchlist(tvShow.id);
  const trailer = videos?.results.find(v => v.type === 'Trailer' && v.site === 'YouTube');
  const topCast = credits?.cast.slice(0, 6) || [];

  const handleWatchlistToggle = () => {
    if (inWatchlist) {
      removeFromWatchlist(tvShow.id);
    } else {
      addToWatchlist({
        id: tvShow.id,
        title: tvShow.name,
        posterPath: tvShow.poster_path,
        voteAverage: tvShow.vote_average,
        mediaType: 'tv',
      });
    }
  };

  return (
    <div className={styles.detailPage}>
      <div
        className={styles.hero}
        style={{
          backgroundImage: tvShow.backdrop_path
            ? `url(${getTMDBImageUrl(tvShow.backdrop_path, 'original')})`
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
              {tvShow.poster_path ? (
                <img src={getTMDBImageUrl(tvShow.poster_path, 'w500')} alt={tvShow.name} />
              ) : (
                <div className={styles.placeholderPoster}>📺</div>
              )}
            </div>

            <div className={styles.details}>
              <h1 className={styles.title}>{tvShow.name}</h1>

              <div className={styles.meta}>
                <span className={styles.rating}>⭐ {tvShow.vote_average.toFixed(1)}</span>
                <span>{new Date(tvShow.first_air_date).getFullYear()}</span>
                {tvShow.episode_run_time[0] && <span>{tvShow.episode_run_time[0]} min/ep</span>}
                <span>{tvShow.number_of_seasons} Seasons</span>
              </div>

              <div className={styles.genres}>
                {tvShow.genres.map(genre => (
                  <span key={genre.id} className={styles.genre}>
                    {genre.name}
                  </span>
                ))}
              </div>

              {tvShow.tagline && <p className={styles.tagline}>{tvShow.tagline}</p>}

              <div className={styles.overview}>
                <h3>Overview</h3>
                <p>{tvShow.overview}</p>
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
                  title="TV Show Trailer"
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
              <h2>Similar TV Shows</h2>
              <div className={styles.similarGrid}>
                {similar.results.slice(0, 6).map(item => (
                  <MovieCard key={item.id} movie={item} mediaType="tv" />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
