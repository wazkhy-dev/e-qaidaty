import { QAIDATY_KNOWLEDGE_CHUNKS, QaidatyChunk } from '../src/data/qaidatyKnowledge.js';
import https from 'https';

// ============================================================================
// OPENROUTER DIRECT HTTPS CALL
// ============================================================================

function callOpenRouterViaHTTPS(
  messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }>,
  model: string,
  temperature: number
): Promise<{ text: string | null; statusCode: number | null; error: string | null; durationMs: number }> {
  return new Promise((resolve) => {
    const apiKey = process.env.OPENROUTER_API_KEY;
    const startT = Date.now();

    // Audit: Check API key
    const apiKeyConfigured = !!apiKey && apiKey.trim().length > 0;
    console.log(`[Qaidaty API] API key configured: ${apiKeyConfigured}`);
    console.log(`[Qaidaty API] Model: ${model}`);

    if (!apiKeyConfigured) {
      console.error('[Qaidaty API] ERROR: OPENROUTER_API_KEY missing or empty');
      return resolve({ 
        text: null, 
        statusCode: null, 
        error: 'OPENROUTER_API_KEY not configured',
        durationMs: Date.now() - startT 
      });
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

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        const statusCode = res.statusCode || 0;
        console.log(`[Qaidaty API] OpenRouter response status: ${statusCode}`);

        // Success case
        if (statusCode === 200) {
          try {
            const json = JSON.parse(data);
            const text = json.choices?.[0]?.message?.content;
            if (text && text.trim().length > 0) {
              console.log(`[Qaidaty API] ✓ Response parsed successfully (${Date.now() - startT}ms)`);
              return resolve({ 
                text: text.trim(),
                statusCode,
                error: null,
                durationMs: Date.now() - startT 
              });
            } else {
              console.error('[Qaidaty API] ERROR: No text content in choices[0].message.content');
              return resolve({ 
                text: null,
                statusCode,
                error: 'Empty response from OpenRouter',
                durationMs: Date.now() - startT 
              });
            }
          } catch (parseErr) {
            const msg = parseErr instanceof Error ? parseErr.message : String(parseErr);
            console.error(`[Qaidaty API] ERROR: JSON parse failed: ${msg}`);
            return resolve({ 
              text: null,
              statusCode,
              error: `JSON parse error: ${msg}`,
              durationMs: Date.now() - startT 
            });
          }
        }

        // Error case - preserve original status code
        console.error(`[Qaidaty API] OpenRouter error response (HTTP ${statusCode})`);
        let errorMsg = `HTTP ${statusCode}`;
        try {
          const errorData = JSON.parse(data);
          errorMsg = errorData.error?.message || errorData.message || errorMsg;
          console.error(`[Qaidaty API] Error details:`, errorData);
        } catch (e) {
          console.error(`[Qaidaty API] Raw response (first 300 chars):`, data.substring(0, 300));
        }

        resolve({ 
          text: null,
          statusCode,
          error: errorMsg,
          durationMs: Date.now() - startT 
        });
      });
    });

    req.on('error', (err) => {
      const msg = err.message || String(err);
      console.error(`[Qaidaty API] HTTPS socket error: ${msg}`);
      resolve({ 
        text: null,
        statusCode: null,
        error: `Network error: ${msg}`,
        durationMs: Date.now() - startT 
      });
    });

    req.on('timeout', () => {
      console.error('[Qaidaty API] HTTPS timeout (>55s)');
      req.destroy();
      resolve({ 
        text: null,
        statusCode: 408,
        error: 'Request timeout',
        durationMs: Date.now() - startT 
      });
    });

    req.write(payload);
    req.end();
  });
}

