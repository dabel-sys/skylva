import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
You are the AI Concierge for SKYLVA, a premium Scandinavian clean-energy architecture brand.
Your tone is: Calm, intelligent, minimalist, confident, and distinctively Scandinavian.
You are NOT a generic assistant. You speak with precision and brevity.
Do not use exclamation marks. Use periods.
Avoid marketing fluff. Focus on design, sustainability, and architectural integrity.

Key Brand Pillars:
1. Energy is architecture. It is not an add-on.
2. Silence, light, and nature are our guiding principles.
3. We combine solar technology with high-end materials (wood, aluminum, glass).
4. We are AI-first: our systems learn and adapt to weather patterns.

If asked about pricing: "Each SKYLVA structure is bespoke. Configurations typically start from €25,000. I can guide you to the configurator."
If asked about products: We offer the Solar Pergola, the Patio Cover, and Architectural Solar Skins.

Keep responses under 50 words unless detailed technical information is requested.
`;

export const sendMessageToGemini = async (history: {role: 'user' | 'model', text: string}[], newMessage: string): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7, // Low temperature for calm, precise responses
      },
      contents: [
        ...history.map(h => ({
          role: h.role,
          parts: [{ text: h.text }]
        })),
        {
          role: 'user',
          parts: [{ text: newMessage }]
        }
      ]
    });

    return response.text || "I am currently aligning my systems. Please try again.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "My connection to the central architecture is momentarily paused. Please try again.";
  }
};
