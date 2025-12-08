import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { VIBES } from '../constants';
import styles from './VibeCarousel.module.scss';

export function VibeCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const updateCarousel = (targetIndex: number) => {
    setCurrentSlide(targetIndex);
  };

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % VIBES.length);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + VIBES.length) % VIBES.length);
  };

  const handleVibeClick = (genreIds: number[]) => {
    navigate(`/search?vibe=${genreIds.join(',')}`);
  };

  useEffect(() => {
    const autoplayInterval = setInterval(nextSlide, 5000);
    return () => clearInterval(autoplayInterval);
  }, []);

  return (
    <section className={styles.vibeCarouselSection}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>What's Your Vibe Today?</h2>
        <p className={styles.sectionSubtitle}>Choose your mood and discover the perfect movie</p>
      </div>

      <div className={styles.carouselContainer}>
        <button
          className={`${styles.carouselNav} ${styles.prev}`}
          onClick={prevSlide}
          aria-label="Previous vibe"
        >
          ←
        </button>

        <div className={styles.carouselWrapper}>
          <div
            className={styles.carouselTrack}
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {VIBES.map(vibe => (
              <div
                key={vibe.id}
                className={styles.vibeSlide}
                style={{ background: vibe.gradient }}
                onClick={() => handleVibeClick(vibe.genreIds)}
              >
                <div className={styles.vibeContent}>
                  <div className={styles.vibeEmoji}>{vibe.emoji}</div>
                  <h3 className={styles.vibeName}>{vibe.name}</h3>
                  <p className={styles.vibeDescription}>{vibe.description}</p>
                  <button className={styles.vibeCta}>Explore {vibe.name} Movies →</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          className={`${styles.carouselNav} ${styles.next}`}
          onClick={nextSlide}
          aria-label="Next vibe"
        >
          →
        </button>
      </div>

      <div className={styles.carouselDots}>
        {VIBES.map((_, index) => (
          <span
            key={index}
            className={`${styles.dot} ${index === currentSlide ? styles.active : ''}`}
            onClick={() => updateCarousel(index)}
          />
        ))}
      </div>
    </section>
  );
}