// ============================================================================
// SMART INTENT & RELEVANCE FILTER
// ============================================================================
function isSimpleGreeting(text: string): boolean {
  const t = text.trim().toLowerCase();
  const greetings = [
    'halo', 'hai', 'hello', 'hi', 'assalamu', 'assalamualaikum', "assalamu'alaikum",
    'salam', 'pagi', 'siang', 'sore', 'malam', 'tes', 'test', 'ping', 'syukron',
    'terima kasih', 'makasih', 'siapa kamu', 'siapakah kamu'
  ];
  return greetings.some((g) => t === g || t.startsWith(g) && t.length < 35);
}

// Indonesian stopwords / generic instruction words that carry no chapter-
// distinguishing signal. Excluded from full-text token matching so that
// common words like "jelaskan", "materi", "tentang" don't create noisy
// ties between chapters.
const RAG_STOPWORDS = new Set([
  'yang', 'dan', 'di', 'ke', 'dari', 'untuk', 'pada', 'dengan', 'adalah', 'ini', 'itu',
  'apa', 'apakah', 'bagaimana', 'tolong', 'mohon', 'coba', 'jelaskan', 'jelasin', 'tentang',
  'saya', 'aku', 'kamu', 'anda', 'kita', 'atau', 'juga', 'saja', 'dalam', 'oleh',
  'jika', 'kalau', 'maka', 'karena', 'sebab', 'akan', 'sudah', 'belum', 'tidak',
  'bisa', 'dapat', 'harus', 'perlu', 'ada', 'tanya', 'pertanyaan', 'contoh',
  'contohnya', 'materi', 'kaidah', 'pelajaran', 'lebih', 'dalam', 'lanjut',
  'mengenai', 'beserta', 'seperti', 'yaitu', 'nya', 'para', 'suatu', 'sebuah'
]);

/**
 * Normalizes Arabic text for loose matching: strips harakat/diacritics and
 * unifies common letter variants (alef forms, ta marbuthah, alef maqsurah).
 * Only used for scoring/matching — the original Arabic text (with harakat)
 * sent as context to Gemini is never altered.
 */
function normalizeArabicForMatching(text: string): string {
  return text
    .replace(/[\u064B-\u0652\u0670\u06D6-\u06ED]/g, '') // strip harakat/tanwin/sukun
    .replace(/[إأآا]/g, 'ا')
    .replace(/ة/g, 'ه')
    .replace(/[ىي]/g, 'ي')
    .trim();
}

/** Tokenizes a message into meaningful lowercase words (Latin or Arabic), 3+ chars, stopwords removed. */
function tokenize(text: string): string[] {
  return (text.toLowerCase().match(/[\p{L}\p{N}]+/gu) || [])
    .filter((w) => w.length >= 3 && !RAG_STOPWORDS.has(w));
}

/**
 * Detects explicit chapter-number mentions in a message, e.g. "bab 20",
 * "bab 07", "materi bab 15", "pelajaran ke-12". Uses a word-boundary regex
 * (not substring includes) so "bab 20" never falsely matches "bab 2".
 */
function extractExplicitChapterNumbers(message: string): number[] {
  const found = new Set<number>();
  const patterns = [
    /\bbab\s*0*(\d{1,2})\b/gi,
    /\bpelajaran\s+ke[- ]?\s*0*(\d{1,2})\b/gi,
  ];
  for (const re of patterns) {
    let m: RegExpExecArray | null;
    while ((m = re.exec(message)) !== null) {
      const n = parseInt(m[1], 10);
      if (n >= 1 && n <= 23) found.add(n);
    }
  }
  return Array.from(found);
}

