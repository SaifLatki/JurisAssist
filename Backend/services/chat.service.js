// chat.service.js
const { GoogleGenerativeAI } = require("@google/generative-ai");
const Groq = require("groq-sdk");
const OpenAI = require("openai");

// Read API keys from environment variables
const API_KEY = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
const PREFERRED_MODEL = process.env.GEMINI_MODEL;
const FALLBACK_MODELS = [
  "gemini-1.5-flash",
  "gemini-1.5-flash-8b",
  "gemini-1.0-pro",
  "gemini-1.5-pro",
];

const GROQ_KEY = process.env.GROQ_API_KEY;
const GROQ_MODEL = process.env.GROQ_MODEL || "llama-3.1-8b-instant";

const OPENAI_KEY = process.env.OPENAI_API_KEY;
const OPENAI_MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini";

// Initialize clients only if API keys exist
const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;
const groq = GROQ_KEY ? new Groq({ apiKey: GROQ_KEY }) : null;
const openai = OPENAI_KEY ? new OpenAI({ apiKey: OPENAI_KEY }) : null;

// Functions remain the same
function normalizePrompt(message) {
  if (typeof message === "string") return message.trim();
  try {
    return JSON.stringify(message ?? "").trim();
  } catch {
    return "";
  }
}

function parseGeminiError(error) {
  const code = error?.status || error?.code;
  const rawMessage = error?.message || "Unknown Gemini error";
  const isModelIssue = code === 404 || /model/i.test(rawMessage);
  const isBadRequest = code === 400 || /prompt|invalid/i.test(rawMessage);

  if (isModelIssue) {
    return { status: 503, message: "AI model is temporarily unavailable. Please try again shortly." };
  }
  if (isBadRequest) {
    return { status: 400, message: "Your message could not be processed. Please rephrase and try again." };
  }
  return { status: 502, message: "AI service is unavailable right now. Please try again." };
}

async function generateLegalAnswer(message) {
  if (!genAI) {
    const err = new Error("Gemini API key is not configured on the server.");
    err.status = 500;
    throw err;
  }

  const prompt = normalizePrompt(message);
  if (!prompt) {
    const err = new Error("Empty prompt. Please provide a legal question or text.");
    err.status = 400;
    throw err;
  }

  const modelsToTry = PREFERRED_MODEL
    ? [PREFERRED_MODEL, ...FALLBACK_MODELS.filter((m) => m !== PREFERRED_MODEL)]
    : FALLBACK_MODELS;

  let lastError;

  // Try Gemini models first
  for (const modelId of modelsToTry) {
    try {
      const model = genAI.getGenerativeModel({ model: modelId });
      const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.2, maxOutputTokens: 512 },
      });

      const text = result?.response?.text?.() || result?.responseText || "";

      if (!text) {
        const err = new Error("AI did not return any content.");
        err.status = 502;
        throw err;
      }
      return text;
    } catch (error) {
      lastError = error;
      const code = error?.status || error?.code;
      const rawMessage = error?.message || "";
      if (code === 404 || /not found/i.test(rawMessage) || /not supported/i.test(rawMessage)) {
        console.warn(`Model ${modelId} unavailable, trying next fallback...`);
        continue;
      }
      break;
    }
  }

  // Groq fallback
  if (groq) {
    try {
      const completion = await groq.chat.completions.create({
        model: GROQ_MODEL,
        messages: [{ role: "user", content: prompt }],
        temperature: 0.2,
        max_tokens: 512,
      });

      const text = completion?.choices?.[0]?.message?.content?.trim();
      if (text) return text;

      const err = new Error("AI did not return any content.");
      err.status = 502;
      throw err;
    } catch (error) {
      lastError = error;
      console.error("Groq API Error:", error);
    }
  }

  // OpenAI fallback
  if (openai) {
    try {
      const completion = await openai.chat.completions.create({
        model: OPENAI_MODEL,
        messages: [{ role: "user", content: prompt }],
        temperature: 0.2,
        max_tokens: 512,
      });

      const text = completion?.choices?.[0]?.message?.content?.trim();
      if (text) return text;

      const err = new Error("AI did not return any content.");
      err.status = 502;
      throw err;
    } catch (error) {
      lastError = error;
      console.error("OpenAI API Error:", error);
    }
  }

  const parsed = parseGeminiError(lastError);
  const err = new Error(parsed.message);
  err.status = parsed.status;
  err.raw = lastError?.message;
  throw err;
}

module.exports = { generateLegalAnswer };