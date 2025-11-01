import { GoogleGenAI, Chat, Type } from "@google/genai";
import { IssuePriority } from "../types";

// Ensure the API key is available from environment variables
if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const chat: Chat = ai.chats.create({
  model: 'gemini-2.5-flash',
  config: {
    systemInstruction: 'You are a friendly and highly intelligent AI assistant specializing in analyzing complex problems and providing clear, concise, and actionable solutions. Be supportive and helpful.',
  },
});

export const sendMessageToAI = async (message: string): Promise<string> => {
  try {
    const result = await chat.sendMessage({ message });
    return result.text;
  } catch (error) {
    console.error("Error sending message to AI:", error);
    return "I'm sorry, I encountered an error. Please try again.";
  }
};


export const analyzeIssuePriority = async (description: string): Promise<IssuePriority> => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Analyze the following civic issue description and classify its priority as "High", "Medium", or "Low". Consider factors like public safety, environmental impact, and number of people affected. Respond with only one word. Description: "${description}"`,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        priority: {
                            type: Type.STRING,
                            enum: ["High", "Medium", "Low"],
                            description: "The calculated priority of the issue."
                        }
                    }
                }
            }
        });

        const jsonStr = response.text.trim();
        const result = JSON.parse(jsonStr);

        const priority = result.priority as IssuePriority;
        if (["High", "Medium", "Low"].includes(priority)) {
            return priority;
        }
        return "Unknown";
    } catch (error) {
        console.error("Error analyzing issue priority:", error);
        return "Unknown";
    }
}
