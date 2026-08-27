const { GoogleGenerativeAI } = require("@google/generative-ai");

const API_KEY =
  process.env.GEMINI_API_KEY ||
  process.env.GOOGLE_API_KEY;

if (!API_KEY) {
  console.error("❌ GEMINI_API_KEY is missing from .env");
}

const genAI = API_KEY
  ? new GoogleGenerativeAI(API_KEY)
  : null;


/*
|--------------------------------------------------------------------------
| Normalize user message
|--------------------------------------------------------------------------
*/

function normalizePrompt(message) {
  if (typeof message === "string") {
    return message.trim();
  }

  try {
    return JSON.stringify(message ?? "").trim();
  } catch {
    return "";
  }
}


/*
|--------------------------------------------------------------------------
| Generate Legal Answer
|--------------------------------------------------------------------------
*/

async function generateLegalAnswer(message) {

  const prompt = normalizePrompt(message);

  if (!prompt) {
    const error = new Error(
      "Please enter a legal question."
    );

    error.status = 400;

    throw error;
  }


  if (!genAI) {
    const error = new Error(
      "Gemini API key is not configured on the server."
    );

    error.status = 500;

    throw error;
  }


  /*
  |--------------------------------------------------------------------------
  | Legal AI Prompt
  |--------------------------------------------------------------------------
  */

  const legalPrompt = `
You are JurisAssist, an AI-powered legal assistant.

Your job is to help users understand legal concepts and documents
in simple and clear language.

IMPORTANT:
- Do not claim to be a lawyer.
- Do not present your response as a substitute for professional legal advice.
- Explain legal concepts in plain language.
- If the user's question depends on a specific country's law,
  mention that laws vary by jurisdiction.
- Encourage the user to consult a qualified advocate/lawyer
  when the matter is serious or requires formal legal advice.

User's question:

${prompt}

Provide a helpful, structured response.
`;


  /*
  |--------------------------------------------------------------------------
  | Current Gemini model
  |--------------------------------------------------------------------------
  */

  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  });


  try {

    const result = await model.generateContent(legalPrompt);

    const response = result.response;

    const text = response.text();

    if (!text) {
      const error = new Error(
        "Gemini did not return a response."
      );

      error.status = 502;

      throw error;
    }

    return text;

  } catch (error) {

    console.error(
      "❌ Gemini API Error:",
      error
    );

    const status =
      error?.status ||
      error?.response?.status ||
      502;

    let message =
      error?.message ||
      "Gemini AI service is unavailable.";

    /*
    |--------------------------------------------------------------------------
    | Better error messages
    |--------------------------------------------------------------------------
    */

    if (
      status === 401 ||
      status === 403 ||
      /api key/i.test(message)
    ) {
      message =
        "Gemini API key is invalid or unauthorized.";
    }

    else if (
      status === 429 ||
      /quota/i.test(message) ||
      /rate limit/i.test(message)
    ) {
      message =
        "Gemini API quota has been exceeded. Please try again later.";
    }

    else if (
      status === 404 ||
      /model.*not found/i.test(message)
    ) {
      message =
        "The configured Gemini model is unavailable.";
    }

    const finalError = new Error(message);

    finalError.status =
      status >= 400 && status < 600
        ? status
        : 502;

    throw finalError;
  }
}


module.exports = {
  generateLegalAnswer,
};