import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { QAIDATY_LESSONS } from './src/data/qaidatyKnowledge';
import {
  processChatRequest,
  processBedahKalimah,
  processTeacherSummary,
} from './src/server/geminiService';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // 1. Health check
  app.get('/api/health', (req, res) => {
    const isKeyConfigured = Boolean(process.env.OPENROUTER_API_KEY?.trim());
    res.json({
      status: 'ok',
      service: 'QAIDATY API',
      aiReady: isKeyConfigured,
      openrouterKeyConfigured: isKeyConfigured,
      totalLessons: QAIDATY_LESSONS.length,
    });
  });

  // 2. RAG AI Tutor Endpoint (Supports /api/ai/chat and /api/chat)
  const handleAiChat = async (req: express.Request, res: express.Response) => {
    try {
      if (req.method === 'GET') {
        const queryMessage = req.query?.message || req.query?.q;
        if (queryMessage && typeof queryMessage === 'string' && queryMessage.trim()) {
          const result = await processChatRequest({
            message: queryMessage,
            lessonContextId: typeof req.query?.lessonContextId === 'string' ? req.query.lessonContextId : undefined,
          });
          return res.status(result.status).json(result.data);
        }
        return res.json({
          status: 'ok',
          service: 'QAIDATY API',
          info: 'Gunakan POST dengan JSON body {"message": "..."} atau GET ?message=halo',
        });
      }

      const result = await processChatRequest(req.body || {});
      res.status(result.status).json(result.data);
    } catch (err: any) {
      console.error('[Qaidaty Server] Chat error:', err);
      res.status(500).json({
        success: false,
        error: err?.message || 'Terjadi kesalahan internal pada server.',
      });
    }
  };

  app.get('/api/ai/chat', handleAiChat);
  app.post('/api/ai/chat', handleAiChat);
  app.get('/api/chat', handleAiChat);
  app.post('/api/chat', handleAiChat);

  // 3. Bedah Kalimah Hybrid Endpoint (Rule Engine + AI Explanation)
  app.post('/api/bedah-kalimah', async (req, res) => {
    try {
      const result = await processBedahKalimah(req.body?.text || '');
      res.status(result.status).json(result.data);
    } catch (err: any) {
      console.error('[Qaidaty Server] Bedah Kalimah Error:', err);
      res.status(500).json({ success: false, error: 'Gagal membedah kalimah.', details: err.message });
    }
  });

  // 4. Teacher Summary / Lesson Plan Generator Endpoint
  app.post('/api/teacher/generate-summary', async (req, res) => {
    try {
      const result = await processTeacherSummary(req.body?.lessonId || '', req.body?.topicTitle);
      res.status(result.status).json(result.data);
    } catch (err: any) {
      console.error('[Qaidaty Server] Teacher Summary Error:', err);
      res.status(500).json({ success: false, error: 'Gagal membuat rangkuman guru.', details: err.message });
    }
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`QAIDATY Full-Stack Server running on http://localhost:${PORT}`);
  });
}

startServer();

