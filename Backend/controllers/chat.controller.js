const { generateLegalAnswer } = require("../services/chat.service");

async function getLegalResponse(req, res) {
  try {

    // extract message field
    let { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "message field is required" });
    }

    // ensure message is ALWAYS a string
    if (typeof message !== "string") {
      message = JSON.stringify(message);
    }

    const reply = await generateLegalAnswer(message);

    res.status(200).json({ reply });

  } catch (error) {
    console.error("Chat error:", error);
    const status = error?.status && Number.isInteger(error.status) ? error.status : 500;
    const message = error?.message || "Something went wrong";
    res.status(status).json({ error: message });
  }
}

module.exports = { getLegalResponse };
