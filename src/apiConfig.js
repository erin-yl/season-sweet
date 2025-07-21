const isProduction = import.meta.env.PROD;

export const API_BASE_URL = isProduction
  ? 'https://season-sweet.onrender.com'
  : ''; // Use an empty string for local dev to enable proxy