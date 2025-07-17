const express = require('express');
const cors = require('cors');
const path = require('path');

require('dotenv').config({ path: path.resolve(__dirname, './.env') });

const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize the Express app
const app = express();
const port = process.env.PORT || 5001; // Use port 5001 or one defined in .env

app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Enable parsing of JSON request bodies

if (!process.env.GEMINI_API_KEY) {
  throw new Error('GEMINI_API_KEY is not set in the environment variables.');
}
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

app.post('/api/generate-recipe', async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required.' });
    }

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();

    text = text.replace(/```json\n/g, '').replace(/\n```/g, '');
    const recipeJson = JSON.parse(text);

    res.json(recipeJson);

  } catch (error) {
    console.error('Error communicating with Gemini API:', error);
    res.status(500).json({ error: 'Failed to generate recipe. Please try again later.' });
  }
});

// --- Start the Server ---
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});