function retrieveRelevantChunks(message: string, lessonContextId?: string): {
  chunks: QaidatyChunk[];
  isGeneralGreeting: boolean;
  notFound: boolean;
} {
  if (isSimpleGreeting(message) && !lessonContextId) {
    return { chunks: [], isGeneralGreeting: true, notFound: false };
  }

  // If the frontend tells us which chapter the user is currently viewing,
  // use it as a scoring BOOST (not an exclusive lock) — see below. This
  // still lets an explicit "bab 20" in the message text, or strong
  // keyword matches elsewhere, out-rank the current-page chapter when the
  // question is clearly about a different chapter.
  const contextChunk = lessonContextId
    ? QAIDATY_KNOWLEDGE_CHUNKS.find((c) => c.lessonId === lessonContextId)
    : undefined;

  const explicitChapters = extractExplicitChapterNumbers(message);
  const queryTokens = tokenize(message);
  const hasArabicQuery = /[\u0600-\u06FF]/.test(message);
  const arabicQueryWords = hasArabicQuery
    ? normalizeArabicForMatching(message).split(/\s+/).filter((w) => w.length >= 2)
    : [];

  // Score EVERY chunk across the full Bab 01–23 knowledge base — no chunk
  // is skipped and no chunk is assumed "default".
  const scored = QAIDATY_KNOWLEDGE_CHUNKS.map((chunk) => {
    let score = 0;
    const titleLower = chunk.title.toLowerCase();
    const contentLower = chunk.content.toLowerCase();

    // Explicit "bab N" mention -> strong, exact (word-boundary) match only.
    if (explicitChapters.includes(chunk.babNumber)) {
      score += 100;
    }

    // Full-text token overlap against title/content — matches ANY
    // meaningful word from the question, not just a fixed keyword list.
    for (const tok of queryTokens) {
      if (titleLower.includes(tok)) score += 6;
      if (contentLower.includes(tok)) score += 2;
    }

    // Arabic-script terms in the question (e.g. pasted ayat/kata) matched
    // against normalized Arabic title/content.
    if (arabicQueryWords.length > 0) {
      const normTitle = normalizeArabicForMatching(chunk.arabicTitle);
      const normContent = normalizeArabicForMatching(chunk.content);
      for (const w of arabicQueryWords) {
        if (normTitle.includes(w)) score += 10;
        if (normContent.includes(w)) score += 4;
      }
    }

    // Currently-open-lesson boost: relevant, but never enough on its own
    // to beat a chunk with a real explicit/keyword match for another bab.
    if (contextChunk && contextChunk.id === chunk.id) {
      score += 15;
    }

    return { chunk, score };
  });

  const sorted = scored.filter((s) => s.score > 0).sort((a, b) => b.score - a.score);

  // Debug logging (no secrets/API keys) so retrieval quality can be verified.
  console.log(
    `[QAIDATY RAG] Query: "${message.slice(0, 60)}" | lessonContextId: ${lessonContextId || '-'} | explicit chapters: [${explicitChapters.join(', ')}]`
  );
  console.log(
    `[QAIDATY RAG] Top results: ${sorted.slice(0, 5).map((s) => `Bab ${s.chunk.babNumber} (score ${s.score})`).join(' | ') || 'none'}`
  );

  if (sorted.length > 0) {
    // Take the top 3 most relevant chunks (supports cross-chapter questions
    // like "apa perbedaan bab 10 dan bab 20?").
    return { chunks: sorted.slice(0, 3).map((s) => s.chunk), isGeneralGreeting: false, notFound: false };
  }

  // No relevant chunk found anywhere in Bab 01–23. If the user is currently
  // viewing a specific lesson, fall back to THAT lesson (a real, known
  // context) instead of guessing. Otherwise, be honest that nothing
  // specific was found — never silently default to Bab 01.
  if (contextChunk) {
    return { chunks: [contextChunk], isGeneralGreeting: false, notFound: false };
  }
  return { chunks: [], isGeneralGreeting: false, notFound: true };
}

