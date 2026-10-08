export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const isKeyConfigured = Boolean(process.env.OPENROUTER_API_KEY?.trim());

  return res.status(200).json({
    status: 'ok',
    service: 'QAIDATY API (Vercel Serverless)',
    aiReady: isKeyConfigured,
    openrouterKeyConfigured: isKeyConfigured,
    totalLessons: 23,
    environment: process.env.VERCEL ? 'vercel' : 'node',
  });
}
