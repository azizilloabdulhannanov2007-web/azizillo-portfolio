// Bu fayl brauzerda emas, Vercel serverida ishlaydi.
// Token faqat shu yerda, environment variable orqali o'qiladi.

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return res.status(500).json({ error: "Server is not configured" });
  }

  try {
    let body = req.body;
    if (typeof body === "string") body = JSON.parse(body);
    body = body || {};

    // Honeypot: bot to'ldirgan bo'lsa, jimgina "muvaffaqiyatli" deymiz
    if (body.website) return res.status(200).json({ ok: true });

    const fullname = String(body.fullname || "").trim().slice(0, 100);
    const email = String(body.email || "").trim().slice(0, 150);
    const subject = String(body.subject || "").trim().slice(0, 150);
    const message = String(body.message || "").trim().slice(0, 3000);

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
    if (fullname.length < 2 || !emailOk || subject.length < 3 || message.length < 10) {
      return res.status(400).json({ error: "Invalid data" });
    }

    // Telegram HTML rejimida maxsus belgilarni xavfsiz qilamiz
    const esc = (s) =>
      s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

    const text =
      `📩 <b>New message from portfolio</b>\n\n` +
      `👤 <b>Name:</b> ${esc(fullname)}\n` +
      `📧 <b>Email:</b> ${esc(email)}\n` +
      `📝 <b>Subject:</b> ${esc(subject)}\n\n` +
      `💬 <b>Message:</b>\n${esc(message)}`;

    const tg = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" }),
    });

    if (!tg.ok) return res.status(502).json({ error: "Telegram error" });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};