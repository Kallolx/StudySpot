import React from 'react';
import { Subject } from '../../types/practice';

type Props = {
  subjects: Subject[];
  selectedSubject: Subject | null;
  onSelect: (subject: Subject) => void;
};

export default function SubjectSelector({ subjects, selectedSubject, onSelect }: Props) {
  return (
    <div className="space-y-2">
      <h3 className="text-lg font-medium text-gray-900">Select Subject</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {subjects.map((subject) => (
          <button
            key={subject.id}
            onClick={() => onSelect(subject)}
            className={`p-4 rounded-lg border transition-all ${
              selectedSubject?.id === subject.id
                ? 'border-indigo-600 bg-indigo-50'
                : 'border-gray-200 hover:border-indigo-300'
            }`}
          >
            <div className="font-medium text-gray-900">{subject.name}</div>
          </button>
        ))}
      </div>
    </div>
  );
}