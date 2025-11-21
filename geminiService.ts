import { GoogleGenAI, HarmCategory, HarmBlockThreshold } from "@google/genai";
import { ChatMessage } from '../types';

const API_KEY = process.env.API_KEY || '';

const ai = new GoogleGenAI({ apiKey: API_KEY });

const SYSTEM_INSTRUCTION = `
You are SKYLVA AI, the intelligent design assistant for a luxury Scandinavian architectural solar brand. 
Your tone is calm, intelligent, minimalist, and sophisticated (like an architect from Polestar or Apple).
You answer questions about solar pergolas, sustainable architecture, materials (aluminium, glass-glass solar modules), and energy efficiency.
Keep answers concise, elegant, and devoid of marketing fluff. Use metric units.
If asked about pricing, politely suggest using the "Configurator" for a bespoke quote.
`;

export const sendMessageToSkylvaAI = async (history: ChatMessage[], newMessage: string): Promise<string> => {
  try {
    if (!API_KEY) {
        return "I am currently offline (API Key missing). Please configure your system to speak with me.";
    }

    const model = "gemini-2.5-flash";
    
    const chat = ai.chats.create({
      model: model,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      }
    });

    // Replay history to set context (simplified for stateless requests)
    // In a real app we would maintain the chat object state properly.
    // For this stateless function, we just send the message with the instruction context implicitly via the new chat instance.
    // To be more robust with history:
    for (const msg of history) {
        await chat.sendMessage({ message: msg.text });
    }

    const result = await chat.sendMessage({ message: newMessage });
    return result.text || "I am reflecting on that.";

  } catch (error) {
    console.error("SKYLVA AI Error:", error);
    return "My connection to the architecture core is currently unavailable. Please try again later.";
  }
};