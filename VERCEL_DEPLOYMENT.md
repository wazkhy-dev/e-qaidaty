# e-Qaidaty Vercel Deployment Guide

## Quick Start

### 1. Prerequisites
- GitHub account with the project repository
- Vercel account (free tier available)
- Gemini API Key from Google

### 2. Environment Variables Setup

Before deploying to Vercel, configure these environment variables in your Vercel project dashboard:

**Project Settings → Environment Variables:**
```
GEMINI_API_KEY = <your_gemini_api_key>
GEMINI_MODEL = gemini-3.7-flash (optional)
```

**Important:** Never commit `.env` files with secrets to Git. Use `.env.example` for documentation only.

### 3. Deploy to Vercel

#### Option A: Via Vercel CLI
```bash
npm install -g vercel
vercel login
vercel
```

#### Option B: Via GitHub (Recommended)
1. Push project to GitHub
2. Go to https://vercel.com/new
3. Connect GitHub repository
4. Select project root folder: `./qaidaty`
5. Add Environment Variables in "Environment Variables" section
6. Click Deploy

### 4. Local Development

```bash
# Install dependencies
npm install

# Run dev server with Express backend + Vite HMR
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Lint TypeScript
npm run lint
```

---

## Project Structure

```
qaidaty/
├── src/                          # React frontend source
│   ├── components/               # React components (UI)
│   ├── services/                 # Client-side services (API calls)
│   ├── data/                     # Lesson content (QAIDATY_LESSONS)
│   ├── server/                   # Server-side services (Gemini)
│   └── App.tsx                   # Main React component
├── api/                          # Vercel Serverless Functions
│   ├── chat.ts                   # POST /api/chat
│   ├── bedah-kalimah.ts          # POST /api/bedah-kalimah
│   ├── health.ts                 # GET /api/health
│   ├── ai/
│   │   └── chat.ts               # POST /api/ai/chat (alias)
│   └── teacher/
│       └── generate-summary.ts   # POST /api/teacher/generate-summary
├── dist/                         # Built frontend (Vite output)
├── package.json                  # Dependencies & scripts
├── vite.config.ts                # Vite build configuration
├── vercel.json                   # Vercel deployment config
├── .vercelignore                 # Files to exclude from Vercel
├── .env.example                  # Environment variable template
└── server.ts                     # Local dev Express server
```

---

## Build & Deployment

### Build Configuration

**vercel.json** (Already configured)
```json
{
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist"
}
```

- **Framework Detection:** Vercel auto-detects Vite framework
- **Build Command:** Runs `vite build` to compile React → `/dist`
- **Output Directory:** Only `/dist` is deployed (frontend only)
- **SPA Routing:** Configured with rewrites for React Router

### Build Process

```bash
npm run build
```

This:
1. Runs `vite build` (TypeScript + React → optimized JS/CSS)
2. Outputs minified files to `/dist`
3. Vercel deploys `/dist` to CDN

**No Express server compilation** — Vercel handles backend via `/api` serverless functions.

---

## API Endpoints

### Chat (AI Tutor)
```
POST /api/chat
POST /api/ai/chat (alias)
GET /api/chat?message=...&lessonContextId=...
```

**Request:**
```json
{
  "message": "Jelaskan kaidah Bab 2",
  "lessonContextId": "bab-02",
  "history": []
}
```

**Response:**
```json
{
  "success": true,
  "reply": "Bab 2 adalah: 5 Langkah Membaca Arab Gundul...",
  "sourceReference": "Qaidaty Jilid 1, Bab 2",
  "relatedLessonId": "bab-02"
}
```

### Bedah Kalimah (Word/Phrase Analysis)
```
POST /api/bedah-kalimah
```

**Request:**
```json
{
  "text": "الكتاب"
}
```

**Response:**
```json
{
  "success": true,
  "tokens": [...],
  "aiExplanation": "..."
}
```

### Teacher Summary (Lesson Plan Generator)
```
POST /api/teacher/generate-summary
```

