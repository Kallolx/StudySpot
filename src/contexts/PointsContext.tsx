import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserPoints, PointsActivity } from '../types/points';
import { pointsActivities, achievements } from '../config/pointsSystem';

interface PointsContextType {
  userPoints: UserPoints;
  addPoints: (activityId: string) => void;
  checkAchievements: () => void;
  getLeaderboardPosition: () => Promise<number>;
}

const PointsContext = createContext<PointsContextType | undefined>(undefined);

export function PointsProvider({ children }: { children: React.ReactNode }) {
  const [userPoints, setUserPoints] = useState<UserPoints>({
    total: 0,
    history: [],
    achievements: [],
    streak: 0,
    lastActive: new Date()
  });

  // Load points from localStorage or API
  useEffect(() => {
    const loadPoints = async () => {
      // Implementation for loading points
    };
    loadPoints();
  }, []);

  const addPoints = (activityId: string) => {
    const activity = pointsActivities[activityId];
    if (!activity) return;

    setUserPoints(prev => ({
      ...prev,
      total: prev.total + activity.points,
      history: [
        {
          id: crypto.randomUUID(),
          activityId,
          type: activity.type,
          points: activity.points,
          earnedAt: new Date(),
          description: activity.description
        },
        ...prev.history
      ]
    }));

    checkAchievements();
  };

  const checkAchievements = () => {
    achievements.forEach(achievement => {
      if (userPoints.achievements.includes(achievement.id)) return;

      let qualified = false;
      switch (achievement.criteria.type) {
        case 'quiz_score':
          qualified = userPoints.history.filter(
            h => h.type === 'quiz' && h.points === pointsActivities.PERFECT_QUIZ.points
          ).length >= achievement.criteria.value;
          break;
        case 'streak_days':
          qualified = userPoints.streak >= achievement.criteria.value;
          break;
        // Add more criteria checks
      }

      if (qualified) {
        setUserPoints(prev => ({
          ...prev,
          total: prev.total + achievement.points,
          achievements: [...prev.achievements, achievement.id],
          history: [
            {
              id: crypto.randomUUID(),
              activityId: achievement.id,
              type: 'achievement',
              points: achievement.points,
              earnedAt: new Date(),
              description: `Achievement unlocked: ${achievement.title}`
            },
            ...prev.history
          ]
        }));
      }
    });
  };

  const getLeaderboardPosition = async () => {
    // Implementation for getting leaderboard position
    return 0;
  };

  return (
    <PointsContext.Provider value={{ userPoints, addPoints, checkAchievements, getLeaderboardPosition }}>
      {children}
    </PointsContext.Provider>
  );
}

export function usePoints() {
  const context = useContext(PointsContext);
  if (context === undefined) {
    throw new Error('usePoints must be used within a PointsProvider');
  }
  return context;
} 