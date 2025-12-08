import styles from './AboutPage.module.scss';

export function AboutPage() {
  return (
    <div className={styles.aboutPage}>
      <div className={styles.container}>
        <h1>About CineVibe</h1>

        <section className={styles.section}>
          <h2>🎬 What is CineVibe?</h2>
          <p>
            CineVibe is a modern movie discovery platform that helps you find the perfect movie
            based on your current mood. Whether you're feeling happy, emotional, adventurous, or
            thoughtful, we've got the perfect recommendations for you.
          </p>
        </section>

        <section className={styles.section}>
          <h2>✨ Features</h2>
          <ul>
            <li>
              🌈 <strong>Vibe-based Search:</strong> Discover movies by mood, not just genre
            </li>
            <li>
              🔍 <strong>Smart Search:</strong> Find any movie or TV show instantly
            </li>
            <li>
              ❤️ <strong>Watchlist:</strong> Save your favorite titles for later
            </li>
            <li>
              🌓 <strong>Dark Mode:</strong> Easy on the eyes, day or night
            </li>
            <li>
              📱 <strong>Responsive Design:</strong> Perfect on any device
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>🛠️ Built With</h2>
          <ul>
            <li>React 19 + TypeScript</li>
            <li>Vite</li>
            <li>SCSS with CSS Modules</li>
            <li>TanStack Query</li>
            <li>React Router v7</li>
            <li>TMDB API</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>📚 Data Source</h2>
          <p>
            This website uses TMDB and the TMDB APIs but is not endorsed, certified, or otherwise
            approved by TMDB.
          </p>
          <div className={styles.tmdbLogo}>
            <img
              src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
              alt="TMDB Logo"
              height="40"
            />
          </div>
        </section>

        <section className={styles.section}>
          <h2>⚖️ Disclaimer</h2>
          <p>
            <strong>Educational Project - Non-Commercial Use</strong>
          </p>
          <p>
            This is a student project created for educational purposes only. It is not intended for
            commercial use and does not generate any revenue. All movie data and images are provided
            by The Movie Database (TMDB) API.
          </p>
        </section>

        <section className={styles.section}>
          <h2>👨‍💻 About the Developer</h2>
          <p>
            Created by Taisei as part of the Web Development 2 Midterm Project at Cornerstone
            International Community College of Canada (CICCC).
          </p>
        </section>
      </div>
    </div>
  );
}
