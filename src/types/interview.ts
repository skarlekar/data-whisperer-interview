
export interface InterviewRecord {
  id: string;
  candidateName: string;
  role: 'data-scientist' | 'data-engineer';
  startTime: Date;
  endTime: Date;
  questions: Array<{
    questionIndex: number;
    question: string;
    response: string;
    score: number;
    note: string;
  }>;
  finalScore: number;
  recommendation: string;
  strengths: string[];
  improvements: string[];
}

export const getStoredInterviews = (): InterviewRecord[] => {
  const stored = localStorage.getItem('interview-records');
  return stored ? JSON.parse(stored) : [];
};

export const saveInterviewRecord = (record: InterviewRecord): void => {
  const existing = getStoredInterviews();
  existing.push(record);
  localStorage.setItem('interview-records', JSON.stringify(existing));
};