**Request:**
```json
{
  "lessonId": "bab-02",
  "topicTitle": "5 Langkah Membaca Arab Gundul"
}
```

**Response:**
```json
{
  "success": true,
  "lessonId": "bab-02",
  "title": "5 Langkah Membaca Arab Gundul",
  "content": "Rangkuman Guru & RPP..."
}
```

### Health Check
```
GET /api/health
```

**Response:**
```json
{
  "status": "ok",
  "service": "QAIDATY API (Vercel Serverless)",
  "aiReady": true,
  "geminiKeyConfigured": true,
  "totalLessons": 23,
  "environment": "vercel"
}
```

---

## Frontend Features

### Routes (SPA - Single Page Application)
- `/` — Landing page
- `/santri` — Student dashboard
- `/santri/materi` — Lesson list
- `/santri/bab/:id` — Lesson detail view
- `/santri/quiz` — Quiz
- `/guru` — Teacher dashboard
- `/guru/rangkuman` — Teacher summary generator
- `/bedah-kalimah-studio` — Word analysis tool
- `/progress` — Progress analytics
- `/settings` — Settings & profile

### Features
✅ Interactive lesson viewer with multiple tabs (Kaidah, Tabel, Contoh, Latihan, Bahar Rojaz)
✅ AI Tutor (RAG-powered with correct Bab selection)
✅ Word/Phrase analysis tool (Bedah Kalimah)
✅ Teacher resource generator
✅ Quiz with scoring
✅ Progress tracking
✅ Bookmarks & notes
✅ Responsive mobile UI

---

## Security

### Secrets Management
- ✅ API keys stored in Vercel environment variables (never in code)
- ✅ `.env.example` template provided (no secrets)
- ✅ All API calls server-side (secrets never exposed to frontend)
- ✅ CORS headers configured on API endpoints

### Data Privacy
- No user data stored on server (stateless)
- No login/authentication system
- No personal information collected
- All lesson data is public educational content

---

## Troubleshooting

### Build Fails: "Module not found"
```
Error: Cannot find module '@google/genai'
```
**Solution:** Run `npm install` before deploying

### API Returns 500: "GEMINI_API_KEY not configured"
**Solution:** 
1. Go to Vercel Project Settings → Environment Variables
2. Add `GEMINI_API_KEY` with your actual API key
3. Redeploy project

### SPA Routes Return 404
**Solution:** Already configured in `vercel.json` with rewrites. If still broken:
1. Check `vercel.json` exists in project root
2. Verify `rewrites` section is present
3. Redeploy

### Frontend CSS/Assets Missing
**Solution:** 
1. Check `/dist` folder is created with `npm run build`
2. Verify `vite.config.ts` has correct asset paths
3. Clear Vercel cache and redeploy

---

## Performance & Monitoring

### Recommended Vercel Analytics
- Enable "Web Analytics" in Vercel dashboard
- Monitor performance metrics and errors
- Set up error alerts for critical failures

### API Performance Tips
- Gemini AI calls take 2-5 seconds (normal)
- RAG retrieval is optimized to search 23 lessons
- Caching on Vercel CDN for static assets

---

## Maintenance

### Updating Lessons
- Edit `/src/data/qaidatyKnowledge.ts`
- Run `npm run build`
- Deploy to Vercel

### Adding New API Endpoints
- Create file `/api/new-endpoint.ts` with Vercel handler signature
- Vercel auto-deploys as `/api/new-endpoint`

### Environment Variable Updates
- Change in Vercel Dashboard → Project Settings → Environment Variables
- Redeploy with "Redeploy" button or push to main branch

---

## Additional Resources

- **Vercel Docs:** https://vercel.com/docs
- **Vite Docs:** https://vitejs.dev
- **React Docs:** https://react.dev
- **Gemini API:** https://ai.google.dev

---

## Support

If you encounter issues:
1. Check `vercel.json` is correctly configured
2. Verify `GEMINI_API_KEY` is set in Vercel env vars
3. Check `/api/health` endpoint for system status
4. Review Vercel deployment logs: Dashboard → Deployments → Click build → Logs

