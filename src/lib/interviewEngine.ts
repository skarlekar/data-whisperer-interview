import { Role } from '@/pages/Index';
import { evaluateWithLLM } from './llmEvaluator';
import { EvaluationMethod } from '@/components/EvaluationMethodSelector';

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
    "How do you balance technical innovation with business constraints when stakeholders have different priorities?",
    "How do you ensure your machine learning models are scalable and maintainable in production?",
    "Do you have any questions about the role or our team?"
  ],
  'data-engineer': [
    "What drew you to data engineering, and how has the field evolved since you started?",
    "Can you walk me through a data pipeline you've built recently? What challenges did you encounter?",
    "How do you ensure data quality and integrity in your workflows, especially at enterprise scale?",
    "Can you explain your experience with batch vs. stream processing? When would you choose each approach?",
    "Have you worked with data governance or compliance frameworks? How do you ensure your pipelines meet these requirements?",
    "Tell me about a time you mentored a junior engineer or led a knowledge-sharing initiative. What was your approach?",
    "What's the most recent technology or tool you've learned, and how have you integrated it into your work?",
    "Describe a time when you had to optimize a poorly performing data system. What was your methodology?",
    "How do you design data architectures that can scale with growing business needs?",
    "Do you have any questions about the role or our team?"
  ]
};

export const getNextQuestion = (questionIndex: number, role: Role, askedQuestions: Set<number>): string => {
  const questions = INTERVIEW_QUESTIONS[role];
  
  // Find the next unasked question
  for (let i = questionIndex; i < questions.length; i++) {
    if (!askedQuestions.has(i)) {
      return questions[i];
    }
  }
  
  // If we've asked all questions, return the final question
  return questions[questions.length - 1];
};

const evaluateDeterministic = (response: string, role: Role): { score: number; note: string } => {
  let score = 5; // Base score
  let notes: string[] = [];
  
  // Check for technical depth
  const technicalKeywords = role === 'data-scientist' 
    ? ['machine learning', 'model', 'algorithm', 'statistical', 'analysis', 'python', 'sql', 'feature', 'data science']
    : ['pipeline', 'etl', 'database', 'architecture', 'scaling', 'streaming', 'batch', 'infrastructure', 'data engineering'];
  
  const hasTechnicalContent = technicalKeywords.some(keyword => 
    response.toLowerCase().includes(keyword)
  );
  
  if (hasTechnicalContent) {
    score += 2;
    notes.push("Strong technical knowledge");
  }
  
  // Check for collaboration mentions
  const collaborationKeywords = ['team', 'collaborate', 'mentor', 'share', 'teach', 'help', 'stakeholder'];
  const hasCollaboration = collaborationKeywords.some(keyword => 
    response.toLowerCase().includes(keyword)
  );
  
  if (hasCollaboration) {
    score += 1;
    notes.push("Good collaboration skills");
  }
  
  // Check for problem-solving approach
  const problemSolvingKeywords = ['approach', 'solution', 'process', 'method', 'strategy', 'analyze', 'challenge'];
  const hasProblemSolving = problemSolvingKeywords.some(keyword => 
    response.toLowerCase().includes(keyword)
  );
  
  if (hasProblemSolving) {
    score += 1;
    notes.push("Structured problem-solving");
  }
  
  // Check response length and detail
  if (response.length > 200) {
    score += 1;
    notes.push("Detailed responses");
  }
  
  // Check for enterprise experience
  const enterpriseKeywords = ['enterprise', 'large-scale', 'production', 'governance', 'compliance'];
  const hasEnterprise = enterpriseKeywords.some(keyword => 
    response.toLowerCase().includes(keyword)
  );
  
  if (hasEnterprise) {
    score += 1;
    notes.push("Enterprise experience");
  }
  
  // Cap the score at 10
  score = Math.min(score, 10);
  
  return {
    score,
    note: notes.join(', ') || 'Standard response'
  };
};

export const evaluateResponse = async (
  response: string,
  role: Role,
  questionIndex: number,
  evaluationMethod: EvaluationMethod,
  apiKey?: string
): Promise<{ score: number; note: string }> => {
  console.log('Evaluation method:', evaluationMethod);
  console.log('API key present:', !!apiKey);
  
  if (evaluationMethod === 'llm') {
    if (!apiKey) {
      console.error('No API key provided for LLM evaluation');
      throw new Error('API key is required for LLM evaluation');
    }
    console.log('Using LLM evaluation');
    return evaluateWithLLM(response, role, questionIndex, apiKey);
  }
  
  console.log('Using deterministic evaluation');
  return evaluateDeterministic(response, role);
};
