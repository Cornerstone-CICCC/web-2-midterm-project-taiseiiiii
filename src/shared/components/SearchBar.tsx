import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import styles from './SearchBar.module.scss';

export function SearchBar() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [query, setQuery] = useState(searchParams.get('q') || '');

  useEffect(() => {
    setQuery(searchParams.get('q') || '');
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form className={styles.searchForm} onSubmit={handleSubmit}>
      <div className={styles.searchContainer}>
        <span className={styles.searchIcon}>🔍</span>
        <input
          type="search"
          className={styles.searchInput}
          placeholder="Search for movies or TV shows..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          aria-label="Search movies"
        />
      </div>
    </form>
  );
}
