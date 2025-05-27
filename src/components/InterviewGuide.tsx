
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Users, Target, MessageCircle, BarChart } from 'lucide-react';

export const InterviewGuide = () => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Interview Guide & Specifications
        </h2>
        <p className="text-lg text-gray-600">
          Comprehensive overview of our enterprise-level data role interview process
        </p>
      </div>

      {/* Interview Style */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MessageCircle className="h-6 w-6 text-blue-600" />
            <span>Interview Style</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 leading-relaxed">
            <strong>Friendly, professional, and engaging.</strong> Use a conversational tone that puts the candidate at ease while maintaining a high standard of evaluation. The interview should feel like a collaborative discussion rather than an interrogation.
          </p>
        </CardContent>
      </Card>

      {/* Target Roles */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-6 w-6 text-green-600" />
            <span>Target Roles</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Badge variant="secondary" className="text-base px-4 py-2">
              Data Scientist (Enterprise-level)
            </Badge>
            <Badge variant="secondary" className="text-base px-4 py-2">
              Data Engineer (Enterprise-level)
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Candidate Qualities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-6 w-6 text-purple-600" />
            <span>Candidate Qualities to Identify</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {[
              "Strong technical foundation in data science or data engineering",
              "Experience working in enterprise environments",
              "Ability to mentor and train junior team members",
              "Team player with excellent communication skills",
              "Passion for continuous learning and problem-solving",
              "Willingness to align with business goals and collaborate cross-functionally"
            ].map((quality, index) => (
              <li key={index} className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{quality}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Interview Flow */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart className="h-6 w-6 text-orange-600" />
            <span>Interview Flow</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {[
              {
                title: "Introduction & Background",
                questions: [
                  "Hi! Thanks for joining this interview. Let's start with a quick overview of your background. Can you tell me about your experience in data science or data engineering?",
                  "What types of projects have you worked on, and what industries have you been involved in?"
                ]
              },
              {
                title: "Technical Experience",
                questions: [
                  "Can you walk me through a recent project where you had to solve a complex data problem?",
                  "Which tools, languages, or platforms do you use most often, and why?",
                  "How do you ensure data quality and integrity in your workflows?"
                ]
              },
              {
                title: "Enterprise Readiness",
                questions: [
                  "Have you worked in large-scale enterprise environments? What challenges did you face, and how did you overcome them?",
                  "How do you balance technical innovation with business constraints?"
                ]
              },
              {
                title: "Team Collaboration & Mentorship",
                questions: [
                  "Tell me about a time you helped a teammate or mentored someone into a more advanced role.",
                  "How do you approach knowledge sharing within your team?"
                ]
              },
              {
                title: "Growth Mindset & Learning",
                questions: [
                  "What's the most recent skill or concept you've learned, and how did you apply it?",
                  "How do you stay up to date with the latest trends in data science or engineering?"
                ]
              },
              {
                title: "Problem Solving & Adaptability",
                questions: [
                  "Describe a time when a project didn't go as planned. What did you learn from it?",
                  "How do you approach ambiguous problems with limited data?"
                ]
              },
              {
                title: "Closing & Fit",
                questions: [
                  "Why are you interested in this role, and what are you looking for in your next opportunity?",
                  "Do you have any questions for us?"
                ]
              }
            ].map((section, index) => (
              <div key={index} className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold text-lg text-gray-900 mb-2">
                  {index + 1}. {section.title}
                </h4>
                <ul className="space-y-2">
                  {section.questions.map((question, qIndex) => (
                    <li key={qIndex} className="text-gray-700 italic">
                      "{question}"
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Output */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-900">Expected Output</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-blue-800">
            <strong>At the end of the interview, summarize the candidate's strengths, potential red flags, and a recommendation score (1–10) based on alignment with the role.</strong>
          </p>
          <div className="mt-4 space-y-2">
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="bg-green-100 text-green-800">8-10</Badge>
              <span className="text-sm text-gray-700">Strong Hire - Excellent candidate</span>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="bg-yellow-100 text-yellow-800">6-7</Badge>
              <span className="text-sm text-gray-700">Hire - Good candidate, may need development</span>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="bg-red-100 text-red-800">1-5</Badge>
              <span className="text-sm text-gray-700">No Hire - Needs significant development</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
