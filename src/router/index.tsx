import { createBrowserRouter } from 'react-router';
import { RootLayout } from '@/shared/components/layout/RootLayout';
import { HomePage } from '@/features/movies/pages/HomePage';
import { SearchPage } from '@/features/movies/pages/SearchPage';
import { MovieDetailPage } from '@/features/movies/pages/MovieDetailPage';
import { TVDetailPage } from '@/features/movies/pages/TVDetailPage';
import { WatchlistPage } from '@/features/watchlist/pages/WatchlistPage';
import { AboutPage } from '@/features/movies/pages/AboutPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'search',
        element: <SearchPage />,
      },
      {
        path: 'movie/:id',
        element: <MovieDetailPage />,
      },
      {
        path: 'tv/:id',
        element: <TVDetailPage />,
      },
      {
        path: 'watchlist',
        element: <WatchlistPage />,
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
    ],
  },
]);
