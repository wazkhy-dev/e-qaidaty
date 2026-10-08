import { BedahSentenceResult } from '../types';

export interface ChatHistoryItem {
  role: 'user' | 'assistant';
  content: string;
}

export interface AITutorResponse {
  reply: string;
  sourceReference?: string;
  relatedLessonId?: string;
}

export async function askAITutor(
  message: string,
  lessonContextId?: string,
  history?: ChatHistoryItem[]
): Promise<AITutorResponse> {
  const payload = {
    message,
    lessonContextId,
    history: history || [],
    chatHistory: history || [],
  };

  // Primary endpoint /api/chat, fallback to /api/ai/chat if 404
  let res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (res.status === 404) {
    res = await fetch('/api/ai/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  }

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    if (res.status === 404) {
      throw new Error(
        'Endpoint API tidak ditemukan (404). Pastikan server backend atau Vercel Serverless Function aktif.'
      );
    }
    if (res.status === 401 || res.status === 403) {
      throw new Error(
        'Akses API ditolak (401/403). Periksa OPENROUTER_API_KEY di environment variables Vercel.'
      );
    }
    if (res.status === 429) {
      throw new Error(
        'Batas permintaan/kuota AI terlampaui (429). Mohon tunggu beberapa saat sebelum mencoba lagi.'
      );
    }

    const errorMsg =
      data?.error ||
      data?.message ||
      `Terjadi kendala pada server (Status: ${res.status}).`;
    throw new Error(errorMsg);
  }

  const replyText = data.reply || data.response;
  if (!replyText || typeof replyText !== 'string') {
    throw new Error('Tidak menerima tanggapan teks yang valid dari AI Tutor.');
  }

  return {
    reply: replyText,
    sourceReference: data.sourceReference,
    relatedLessonId: data.relatedLessonId,
  };
}

export async function submitBedahKalimah(text: string): Promise<BedahSentenceResult> {
  try {
    const res = await fetch('/api/bedah-kalimah', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('Backend bedah API failed, using client-side rule engine fallback:', err);
    const { parseAndAnalyzeSentence } = await import('./bedahRuleEngine');
    return parseAndAnalyzeSentence(text);
  }
}