// ============================================================================
// MAIN CHAT HANDLER
// ============================================================================
export async function handleChatPayload(payload: {
  message: string;
  history?: Array<{ role: string; content: string }>;
  chatHistory?: Array<{ role: string; content: string }>;
  lessonContextId?: string;
}) {
  const startTime = Date.now();
  const { message, history, chatHistory, lessonContextId } = payload;

  if (!message || typeof message !== 'string' || !message.trim()) {
    return {
      status: 400,
      data: { success: false, error: 'Parameter message diperlukan dan tidak boleh kosong.' },
    };
  }

  // ============================================================================
  // CRITICAL: Validate OPENROUTER_API_KEY before any API calls
  // ============================================================================
  const apiKey = process.env.OPENROUTER_API_KEY;
  const model = process.env.OPENROUTER_MODEL || 'google/gemini-2.5-flash';
  
  console.log(`[Qaidaty API] ═══════════════════════════════════════════`);
  console.log(`[Qaidaty API] REQUEST VALIDATION`);
  console.log(`[Qaidaty API] OPENROUTER_API_KEY: ${apiKey ? `✓ SET (${apiKey.length} chars)` : '✗ MISSING'}`);
  console.log(`[Qaidaty API] OPENROUTER_MODEL: ${model}`);
  console.log(`[Qaidaty API] ═══════════════════════════════════════════`);

  if (!apiKey || apiKey.trim().length === 0) {
    console.error(`[Qaidaty API] CRITICAL ERROR: OPENROUTER_API_KEY is not configured`);
    return {
      status: 500,
      data: {
        success: false,
        error: 'Konfigurasi OpenRouter API belum lengkap. Hubungi administrator untuk setup environment variables di Vercel.',
      },
    };
  }

  // 1. RAG context selection with smart intent filter — searches the FULL
  // Bab 01–23 knowledge base every time; never assumes Bab 01 as a default.
  const tRagStart = Date.now();
  const { chunks: activeChunks, isGeneralGreeting, notFound } = retrieveRelevantChunks(message, lessonContextId);
  const tRag = Date.now() - tRagStart;

  // Optimize: Take only TOP 2 chunks (instead of 3) to reduce token count and speed up response
  const topChunks = activeChunks.slice(0, 2);

  // Each chunk is wrapped with an explicit chapter marker so Gemini always
  // knows exactly which bab each piece of context came from.
  const ragContext = isGeneralGreeting || topChunks.length === 0
    ? ''
    : topChunks
        .map((c) => `[ BAB ${c.babNumber.toString().padStart(2, '0')} — ${c.title} ]\n${c.content}`)
        .join('\n\n---\n\n');

  const sourceRef = activeChunks[0]
    ? `Qaidaty Jilid 1 — Bab ${activeChunks[0].babNumber.toString().padStart(2, '0')}: ${activeChunks[0].title} (${activeChunks[0].pageReference})`
    : 'Qaidaty Jilid 1 — Abi Yasin Muthohar';

  const systemInstruction = `Anda adalah QAIDATY AI Tutor, asisten pembelajaran cerdas berbasis Kitab "Jilid 1 Qaidaty (Pembelajaran Praktis Baca Arab Gundul)" karya Abi Yasin Muthohar.
  3. IDENTITAS PLATFORM E-QAIDATY:

Jika pengguna bertanya tentang siapa pembuat, developer, creator,
pengembang, perancang, atau orang di balik platform e-Qaidaty,
jawab secara langsung:

"e-Qaidaty dibuat dan dikembangkan oleh Ahwaz Khasyatullah,
seorang santri Ma'had Al-Abqary yang tidak hanya mendalami
pelajaran di pondok, tetapi juga memiliki kemampuan di bidang
informatika dan multimedia."

Pertanyaan yang termasuk kategori ini antara lain:
- Siapa pembuat website ini?
- Siapa yang membuat e-Qaidaty?
- Siapa developer e-Qaidaty?
- Siapa pengembang platform ini?
- Siapa creator website ini?
- Siapa orang di balik e-Qaidaty?
- Website ini dibuat oleh siapa?
- Siapa yang bikin aplikasi ini?
- Ahwaz Khasyatullah siapa?

Pahami juga variasi pertanyaan dengan maksud yang sama.

Jangan mengarang informasi pribadi lain tentang Ahwaz Khasyatullah
yang tidak tersedia dalam instruksi atau knowledge base.

Jika pengguna hanya menanyakan pembuat e-Qaidaty, jawab langsung
dan singkat tanpa melakukan analisis materi Qaidaty atau pencarian RAG.

${ragContext ? `SUMBER RUJUKAN RESMI QAIDATY (hasil pencarian dari seluruh Bab 01–23, sudah diurutkan dari yang paling relevan):\n${ragContext}\n` : ''}
${notFound ? `CATATAN SISTEM: Pencarian pada knowledge base Bab 01–23 TIDAK menemukan materi yang cukup relevan dengan pertanyaan ini. Jangan mengarang jawaban seolah berasal dari bab tertentu. Katakan dengan jujur bahwa materi spesifik tersebut belum ditemukan di knowledge base, lalu (jika memungkinkan) berikan jawaban umum berdasarkan pengetahuan Nahwu/Shorof secara umum sambil menyatakan bahwa ini bukan kutipan dari bab tertentu di Kitab Qaidaty.\n` : ''}
ATURAN PENTING SUMBER RUJUKAN (WAJIB DIPATUHI):
- Gunakan HANYA materi pada "SUMBER RUJUKAN RESMI QAIDATY" di atas sebagai dasar jawaban tentang kaidah Qaidaty. Materi tersebut sudah diberi label bab masing-masing, contoh: [ BAB 20 — ... ].
- Jangan pernah menganggap Bab 01 sebagai sumber default. Jika sumber rujukan yang diberikan berasal dari Bab 20, Bab 15, atau bab lainnya, jawablah berdasarkan bab tersebut — BUKAN Bab 01 — kecuali pertanyaan memang secara eksplisit tentang Bab 01.
- Jika pertanyaan menyebut nomor bab tertentu (misalnya "bab 20") dan sumber rujukan Bab 20 tersedia di atas, PRIORITASKAN dan jelaskan berdasarkan Bab 20 tersebut.
- Jangan mengklaim suatu penjelasan berasal dari bab tertentu jika sumber rujukan di atas tidak benar-benar berisi materi tersebut. Jika ragu, sebutkan secara umum tanpa menyebut nomor bab yang salah.
- Jika pertanyaan meminta perbandingan antar-bab, gunakan seluruh sumber rujukan yang relevan yang tersedia di atas.

PANDUAN MERESPONS:
1. SAPAAN & INTERAKSI:
   - Jika pengguna baru sekadar menyapa ("halo", "hai", "assalamu'alaikum"), balas dengan ramah, hangat, dan tanyakan materi kaidah Qaidaty apa yang ingin dipelajari hari ini.
   - Jangan menyertakan salam pembuka/perkenalan panjang yang berulang jika sudah dalam percakapan berlangsung.

2. PENJELASAN MATERI (Contoh: "apa itu isim?"):
   - Berikan definisi yang jelas, padat, dan ringkas.
   - Jika relevan, sebutkan 8 tanda Isim sesuai Bab 5 Qaidaty (Tanwin, Al, Huruf Jar, Huruf Nida, Mudhaf, Ta Marbuthah, Mutsanna, Jama').
   - Jika relevan, cantumkan bait Bahar Rojaz Qaidaty:
     > Tanda isim ada delapan perkara # Tanwin, Alif Lam, dan huruf Jar adanya
     > Huruf Nida, Mudhaf, Ta Marbuthah nyata # Mutsanna dan Jama' jangan kau lupa
   - Berikan contoh kata beserta artinya.

3. BEDAH AYAT / BEDAH KALIMAT (Contoh: "tolong bedah ayat 1 surat al baqarah" atau "bedah kata ini"):
   - Bedah teks tersebut KATA DEMI KATA secara sistematis:
     * Kata Arab (dengan harakat lengkap)
     * Jenis Kalimah (Isim, Fi'il, atau Harf beserta tandanya)
     * I'rob / Kedudukan Sintaksis (Mubtada', Khabar, Fa'il, Maf'ul, Huruf Muqaththa'ah, Mabni, dll.)
     * Wazan Shorof & Bina' jika terdapat bentuk fi'il/musytaq
     * Arti per kata & kesimpulan makna.

4. FORMATTING:
   - Gunakan Markdown yang rapi: Heading (###), bullet point, bold (**kata penting**), blockquote (>) untuk bait syair/kaidah.
   - Tulis teks bahasa Arab dengan harakat yang jelas dan benar.`;

  // Build multi-turn contents (keep at most last 4 messages to optimize latency)
  const rawHistory = Array.isArray(history)
    ? history
    : Array.isArray(chatHistory)
    ? chatHistory
    : [];

  // Build OpenAI-compatible messages array
  const openAIMessages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }> = [
    { role: 'system', content: systemInstruction },
  ];
  // Add chat history (last 4 turns already trimmed for latency)
  const trimmedHistory = rawHistory.slice(-4);
  for (const turn of trimmedHistory) {
    if (turn && turn.content && typeof turn.content === 'string' && turn.content.trim()) {
      const role = (turn.role === 'ai' || turn.role === 'assistant' || turn.role === 'model')
        ? 'assistant'
        : 'user';
      openAIMessages.push({ role, content: turn.content.trim() });
    }
  }
  // Add the current user message
  openAIMessages.push({ role: 'user', content: message.trim() });

  const result = await callOpenRouterViaHTTPS(openAIMessages, model, 0.15);
  const totalDuration = Date.now() - startTime;

  console.log(
    `[Qaidaty AI Log] Query: "${message.slice(0, 30)}..." | Bab used: [${activeChunks.map((c) => c.babNumber).join(', ') || 'none'}] | notFound: ${notFound} | RAG: ${tRag}ms | OpenRouter: status=${result.statusCode}, duration=${result.durationMs}ms, total=${totalDuration}ms`
  );

  if (!result.text) {
    // Preserve original OpenRouter status code, with fallback for network errors
    const statusCode = result.statusCode || 503;
    const errorMsg = result.error || 'Unknown error from OpenRouter';
    
    console.error(`[Qaidaty API] Final error response: status=${statusCode}, error=${errorMsg}`);
    
    return {
      status: statusCode,
      data: {
        success: false,
        error: `OpenRouter request failed: ${errorMsg}`,
      },
    };
  }

  return {
    status: 200,
    data: {
      success: true,
      reply: result.text,
      response: result.text,
      sourceReference: sourceRef,
      relatedLessonId: activeChunks[0]?.lessonId,
      matchedChapters: activeChunks.map((c) => ({ babNumber: c.babNumber, title: c.title, lessonId: c.lessonId })),
      materialNotFound: notFound,
      performance: {
        ragTimeMs: tRag,
        geminiTimeMs: result.durationMs,
        totalTimeMs: totalDuration,
      },
    },
  };
}

// ============================================================================
// VERCEL SERVERLESS FUNCTION DEFAULT EXPORT
// ============================================================================
export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // GET query testing e.g. /api/chat?message=halo
  if (req.method === 'GET') {
    const queryMessage = req.query?.message || req.query?.q;
    if (queryMessage && typeof queryMessage === 'string' && queryMessage.trim()) {
      const result = await handleChatPayload({
        message: queryMessage,
        lessonContextId: req.query?.lessonContextId,
      });
      return res.status(result.status).json(result.data);
    }

    return res.status(200).json({
      status: 'ok',
      service: 'QAIDATY AI Chat API (Vercel Serverless)',
      info: 'Kirimkan POST request dengan JSON body {"message": "..."} atau GET ?message=halo untuk berinteraksi dengan AI Tutor.',
    });
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).json({
      success: false,
      error: `Method ${req.method} tidak diizinkan. Gunakan POST atau GET.`,
    });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      body = {};
    }
  }

  const result = await handleChatPayload(body || {});
  return res.status(result.status).json(result.data);
}
