import React, { useState, useEffect } from 'react';
import { 
  Zap,
  Target,
  Brain,
  Trophy,
  Clock,
  CheckCircle2,
  XCircle,
  Flame,
  ArrowRight,
  Star
} from 'lucide-react';
import { usePoints } from '../contexts/PointsContext';
import { useNavigate } from 'react-router-dom';

// Types
interface PracticeQuestion {
  id: string;
  text: string;
  options: { id: string; text: string; }[];
  correctAnswer: string;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  subject: string;
  topic: string;
  timeEstimate: number;
}

interface PracticeMode {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  questionCount?: number;
  timeLimit?: number;
  features: string[];
}

// Mock Questions Database
const mockQuestions: PracticeQuestion[] = [
  {
    id: '1',
    text: 'What is the SI unit of force?',
    options: [
      { id: 'a', text: 'Newton' },
      { id: 'b', text: 'Joule' },
      { id: 'c', text: 'Watt' },
      { id: 'd', text: 'Pascal' }
    ],
    correctAnswer: 'a',
    explanation: 'The Newton (N) is the SI unit of force. It is defined as the force needed to accelerate 1 kilogram of mass at 1 meter per second squared.',
    difficulty: 'easy',
    subject: 'Physics',
    topic: 'Forces',
    timeEstimate: 60
  },
  {
    id: '2',
    text: 'Which of the following is a primary color?',
    options: [
      { id: 'a', text: 'Green' },
      { id: 'b', text: 'Orange' },
      { id: 'c', text: 'Purple' },
      { id: 'd', text: 'Blue' }
    ],
    correctAnswer: 'd',
    explanation: 'Blue is a primary color, along with red and yellow. Primary colors cannot be created by mixing other colors.',
    difficulty: 'easy',
    subject: 'Art',
    topic: 'Color Theory',
    timeEstimate: 30
  },
  // Add more questions...
];

const practiceModes: PracticeMode[] = [
  {
    id: 'quick',
    name: 'Quick Practice',
    description: 'Perfect for a quick study session. 5 questions in 5 minutes.',
    icon: Zap,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-50',
    questionCount: 5,
    timeLimit: 300,
    features: ['5 targeted questions', 'Time limit: 5 minutes', 'Instant feedback']
  },
  {
    id: 'challenge',
    name: 'Daily Challenge',
    description: 'New set of questions every day. Test your knowledge across topics.',
    icon: Target,
    color: 'text-red-500',
    bgColor: 'bg-red-50',
    questionCount: 20,
    timeLimit: 1200,
    features: ['20 mixed questions', 'Time limit: 20 minutes', 'Daily rewards']
  },
  {
    id: 'marathon',
    name: 'Study Marathon',
    description: 'Extended practice session with unlimited questions.',
    icon: Flame,
    color: 'text-orange-500',
    bgColor: 'bg-orange-50',
    features: ['Unlimited questions', 'No time limit', 'Build your streak']
  },
  {
    id: 'adaptive',
    name: 'Adaptive Learning',
    description: 'Questions adapt to your skill level as you progress.',
    icon: Brain,
    color: 'text-purple-500',
    bgColor: 'bg-purple-50',
    questionCount: 10,
    features: ['Personalized difficulty', 'Skill assessment', 'Progress tracking']
  }
];

