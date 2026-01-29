
export type Role = 'admin' | 'teacher';

export interface User {
  uid: string;
  name: string;
  email: string;
  role: Role;
}

export interface ClassRoom {
  id: string;
  name: string;
  grade: string;
  year: number;
  teacherId: string;
}

export interface Student {
  id: string;
  classId: string;
  name: string;
  pedagogicalProfile: {
    strengths: string;
    challenges: string;
    interests: string;
    specialNeeds: string;
  };
}

export interface Activity {
  id: string;
  classId: string;
  title: string;
  content: string;
  adaptations?: {
    type: string;
    content: string;
  }[];
  createdAt: string;
}

export interface EvaluationIndicator {
  criteria: string;
  score: number; // 1-4 (Em início, Em desenvolvimento, Consolidado, Avançado)
  feedback: string;
}

export interface Evaluation {
  id: string;
  studentId: string;
  activityId: string;
  indicators: EvaluationIndicator[];
  date: string;
  generalObservations: string;
}
