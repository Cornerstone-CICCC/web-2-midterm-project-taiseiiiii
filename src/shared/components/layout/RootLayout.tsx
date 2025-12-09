import { Outlet } from 'react-router';
import { Header } from './Header';

export function RootLayout() {
  return (
    <div className="app">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
