import { useState } from 'react';
import { InterviewChat } from '@/components/InterviewChat';
import { InterviewSetup } from '@/components/InterviewSetup';
import { InterviewSummary } from '@/components/InterviewSummary';
import { Dashboard } from '@/components/Dashboard';
import { InterviewDetailView } from '@/components/InterviewDetailView';
import { InterviewGuide } from '@/components/InterviewGuide';
import { InterviewRecord, saveInterviewRecord } from '@/types/interview';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, Plus, BookOpen, Sparkles, Brain, Database } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-slate-200/50 [mask-image:radial-gradient(ellipse_at_center,white,transparent)] pointer-events-none" />
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-96 h-96 bg-gradient-to-br from-blue-400/30 to-purple-600/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-96 h-96 bg-gradient-to-tr from-emerald-400/30 to-cyan-600/30 rounded-full blur-3xl pointer-events-none" />
      
      <div className="container mx-auto px-4 py-8 relative">
        <div className="max-w-6xl mx-auto">
          {/* Modern Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-6 shadow-xl">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-4">
              AI Technical Interview Platform
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Next-generation enterprise screening for Data Science & Data Engineering talent
            </p>
            
            {/* Enhanced Navigation */}
            <div className="flex justify-center space-x-3">
              <Button
                variant={currentView === 'interview' ? 'default' : 'outline'}
                onClick={() => setCurrentView('interview')}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-200 ${
                  currentView === 'interview' 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg scale-105' 
                    : 'hover:scale-105 hover:shadow-md bg-white/70 backdrop-blur-sm border-gray-200'
                }`}
              >
                <Plus size={18} />
                <span className="font-medium">New Interview</span>
              </Button>
              <Button
                variant={currentView === 'dashboard' ? 'default' : 'outline'}
                onClick={() => setCurrentView('dashboard')}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-200 ${
                  currentView === 'dashboard' 
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-lg scale-105' 
                    : 'hover:scale-105 hover:shadow-md bg-white/70 backdrop-blur-sm border-gray-200'
                }`}
              >
                <LayoutDashboard size={18} />
                <span className="font-medium">Dashboard</span>
              </Button>
              <Button
                variant={currentView === 'guide' ? 'default' : 'outline'}
                onClick={() => setCurrentView('guide')}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-200 ${
                  currentView === 'guide' 
                    ? 'bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 shadow-lg scale-105' 
                    : 'hover:scale-105 hover:shadow-md bg-white/70 backdrop-blur-sm border-gray-200'
                }`}
              >
                <BookOpen size={18} />
                <span className="font-medium">Interview Guide</span>
              </Button>
            </div>
          </div>

          {/* Role indicators */}
          {currentView === 'interview' && interviewState.phase === 'setup' && (
            <div className="flex justify-center space-x-6 mb-8">
              <div className="flex items-center space-x-3 px-6 py-3 bg-white/70 backdrop-blur-sm rounded-xl border border-gray-200 shadow-sm">
                <Brain className="w-6 h-6 text-blue-600" />
                <span className="font-medium text-gray-700">Data Science</span>
              </div>
              <div className="flex items-center space-x-3 px-6 py-3 bg-white/70 backdrop-blur-sm rounded-xl border border-gray-200 shadow-sm">
                <Database className="w-6 h-6 text-purple-600" />
                <span className="font-medium text-gray-700">Data Engineering</span>
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
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
    </div>
  );
};

export default Index;
