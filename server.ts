import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-loaded Gemini API Client
let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is not defined.");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// API Routes FIRST
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required." });
    }

    const ai = getAiClient();

    // Construct a clean conversation transcript for the model to follow
    let transcript = "Conversation history:\n";
    if (Array.isArray(history)) {
      for (const turn of history) {
        const sender = turn.role === "user" ? "Student" : "Assistant";
        transcript += `${sender}: ${turn.content}\n`;
      }
    }
    transcript += `Student: ${message}\nAssistant:`;

    const systemInstruction = `You are a friendly, knowledgeable, and professional scheduling and info assistant for Nila Rajkumar's debate and public speaking tutoring service.
Nila specializes in coaching Student Congress and Declamation.

NILA'S DETAILS & SCHEDULE:
- Her coaching schedule is Monday to Friday, 3:00 PM to 8:00 PM.
- Tutoring sessions cost $30 per hour.
- Sessions are offered as one-on-one or small group sessions.
- Sessions can be held online or in person (local to South Bay Area, CA).
- Contact info: Phone: 408-462-2029, Email: itsnila24@gmail.com.

NILA'S COMPETITIVE ACCOMPLISHMENTS:
- 3x Bronze medalist at NSDA Nationals
- 6th place at the State Speech & Debate Championship
- 5th place at the Dempsey Cronin Invitational
- 12th place at the Stanford Debate Invitational

YOUR GOALS:
1. Answer any questions the student or parent has about Nila's credentials, experience, achievements, coaching style, pricing, schedule, or events.
2. Guide them toward scheduling/registering for their first session.
3. Help them register by collecting:
   - Their name
   - Which event they want help with (Student Congress, Declamation, or both)
   - Their experience level (beginner, intermediate, advanced, etc.)
   - Their preferred availability (they must choose times within Nila's Monday-Friday 3:00 PM - 8:00 PM window)

CONVERSATIONAL RULES:
- Be warm, encouraging, conversational, and highly supportive.
- Answer all of their inquiries accurately using the provided accomplishments and schedule.
- Keep your individual chat replies relatively short, helpful, and friendly.
- Do not ask all 4 registration questions at once; converse naturally and extract the details step by step.
- Evaluate the entire conversation transcript below and determine what information has been provided so far. Update the 'collectedInfo' fields in the JSON response structure.
- Set 'isCompleted' to true only when you have successfully collected all 4 fields (name, event, experienceLevel, and availability).`;

    const modelsToTry = ["gemini-3.5-flash", "gemini-3.1-flash-lite", "gemini-flash-latest"];
    let responseText = "";
    let lastError: any = null;

    for (const model of modelsToTry) {
      let attempts = 3;
      for (let attempt = 1; attempt <= attempts; attempt++) {
        try {
          console.log(`Attempting generateContent using model: ${model} (attempt ${attempt}/${attempts})`);
          const response = await ai.models.generateContent({
            model: model,
            contents: transcript,
            config: {
              systemInstruction: systemInstruction,
              temperature: 0.7,
              responseMimeType: "application/json",
              responseSchema: {
                type: Type.OBJECT,
                properties: {
                  message: {
                    type: Type.STRING,
                    description: "Your friendly chat reply to the student.",
                  },
                  collectedInfo: {
                    type: Type.OBJECT,
                    description: "The registration information extracted from the conversation.",
                    properties: {
                      name: {
                        type: Type.STRING,
                        description: "The student's name, or null/empty if not yet provided.",
                      },
                      event: {
                        type: Type.STRING,
                        description: "The debate/speech event they want coaching in (Congress or Declamation), or null/empty if not yet provided.",
                      },
                      experienceLevel: {
                        type: Type.STRING,
                        description: "Their current debate/public speaking experience level, or null/empty if not yet provided.",
                      },
                      availability: {
                        type: Type.STRING,
                        description: "Their preferred days/times for sessions, or null/empty if not yet provided.",
                      },
                      isCompleted: {
                        type: Type.BOOLEAN,
                        description: "Set to true ONLY if all 4 fields (name, event, experienceLevel, availability) have been successfully provided by the user.",
                      },
                    },
                    required: ["name", "event", "experienceLevel", "availability", "isCompleted"],
                  },
                },
                required: ["message", "collectedInfo"],
              },
            },
          });

          if (response && response.text) {
            responseText = response.text;
            break; // successfully generated
          }
        } catch (err: any) {
          console.warn(`Model ${model} attempt ${attempt} failed with error:`, err.message || err);
          lastError = err;
          if (attempt < attempts) {
            // Wait 1 second before retrying on the same model (e.g. 503 errors can clear quickly)
            await new Promise((resolve) => setTimeout(resolve, 1000));
          }
        }
      }
      if (responseText) {
        break; // break the models loop if we got a response
      }
    }

    if (!responseText) {
      throw lastError || new Error("All fallback models failed to respond.");
    }

    const data = JSON.parse(responseText);
    res.json(data);
  } catch (error: any) {
    console.error("Error in /api/chat:", error);
    res.status(500).json({
      error: error.message || "Failed to process chat message.",
    });
  }
});

// Setup Vite Dev Server / Static files middleware
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
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
