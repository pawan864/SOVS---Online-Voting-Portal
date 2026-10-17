/**
 * Secure Online Voting System (SOVS)
 * Central Application Configuration
 *
 * Provides environment-aware API URL resolution:
 * - When running locally (localhost / 127.0.0.1): connects to local backend http://localhost:5001/api
 * - In production (Render / Vercel): connects to VITE_API_URL or production Render URL
 */

export const API_BASE_URL: string =
  import.meta.env.VITE_API_URL ||
  (typeof window !== 'undefined' &&
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    ? 'http://localhost:5001/api'
    : 'https://sovs-backend-bf8j.onrender.com/api');

export const API = API_BASE_URL;

export default {
  API_BASE_URL,
  API,
};
