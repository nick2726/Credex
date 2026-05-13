import { AuditStack, AuditRecommendation, AuditResult, AITool, AIPlan } from '../types.ts';
import { PRICING_DEFAULTS } from '../constants.ts';

export function runAudit(stack: AuditStack): AuditResult {
  const recommendations: AuditRecommendation[] = [];

  stack.tools.forEach((item) => {
    let rec: AuditRecommendation | null = null;

    // Logic for Cursor
    if (item.tool === AITool.CURSOR) {
      if (item.plan === AIPlan.BUSINESS && item.seats < 5) {
        const potentialSpend = 20 * item.seats;
        const savings = item.monthlySpend - potentialSpend;
        if (savings > 0) {
          rec = {
            tool: AITool.CURSOR,
            currentSpend: item.monthlySpend,
            recommendedAction: 'Switch to Pro Plan',
            monthlySavings: savings,
            reason: `Business plan for ${item.seats} seats is overkill; Pro plan offers almost identical individual features for 50% less.`
          };
        }
      }
    }

    // Logic for Claude/ChatGPT Redundancy
    const hasClaude = stack.tools.some(t => t.tool === AITool.CLAUDE);
    const hasChatGPT = stack.tools.some(t => t.tool === AITool.CHATGPT);
    if (hasClaude && hasChatGPT && item.tool === AITool.CHATGPT && item.plan === AIPlan.PLUS) {
      rec = {
        tool: AITool.CHATGPT,
        currentSpend: item.monthlySpend,
        recommendedAction: 'Consolidate to Claude Max',
        monthlySavings: item.monthlySpend,
        reason: 'Using both Claude Pro and ChatGPT Plus is often redundant for engineering teams. Consolidating to one can save $240/yr per seat.'
      };
    }

    // Generic "Retail vs API" logic for heavy API users
    if (item.plan === AIPlan.API_DIRECT && item.monthlySpend > 500) {
      rec = {
        tool: item.tool,
        currentSpend: item.monthlySpend,
        recommendedAction: 'Buy Credits through Credex',
        monthlySavings: item.monthlySpend * 0.2,
        reason: 'At this volume of API usage, you qualify for 20% discount credits via our partner network.'
      };
    }

    // Claude Team Plan optimization
    if (item.tool === AITool.CLAUDE && item.plan === AIPlan.TEAM && item.seats < 5) {
      // Actually Claude Team usually has a minimum, but check if they are paying a flat fee
      const savings = item.monthlySpend - (20 * item.seats);
      if (savings > 5) {
         rec = {
            tool: AITool.CLAUDE,
            currentSpend: item.monthlySpend,
            recommendedAction: 'Downgrade to Pro',
            monthlySavings: savings,
            reason: 'Team plans often have minimum seat counts or higher base costs. Pro seats are more agile for small teams.'
         };
      }
    }

    if (rec) recommendations.push(rec);
  });

  // Calculate totals
  const totalMonthlySavings = recommendations.reduce((sum, r) => sum + r.monthlySavings, 0);
  const totalAnnualSavings = totalMonthlySavings * 12;

  return {
    recommendations,
    totalMonthlySavings,
    totalAnnualSavings
  };
}
