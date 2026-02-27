export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method not allowed');

  const { name, email, website } = req.body || {};
  if (website) return res.status(200).send('ok'); // anti-spam honeypot

  if (!name || !email) return res.status(400).send('Missing fields');

  const safeName = String(name).trim().slice(0, 80);
  const safeEmail = String(email).trim().slice(0, 120);

  const BOT_TOKEN = process.env.BOT_TOKEN;
  const CHAT_ID_YOU = process.env.CHAT_ID_YOU;
  const CHAT_ID_GROUP = process.env.CHAT_ID_GROUP;

  if (!BOT_TOKEN || !CHAT_ID_YOU) return res.status(500).send('Server not configured');

  const text =
`New submission ✅
Name: ${safeName}
Email: ${safeEmail}`;

  async function send(chatId) {
    if (!chatId) return;
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    const r = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text })
    });
    if (!r.ok) throw new Error(await r.text());
  }

  try {
    await send(CHAT_ID_YOU);
    await send(CHAT_ID_GROUP);
    return res.status(200).send('ok');
  } catch {
    return res.status(500).send('Telegram error');
  }
}
