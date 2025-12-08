import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router';
import { tmdbApi } from '@/api/tmdb/endpoints';
import { SearchBar } from '@/shared/components/SearchBar';
import { MovieCard } from '../components/MovieCard';
import { LoadingSpinner } from '@/shared/components/LoadingSpinner';
import styles from './SearchPage.module.scss';

export function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const vibe = searchParams.get('vibe');

  const { data, isLoading, error } = useQuery({
    queryKey: ['search', query, vibe],
    queryFn: () => {
      if (vibe) {
        const genreIds = vibe.split(',').map(Number);
        return tmdbApi.discoverMoviesByGenre(genreIds);
      }
      if (query) {
        return tmdbApi.searchMulti(query);
      }
      return Promise.reject('No search query');
    },
    enabled: !!(query || vibe),
  });

  if (!query && !vibe) {
    return (
      <div>
        <SearchBar />
        <div className={styles.noQuery}>
          <p>Start searching for movies and TV shows...</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div>
        <SearchBar />
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <SearchBar />
        <div className={styles.error}>Error loading results</div>
      </div>
    );
  }

  return (
    <div>
      <SearchBar />
      <div className={styles.searchResults}>
        <div className={styles.container}>
          <h1 className={styles.resultsTitle}>
            {query ? `Search Results for "${query}"` : 'Movies matching your vibe'}
          </h1>
          <p className={styles.resultsCount}>{data?.results.length || 0} results found</p>
          <div className={styles.resultsGrid}>
            {data?.results.map(item => (
              <MovieCard key={item.id} movie={item} mediaType={item.media_type || 'movie'} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
