
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
  if (!stored) return [];
  
  const parsed = JSON.parse(stored);
  
  // Convert string dates back to Date objects
  return parsed.map((interview: any) => ({
    ...interview,
    startTime: new Date(interview.startTime),
    endTime: new Date(interview.endTime)
  }));
};

export const saveInterviewRecord = (record: InterviewRecord): void => {
  const existing = getStoredInterviews();
  existing.push(record);
  localStorage.setItem('interview-records', JSON.stringify(existing));
};
