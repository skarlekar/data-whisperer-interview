
import { useState } from 'react';
import { InterviewChat } from '@/components/InterviewChat';
import { InterviewSetup } from '@/components/InterviewSetup';
import { InterviewSummary } from '@/components/InterviewSummary';
import { Dashboard } from '@/components/Dashboard';
import { InterviewDetailView } from '@/components/InterviewDetailView';
import { InterviewGuide } from '@/components/InterviewGuide';
import { InterviewRecord, saveInterviewRecord } from '@/types/interview';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, Plus, BookOpen } from 'lucide-react';

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
  startTime?: Date;
  endTime?: Date;
}

const Index = () => {
  const [currentView, setCurrentView] = useState<'interview' | 'dashboard' | 'detail' | 'guide'>('interview');
  const [selectedInterview, setSelectedInterview] = useState<InterviewRecord | null>(null);
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
    const startTime = new Date();
    setInterviewState(prev => ({
      ...prev,
      phase: 'interview',
      candidateName: name,
      role: role,
      startTime: startTime,
      messages: [{
        id: '1',
        content: `Hi ${name}! Thanks for joining this interview. I'm excited to learn more about your background in ${role === 'data-scientist' ? 'data science' : 'data engineering'}. Let's start with a quick overview of your experience. Can you tell me about your background and what types of projects you've worked on?`,
        sender: 'interviewer',
        timestamp: startTime
      }]
    }));
  };

  const handleCompleteInterview = (finalScore: number, notes: string[], questions: Array<{questionIndex: number, question: string, response: string, score: number, note: string}>) => {
    const endTime = new Date();
    
    setInterviewState(prev => ({
      ...prev,
      phase: 'summary',
      score: finalScore,
      evaluationNotes: notes,
      endTime: endTime
    }));

    // Save the interview record
    const record: InterviewRecord = {
      id: Date.now().toString(),
      candidateName: interviewState.candidateName,
      role: interviewState.role,
      startTime: interviewState.startTime || new Date(),
      endTime: endTime,
      questions: questions,
      finalScore: finalScore,
      recommendation: getRecommendation(finalScore),
      strengths: getStrengths(interviewState.role, finalScore),
      improvements: getAreasForImprovement(interviewState.role, finalScore)
    };

    saveInterviewRecord(record);
  };

  const getRecommendation = (score: number) => {
    if (score >= 8) return "Strong Hire - Excellent candidate with demonstrated expertise and growth potential";
    if (score >= 6) return "Hire - Good candidate with solid foundation, may need some development";
    return "No Hire - Candidate needs significant development before being ready for this role";
  };

  const getStrengths = (role: string, score: number) => {
    if (score >= 8) {
      return role === 'data-scientist' 
        ? ["Advanced technical expertise", "Strong problem-solving approach", "Excellent communication", "Leadership potential", "Continuous learning mindset"]
        : ["Deep technical knowledge", "Scalable thinking", "Strong architecture skills", "Mentorship qualities", "Enterprise experience"];
    }
    
    if (score >= 6) {
      return role === 'data-scientist'
        ? ["Good technical foundation", "Analytical thinking", "Team collaboration", "Learning oriented"]
        : ["Solid engineering skills", "Understanding of data systems", "Good problem-solving", "Team player"];
    }

    return ["Clear communication skills", "Professional demeanor", "Basic relevant experience"];
  };

  const getAreasForImprovement = (role: string, score: number) => {
    if (score >= 8) return ["None significant - ready for advanced challenges"];
    
    if (score >= 6) {
      return role === 'data-scientist'
        ? ["Could deepen MLOps knowledge", "More experience with enterprise tools", "Leadership development"]
        : ["Could improve cloud architecture skills", "More experience with streaming systems", "Team leadership development"];
    }

    return role === 'data-scientist'
      ? ["Needs stronger technical foundation", "Limited enterprise experience", "Communication could be clearer", "Lacks depth in key areas"]
      : ["Insufficient technical depth", "Limited scalability thinking", "Needs more enterprise exposure", "Architecture knowledge gaps"];
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
    setCurrentView('interview');
  };

  const handleViewInterview = (record: InterviewRecord) => {
    setSelectedInterview(record);
    setCurrentView('detail');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              AI Technical Interview Platform
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Enterprise-level screening for Data Science & Data Engineering roles
            </p>
            
            <div className="flex justify-center space-x-4">
              <Button
                variant={currentView === 'interview' ? 'default' : 'outline'}
                onClick={() => setCurrentView('interview')}
                className="flex items-center space-x-2"
              >
                <Plus size={16} />
                <span>New Interview</span>
              </Button>
              <Button
                variant={currentView === 'dashboard' ? 'default' : 'outline'}
                onClick={() => setCurrentView('dashboard')}
                className="flex items-center space-x-2"
              >
                <LayoutDashboard size={16} />
                <span>Dashboard</span>
              </Button>
              <Button
                variant={currentView === 'guide' ? 'default' : 'outline'}
                onClick={() => setCurrentView('guide')}
                className="flex items-center space-x-2"
              >
                <BookOpen size={16} />
                <span>Interview Guide</span>
              </Button>
            </div>
          </div>

          {currentView === 'interview' && (
            <>
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
            </>
          )}

          {currentView === 'dashboard' && (
            <Dashboard onViewInterview={handleViewInterview} />
          )}

          {currentView === 'guide' && (
            <InterviewGuide />
          )}

          {currentView === 'detail' && selectedInterview && (
            <InterviewDetailView 
              interview={selectedInterview}
              onBack={() => setCurrentView('dashboard')}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
