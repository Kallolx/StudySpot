import React from 'react';
import { Question, SelectedAnswer } from '../../types/practice';

type Props = {
  question: Question;
  selectedAnswer: SelectedAnswer | null;
  onSelectOption: (answer: SelectedAnswer) => void;
  showResult?: boolean;
};

export default function QuestionCard({ 
  question, 
  selectedAnswer, 
  onSelectOption,
  showResult = false 
}: Props) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <p className="text-lg font-medium text-gray-900 mb-4">{question.text}</p>
      <div className="space-y-3">
        {question.options.map((option) => {
          const isSelected = selectedAnswer?.selectedOptionId === option.id;
          const isCorrect = showResult && option.id === question.correctAnswer;
          const isWrong = showResult && isSelected && option.id !== question.correctAnswer;

          return (
            <button
              key={option.id}
              onClick={() => onSelectOption({ 
                questionId: question.id, 
                selectedOptionId: option.id 
              })}
              disabled={showResult}
              className={`w-full p-3 rounded-lg border text-left transition-all ${
                isSelected
                  ? isWrong
                    ? 'border-red-600 bg-red-50'
                    : 'border-indigo-600 bg-indigo-50'
                  : isCorrect
                    ? 'border-green-600 bg-green-50'
                    : 'border-gray-200 hover:border-indigo-300'
              }`}
            >
              <div className="flex items-center">
                <span className="w-6 h-6 flex items-center justify-center border border-current rounded-full mr-3">
                  {option.id.toUpperCase()}
                </span>
                <span className="text-sm font-medium">{option.text}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}