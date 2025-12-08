import { fetchTMDB } from './client';
import type {
  TMDBMovie,
  TMDBTVShow,
  TMDBMovieDetail,
  TMDBTVShowDetail,
  TMDBCredits,
  TMDBVideosResponse,
  TMDBResponse,
  TMDBMultiSearchResult,
} from './types';

export const tmdbApi = {
  getTrendingMovies: () => {
    return fetchTMDB<TMDBResponse<TMDBMovie>>('/trending/movie/day');
  },

  getTrendingTV: () => {
    return fetchTMDB<TMDBResponse<TMDBTVShow>>('/trending/tv/day');
  },

  searchMulti: (query: string, page: number = 1) => {
    return fetchTMDB<TMDBResponse<TMDBMultiSearchResult>>('/search/multi', {
      query,
      page: page.toString(),
    });
  },

  getMovieDetails: (movieId: number) => {
    return fetchTMDB<TMDBMovieDetail>(`/movie/${movieId}`);
  },

  getMovieCredits: (movieId: number) => {
    return fetchTMDB<TMDBCredits>(`/movie/${movieId}/credits`);
  },

  getMovieVideos: (movieId: number) => {
    return fetchTMDB<TMDBVideosResponse>(`/movie/${movieId}/videos`);
  },

  getSimilarMovies: (movieId: number) => {
    return fetchTMDB<TMDBResponse<TMDBMovie>>(`/movie/${movieId}/similar`);
  },

  getTVDetails: (tvId: number) => {
    return fetchTMDB<TMDBTVShowDetail>(`/tv/${tvId}`);
  },

  getTVCredits: (tvId: number) => {
    return fetchTMDB<TMDBCredits>(`/tv/${tvId}/credits`);
  },

  getTVVideos: (tvId: number) => {
    return fetchTMDB<TMDBVideosResponse>(`/tv/${tvId}/videos`);
  },

  getSimilarTV: (tvId: number) => {
    return fetchTMDB<TMDBResponse<TMDBTVShow>>(`/tv/${tvId}/similar`);
  },

  discoverMoviesByGenre: (genreIds: number[], page: number = 1) => {
    return fetchTMDB<TMDBResponse<TMDBMovie>>('/discover/movie', {
      with_genres: genreIds.join(','),
      page: page.toString(),
      sort_by: 'popularity.desc',
    });
  },
};
