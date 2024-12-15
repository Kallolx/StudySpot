import React, { useState } from 'react';
import {
  User,
  Award,
  Star,
  Trophy,
  Clock,
  Target,
  BarChart2,
  Calendar,
  BookOpen,
  TrendingUp,
  Settings,
  ChevronRight
} from 'lucide-react';
import { usePoints } from '../contexts/PointsContext';

type TabType = 'overview' | 'achievements' | 'history' | 'settings';

export default function Profile() {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const { userPoints } = usePoints();

  const tabs: { id: TabType; label: string; icon: React.ElementType }[] = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'achievements', label: 'Achievements', icon: Trophy },
    { id: 'history', label: 'Points History', icon: Clock },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* User Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Total Points', value: userPoints.total, icon: Star, color: 'text-yellow-500' },
                { label: 'Current Streak', value: `${userPoints.streak} days`, icon: TrendingUp, color: 'text-green-500' },
                { label: 'Achievements', value: userPoints.achievements.length, icon: Award, color: 'text-purple-500' },
                { label: 'Tests Completed', value: '24', icon: Target, color: 'text-blue-500' },
              ].map((stat, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <stat.icon className={`h-8 w-8 ${stat.color}`} />
                    <span className="text-sm text-gray-500">{stat.label}</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                </div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {userPoints.history.slice(0, 5).map((activity, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                      <BarChart2 className="h-5 w-5 text-primary-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{activity.description}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(activity.earnedAt).toLocaleDateString()} • {activity.points} points
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Progress Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Learning Progress</h3>
                <div className="space-y-4">
                  {[
                    { subject: 'Physics', progress: 75 },
                    { subject: 'Chemistry', progress: 60 },
                    { subject: 'Mathematics', progress: 85 },
                  ].map((subject, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium text-gray-700">{subject.subject}</span>
                        <span className="text-gray-500">{subject.progress}%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary-500 rounded-full"
                          style={{ width: `${subject.progress}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Tests</h3>
                <div className="space-y-4">
                  {[
                    { title: 'Physics Mock Test', date: '2024-03-20', time: '10:00 AM' },
                    { title: 'Chemistry Quiz', date: '2024-03-22', time: '2:00 PM' },
                    { title: 'Math Practice Test', date: '2024-03-25', time: '11:00 AM' },
                  ].map((test, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-primary-500" />
                        <div>
                          <p className="font-medium text-gray-900">{test.title}</p>
                          <p className="text-sm text-gray-500">{test.date} • {test.time}</p>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'achievements':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl p-6 shadow-lg ${
                  userPoints.achievements.includes(achievement.id)
                    ? 'border-2 border-primary-500'
                    : 'opacity-75'
                }`}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center text-2xl">
                    {achievement.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{achievement.title}</h3>
                    <p className="text-sm text-gray-500">{achievement.points} points</p>
                  </div>
                </div>
                <p className="text-gray-600">{achievement.description}</p>
                {userPoints.achievements.includes(achievement.id) && (
                  <div className="mt-4 flex items-center gap-2 text-sm text-primary-600">
                    <Award className="h-4 w-4" />
                    <span>Unlocked</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        );

      case 'history':
        return (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Points History</h3>
              <div className="space-y-4">
                {userPoints.history.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                        <Star className="h-5 w-5 text-primary-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{activity.description}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(activity.earnedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <span className="font-medium text-primary-600">+{activity.points}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Account Settings</h3>
            <div className="space-y-6">
              {/* Profile Settings */}
              <div className="space-y-4">
                <label className="block">
                  <span className="text-gray-700">Display Name</span>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    placeholder="Your name"
                  />
                </label>
                <label className="block">
                  <span className="text-gray-700">Email</span>
                  <input
                    type="email"
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    placeholder="your@email.com"
                  />
                </label>
              </div>

              {/* Notification Settings */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Notifications</h4>
                {[
                  'Email notifications for new achievements',
                  'Weekly progress report',
                  'Test reminders',
                ].map((setting, index) => (
                  <label key={index} className="flex items-center gap-3">
                    <input type="checkbox" className="rounded text-primary-600 focus:ring-primary-500" />
                    <span className="text-gray-700">{setting}</span>
                  </label>
                ))}
              </div>

              <button className="w-full py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                Save Changes
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center">
              <User className="h-10 w-10 text-primary-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">John Doe</h1>
              <p className="text-gray-500">Student • Joined January 2024</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-8">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-primary-50 text-primary-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <tab.icon className="h-5 w-5" />
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {renderTabContent()}
      </div>
    </div>
  );
} 