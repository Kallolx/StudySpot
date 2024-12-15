export type AdmissionType = 'engineering' | 'medical' | 'general';

export type Subject = {
  id: string;
  name: string;
  chapters: Chapter[];
};

export type Chapter = {
  id: string;
  name: string;
  topics: Topic[];
};

export type Topic = {
  id: string;
  name: string;
  questions: Question[];
};

export type Question = {
  id: string;
  text: string;
  options: Option[];
  correctAnswer: string;
};

export type Option = {
  id: string;
  text: string;
};

export type SelectedAnswer = {
  questionId: string;
  selectedOptionId: string;
};