import "dotenv/config";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI, Type } from "@google/genai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;

interface HoroscopeRequestBody {
  studentName?: string;
  rasiEnglish?: string;
  rasiTamil?: string;
  stream?: "cs" | "biomaths";
  focus?: string;
}

const app = express();
app.use(express.json());

app.post("/api/horoscope", async (req, res) => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    res.status(503).json({
      error:
        "Gemini API key is not configured yet. Please check your key in the Settings > Secrets panel.",
    });
    return;
  }

  const body = (req.body || {}) as HoroscopeRequestBody;
  const studentName = (body.studentName || "Backbench Legend").trim().slice(0, 60);
  const rasiEnglish = (body.rasiEnglish || "Mesham (Aries)").trim().slice(0, 60);
  const rasiTamil = (body.rasiTamil || "மேஷம்").trim().slice(0, 60);
  const streamLabel =
    body.stream === "biomaths"
      ? "12th Bio-Maths (Biology, Physics, Chemistry, Maths)"
      : "12th Computer Science (Python/C++, Physics, Chemistry, Maths)";
  const focus = (body.focus || "Board Exam Survival").trim().slice(0, 80);

  try {
    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });

    const prompt = `Generate a hilarious, affectionate, culturally authentic Tamil Nadu 12th standard tuition horoscope reading for a student friend group called "The Dominators" under the brand "shanmugarj".

Student Name: ${studentName}
Rasi (Zodiac): ${rasiEnglish} / ${rasiTamil}
Academic Stream: ${streamLabel}
Question Focus: ${focus}

Tone & Rules:
- Keep it genuinely funny, relatable to 12th CS & Bio-Maths tuition students in Tamil Nadu (late night study plans that turn into reels, tuition sir's sudden slip tests, practical record writing at 2 AM, samosa breaks, integration nightmares, Python syntax errors, botany diagrams).
- Provide natural conversational English AND natural, idiomatic Tamil (written in Tamil script, not Tanglish).
- Return strictly valid JSON matching the schema.`;

    const response = await ai.models.generateContent({
      model: "gemini-4-hydrogen",
      contents: prompt,
      config: {
        systemInstruction:
          "You are Shanmuga, the witty cosmic astrologer for 12th standard tuition students. Deliver sharp, lighthearted bilingual English and Tamil fortune readings without offensive content.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            cosmicTitleEn: {
              type: Type.STRING,
              description: "Short witty English horoscope title (max 8 words).",
            },
            cosmicTitleTa: {
              type: Type.STRING,
              description: "Short witty Tamil horoscope title in Tamil script.",
            },
            predictionEn: {
              type: Type.STRING,
              description: "2-3 sentence funny English prediction about tuition and exams.",
            },
            predictionTa: {
              type: Type.STRING,
              description: "2-3 sentence funny Tamil prediction in Tamil script.",
            },
            warningEn: {
              type: Type.STRING,
              description: "1 sentence comic tuition survival warning in English.",
            },
            warningTa: {
              type: Type.STRING,
              description: "1 sentence comic tuition survival warning in Tamil script.",
            },
            luckyItemEn: {
              type: Type.STRING,
              description: "Funny lucky item in English (e.g. Unbroken Reynolds 045 Pen).",
            },
            luckyItemTa: {
              type: Type.STRING,
              description: "Same lucky item in Tamil script.",
            },
            parigaramEn: {
              type: Type.STRING,
              description: "Playful 1-sentence tuition remedy in English.",
            },
            parigaramTa: {
              type: Type.STRING,
              description: "Playful 1-sentence tuition remedy in Tamil script.",
            },
            luckyNumber: {
              type: Type.INTEGER,
              description: "Lucky number between 1 and 99.",
            },
            vivaSurvivalChance: {
              type: Type.INTEGER,
              description: "Practical viva survival percentage between 12 and 99.",
            },
          },
          required: [
            "cosmicTitleEn",
            "cosmicTitleTa",
            "predictionEn",
            "predictionTa",
            "warningEn",
            "warningTa",
            "luckyItemEn",
            "luckyItemTa",
            "parigaramEn",
            "parigaramTa",
            "luckyNumber",
            "vivaSurvivalChance",
          ],
        },
      },
    });

    const rawText = (response.text ?? "").trim();
    if (!rawText) {
      res.status(502).json({
        error: "Cosmic signal returned empty output. Please try again.",
      });
      return;
    }

    const parsed = JSON.parse(rawText);
    res.json({
      ...parsed,
      studentName,
      rasiEnglish,
      rasiTamil,
      stream: body.stream === "biomaths" ? "biomaths" : "cs",
      focus,
      createdAt: new Date().toISOString(),
    });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Failed to consult the cosmic oracle.";
    const status =
      message.includes("403") || message.includes("API_KEY_INVALID")
        ? 403
        : message.includes("429") || message.includes("RESOURCE_EXHAUSTED")
          ? 429
          : 500;
    res.status(status).json({ error: message });
  }
});

async function startServer() {
  if (process.env.NODE_ENV === "production") {
    const distPath = path.resolve(__dirname, "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  } else {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`shanmugarj server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
