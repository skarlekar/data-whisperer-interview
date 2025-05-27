
import { useState } from 'react';
import { InterviewChat } from '@/components/InterviewChat';
import { InterviewSetup } from '@/components/InterviewSetup';
import { InterviewSummary } from '@/components/InterviewSummary';

export type Role = 'data-scientist' | 'data-engineer';

export interface InterviewState {
  phase: 'setup' | 'interview' | 'summary';
  candidateName: string;
  role: Role;
  messages: Array<{
    id: string;
    content: string;
    sender: 'interviewer' | 'candidate';
    timestamp: Date;
  }>;
  currentQuestionIndex: number;
  evaluationNotes: string[];
  score: number;
}

const Index = () => {
  const [interviewState, setInterviewState] = useState<InterviewState>({
    phase: 'setup',
    candidateName: '',
    role: 'data-scientist',
    messages: [],
    currentQuestionIndex: 0,
    evaluationNotes: [],
    score: 0
  });

  const handleStartInterview = (name: string, role: Role) => {
    setInterviewState(prev => ({
      ...prev,
      phase: 'interview',
      candidateName: name,
      role: role,
      messages: [{
        id: '1',
        content: `Hi ${name}! Thanks for joining this interview. I'm excited to learn more about your background in ${role === 'data-scientist' ? 'data science' : 'data engineering'}. Let's start with a quick overview of your experience. Can you tell me about your background and what types of projects you've worked on?`,
        sender: 'interviewer',
        timestamp: new Date()
      }]
    }));
  };

  const handleCompleteInterview = (finalScore: number, notes: string[]) => {
    setInterviewState(prev => ({
      ...prev,
      phase: 'summary',
      score: finalScore,
      evaluationNotes: notes
    }));
  };

  const handleResetInterview = () => {
    setInterviewState({
      phase: 'setup',
      candidateName: '',
      role: 'data-scientist',
      messages: [],
      currentQuestionIndex: 0,
      evaluationNotes: [],
      score: 0
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              AI Technical Interview Platform
            </h1>
            <p className="text-lg text-gray-600">
              Enterprise-level screening for Data Science & Data Engineering roles
            </p>
          </div>

          {interviewState.phase === 'setup' && (
            <InterviewSetup onStartInterview={handleStartInterview} />
          )}

          {interviewState.phase === 'interview' && (
            <InterviewChat 
              interviewState={interviewState}
              setInterviewState={setInterviewState}
              onCompleteInterview={handleCompleteInterview}
            />
          )}

          {interviewState.phase === 'summary' && (
            <InterviewSummary 
              interviewState={interviewState}
              onResetInterview={handleResetInterview}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
