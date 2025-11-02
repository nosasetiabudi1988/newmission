import { GoogleGenAI } from "@google/genai";

export const getMissionTip = async (objective: string): Promise<string> => {
  try {
    // FIX: Aligned API key handling with coding guidelines by using `process.env.API_KEY` directly.
    // This removes the custom `getApiKey` function and resolves the TypeScript error related to `import.meta.env`.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const prompt = `
        You are an AI assistant for "Mission: Possible", a secret agent-themed English learning app for junior high students. 
        Your callsign is "HQ".
        A student agent has requested a tip for a mission. 
        Their mission objective is: "${objective}".
        
        Provide a concise, helpful, and encouraging tip related to this English learning objective.
        Frame your response as a transmission from HQ to an agent.
        Start your response with "HQ to Agent,".
        Keep the language simple and clear for a 7-9th grade English learner.
        You can provide a clear example sentence.
        
        Example format:
        "HQ to Agent, for describing people, remember to use vivid adjectives. Instead of 'The man is tall,' try 'The towering man cast a long shadow.' Stay sharp. Over."
    `;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("Error fetching tip from Gemini API:", error);
    return "HQ to Agent, our comms are scrambled. We couldn't get a tip through. Rely on your training. Over.";
  }
};
