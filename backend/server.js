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

app.post('/api/get-image', async (req, res) => {
  try {
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({ error: 'Image query is required.' });
    }

    const unsplashUrl = `https://api.unsplash.com/search/photos?query=${query}&per_page=1&orientation=landscape`;

    const imageResponse = await fetch(unsplashUrl, {
      headers: {
        'Authorization': `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`
      }
    });

    if (!imageResponse.ok) {
      throw new Error('Failed to fetch image from Unsplash.');
    }

    const imageData = await imageResponse.json();

    // Find a valid image URL, with a fallback
    const imageUrl = imageData.results[0]?.urls?.regular ?? 'https://images.unsplash.com/photo-1542116021-0ff087fb0a41'; // Fallback image

    res.json({ imageUrl });

  } catch (error) {
    console.error('Error fetching from Unsplash:', error);
    // Don't crash the app, just send a fallback image
    res.json({ imageUrl: 'https://images.unsplash.com/photo-1542116021-0ff087fb0a41' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});