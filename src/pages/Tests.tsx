import React, { useState } from 'react';
import { 
  Clock, 
  Award, 
  BookOpen, 
  AlertCircle, 
  ChevronRight, 
  Timer,
  BarChart,
  CheckCircle,
  Star,
  Calendar,
  Users
} from 'lucide-react';

interface MockTest {
  id: string;
  title: string;
  type: 'engineering' | 'medical' | 'general';
  duration: number; // in minutes
  questions: number;
  difficulty: 'easy' | 'medium' | 'hard';
  subjects: string[];
  date: string;
  attempts: number;
  averageScore: number;
  status: 'upcoming' | 'available' | 'completed';
}

const mockTests: MockTest[] = [
  {
    id: '1',
    title: 'Engineering Mock Test - 1',
    type: 'engineering',
    duration: 180,
    questions: 100,
    difficulty: 'medium',
    subjects: ['Physics', 'Chemistry', 'Mathematics'],
    date: '2024-03-20',
    attempts: 1245,
    averageScore: 72,
    status: 'available'
  },
  {
    id: '2',
    title: 'Medical Entrance Practice Test',
    type: 'medical',
    duration: 120,
    questions: 80,
    difficulty: 'hard',
    subjects: ['Biology', 'Chemistry', 'Physics'],
    date: '2024-03-25',
    attempts: 892,
    averageScore: 68,
    status: 'upcoming'
  },
  // Add more mock tests...
];

export default function Tests() {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

  const filteredTests = mockTests.filter(test => {
    const matchesType = selectedType === 'all' || test.type === selectedType;
    const matchesDifficulty = selectedDifficulty === 'all' || test.difficulty === selectedDifficulty;
    return matchesType && matchesDifficulty;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-500';
      case 'medium': return 'text-yellow-500';
      case 'hard': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'upcoming':
        return (
          <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
            Upcoming
          </span>
        );
      case 'available':
        return (
          <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">
            Available
          </span>
        );
      case 'completed':
        return (
          <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full">
            Completed
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-50 to-accent-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold text-gray-900">Mock Tests</h1>
          <p className="mt-2 text-lg text-gray-600">
            Practice with full-length mock tests designed by experts
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Test Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            {
              title: 'Available Tests',
              value: mockTests.filter(t => t.status === 'available').length,
              icon: BookOpen,
              color: 'text-primary-500'
            },
            {
              title: 'Tests Completed',
              value: mockTests.filter(t => t.status === 'completed').length,
              icon: CheckCircle,
              color: 'text-green-500'
            },
            {
              title: 'Average Score',
              value: '75%',
              icon: Award,
              color: 'text-yellow-500'
            }
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 ${stat.color} bg-opacity-10 rounded-lg flex items-center justify-center`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">All Types</option>
            <option value="engineering">Engineering</option>
            <option value="medical">Medical</option>
            <option value="general">General</option>
          </select>

          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">All Difficulties</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        {/* Test Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredTests.map(test => (
            <div key={test.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{test.title}</h3>
                    {getStatusBadge(test.status)}
                  </div>
                  <div className={`px-3 py-1 rounded-lg ${getDifficultyColor(test.difficulty)} bg-opacity-10`}>
                    <span className={`text-sm font-medium ${getDifficultyColor(test.difficulty)}`}>
                      {test.difficulty.charAt(0).toUpperCase() + test.difficulty.slice(1)}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="h-4 w-4" />
                    {test.duration} minutes
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <BookOpen className="h-4 w-4" />
                    {test.questions} questions
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    {new Date(test.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <BarChart className="h-4 w-4" />
                    Avg. Score: {test.averageScore}%
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {test.subjects.map(subject => (
                    <span
                      key={subject}
                      className="px-2 py-1 text-xs font-medium bg-primary-50 text-primary-600 rounded-full"
                    >
                      {subject}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Users className="h-4 w-4" />
                    {test.attempts.toLocaleString()} attempts
                  </div>
                  <button
                    disabled={test.status === 'upcoming'}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      test.status === 'upcoming'
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-primary-50 text-primary-600 hover:bg-primary-100'
                    }`}
                  >
                    {test.status === 'upcoming' ? 'Coming Soon' : 'Start Test'}
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Test Guidelines */}
        <div className="mt-12 bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Test Guidelines</h3>
                <p className="text-sm text-gray-500">Important information before you start</p>
              </div>
            </div>

            <div className="space-y-4">
              {[
                'Ensure stable internet connection throughout the test',
                'Do not refresh or close the browser window during the test',
                'Timer will start automatically when you begin the test',
                'Submit your answers before the timer runs out'
              ].map((guideline, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary-50 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-medium text-primary-600">{index + 1}</span>
                  </div>
                  <p className="text-gray-600">{guideline}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}