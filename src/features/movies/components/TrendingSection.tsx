import { MovieCard } from './MovieCard';
import type { TMDBMovie, TMDBTVShow, MediaType } from '@/api/tmdb/types';
import styles from './TrendingSection.module.scss';

interface TrendingSectionProps {
  title: string;
  items: (TMDBMovie | TMDBTVShow)[];
  mediaType: MediaType;
}

export function TrendingSection({ title, items, mediaType }: TrendingSectionProps) {
  return (
    <section className={styles.trendingSection}>
      <div className={styles.trendingHeader}>
        <h2 className={styles.trendingTitle}>{title}</h2>
      </div>
      <div className={styles.moviesScroll}>
        {items.map(item => (
          <MovieCard key={item.id} movie={item} mediaType={mediaType} />
        ))}
      </div>
    </section>
  );
}
