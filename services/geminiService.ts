
import { GoogleGenAI } from "@google/genai";

export const getMissionTip = async (missionObjective: string, stageObjective?: string): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const prompt = `
        You are an AI assistant for "Mission: Possible", a secret agent-themed English learning app for junior high students. 
        Your callsign is "HQ".
        A student agent has requested a tip for a mission. 
        
        Their overall mission objective is: "${missionObjective}".
        They are currently on a stage with this goal: "${stageObjective || 'Reviewing the mission file.'}".
        
        Provide a concise, helpful, and encouraging tip related to the CURRENT STAGE GOAL.
        Frame your response as a transmission from HQ to an agent.
        Start your response with "HQ to Agent,".
        Keep the language simple and clear for a 7-9th grade English learner.
        You can provide a clear example sentence if it helps.
        
        Example format for a writing stage:
        "HQ to Agent, when describing the asset, focus on strong verbs and specific adjectives. Instead of 'She is smart,' try 'Her meticulous organization reveals a sharp, analytical mind.' Stay sharp. Over."
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
