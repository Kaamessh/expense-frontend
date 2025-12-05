# Expense Tracker Frontend

React frontend for the Expense Tracker app. Works locally and on Vercel. Backend is expected to run on Render or locally.

## Requirements
- Node.js 18+
- npm 9+

## Environment Variables
Create a `.env` file (not committed). Use `.env.example` as a reference.

Required:
- `REACT_APP_BACKEND_URL` — Backend base URL (e.g., `http://localhost:4000` or `https://<your-render>.onrender.com`)

Optional:
- `REACT_APP_GOOGLE_CLIENT_ID` — For displaying Google button text or client hints.

## Local Development
```cmd
cd frontend
npm install
npm start
```
The app runs at `http://localhost:3000`.

## Build
```cmd
cd frontend
npm run build
```
Outputs optimized assets to `build/`.

## Deploy (Vercel)
1. Push this repo to GitHub (`Kaamessh/expense-frontend`).
2. Import the repo in Vercel.
3. Set project env vars:
   - `REACT_APP_BACKEND_URL` → `https://<your-render>.onrender.com`
4. Build & deploy.

## Backend Expectations
Ensure the backend exposes:
- `GET /api/v1/auth/google` and callback
- `POST /api/v1/auth/login`, `POST /api/v1/auth/register`
- `GET /api/v1/auth/me`
- `GET/POST /api/v1/expenses`
- `GET /api/v1/stats`

## Troubleshooting
- If favicon doesn’t update, hard refresh (`Ctrl+F5`).
- CORS errors: verify `CORS` on backend allows your frontend domain.
- OAuth redirect mismatch: callback must match Render URL path `/api/v1/auth/google/callback`.
