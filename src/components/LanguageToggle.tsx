import React from 'react';
import { Languages } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-150"
      aria-label="Toggle language"
    >
      <Languages className="h-5 w-5 mr-2" />
      <span className="font-medium">{language.toUpperCase()}</span>
    </button>
  );
} 