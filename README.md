# Backend Application

_2025 Discover Program - Backend Application_

This repository contains the **Express.js + TypeScript** backend for the Discover Program. It serves as the authentication and data management layer, integrating with **Supabase** for user authentication.

## Tech Leads

- [Brock Brown](https://www.linkedin.com/in/bbrockbrown/)
- [Christian Lee](https://www.linkedin.com/in/christian-lee-b429032a9/)
- [Vihaan Shah](https://www.linkedin.com/in/shah-vihaan/)

---

## ⚙️ Tech Stack

- **Framework**: Node.js + Express.js
- **Authentication**: Supabase Auth
- **Database**: Supabase PostgreSQL
- **Environment Variables**: dotenv
- **Middleware**: Cookie Parser, CORS
- **Linting & Formatting**: ESLint, Prettier

---

## 📂 Project Structure

```
backend/
├── config/               # Configuration files (e.g., Supabase client)
│   ├── supabase.ts
│
├── controllers/          # Route handler functions (business logic)
│   ├── authController.ts
│
├── middleware/           # Middleware functions (authentication, logging)
│   ├── authMiddleware.ts
│
├── routes/               # API route definitions
│   ├── authRoutes.ts
│
├── types/                # TypeScript type definitions
│   ├── types.ts
│
├── .turbo/               # Turbo caching and logs
│   ├── turbo-lint.log
│
├── server.ts             # Express server setup
├── eslint.config.js      # ESLint configuration
├── tsconfig.json         # TypeScript configuration
├── package.json          # Dependencies and scripts
├── README.md             # This document
```

---

## 🚀 Getting Started

### 1️⃣ Install Dependencies

Ensure you have **Node.js 18+** installed.

```sh
npm install
```

### 2️⃣ Run the Development Server

Start the backend server in development mode:

```sh
npm run dev
```

The API will be available at **`http://localhost:5050/`** by default.

### 3️⃣ Build & Run for Production

To generate a production-ready build:

```sh
npm run build
npm start
```

## 4️⃣ Google OAuth Setup Guide

Follow these steps to set up Google OAuth for your forked template.

## Prerequisites
- A Google account
- A Supabase account and project

## Step 1: Get Your Supabase Project URL
1. Go to your Supabase dashboard
2. Navigate to **Project Settings** → **Data API**
3. Copy your **Project URL** (looks like: `https://abcdefghijk.supabase.co`)
4. You'll need this for the next steps

## Step 2: Create Google OAuth Credentials

### 2.1 Access Google Cloud Console
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project

### 2.2 Enable Google+ APIs
1. Click Hamburger Icon at top left -> **APIs & Services**
2. Search and enable: **Google+ API** and **Google+ Domains API**

### 2.3 Configure OAuth Consent Screen
1. Navigate to **APIs & Services** → **OAuth consent screen**
2. Choose **External** user type
3. Fill in required fields:
   - **App name**: Your app name
   - **User support email**: Your email
   - **Developer contact information**: Your email
4. Click **Save and Continue** through all steps

### 2.4 Create OAuth 2.0 Client
1. Go to **APIs & Services** → **Clients**
2. Click **Create Client**
3. Select **Web application**
4. Name it (e.g., "disc-project-26")
5. Under **Authorized redirect URIs**, click **Add URI** and enter:
   ```
   [YOUR_SUPABASE_PROJECT_URL]/auth/v1/callback
   ```
   **Example**: `https://abcdefghijk.supabase.co/auth/v1/callback`
6. Click **Create**
7. **Copy both the Client ID and Client Secret**

## Step 3: Configure Supabase
1. In your Supabase dashboard, go to **Authentication** → **Providers**
2. Find **Google** and toggle it **ON**
3. Paste your **Client ID** and **Client Secret**
4. Click **Save**

## Step 4: Update Environment Variables
1. Get supabase credentials from **Project Settings** -> **API Keys**
2. Update ```.env``` with credentials
   ```bash
   SUPABASE_URL=your_supabase_project_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   FRONTEND_URL=http://localhost:5173
   ```

## Step 5: Test the Integration
1. Start your backend: `npm run dev`
2. Test the auth endpoint: `curl http://localhost:5050/auth/google`
3. You should receive a JSON response with a Google OAuth URL

## Troubleshooting
- **"Redirect URI mismatch"**: Double-check your Supabase project URL in Google Console
- **"Invalid client"**: Verify your Client ID and Secret in Supabase
- **Settings not taking effect**: OAuth changes can take 5 minutes to propagate

## Security Notes
- Keep your `.env` file private (already in `.gitignore`)
- Never commit Client ID/Secret to version control
- For production, add your actual domain to authorized origins


### 4️⃣ MASSIVE NOTE!!!!

Be sure that you have at least a users table created in supabase. If you don't, and you or a teammate attempts to log in via Google, then those users will not be created in your table. 

---

## 🌐 Environment Variables

Create a `.env` file in the root directory and add the following:

```
PORT=3000
NODE_ENV=development

# Supabase Config
SUPABASE_URL=https://your-supabase-url.com
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Frontend URL
FRONTEND_URL=http://localhost:5173
FRONTEND_URL_DEV=http://localhost:5173
```

- Ensure **Supabase keys** are obtained from your **Supabase dashboard**.
- **Never expose the `SUPABASE_SERVICE_ROLE_KEY` on the frontend.**

---

## 🔒 Authentication & Middleware

- Authentication is handled via **Supabase Auth**.
- User sessions are managed using **cookies and JWTs**.
- Protected routes require a valid session token.
- **`authMiddleware.ts`** verifies the user before allowing access to restricted routes.

---

## 🛠️ Common Issues & Fixes

| Issue                         | Solution                                                   |
| ----------------------------- | ---------------------------------------------------------- |
| "Module not found" error      | Run `npm install` to reinstall dependencies.               |
| `.env` variables not loading  | Restart the server after modifying `.env`.                 |
| Supabase authentication fails | Ensure `SUPABASE_URL` and `SUPABASE_ANON_KEY` are correct. |
| CORS issues                   | Check `FRONTEND_URL` in `.env` and update `corsOptions`.   |

---

## 📜 Code Formatting Rules

- **Single quotes (`'`)** for strings.
- **Semicolons (`;`)** required at the end of statements.
- **Max line width of 80 characters**.
- **Import order**:
  1. `"express"` and built-in modules
  2. Third-party libraries
  3. Internal imports (`../config`, `../controllers`, etc.)

---

## 📢 Contributing

If you're contributing, ensure your code follows the formatting rules.
Run the following before submitting a pull request:

```sh
npm run lint && npm run format
```

All PRs should pass linting checks before being merged.

---

## 🎉 Credits

- Built with **Node.js + Express**
- Uses **Supabase** for authentication and database management
- Managed with **Turborepo**
- Uses **ESLint + Prettier** for consistent code quality

This backend serves as the API layer for the Discover Program. For frontend details, check **`apps/frontend/README.md`**.

---