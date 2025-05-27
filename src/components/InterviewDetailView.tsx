
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { InterviewRecord } from '@/types/interview';
import { ArrowLeft, Clock, MessageCircle } from 'lucide-react';

interface InterviewDetailViewProps {
  interview: InterviewRecord;
  onBack: () => void;
}

export const InterviewDetailView = ({ interview, onBack }: InterviewDetailViewProps) => {
  const duration = Math.round((interview.endTime.getTime() - interview.startTime.getTime()) / (1000 * 60));

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="outline" onClick={onBack} className="flex items-center space-x-2">
          <ArrowLeft size={16} />
          <span>Back to Dashboard</span>
        </Button>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{interview.candidateName}</h2>
          <div className="flex items-center space-x-4 mt-1">
            <Badge variant="secondary">
              {interview.role === 'data-scientist' ? 'Data Scientist' : 'Data Engineer'}
            </Badge>
            <div className="flex items-center space-x-1 text-sm text-gray-600">
              <Clock size={14} />
              <span>{duration} minutes</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageCircle size={20} />
                <span>Interview Conversation</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {interview.questions.map((qa, index) => (
                <div key={index} className="border-l-4 border-blue-200 pl-4 py-2">
                  <div className="mb-2">
                    <p className="font-medium text-blue-900">Q{index + 1}: {qa.question}</p>
                  </div>
                  <div className="mb-2">
                    <p className="text-gray-700">{qa.response}</p>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Badge variant="outline">Score: {qa.score}/10</Badge>
                    <span className="text-gray-600">{qa.note}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Overall Assessment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {interview.finalScore}/10
                </div>
                <Badge variant={interview.finalScore >= 8 ? 'default' : interview.finalScore >= 6 ? 'secondary' : 'destructive'}>
                  {interview.recommendation}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-green-700">Strengths</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {interview.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span className="text-sm">{strength}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-orange-700">Areas for Improvement</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {interview.improvements.map((improvement, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-orange-600 mt-1">•</span>
                    <span className="text-sm">{improvement}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Interview Details</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Start Time:</span>
                <span>{interview.startTime.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">End Time:</span>
                <span>{interview.endTime.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Duration:</span>
                <span>{duration} minutes</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Questions Asked:</span>
                <span>{interview.questions.length}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
