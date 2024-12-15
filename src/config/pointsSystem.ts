import { PointsActivity, Achievement } from '../types/points';

export const pointsActivities: Record<string, PointsActivity> = {
  QUIZ_COMPLETE: {
    id: 'quiz_complete',
    type: 'quiz',
    points: 10,
    description: 'Completing a quiz'
  },
  PERFECT_QUIZ: {
    id: 'perfect_quiz',
    type: 'quiz',
    points: 25,
    description: 'Perfect score on a quiz'
  },
  TEST_COMPLETE: {
    id: 'test_complete',
    type: 'test',
    points: 50,
    description: 'Completing a full test'
  },
  DAILY_STREAK: {
    id: 'daily_streak',
    type: 'streak',
    points: 15,
    description: 'Daily login streak'
  },
  PRACTICE_SESSION: {
    id: 'practice_session',
    type: 'practice',
    points: 5,
    description: 'Completing a practice session'
  }
};

export const achievements: Achievement[] = [
  {
    id: 'quick_learner',
    title: 'Quick Learner',
    description: 'Complete 5 quizzes with perfect scores',
    points: 100,
    icon: '🎯',
    criteria: {
      type: 'quiz_score',
      value: 5
    }
  },
  {
    id: 'consistent_scholar',
    title: 'Consistent Scholar',
    description: 'Maintain a 7-day study streak',
    points: 150,
    icon: '🔥',
    criteria: {
      type: 'streak_days',
      value: 7
    }
  },
  // Add more achievements...
]; 