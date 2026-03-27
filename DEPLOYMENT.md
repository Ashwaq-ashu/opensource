# 🚀 Deployment Guide: Life Optimizer

Follow these steps to deploy your backend and frontend to the web.

## 1. Database Setup (MongoDB Atlas)
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Click **Create** -> **Build a Database** -> **M0 (Shared/Free)**.
3. In "Network Access", allow access from `0.0.0.0/0` (required for Render).
4. Create a database user and save the password.
5. Get your **Connection String** (e.g., `mongodb+srv://...`).

## 2. Backend Deployment (Render)
1. Create an account at [Render](https://render.com).
2. Click **New** -> **Blueprint**.
3. Connect your GitHub repository `Ashwaq-ashu/opensource`.
4. Render will detect `render.yaml`. Click **Apply**.
5. Go to the **Dashboard** -> **life-optimizer-backend** -> **Environment**.
6. Add the following variables:
   - `MONGO_URI`: Your MongoDB connection string.
   - `GROQ_API_KEY`: Your Groq API key.
   - `FRONTEND_URL`: `https://your-frontend-domain.vercel.app` (You'll get this in the next step).

## 3. Frontend Deployment (Vercel)
1. Create an account at [Vercel](https://vercel.com).
2. Click **Add New Project**.
3. Import your `opensource` repository.
4. Set the **Root Directory** to `frontend`.
5. In **Environment Variables**, add:
   - `BACKEND_URL`: The URL of your Render backend (e.g., `https://life-optimizer-backend.onrender.com`).
6. Click **Deploy**.

## 4. Final Connection
Once both are deployed:
1. Copy your Vercel URL.
2. Go back to Render -> Environment.
3. Update `FRONTEND_URL` with your Vercel URL to allow CORS.
