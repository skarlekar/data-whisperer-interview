
import { Role } from '@/pages/Index';

interface QuestionSet {
  'data-scientist': string[];
  'data-engineer': string[];
}

const INTERVIEW_QUESTIONS: QuestionSet = {
  'data-scientist': [
    "What initially drew you to data science, and how has your role evolved over the years?",
    "Can you walk me through a recent project where you had to solve a complex data problem? What was your approach?",
    "How do you approach feature engineering for a machine learning model? Can you give me a specific example?",
    "Have you worked in large-scale enterprise environments? What unique challenges did you face with data governance or compliance?",
    "Tell me about a time you helped mentor someone or shared knowledge with your team. How do you approach knowledge transfer?",
    "What's the most recent skill or concept you've learned, and how have you applied it in your work?",
    "Describe a time when a project didn't go as planned. What did you learn, and how did you adapt?",
    "How do you balance technical innovation with business constraints when stakeholders have different priorities?"
  ],
  'data-engineer': [
    "What drew you to data engineering, and how has the field evolved since you started?",
    "Can you walk me through a data pipeline you've built recently? What challenges did you encounter?",
    "How do you ensure data quality and integrity in your workflows, especially at enterprise scale?",
    "Can you explain your experience with batch vs. stream processing? When would you choose each approach?",
    "Have you worked with data governance or compliance frameworks? How do you ensure your pipelines meet these requirements?",
    "Tell me about a time you mentored a junior engineer or led a knowledge-sharing initiative. What was your approach?",
    "What's the most recent technology or tool you've learned, and how have you integrated it into your work?",
    "Describe a time when you had to optimize a poorly performing data system. What was your methodology?"
  ]
};

const FOLLOW_UP_TEMPLATES = {
  'data-scientist': [
    "That's a great example. How did you validate that your model was performing well in production?",
    "Interesting approach. How did you communicate these technical findings to non-technical stakeholders?",
    "Can you tell me more about how you handled any unexpected results or edge cases?",
    "How did you ensure your solution was scalable and maintainable for other team members?",
    "What would you do differently if you had to tackle a similar problem today?"
  ],
  'data-engineer': [
    "That sounds complex. How did you monitor and maintain that pipeline once it was in production?",
    "Great solution. How did you ensure the pipeline could handle increased data volume over time?",
    "Can you elaborate on how you handled error recovery and data consistency?",
    "How did you collaborate with data scientists or analysts who were consuming this data?",
    "What would you optimize or change if you were to rebuild that system today?"
  ]
};

export const getNextQuestion = (questionIndex: number, role: Role): string => {
  const questions = INTERVIEW_QUESTIONS[role];
  if (questionIndex < questions.length) {
    return questions[questionIndex];
  }
  return "Thank you for sharing all of that. Do you have any questions about the role or our team?";
};

export const generateFollowUp = async (response: string, role: Role): Promise<string> => {
  // In a real implementation, this would use an LLM API
  // For now, we'll use template-based follow-ups
  const templates = FOLLOW_UP_TEMPLATES[role];
  const randomTemplate = templates[Math.floor(Math.random() * templates.length)];
  
  // Add some variation based on response content
  if (response.toLowerCase().includes('machine learning') || response.toLowerCase().includes('model')) {
    return "That's interesting. Can you walk me through how you approached the model validation and testing process?";
  }
  
  if (response.toLowerCase().includes('team') || response.toLowerCase().includes('collaborate')) {
    return "Great to hear about the collaboration aspect. How do you typically handle disagreements or different technical opinions within the team?";
  }
  
  if (response.toLowerCase().includes('challenge') || response.toLowerCase().includes('problem')) {
    return "That sounds like a significant challenge. What was your decision-making process when you hit roadblocks?";
  }
  
  return randomTemplate;
};

export const evaluateResponse = async (response: string, role: Role): Promise<{ score: number; note: string }> => {
  // In a real implementation, this would use an LLM for evaluation
  // For demo purposes, we'll use simple heuristics
  
  let score = 5; // Base score
  let notes: string[] = [];
  
  // Check for technical depth
  const technicalKeywords = role === 'data-scientist' 
    ? ['machine learning', 'model', 'algorithm', 'statistical', 'analysis', 'python', 'sql', 'feature']
    : ['pipeline', 'etl', 'database', 'architecture', 'scaling', 'streaming', 'batch', 'infrastructure'];
  
  const hasTechnicalContent = technicalKeywords.some(keyword => 
    response.toLowerCase().includes(keyword)
  );
  
  if (hasTechnicalContent) {
    score += 1;
    notes.push("Shows technical knowledge");
  }
  
  // Check for collaboration mentions
  const collaborationKeywords = ['team', 'collaborate', 'mentor', 'share', 'teach', 'help'];
  const hasCollaboration = collaborationKeywords.some(keyword => 
    response.toLowerCase().includes(keyword)
  );
  
  if (hasCollaboration) {
    score += 1;
    notes.push("Demonstrates collaboration skills");
  }
  
  // Check for problem-solving approach
  const problemSolvingKeywords = ['approach', 'solution', 'process', 'method', 'strategy', 'analyze'];
  const hasProblemSolving = problemSolvingKeywords.some(keyword => 
    response.toLowerCase().includes(keyword)
  );
  
  if (hasProblemSolving) {
    score += 1;
    notes.push("Shows structured problem-solving");
  }
  
  // Check response length and detail
  if (response.length > 200) {
    score += 1;
    notes.push("Provides detailed responses");
  }
  
  // Cap the score at 10
  score = Math.min(score, 10);
  
  return {
    score,
    note: notes.join(', ') || 'Standard response'
  };
};
