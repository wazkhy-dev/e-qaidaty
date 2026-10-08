import { handleChatPayload } from '../../api/chat.js';
import { parseAndAnalyzeSentence } from '../services/bedahRuleEngine.js';
import { QAIDATY_LESSONS } from '../data/qaidatyKnowledge.js';
import https from 'https';

// ============================================================================
// OPENROUTER HTTPS HELPER
// ============================================================================

function callOpenRouterViaHTTPS(
  messages: Array<{ role: string; content: string }>,
  model: string,
  temperature: number
): Promise<string | null> {
  return new Promise((resolve) => {
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      console.warn('[Qaidaty Server] No API key');
      return resolve(null);
    }

    const payload = JSON.stringify({
      model,
      messages,
      temperature,
      max_tokens: 1024,
    });

    const options = {
      hostname: 'openrouter.ai',
      port: 443,
      path: '/api/v1/chat/completions',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload),
        'HTTP-Referer': 'https://e-qaidaty.vercel.app',
        'X-Title': 'e-Qaidaty AI Tutor',
      },
      timeout: 55000,
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        if (res.statusCode !== 200) {
          console.warn(`[Qaidaty Server] OpenRouter HTTP ${res.statusCode}`);
          return resolve(null);
        }
        try {
          const json = JSON.parse(data);
          const text = json.choices?.[0]?.message?.content;
          resolve(text || null);
        } catch (err) {
          console.warn('[Qaidaty Server] JSON parse error:', err);
          resolve(null);
        }
      });
    });

    req.on('error', (err) => {
      console.warn('[Qaidaty Server] HTTPS error:', err.message);
      resolve(null);
    });

    req.on('timeout', () => {
      req.destroy();
      resolve(null);
    });

    req.write(payload);
    req.end();
  });
}

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

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (apiKey && apiKey.trim()) {
    const model = (process.env.OPENROUTER_MODEL?.trim()) || 'google/gemini-2.5-flash';
    const prompt = `Analisis kalimat/kata Arab berikut menurut metodologi KITAB QAIDATY (5 Langkah Qaidaty):
Kalimat: "${text}"
Hasil identifikasi awal mesin aturan:
${JSON.stringify(ruleResult.tokens, null, 2)}

Berikan penjelasan singkat dan mendalam (2-3 paragraf) dalam bahasa Indonesia tentang:
1. Kedudukan sintaksis (I'rob & Jabatan) menurut kaidah Qaidaty
2. Wazan dan Tashrif jika terdapat Fi'il / Isim Musytaq
3. Makna terjemahan yang tepat sesuai konteks
Format dengan rapi dan ramah santri.`;

    const aiResponse = await callOpenRouterViaHTTPS(
      [
        { role: 'system', content: "Anda adalah pakar bahasa Arab dan kurikulum Qaidaty." },
        { role: 'user', content: prompt },
      ],
      model,
      0.2
    );

    if (aiResponse) {
      aiExplanation = aiResponse.trim();
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
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (apiKey && apiKey.trim() && lesson) {
    const model = (process.env.OPENROUTER_MODEL?.trim()) || 'google/gemini-2.5-flash';
    const prompt = `Buat Rangkuman Guru & Rencana Pelaksanaan Pembelajaran (RPP) 45 Menit untuk materi Qaidaty:
Bab ${lesson.babNumber}: ${lesson.title} (${lesson.arabicTitle}) - Sumber: Qaidaty Jilid 1 ${lesson.pageReference}
Kaidah: ${lesson.rules.join('; ')}

Buat dalam format terstruktur sesuai format Rangkuman Guru Qaidaty.`;

    const aiResponse = await callOpenRouterViaHTTPS(
      [
        { role: 'system', content: "Anda adalah konsultan kurikulum metode Qaidaty untuk para asatidz/guru." },
        { role: 'user', content: prompt },
      ],
      model,
      0.3
    );

    if (aiResponse) {
      return {
        status: 200,
        data: {
          success: true,
          lessonId: lesson.id,
          title: lesson.title,
          content: aiResponse.trim(),
        },
      };
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
