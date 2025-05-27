
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Users, Target, MessageCircle, BarChart, Sparkles, ArrowRight } from 'lucide-react';

export const InterviewGuide = () => {
  return (
    <div className="p-8 space-y-8">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-6">
          <Sparkles className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent mb-4">
          Interview Guide & Specifications
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Comprehensive overview of our enterprise-level data role interview process designed for excellence
        </p>
      </div>

      <div className="grid gap-8">
        {/* Interview Style */}
        <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-50 to-indigo-50 hover:shadow-2xl transition-all duration-300">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center space-x-3 text-xl">
              <div className="p-2 bg-blue-600 rounded-lg">
                <MessageCircle className="h-6 w-6 text-white" />
              </div>
              <span>Interview Style</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed text-lg">
              <strong className="text-blue-800">Friendly, professional, and engaging.</strong> Use a conversational tone that puts the candidate at ease while maintaining a high standard of evaluation. The interview should feel like a collaborative discussion rather than an interrogation.
            </p>
          </CardContent>
        </Card>

        {/* Target Roles */}
        <Card className="border-0 shadow-xl bg-gradient-to-br from-green-50 to-emerald-50 hover:shadow-2xl transition-all duration-300">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center space-x-3 text-xl">
              <div className="p-2 bg-green-600 rounded-lg">
                <Target className="h-6 w-6 text-white" />
              </div>
              <span>Target Roles</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Badge variant="secondary" className="text-base px-6 py-3 bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-200 hover:scale-105 transition-transform">
                Data Scientist (Enterprise-level)
              </Badge>
              <Badge variant="secondary" className="text-base px-6 py-3 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 border-blue-200 hover:scale-105 transition-transform">
                Data Engineer (Enterprise-level)
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Candidate Qualities */}
        <Card className="border-0 shadow-xl bg-gradient-to-br from-purple-50 to-pink-50 hover:shadow-2xl transition-all duration-300">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center space-x-3 text-xl">
              <div className="p-2 bg-purple-600 rounded-lg">
                <Users className="h-6 w-6 text-white" />
              </div>
              <span>Candidate Qualities to Identify</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {[
                "Strong technical foundation in data science or data engineering",
                "Experience working in enterprise environments",
                "Ability to mentor and train junior team members",
                "Team player with excellent communication skills",
                "Passion for continuous learning and problem-solving",
                "Willingness to align with business goals and collaborate cross-functionally"
              ].map((quality, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 bg-white/60 rounded-xl border border-purple-100 hover:bg-white/80 transition-all">
                  <div className="p-1 bg-green-500 rounded-full mt-1">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-gray-700 font-medium">{quality}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Interview Flow */}
        <Card className="border-0 shadow-xl bg-gradient-to-br from-orange-50 to-red-50 hover:shadow-2xl transition-all duration-300">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center space-x-3 text-xl">
              <div className="p-2 bg-orange-600 rounded-lg">
                <BarChart className="h-6 w-6 text-white" />
              </div>
              <span>Interview Flow</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
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
                <div key={index} className="relative">
                  <div className="flex items-start space-x-4 p-6 bg-white/60 rounded-2xl border border-orange-100 hover:bg-white/80 transition-all">
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-orange-600 to-red-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-lg text-gray-900 mb-4">
                        {section.title}
                      </h4>
                      <div className="space-y-3">
                        {section.questions.map((question, qIndex) => (
                          <div key={qIndex} className="flex items-start space-x-3">
                            <ArrowRight className="w-4 h-4 text-orange-500 mt-1 flex-shrink-0" />
                            <p className="text-gray-700 italic leading-relaxed">"{question}"</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  {index < 6 && (
                    <div className="absolute left-4 -bottom-4 w-0.5 h-8 bg-gradient-to-b from-orange-300 to-transparent"></div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Output */}
        <Card className="border-0 shadow-xl bg-gradient-to-br from-slate-100 to-blue-100 hover:shadow-2xl transition-all duration-300">
          <CardHeader className="pb-4">
            <CardTitle className="text-blue-900 text-xl flex items-center space-x-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <BarChart className="h-6 w-6 text-white" />
              </div>
              <span>Expected Output</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-blue-800 text-lg mb-6 font-medium">
              At the end of the interview, summarize the candidate's strengths, potential red flags, and a recommendation score (1–10) based on alignment with the role.
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 bg-white/60 rounded-xl border border-blue-200">
                <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300 px-4 py-2 text-base font-semibold">8-10</Badge>
                <span className="text-gray-700 font-medium">Strong Hire - Excellent candidate</span>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-white/60 rounded-xl border border-blue-200">
                <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300 px-4 py-2 text-base font-semibold">6-7</Badge>
                <span className="text-gray-700 font-medium">Hire - Good candidate, may need development</span>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-white/60 rounded-xl border border-blue-200">
                <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300 px-4 py-2 text-base font-semibold">1-5</Badge>
                <span className="text-gray-700 font-medium">No Hire - Needs significant development</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
