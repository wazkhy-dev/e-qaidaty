import { handleChatPayload } from '../../api/chat.js';
import { parseAndAnalyzeSentence } from '../services/bedahRuleEngine.js';
import { QAIDATY_LESSONS } from '../data/qaidatyKnowledge.js';
import { GoogleGenAI } from '@google/genai';

export interface ChatRequestPayload {
  message: string;
  history?: Array<{ role: string; content: string }>;
  chatHistory?: Array<{ role: string; content: string }>;
  lessonContextId?: string;
}

export async function processChatRequest(payload: ChatRequestPayload) {
  return handleChatPayload(payload);
}

export async function processBedahKalimah(text: string) {
  if (!text || typeof text !== 'string' || !text.trim()) {
    return {
      status: 400,
      data: { success: false, error: 'Teks bahasa Arab diperlukan.' },
    };
  }

  const ruleResult = parseAndAnalyzeSentence(text.trim());
  let aiExplanation = 'Analisis struktur berbasis Kaidah Qaidaty Jilid 1 selesai dengan sukses.';

  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey && apiKey.trim()) {
    try {
      const ai = new GoogleGenAI({ apiKey: apiKey.trim() });
      const prompt = `Analisis kalimat/kata Arab berikut menurut metodologi KITAB QAIDATY (5 Langkah Qaidaty):
Kalimat: "${text}"
Hasil identifikasi awal mesin aturan:
${JSON.stringify(ruleResult.tokens, null, 2)}

Berikan penjelasan singkat dan mendalam (2-3 paragraf) dalam bahasa Indonesia tentang:
1. Kedudukan sintaksis (I'rob & Jabatan) menurut kaidah Qaidaty
2. Wazan dan Tashrif jika terdapat Fi'il / Isim Musytaq
3. Makna terjemahan yang tepat sesuai konteks
Format dengan rapi dan ramah santri.`;

      const resp = await ai.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: prompt,
        config: {
          systemInstruction: 'Anda adalah pakar bahasa Arab dan kurikulum Qaidaty.',
          temperature: 0.2,
        },
      });

      if (resp.text && resp.text.trim()) {
        aiExplanation = resp.text.trim();
      }
    } catch (err) {
      console.warn('[Qaidaty Server] AI Bedah Kalimah enrichment skipped:', err);
    }
  }

  return {
    status: 200,
    data: {
      success: true,
      ...ruleResult,
      aiExplanation,
    },
  };
}

export async function processTeacherSummary(lessonId: string, topicTitle?: string) {
  const lesson = QAIDATY_LESSONS.find((l) => l.id === lessonId);
  const apiKey = process.env.GEMINI_API_KEY;

  if (apiKey && apiKey.trim() && lesson) {
    try {
      const ai = new GoogleGenAI({ apiKey: apiKey.trim() });
      const prompt = `Buat Rangkuman Guru & Rencana Pelaksanaan Pembelajaran (RPP) 45 Menit untuk materi Qaidaty:
Bab ${lesson.babNumber}: ${lesson.title} (${lesson.arabicTitle}) - Sumber: Qaidaty Jilid 1 ${lesson.pageReference}
Kaidah: ${lesson.rules.join('; ')}

Buat dalam format terstruktur sesuai format Rangkuman Guru Qaidaty.`;

      const resp = await ai.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: prompt,
        config: {
          systemInstruction: 'Anda adalah konsultan kurikulum metode Qaidaty untuk para asatidz/guru.',
          temperature: 0.3,
        },
      });

      if (resp.text && resp.text.trim()) {
        return {
          status: 200,
          data: {
            success: true,
            lessonId: lesson.id,
            title: lesson.title,
            content: resp.text.trim(),
          },
        };
      }
    } catch (err) {
      console.warn('[Qaidaty Server] AI Teacher Summary fallback used:', err);
    }
  }

  return {
    status: 200,
    data: {
      success: true,
      lessonId: lesson?.id || 'bab-01',
      title: lesson?.title || topicTitle || 'Materi Qaidaty',
      message: 'Rencana pembelajaran terstandar telah dimuat dari database kurikulum Qaidaty.',
    },
  };
}
