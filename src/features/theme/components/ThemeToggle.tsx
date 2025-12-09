import { useTheme } from '../hooks/useTheme';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        fontSize: '1.5rem',
        padding: '0.5rem',
      }}
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
}
