import { useQuery } from '@tanstack/react-query';
import { tmdbApi } from '@/api/tmdb/endpoints';
import { VibeCarousel } from '@/features/vibes/components/VibeCarousel';
import { TrendingSection } from '../components/TrendingSection';
import { LoadingSpinner } from '@/shared/components/LoadingSpinner';
import styles from './HomePage.module.scss';

export function HomePage() {
  const { data: trendingMovies, isLoading: moviesLoading } = useQuery({
    queryKey: ['trending', 'movies'],
    queryFn: tmdbApi.getTrendingMovies,
  });

  const { data: trendingTV, isLoading: tvLoading } = useQuery({
    queryKey: ['trending', 'tv'],
    queryFn: tmdbApi.getTrendingTV,
  });

  if (moviesLoading || tvLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className={styles.homePage}>
      <VibeCarousel />

      {trendingMovies && (
        <TrendingSection
          title="🔥 Trending Movies Today"
          items={trendingMovies.results}
          mediaType="movie"
        />
      )}

      {trendingTV && (
        <TrendingSection
          title="📺 Trending TV Shows Today"
          items={trendingTV.results}
          mediaType="tv"
        />
      )}
    </div>
  );
}
