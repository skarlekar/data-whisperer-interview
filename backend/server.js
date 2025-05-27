const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

function getSystemPrompt(role) {
  return `You are an expert interviewer evaluating a candidate's response for a ${role} position. 
  Analyze the response and provide a score from 1-10 and a brief note explaining your evaluation.
  
  IMPORTANT: You must respond with ONLY a valid JSON object, with no additional text or explanation.
  The response must be parseable by JSON.parse() and must follow this exact structure:
  {
    "score": number,
    "note": string
  }
  
  Example of valid response:
  {"score": 8, "note": "Strong technical understanding demonstrated with clear examples"}
  
  Do not include any other text, markdown formatting, or explanations outside the JSON object.`;
}

// Add endpoint to check for API key
app.get('/api/check-api-key', (req, res) => {
  const hasApiKey = !!process.env.ANTHROPIC_API_KEY;
  res.json({ hasApiKey });
});

app.post('/api/evaluate', async (req, res) => {
  try {
    const { response, role, questionIndex, apiKey } = req.body;
    
    // Use environment variable if available, otherwise use the provided apiKey
    const finalApiKey = process.env.ANTHROPIC_API_KEY || apiKey;

    if (!finalApiKey) {
      return res.status(400).json({ error: 'API key is required' });
    }

    const apiResponse = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': finalApiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 3000,
        system: getSystemPrompt(role),
        messages: [
          {
            role: 'user',
            content: `Evaluate this response for a ${role} position:
            ${response}`
          }
        ]
      })
    });

    if (!apiResponse.ok) {
      const errorData = await apiResponse.json();
      console.error('Claude API error:', errorData);
      return res.status(apiResponse.status).json({ 
        error: errorData.error?.message || 'Failed to evaluate response' 
      });
    }

    const data = await apiResponse.json();
    console.log('Claude API response:', data);

    const evaluationText = data.content[0].text.trim();
    console.log('Raw evaluation text:', evaluationText);

    let evaluation;
    try {
      // Try to parse the response as JSON
      evaluation = JSON.parse(evaluationText);
      
      // Validate the response structure
      if (typeof evaluation.score !== 'number' || typeof evaluation.note !== 'string') {
        throw new Error('Invalid response structure');
      }
      
      // Ensure score is within valid range
      if (evaluation.score < 1 || evaluation.score > 10) {
        throw new Error('Score must be between 1 and 10');
      }
    } catch (parseError) {
      console.error('Failed to parse Claude response:', evaluationText);
      console.error('Parse error:', parseError);
      return res.status(500).json({ 
        error: 'Invalid response format from Claude',
        details: parseError.message,
        rawResponse: evaluationText
      });
    }

    res.json(evaluation);
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 