const express = require('express');
const cors = require('cors');
const path = require('path');
const { createApi } = require('unsplash-js')

require('dotenv').config({ path: path.resolve(__dirname, './.env') });

const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize the Express app
const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

if (!process.env.GEMINI_API_KEY) {
  throw new Error('GEMINI_API_KEY is not set in the environment variables.');
}
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

if (!process.env.UNSPLASH_ACCESS_KEY) {
  throw new Error('UNSPLASH_ACCESS_KEY is not set in the environment variables.');
}
const unsplash = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY,
});

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
    res.status(500).json({ error: 'Failed to generate recipe.' });
  }
});

app.post('/api/get-image', async (req, res) => {
  try {
    const { query } = req.body;
    if (!query) return res.status(400).json({ error: 'Image query is required.' });

    // This will now work because 'unsplash' is defined
    const result = await unsplash.search.getPhotos({
      query,
      page: 1,
      perPage: 3,
      orientation: 'squarish',
      content_filter: 'high',
    });

    if (result.errors) {
      return res.status(500).json({ error: result.errors[0] });
    }

    const photos = result.response?.results;

    if (!photos || photos.length === 0) {
      return res.json({ imageUrl: 'https://images.unsplash.com/photo-1542116021-0ff087fb0a41?q=80&w=1172' });
    }

    const randomIndex = Math.floor(Math.random() * photos.length);
    const randomPhoto = photos[randomIndex];

    res.json({ imageUrl: randomPhoto.urls.regular });

  } catch (error) {
    console.error('Error in /api/get-image:', error);
    res.status(500).json({ error: 'Failed to fetch image.' });
  }
});

app.post('/api/get-weather', async (req, res) => {
  try {
    const { latitude, longitude } = req.body;
    if (!latitude || !longitude) {
      return res.status(400).json({ error: 'Latitude and longitude are required.' });
    }

    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.WEATHER_API_KEY}&units=metric`;

    const weatherResponse = await fetch(weatherApiUrl);
    if (!weatherResponse.ok) {
      throw new Error('Failed to fetch weather data from OpenWeatherMap.');
    }

    const weatherData = await weatherResponse.json();
    res.json(weatherData);

  } catch (error) {
    console.error('Error in weather endpoint:', error);
    res.status(500).json({ error: 'Failed to get weather data.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});