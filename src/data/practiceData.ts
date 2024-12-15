import { Subject } from '../types/practice';

export const subjects: Record<string, Subject[]> = {
  engineering: [
    {
      id: 'physics',
      name: 'Physics',
      chapters: [
        {
          id: 'mechanics',
          name: 'Mechanics',
          topics: [
            {
              id: 'motion',
              name: 'Motion and Forces',
              questions: [
                {
                  id: 'q1',
                  text: 'Which of the following is the SI unit of force?',
                  options: [
                    { id: 'a', text: 'Newton' },
                    { id: 'b', text: 'Joule' },
                    { id: 'c', text: 'Watt' },
                    { id: 'd', text: 'Pascal' }
                  ],
                  correctAnswer: 'a'
                },
                {
                  id: 'q2',
                  text: 'What is the acceleration due to gravity on Earth (approximately)?',
                  options: [
                    { id: 'a', text: '5 m/s²' },
                    { id: 'b', text: '9.8 m/s²' },
                    { id: 'c', text: '15 m/s²' },
                    { id: 'd', text: '20 m/s²' }
                  ],
                  correctAnswer: 'b'
                },
                {
                  id: 'q3',
                  text: 'Which law states that every action has an equal and opposite reaction?',
                  options: [
                    { id: 'a', text: 'First Law of Motion' },
                    { id: 'b', text: 'Second Law of Motion' },
                    { id: 'c', text: 'Third Law of Motion' },
                    { id: 'd', text: 'Law of Conservation of Energy' }
                  ],
                  correctAnswer: 'c'
                }
              ]
            }
          ]
        }
      ]
    }
  ],
  medical: [
    {
      id: 'biology',
      name: 'Biology',
      chapters: [
        {
          id: 'cell-biology',
          name: 'Cell Biology',
          topics: [
            {
              id: 'cell-structure',
              name: 'Cell Structure',
              questions: [
                {
                  id: 'q1',
                  text: 'Which organelle is known as the powerhouse of the cell?',
                  options: [
                    { id: 'a', text: 'Mitochondria' },
                    { id: 'b', text: 'Nucleus' },
                    { id: 'c', text: 'Golgi Body' },
                    { id: 'd', text: 'Endoplasmic Reticulum' }
                  ],
                  correctAnswer: 'a'
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};