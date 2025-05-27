import { Role } from '@/pages/Index';

interface EvaluationResult {
  score: number;
  note: string;
}

const getSystemPrompt = (role: Role) => `You are an expert technical interviewer evaluating responses for a ${role} position. 
Your task is to evaluate the candidate's response based on:
1. Technical depth and accuracy
2. Problem-solving approach
3. Communication clarity
4. Experience level
5. Collaboration and team skills

Provide a score from 1-10 and a brief note explaining your evaluation.
Format your response as JSON: {"score": number, "note": "string"}`;

export const evaluateWithLLM = async (
  candidateResponse: string,
  role: Role,
  questionIndex: number,
  apiKey: string
): Promise<EvaluationResult> => {
  try {
    const apiResponse = await fetch('http://localhost:3001/api/evaluate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        response: candidateResponse,
        role,
        questionIndex,
        apiKey
      })
    });

    if (!apiResponse.ok) {
      const errorData = await apiResponse.json();
      console.error('Evaluation API error:', errorData);
      throw new Error(`Failed to evaluate response: ${errorData.error || 'Unknown error'}`);
    }

    const evaluation = await apiResponse.json();
    console.log('Evaluation response:', evaluation);
    
    return {
      score: evaluation.score,
      note: evaluation.note
    };
  } catch (error) {
    console.error('Error in LLM evaluation:', error);
    // Fallback to deterministic evaluation if LLM fails
    return {
      score: 5,
      note: 'Error in LLM evaluation, using fallback scoring'
    };
  }
}; 