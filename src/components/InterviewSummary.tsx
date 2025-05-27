
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { InterviewState } from '@/pages/Index';
import { CheckCircle, AlertCircle, XCircle, RotateCcw, Download } from 'lucide-react';

interface InterviewSummaryProps {
  interviewState: InterviewState;
  onResetInterview: () => void;
}

export const InterviewSummary = ({ interviewState, onResetInterview }: InterviewSummaryProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600';
    if (score >= 6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 8) return <CheckCircle className="w-6 h-6 text-green-600" />;
    if (score >= 6) return <AlertCircle className="w-6 h-6 text-yellow-600" />;
    return <XCircle className="w-6 h-6 text-red-600" />;
  };

  const getRecommendation = (score: number) => {
    if (score >= 8) return "Strong Hire - Excellent candidate with demonstrated expertise and growth potential";
    if (score >= 6) return "Hire - Good candidate with solid foundation, may need some development";
    return "No Hire - Candidate needs significant development before being ready for this role";
  };

  const getStrengths = (role: string, score: number) => {
    const baseStrengths = [
      "Clear communication skills",
      "Professional demeanor",
      "Relevant experience"
    ];

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

    return baseStrengths;
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

  const exportSummary = () => {
    const summary = {
      candidate: interviewState.candidateName,
      role: interviewState.role,
      score: interviewState.score,
      recommendation: getRecommendation(interviewState.score),
      strengths: getStrengths(interviewState.role, interviewState.score),
      improvements: getAreasForImprovement(interviewState.role, interviewState.score),
      timestamp: new Date().toISOString(),
      messages: interviewState.messages.length
    };

    const blob = new Blob([JSON.stringify(summary, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `interview-summary-${interviewState.candidateName.replace(/\s+/g, '-')}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Interview Complete</CardTitle>
          <div className="flex items-center justify-center space-x-2 mt-4">
            {getScoreIcon(interviewState.score)}
            <span className={`text-2xl font-bold ${getScoreColor(interviewState.score)}`}>
              {interviewState.score}/10
            </span>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">{interviewState.candidateName}</h3>
            <Badge variant="secondary" className="text-base px-4 py-1">
              {interviewState.role === 'data-scientist' ? 'Data Scientist' : 'Data Engineer'}
            </Badge>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Overall Score</span>
              <span className={getScoreColor(interviewState.score)}>
                {interviewState.score}/10
              </span>
            </div>
            <Progress value={(interviewState.score / 10) * 100} className="h-3" />
          </div>

          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-lg text-blue-900">Recommendation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-blue-800">{getRecommendation(interviewState.score)}</p>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-green-50 border-green-200">
              <CardHeader>
                <CardTitle className="text-lg text-green-900 flex items-center space-x-2">
                  <CheckCircle size={20} />
                  <span>Strengths</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {getStrengths(interviewState.role, interviewState.score).map((strength, index) => (
                    <li key={index} className="text-green-800 flex items-start space-x-2">
                      <span className="text-green-600 mt-1">•</span>
                      <span>{strength}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-orange-50 border-orange-200">
              <CardHeader>
                <CardTitle className="text-lg text-orange-900 flex items-center space-x-2">
                  <AlertCircle size={20} />
                  <span>Areas for Development</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {getAreasForImprovement(interviewState.role, interviewState.score).map((area, index) => (
                    <li key={index} className="text-orange-800 flex items-start space-x-2">
                      <span className="text-orange-600 mt-1">•</span>
                      <span>{area}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-center space-x-4 pt-4">
            <Button onClick={exportSummary} variant="outline" className="flex items-center space-x-2">
              <Download size={16} />
              <span>Export Summary</span>
            </Button>
            <Button onClick={onResetInterview} className="flex items-center space-x-2">
              <RotateCcw size={16} />
              <span>New Interview</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
