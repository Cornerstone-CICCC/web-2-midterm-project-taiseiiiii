export interface Vibe {
  id: string;
  name: string;
  emoji: string;
  description: string;
  genreIds: number[];
  gradient: string;
}

export const VIBES: Vibe[] = [
  {
    id: 'happy',
    name: 'Happy',
    emoji: '😄',
    description: "Feel-good comedies and uplifting stories that'll brighten your day",
    genreIds: [35, 10402], // Comedy, Music
    gradient: 'linear-gradient(135deg, hsl(45, 100%, 55%) 0%, hsl(30, 100%, 50%) 100%)',
  },
  {
    id: 'emotional',
    name: 'Emotional',
    emoji: '😢',
    description: 'Deep dramas and touching romances that resonate with your heart',
    genreIds: [18, 10749], // Drama, Romance
    gradient: 'linear-gradient(135deg, hsl(220, 70%, 50%) 0%, hsl(280, 70%, 40%) 100%)',
  },
  {
    id: 'adventurous',
    name: 'Adventurous',
    emoji: '🚀',
    description: 'Thrilling action and epic adventures that get your adrenaline pumping',
    genreIds: [12, 28], // Adventure, Action
    gradient: 'linear-gradient(135deg, hsl(15, 100%, 50%) 0%, hsl(0, 85%, 40%) 100%)',
  },
  {
    id: 'thrilling',
    name: 'Thrilling',
    emoji: '😱',
    description: 'Suspenseful mysteries and spine-chilling horrors for the brave',
    genreIds: [27, 53], // Horror, Thriller
    gradient: 'linear-gradient(135deg, hsl(0, 0%, 15%) 0%, hsl(271, 30%, 25%) 100%)',
  },
  {
    id: 'thoughtful',
    name: 'Thoughtful',
    emoji: '🤔',
    description: 'Mind-bending sci-fi and insightful documentaries that make you think',
    genreIds: [99, 878], // Documentary, Science Fiction
    gradient: 'linear-gradient(135deg, hsl(200, 60%, 40%) 0%, hsl(180, 60%, 35%) 100%)',
  },
  {
    id: 'inspiring',
    name: 'Inspiring',
    emoji: '✨',
    description: 'Heartwarming family films and magical animations for all ages',
    genreIds: [10751, 16], // Family, Animation
    gradient: 'linear-gradient(135deg, hsl(340, 80%, 50%) 0%, hsl(30, 100%, 55%) 100%)',
  },
];
