import React from 'react';
import { AdmissionType } from '../../types/practice';

type Props = {
  selectedType: AdmissionType | null;
  onSelect: (type: AdmissionType) => void;
};

const admissionTypes = [
  { id: 'engineering', label: 'Engineering', icon: '🔧' },
  { id: 'medical', label: 'Medical', icon: '⚕️' },
  { id: 'general', label: 'General', icon: '📚' },
] as const;

export default function AdmissionTypeSelector({ selectedType, onSelect }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {admissionTypes.map(({ id, label, icon }) => (
        <button
          key={id}
          onClick={() => onSelect(id)}
          className={`p-6 rounded-lg border-2 transition-all ${
            selectedType === id
              ? 'border-indigo-600 bg-indigo-50'
              : 'border-gray-200 hover:border-indigo-300'
          }`}
        >
          <div className="text-2xl mb-2">{icon}</div>
          <div className="font-medium text-gray-900">{label}</div>
        </button>
      ))}
    </div>
  );
}