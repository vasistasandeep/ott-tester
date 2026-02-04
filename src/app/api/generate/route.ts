import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { prompt, apiKey } = await req.json();

        if (!apiKey) {
            return NextResponse.json(
                { error: "API Key is required to use Real Intelligence." },
                { status: 401 }
            );
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const systemPrompt = `
      You are an expert OTT Test Case Generator. 
      Generate a comprehensive JSON response for the given feature description.
      The Output MUST be a valid JSON object with the following structure:
      {
        "testCases": [
          { "id": "FE/BE-XXX", "title": "...", "platform": "...", "preconditions": "...", "steps": ["..."], "expectedResult": "...", "type": "Functional|Security|etc", "auto": boolean, "priority": "P0|P1" }
        ],
        "scenarios": [
          { "id": "SCN-XXX", "title": "...", "description": "...", "userJourney": ["step1", "step2"] }
        ],
        "plan": {
          "strategy": "...", "scope": "...", "tools": ["..."]
        }
      }
      Do not include markdown code fences (like \`\`\`json). Just return the raw JSON string.
    `;

        const result = await model.generateContent(`${systemPrompt}\n\nFeature: ${prompt}`);
        const response = await result.response;
        const text = response.text();

        // Clean up if markdown fences exist
        const cleanJson = text.replace(/```json/g, "").replace(/```/g, "").trim();

        return NextResponse.json(JSON.parse(cleanJson));

    } catch (error: any) {
        console.error("AI Generation Error:", error);
        return NextResponse.json(
            { error: error.message || "Failed to generate content" },
            { status: 500 }
        );
    }
}
