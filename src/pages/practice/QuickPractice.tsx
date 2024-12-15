import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  CheckCircle2, 
  XCircle, 
  ArrowLeft,
  AlertCircle,
  Trophy,
  Star,
  Target
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { usePoints } from '../../contexts/PointsContext';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

interface Question {
  id: string;
  text: string;
  options: { id: string; text: string; }[];
  correctAnswer: string;
  explanation: string;
}

export default function QuickPractice() {
  const navigate = useNavigate();
  const { addPoints } = usePoints();
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [questions] = useState<Question[]>([
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
      explanation: 'The Newton (N) is the SI unit of force, defined as the force needed to accelerate 1 kg at 1 m/s².'
    },
    // Add 4 more questions for a total of 5
  ]);

  // Timer Effect
  useEffect(() => {
    if (timeLeft > 0 && !isFinished) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !isFinished) {
      handleFinish();
    }
  }, [timeLeft, isFinished]);

  const handleAnswerSelect = (answerId: string) => {
    if (showExplanation) return;
    
    setSelectedAnswer(answerId);
    setShowExplanation(true);
    
    if (answerId === questions[currentQuestionIndex].correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      handleFinish();
    }
  };

  const handleFinish = () => {
    setIsFinished(true);
    const finalScore = (score / questions.length) * 100;
    addPoints('PRACTICE_SESSION');
    if (finalScore === 100) {
      addPoints('PERFECT_QUIZ');
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Add this function for confetti effect
  const triggerConfetti = () => {
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const colors = ['#6366F1', '#8B5CF6', '#EC4899'];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  };

  useEffect(() => {
    if (isFinished && score === questions.length) {
      triggerConfetti();
    }
  }, [isFinished, score, questions.length]);

  if (isFinished) {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="max-w-3xl mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <Trophy className="h-10 w-10 text-primary-600" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Practice Complete!</h2>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 rounded-full mb-6">
                <Star className="h-5 w-5 text-primary-500" />
                <span className="font-medium text-primary-600">
                  {score * 10} Points Earned
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-xl p-6 mb-8"
            >
              <div className="text-center">
                <div className="text-4xl font-bold text-primary-600 mb-2">
                  {((score / questions.length) * 100).toFixed(0)}%
                </div>
                <p className="text-gray-600">
                  You answered {score} out of {questions.length} questions correctly
                </p>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="bg-white/80 backdrop-blur rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Clock className="h-5 w-5 text-primary-500" />
                    <span className="text-sm text-gray-600">Time Taken</span>
                  </div>
                  <div className="text-xl font-semibold text-gray-900">
                    {formatTime(300 - timeLeft)}
                  </div>
                </div>

                <div className="bg-white/80 backdrop-blur rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Target className="h-5 w-5 text-primary-500" />
                    <span className="text-sm text-gray-600">Accuracy</span>
                  </div>
                  <div className="text-xl font-semibold text-gray-900">
                    {((score / questions.length) * 100).toFixed(0)}%
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="space-y-4"
            >
              {score === questions.length && (
                <div className="bg-green-50 text-green-700 px-4 py-3 rounded-lg flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <span>Perfect Score! You've earned a bonus achievement!</span>
                </div>
              )}

              <div className="flex gap-4">
                <button
                  onClick={() => navigate('/practice')}
                  className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors duration-200"
                >
                  Back to Practice
                </button>
                <button
                  onClick={() => {
                    setCurrentQuestionIndex(0);
                    setScore(0);
                    setTimeLeft(300);
                    setIsFinished(false);
                    setSelectedAnswer(null);
                    setShowExplanation(false);
                  }}
                  className="flex-1 px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors duration-200"
                >
                  Try Again
                </button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate('/practice')}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Exit Practice
          </button>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-600">
              Question {currentQuestionIndex + 1}/{questions.length}
            </div>
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${
              timeLeft < 60 ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
            }`}>
              <Clock className="h-4 w-4" />
              <span className="font-medium">{formatTime(timeLeft)}</span>
            </div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <h3 className="text-xl font-medium text-gray-900 mb-6">
            {questions[currentQuestionIndex].text}
          </h3>

          <div className="space-y-4">
            {questions[currentQuestionIndex].options.map(option => (
              <button
                key={option.id}
                onClick={() => handleAnswerSelect(option.id)}
                disabled={showExplanation}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                  selectedAnswer === option.id
                    ? option.id === questions[currentQuestionIndex].correctAnswer
                      ? 'border-green-500 bg-green-50'
                      : 'border-red-500 bg-red-50'
                    : 'border-gray-200 hover:border-primary-300'
                } ${showExplanation && option.id === questions[currentQuestionIndex].correctAnswer ? 'border-green-500 bg-green-50' : ''}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 flex items-center justify-center border-2 rounded-full">
                      {option.id.toUpperCase()}
                    </span>
                    <span>{option.text}</span>
                  </div>
                  {showExplanation && (
                    option.id === questions[currentQuestionIndex].correctAnswer ? (
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
            <div className="mt-6 p-4 bg-blue-50 rounded-xl">
              <div className="flex gap-3">
                <AlertCircle className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-blue-700">
                  <span className="font-medium">Explanation:</span>{' '}
                  {questions[currentQuestionIndex].explanation}
                </p>
              </div>
            </div>
          )}
        </div>

        {showExplanation && (
          <button
            onClick={handleNext}
            className="w-full py-4 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors"
          >
            {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Practice'}
          </button>
        )}
      </div>
    </div>
  );
} 