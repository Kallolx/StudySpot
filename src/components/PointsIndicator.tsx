import React from 'react';
import { Award, Star } from 'lucide-react';
import { usePoints } from '../contexts/PointsContext';

export default function PointsIndicator() {
  const { userPoints } = usePoints();

  return (
    <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-lg">
      <div className="flex items-center gap-1">
        <Star className="h-5 w-5 text-yellow-500" />
        <span className="font-medium">{userPoints.total} Points</span>
      </div>
      <div className="h-4 w-px bg-gray-200" />
      <div className="flex items-center gap-1">
        <Award className="h-5 w-5 text-primary-500" />
        <span className="font-medium">{userPoints.achievements.length}</span>
      </div>
    </div>
  );
} 