import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize GenAI safely/lazily
let ai: GoogleGenAI | null = null;
function getGenAI() {
  if (!ai) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("GEMINI_API_KEY environment variable is not defined!");
      return null;
    }
    ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
         headers: {
           "User-Agent": "aistudio-build"
         }
      }
    });
  }
  return ai;
}

// API health endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// Full AI interactive mental health advisor chat endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { messages, screeningResult, patientProfile } = req.body;
    const client = getGenAI();
    if (!client) {
      return res.json({ 
        response: "I am MindBot, your clinical mental health informational guide. I am currently running in offline backup mode as the server's GEMINI_API_KEY is not configured yet. Set up the API key in Settings > Secrets to enable full AI capabilities! In the meantime, I can answer simple queries using local knowledge rules." 
      });
    }

   const systemPrompt = `You are MindBot, MindCheck's clinical mental health expert advisor. 
You are friendly, empathetic, deeply supportive, and strictly evidence-based. 

The user is interacting with your mental health expert platform.
Here is the patient's currently completed screening information (if any):
- Profile Metadata: ${JSON.stringify(patientProfile || {})}
- Screening Diagnostic Index: ${JSON.stringify(screeningResult || {})}

Strict Guidelines for your responses:
1. Provide personalized, compassionate, clinically grounded guidance. Integrate their screening results into your advice if they have completed the test.
2. If the patient has completed the screen and has severe or extremely severe scores (or psychotic/bipolar flags), gently prioritize their immediate safety. Provide comforting affirmations, recommend contacting the public crisis hotlines, and explain that you are an AI assistant who provides education, not diagnosis.
3. Suggest 1-2 clear, actionable, evidence-based coping habits when relevant (e.g. diaphragmatic breathing, sleep hygiene, behavioral activation, scheduled worry time) — don't list everything you know, just what's most relevant.
4. Do NOT recommend prescription drugs, medical dosages, or brand drugs.
5. Write in plain conversational prose only. Do NOT use markdown formatting of any kind — no **bold**, no # headings, no bullet points or numbered lists, no asterisks. Just natural paragraphs, like a warm text message from a knowledgeable friend.
6. Keep responses reasonably concise and focused — a clear, complete explanation without padding or repeating yourself. Match the length to the question: a quick question deserves a short answer, a more involved question can have a fuller one. Avoid rambling or restating the same point in different words.
7. Mention Malaysian clinical resources only when directly relevant (crisis, seeking therapy, etc.), not in every reply:
   - Befrienders KL (03-7627 2929, 24/7)
   - MIASA (1800-82-0066)
   - MMHA (Malaysian Mental Health Association, mmha.org.my)
   - Klinik Kesihatan (for affordable public psychiatrist referrals)
8. Do not use terms like "I diagnosed you". State that "The MindCheck expert system calculated a high probability index..."
9. Maintain a supportive, professional, and comforting tone.`;

    // Map conversation log to GenAI SDK parts
    const contents = messages.map((m: any) => ({
      role: m.sender === "user" ? "user" : "model",
      parts: [{ text: m.text }]
    }));

    const response = await client.models.generateContent({
  model: "gemini-3.5-flash",
  contents: contents,
  config: {
    systemInstruction: systemPrompt,
    temperature: 0.7,
    maxOutputTokens: 600,
    
  }
});

    const parsedText = response.text || "I was unable to formulate a response. Please rephrase your query.";
    res.json({ response: parsedText });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: error.message || "Failed to process chat response using GenAI." });
  }
});

// Vite middleware and listen setup wrapped in async function
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    // Express 4 wildcard catch-all route standard
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server launched and running on port ${PORT}`);
  });
}

startServer();