const MAX_PROMPT_LENGTH = 4000;
const RATE_LIMIT = 10;
const RATE_WINDOW_MS = 60_000;

// Best-effort per-instance limiter: serverless instances do not share memory,
// so this only blunts casual abuse. Use a shared store for a hard limit.
const hits = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 1000) {
    for (const [key, times] of hits) {
      if (now - times[times.length - 1] >= RATE_WINDOW_MS) hits.delete(key);
    }
  }
  return recent.length > RATE_LIMIT;
}

function isSameOrigin(req) {
  const origin = req.headers.origin;
  if (!origin) return true;
  try {
    return new URL(origin).host === req.headers.host;
  } catch {
    return false;
  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!isSameOrigin(req)) {
    return res.status(403).json({ error: "Forbidden" });
  }

  const ip = String(req.headers["x-forwarded-for"] || "").split(",")[0].trim() || "unknown";
  if (isRateLimited(ip)) {
    return res.status(429).json({ error: "Too many requests" });
  }

  const prompt = req.body?.prompt;
  if (typeof prompt !== "string" || !prompt.trim()) {
    return res.status(400).json({ error: "prompt is required" });
  }
  if (prompt.length > MAX_PROMPT_LENGTH) {
    return res.status(413).json({ error: "prompt is too long" });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "API key not configured" });
  }

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-5",
        max_tokens: 1000,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await response.json();
    const text = data.content?.find((b) => b.type === "text")?.text || "";
    res.status(200).json({ text });
  } catch (err) {
    res.status(500).json({ error: "Failed to call Anthropic API" });
  }
}
