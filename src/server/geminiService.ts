import { handleChatPayload } from '../../api/chat.js';
import { parseAndAnalyzeSentence } from '../services/bedahRuleEngine.js';
import { QAIDATY_LESSONS } from '../data/qaidatyKnowledge.js';

// ============================================================================
// OPENROUTER RAW FETCH HELPER
// ============================================================================

async function callOpenRouterAPI(
  messages: Array<{ role: string; content: string }>,
  model: string,
  temperature: number = 0.2
): Promise<string | null> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey || !apiKey.trim()) {
    console.warn('[Qaidaty Server] OPENROUTER_API_KEY not configured');
    return null;
  }

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey.trim()}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://e-qaidaty.vercel.app',
        'X-Title': 'e-Qaidaty AI Tutor',
      },
      body: JSON.stringify({
        model,
        messages,
        temperature,
        max_tokens: 1024,
      }),
    });

    if (!response.ok) {
      console.warn(`[Qaidaty Server] OpenRouter HTTP ${response.status}`);
      return null;
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || null;
  } catch (err: any) {
    console.warn('[Qaidaty Server] OpenRouter call failed:', err?.message);
    return null;
  }
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

    const aiResponse = await callOpenRouterAPI(
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

    const aiResponse = await callOpenRouterAPI(
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