export default function Practice() {
  const navigate = useNavigate();
  const [selectedMode, setSelectedMode] = useState<string | null>(null);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<PracticeQuestion | null>(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [practiceQuestions, setPracticeQuestions] = useState<PracticeQuestion[]>([]);
  const [practiceStats, setPracticeStats] = useState({
    questionsAnswered: 0,
    correctAnswers: 0,
    timeSpent: 0,
    longestStreak: 0
  });
  const { addPoints } = usePoints();

  // Timer Effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (timeRemaining !== null && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining(prev => (prev as number) - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [timeRemaining]);

  // Initialize Practice Session
  const startPracticeMode = (modeId: string) => {
    if (modeId === 'quick') {
      navigate('/practice/quick');
      return;
    }
    const mode = practiceModes.find(m => m.id === modeId);
    if (!mode) return;

    let questions: PracticeQuestion[];
    switch (modeId) {
      case 'challenge':
        questions = getRandomQuestions(20, 'mixed');
        break;
      case 'marathon':
        questions = getRandomQuestions(50, 'mixed');
        break;
      case 'adaptive':
        questions = getAdaptiveQuestions(10);
        break;
      default:
        questions = [];
    }

    setPracticeQuestions(questions);
    setCurrentQuestion(questions[0]);
    setQuestionIndex(0);
    setTimeRemaining(mode.timeLimit || null);
    setSelectedMode(modeId);
    setShowExplanation(false);
    setSelectedAnswer(null);
  };

  // Helper Functions
  const getRandomQuestions = (count: number, difficulty: string): PracticeQuestion[] => {
    const shuffled = [...mockQuestions].sort(() => 0.5 - Math.random());
    if (difficulty === 'mixed') {
      return shuffled.slice(0, count);
    }
    return shuffled
      .filter(q => q.difficulty === difficulty)
      .slice(0, count);
  };

  const getAdaptiveQuestions = (count: number): PracticeQuestion[] => {
    // Implementation for adaptive difficulty
    return getRandomQuestions(count, 'mixed');
  };

  const handleAnswerSelect = (answerId: string) => {
    setSelectedAnswer(answerId);
    setShowExplanation(true);

    const isCorrect = currentQuestion?.correctAnswer === answerId;
    setPracticeStats(prev => ({
      ...prev,
      questionsAnswered: prev.questionsAnswered + 1,
      correctAnswers: prev.correctAnswers + (isCorrect ? 1 : 0)
    }));
  };

  const handleNextQuestion = () => {
    if (questionIndex < practiceQuestions.length - 1) {
      setQuestionIndex(prev => prev + 1);
      setCurrentQuestion(practiceQuestions[questionIndex + 1]);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      // End practice session
      setSelectedMode(null);
    }
  };

  const handleQuizComplete = (score: number) => {
    addPoints('PRACTICE_SESSION');
    if (score === 100) {
      addPoints('PERFECT_QUIZ');
    }
  };

  // Render Practice Session
  const renderPracticeSession = () => {
    if (!currentQuestion) return null;

    return (
      <div className="max-w-3xl mx-auto">
        {/* Progress and Timer */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => setSelectedMode(null)}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Exit Practice
          </button>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-600">
              Question {questionIndex + 1}/{practiceQuestions.length}
            </div>
            {timeRemaining !== null && (
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4" />
                {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}
              </div>
            )}
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h3 className="text-xl font-medium text-gray-900 mb-6">
            {currentQuestion.text}
          </h3>

          <div className="space-y-4">
            {currentQuestion.options.map(option => (
              <button
                key={option.id}
                onClick={() => handleAnswerSelect(option.id)}
                disabled={showExplanation}
                className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                  selectedAnswer === option.id
                    ? option.id === currentQuestion.correctAnswer
                      ? 'border-green-500 bg-green-50'
                      : 'border-red-500 bg-red-50'
                    : 'border-gray-200 hover:border-primary-300'
                } ${showExplanation && option.id === currentQuestion.correctAnswer ? 'border-green-500 bg-green-50' : ''}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 flex items-center justify-center border-2 rounded-full">
                      {option.id.toUpperCase()}
                    </span>
                    <span>{option.text}</span>
                  </div>
                  {showExplanation && (
                    option.id === currentQuestion.correctAnswer ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    ) : selectedAnswer === option.id ? (
                      <XCircle className="h-5 w-5 text-red-500" />
                    ) : null
                  )}
                </div>
              </button>
            ))}
          </div>

          {showExplanation && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-700">
                <span className="font-medium">Explanation:</span> {currentQuestion.explanation}
              </p>
            </div>
          )}
        </div>

        {showExplanation && (
          <button
            onClick={handleNextQuestion}
            className="w-full py-4 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors"
          >
            {questionIndex < practiceQuestions.length - 1 ? 'Next Question' : 'Finish Practice'}
          </button>
        )}
      </div>
    );
  };

  // Main Render
  return (
    <div className="min-h-screen bg-background">
      {selectedMode ? (
        renderPracticeSession()
      ) : (
        <>
          {/* Header with Stats */}
          <div className="bg-gradient-to-r from-primary-50 to-accent-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Practice Arena</h1>
                  <p className="mt-2 text-lg text-gray-600">
                    Choose your practice mode and start learning
                  </p>
                </div>
                <div className="flex items-center gap-4 bg-white px-6 py-3 rounded-xl shadow-sm">
                  <div className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-primary-500" />
                    <div>
                      <div className="text-sm text-gray-500">Current Streak</div>
                      <div className="font-semibold text-gray-900">{currentStreak} days</div>
                    </div>
                  </div>
                  <div className="h-8 w-px bg-gray-200" />
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-500" />
                    <div>
                      <div className="text-sm text-gray-500">Total Points</div>
                      <div className="font-semibold text-gray-900">{practiceStats.questionsAnswered * 10}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Practice Modes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {practiceModes.map(mode => (
                <button
                  key={mode.id}
                  onClick={() => startPracticeMode(mode.id)}
                  className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-left"
                >
                  <div className="flex items-start gap-6">
                    <div className={`${mode.bgColor} p-4 rounded-xl`}>
                      <mode.icon className={`h-8 w-8 ${mode.color}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{mode.name}</h3>
                      <p className="text-gray-600 mb-4">{mode.description}</p>
                      <div className="space-y-2">
                        {mode.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm text-gray-500">
                            <CheckCircle2 className="h-4 w-4 text-primary-500" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <ArrowRight className="h-6 w-6 text-gray-400 group-hover:text-primary-500 transition-colors" />
                  </div>
                </button>
              ))}
            </div>

            {/* Quick Stats */}
            <div className="mt-12 bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Progress</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center">
                    <Target className="h-6 w-6 text-primary-500" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Questions Solved</div>
                    <div className="text-xl font-semibold text-gray-900">{practiceStats.questionsAnswered}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                    <CheckCircle2 className="h-6 w-6 text-green-500" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Accuracy</div>
                    <div className="text-xl font-semibold text-gray-900">
                      {practiceStats.questionsAnswered
                        ? ((practiceStats.correctAnswers / practiceStats.questionsAnswered) * 100).toFixed(1)
                        : 0}%
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                    <Clock className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Time Practiced</div>
                    <div className="text-xl font-semibold text-gray-900">{Math.floor(practiceStats.timeSpent / 60)}m</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}