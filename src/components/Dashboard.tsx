
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { InterviewRecord, getStoredInterviews } from '@/types/interview';
import { Eye, Download, Users, TrendingUp, Calendar } from 'lucide-react';

interface DashboardProps {
  onViewInterview: (record: InterviewRecord) => void;
}

export const Dashboard = ({ onViewInterview }: DashboardProps) => {
  const [interviews] = useState<InterviewRecord[]>(getStoredInterviews());

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'bg-green-100 text-green-800';
    if (score >= 6) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const getRecommendationBadge = (score: number) => {
    if (score >= 8) return { text: 'Strong Hire', variant: 'default' as const };
    if (score >= 6) return { text: 'Hire', variant: 'secondary' as const };
    return { text: 'No Hire', variant: 'destructive' as const };
  };

  const averageScore = interviews.length > 0 
    ? Math.round((interviews.reduce((sum, interview) => sum + interview.finalScore, 0) / interviews.length) * 10) / 10
    : 0;

  const strongHires = interviews.filter(interview => interview.finalScore >= 8).length;
  const totalCandidates = interviews.length;

  const exportData = () => {
    const blob = new Blob([JSON.stringify(interviews, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `interview-records-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Interview Dashboard</h2>
          <p className="text-gray-600 mt-1">Review and manage candidate interviews</p>
        </div>
        <Button onClick={exportData} variant="outline" className="flex items-center space-x-2">
          <Download size={16} />
          <span>Export Data</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Candidates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-blue-600" />
              <span className="text-2xl font-bold">{totalCandidates}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Average Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span className="text-2xl font-bold">{averageScore}/10</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Strong Hires</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-purple-600" />
              <span className="text-2xl font-bold">{strongHires}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Success Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-orange-600" />
              <span className="text-2xl font-bold">
                {totalCandidates > 0 ? Math.round((strongHires / totalCandidates) * 100) : 0}%
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Interviews</CardTitle>
        </CardHeader>
        <CardContent>
          {interviews.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Users size={48} className="mx-auto mb-4 opacity-50" />
              <p>No interviews conducted yet</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Candidate</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Recommendation</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {interviews.map((interview) => {
                  const recommendation = getRecommendationBadge(interview.finalScore);
                  return (
                    <TableRow key={interview.id}>
                      <TableCell className="font-medium">{interview.candidateName}</TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {interview.role === 'data-scientist' ? 'Data Scientist' : 'Data Engineer'}
                        </Badge>
                      </TableCell>
                      <TableCell>{interview.endTime.toLocaleDateString()}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-sm font-medium ${getScoreColor(interview.finalScore)}`}>
                          {interview.finalScore}/10
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge variant={recommendation.variant}>{recommendation.text}</Badge>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onViewInterview(interview)}
                          className="flex items-center space-x-1"
                        >
                          <Eye size={14} />
                          <span>View</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
