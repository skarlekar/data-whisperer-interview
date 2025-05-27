
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Role } from '@/pages/Index';

interface InterviewSetupProps {
  onStartInterview: (name: string, role: Role) => void;
}

export const InterviewSetup = ({ onStartInterview }: InterviewSetupProps) => {
  const [candidateName, setCandidateName] = useState('');
  const [selectedRole, setSelectedRole] = useState<Role>('data-scientist');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (candidateName.trim()) {
      onStartInterview(candidateName.trim(), selectedRole);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Interview Setup</CardTitle>
        <CardDescription>
          Please provide your details to begin the technical interview
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Candidate Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your full name"
              value={candidateName}
              onChange={(e) => setCandidateName(e.target.value)}
              required
              className="text-lg"
            />
          </div>

          <div className="space-y-4">
            <Label className="text-base font-semibold">Position</Label>
            <RadioGroup value={selectedRole} onValueChange={(value) => setSelectedRole(value as Role)}>
              <div className="space-y-4">
                <Card className="p-4">
                  <div className="flex items-start space-x-3">
                    <RadioGroupItem value="data-scientist" id="data-scientist" className="mt-1" />
                    <div className="space-y-1">
                      <Label htmlFor="data-scientist" className="text-base font-medium cursor-pointer">
                        Data Scientist (Enterprise-level)
                      </Label>
                      <p className="text-sm text-gray-600">
                        Focus on machine learning, statistical modeling, and advanced analytics
                      </p>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-4">
                  <div className="flex items-start space-x-3">
                    <RadioGroupItem value="data-engineer" id="data-engineer" className="mt-1" />
                    <div className="space-y-1">
                      <Label htmlFor="data-engineer" className="text-base font-medium cursor-pointer">
                        Data Engineer (Enterprise-level)
                      </Label>
                      <p className="text-sm text-gray-600">
                        Focus on data pipelines, infrastructure, and large-scale data processing
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </RadioGroup>
          </div>

          <Button type="submit" className="w-full text-lg py-6" disabled={!candidateName.trim()}>
            Start Interview
          </Button>
        </form>

        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">Interview Overview</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Duration: 30-45 minutes</li>
            <li>• Format: Conversational with follow-up questions</li>
            <li>• Focus: Technical depth, collaboration, and growth mindset</li>
            <li>• Evaluation: Comprehensive scoring and feedback</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
