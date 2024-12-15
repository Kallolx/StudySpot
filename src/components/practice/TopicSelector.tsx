import React from 'react';
import { Chapter, Topic } from '../../types/practice';

type Props = {
  chapters: Chapter[];
  selectedTopic: Topic | null;
  onSelect: (topic: Topic) => void;
};

export default function TopicSelector({ chapters, selectedTopic, onSelect }: Props) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Select Topic</h3>
      {chapters.map((chapter) => (
        <div key={chapter.id} className="space-y-2">
          <h4 className="font-medium text-gray-700">{chapter.name}</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {chapter.topics.map((topic) => (
              <button
                key={topic.id}
                onClick={() => onSelect(topic)}
                className={`p-3 rounded-lg border text-left transition-all ${
                  selectedTopic?.id === topic.id
                    ? 'border-indigo-600 bg-indigo-50'
                    : 'border-gray-200 hover:border-indigo-300'
                }`}
              >
                <div className="text-sm font-medium text-gray-900">{topic.name}</div>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}