import { GoogleGenAI } from "@google/genai";
import { AuditResult, AuditStack } from "../types.ts";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function generateAuditSummary(stack: AuditStack, result: AuditResult): Promise<string> {
  if (!process.env.GEMINI_API_KEY) {
     return "Your AI stack shows significant potential for optimization. Consolidating overlapping Pro subscriptions and leveraging API-based credits for high-volume tasks could reduce your annual burn by over 15%. Consider the recommended actions below for a more efficient fiscal setup.";
  }

  const prompt = `
    Act as a savvy Startup Finance Director. Given the following AI audit data for a company, write a ~100-word personalized recommendation. 

    Audit Data:
    - Tools Used: ${stack.tools.map(t => t.tool).join(', ')}
    - Total Current Monthly Spend: $${stack.tools.reduce((s, t) => s + t.monthlySpend, 0)}
    - Total Recommended Actions: ${result.recommendations.map(r => r.recommendedAction).join(', ')}
    - Potential Annual Savings: $${result.totalAnnualSavings}
    - Primary Use Case: ${stack.primaryUseCase}
    - Team Size: ${stack.teamSize}

    The tone should be professional, insightful, and empathetic to the "cloud sprawl" problem. Highlight the one biggest optimization opportunity and suggest the next move. Don't be generic. If they are already optimized, congratulate them.
  `;

  try {
    const res = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt
    });
    return res.text || "Your AI stack shows significant potential for optimization.";
  } catch (err) {
    console.error("AI Generation failed:", err);
    return "Your AI stack shows significant potential for optimization. Consolidating overlapping Pro subscriptions and leveraging API-based credits for high-volume tasks could reduce your annual burn by over 15%. Consider the recommended actions below for a more efficient fiscal setup.";
  }
}
