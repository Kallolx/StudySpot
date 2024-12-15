export interface PointsActivity {
  id: string;
  type: 'quiz' | 'test' | 'practice' | 'streak' | 'achievement';
  points: number;
  description: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  points: number;
  icon: string;
  criteria: {
    type: 'quiz_score' | 'test_complete' | 'practice_count' | 'streak_days';
    value: number;
  };
  unlockedAt?: Date;
}

export interface UserPoints {
  total: number;
  history: {
    id: string;
    activityId: string;
    type: PointsActivity['type'];
    points: number;
    earnedAt: Date;
    description: string;
  }[];
  achievements: string[]; // Achievement IDs
  streak: number;
  lastActive: Date;
} 