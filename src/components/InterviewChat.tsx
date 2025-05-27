
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Send, User, MessageCircle } from 'lucide-react';
import { InterviewState } from '@/pages/Index';
import { getNextQuestion, evaluateResponse, generateFollowUp } from '@/lib/interviewEngine';

interface InterviewChatProps {
  interviewState: InterviewState;
  setInterviewState: React.Dispatch<React.SetStateAction<InterviewState>>;
  onCompleteInterview: (score: number, notes: string[]) => void;
}

export const InterviewChat = ({ interviewState, setInterviewState, onCompleteInterview }: InterviewChatProps) => {
  const [currentResponse, setCurrentResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [interviewState.messages]);

  const handleSendResponse = async () => {
    if (!currentResponse.trim() || isLoading) return;

    const candidateMessage = {
      id: Date.now().toString(),
      content: currentResponse.trim(),
      sender: 'candidate' as const,
      timestamp: new Date()
    };

    setInterviewState(prev => ({
      ...prev,
      messages: [...prev.messages, candidateMessage]
    }));

    setCurrentResponse('');
    setIsLoading(true);

    try {
      // Evaluate the response
      const evaluation = await evaluateResponse(currentResponse.trim(), interviewState.role);
      
      // Generate next question or follow-up
      let nextQuestion;
      const shouldContinue = interviewState.currentQuestionIndex < 8;
      
      if (shouldContinue) {
        if (Math.random() > 0.6) { // 40% chance for follow-up
          nextQuestion = await generateFollowUp(currentResponse.trim(), interviewState.role);
        } else {
          nextQuestion = getNextQuestion(interviewState.currentQuestionIndex + 1, interviewState.role);
          setInterviewState(prev => ({
            ...prev,
            currentQuestionIndex: prev.currentQuestionIndex + 1
          }));
        }
      } else {
        nextQuestion = "Thank you for sharing all of that information with me. Before we wrap up, do you have any questions about the role or our team? And what are you most excited about in your next opportunity?";
      }

      const interviewerMessage = {
        id: (Date.now() + 1).toString(),
        content: nextQuestion,
        sender: 'interviewer' as const,
        timestamp: new Date()
      };

      setInterviewState(prev => ({
        ...prev,
        messages: [...prev.messages, interviewerMessage],
        evaluationNotes: [...prev.evaluationNotes, evaluation.note]
      }));

      // Check if interview should end
      if (interviewState.currentQuestionIndex >= 8) {
        setTimeout(() => {
          const avgScore = interviewState.evaluationNotes.length > 0 
            ? Math.round((interviewState.evaluationNotes.length * 7 + Math.random() * 3)) 
            : 7;
          onCompleteInterview(avgScore, [...interviewState.evaluationNotes, evaluation.note]);
        }, 2000);
      }

    } catch (error) {
      console.error('Error processing response:', error);
      const fallbackMessage = {
        id: (Date.now() + 1).toString(),
        content: "That's interesting. Can you tell me more about your approach to that challenge?",
        sender: 'interviewer' as const,
        timestamp: new Date()
      };

      setInterviewState(prev => ({
        ...prev,
        messages: [...prev.messages, fallbackMessage]
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const progress = Math.min((interviewState.currentQuestionIndex / 8) * 100, 100);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Interview with {interviewState.candidateName}
          </h2>
          <Badge variant="secondary" className="mt-1">
            {interviewState.role === 'data-scientist' ? 'Data Scientist' : 'Data Engineer'}
          </Badge>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-600 mb-1">Progress</div>
          <div className="w-32">
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      </div>

      <Card className="h-96 flex flex-col">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Interview Conversation</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto space-y-4">
          {interviewState.messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start space-x-3 ${
                message.sender === 'candidate' ? 'flex-row-reverse space-x-reverse' : ''
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                message.sender === 'interviewer' 
                  ? 'bg-blue-100 text-blue-600' 
                  : 'bg-green-100 text-green-600'
              }`}>
                {message.sender === 'interviewer' ? <MessageCircle size={16} /> : <User size={16} />}
              </div>
              <div className={`max-w-[80%] p-3 rounded-lg ${
                message.sender === 'interviewer'
                  ? 'bg-blue-50 text-blue-900'
                  : 'bg-green-50 text-green-900'
              }`}>
                <p className="text-sm">{message.content}</p>
                <div className="text-xs text-gray-500 mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                <MessageCircle size={16} />
              </div>
              <div className="bg-blue-50 text-blue-900 p-3 rounded-lg">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <Textarea
              placeholder="Type your response here..."
              value={currentResponse}
              onChange={(e) => setCurrentResponse(e.target.value)}
              className="min-h-24 resize-none"
              disabled={isLoading}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.ctrlKey) {
                  handleSendResponse();
                }
              }}
            />
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Press Ctrl+Enter to send
              </div>
              <Button 
                onClick={handleSendResponse} 
                disabled={!currentResponse.trim() || isLoading}
                className="flex items-center space-x-2"
              >
                <Send size={16} />
                <span>Send Response</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
