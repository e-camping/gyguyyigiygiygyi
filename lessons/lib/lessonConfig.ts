import { Lesson } from './types';

export const lessons: Lesson[] = [
  {
    id: '1',
    title: 'Probabilities',
    slug: 'probabilities',
    description: 'Learn how AI predicts next words using logits and probability distributions',
    type: 'interactive',
    duration: '20 min'
  },
  {
    id: '2',
    title: 'Bias and Variance',
    slug: 'bias-variance',
    description: 'Understand model accuracy, overfitting, and underfitting',
    type: 'theory',
    duration: '15 min'
  },
  {
    id: '3',
    title: 'Training and Testing Data',
    slug: 'training-testing',
    description: 'Explore what data is, how to clean it, and why we split it',
    type: 'theory',
    duration: '15 min'
  },
  {
    id: '4',
    title: 'Text Embedding',
    slug: 'text-embedding',
    description: 'Learn how words are represented as vectors and implement a similarity ranking algorithm',
    type: 'interactive',
    duration: '30 min'
  },
  {
    id: '5',
    title: 'Image Classification',
    slug: 'image-classification',
    description: 'Learn how neural networks classify images',
    type: 'theory',
    duration: '15 min'
  },
  {
    id: '6',
    title: 'Tokens and System Prompts',
    slug: 'tokens',
    description: 'Understand tokenization and how system prompts guide AI behavior',
    type: 'interactive',
    duration: '20 min'
  },
  {
    id: '7',
    title: 'Decision Trees',
    slug: 'decision-trees',
    description: 'Build and understand decision tree algorithms',
    type: 'interactive',
    duration: '20 min'
  },
  {
    id: '8',
    title: 'Linear vs Logistic Models',
    slug: 'linear-logistic',
    description: 'Compare linear regression and logistic regression',
    type: 'interactive',
    duration: '20 min'
  },
  {
    id: '9',
    title: 'Large Language Models (LLMs)',
    slug: 'llms',
    description: 'Bring it all together - how LLMs use everything you learned',
    type: 'theory',
    duration: '25 min'
  }
];

export function getLessonBySlug(slug: string): Lesson | undefined {
  return lessons.find(lesson => lesson.slug === slug);
}

export function getNextLesson(currentSlug: string): Lesson | null {
  const currentIndex = lessons.findIndex(l => l.slug === currentSlug);
  if (currentIndex >= 0 && currentIndex < lessons.length - 1) {
    return lessons[currentIndex + 1];
  }
  return null;
}

export function getPreviousLesson(currentSlug: string): Lesson | null {
  const currentIndex = lessons.findIndex(l => l.slug === currentSlug);
  if (currentIndex > 0) {
    return lessons[currentIndex - 1];
  }
  return null;
}

export function getLessonProgress(currentSlug: string): { current: number; total: number; percentage: number } {
  const currentIndex = lessons.findIndex(l => l.slug === currentSlug);
  const current = currentIndex >= 0 ? currentIndex + 1 : 0;
  const total = lessons.length;
  const percentage = Math.round((current / total) * 100);

  return { current, total, percentage };
}
