import { AITool, AIPlan } from './types.ts';

export const TOOL_PLANS: Record<AITool, AIPlan[]> = {
  [AITool.CURSOR]: [AIPlan.HOBBY, AIPlan.PRO, AIPlan.BUSINESS, AIPlan.ENTERPRISE],
  [AITool.GITHUB_COPILOT]: [AIPlan.INDIVIDUAL, AIPlan.BUSINESS, AIPlan.ENTERPRISE],
  [AITool.CLAUDE]: [AIPlan.FREE, AIPlan.PRO, AIPlan.MAX, AIPlan.TEAM, AIPlan.ENTERPRISE, AIPlan.API_DIRECT],
  [AITool.CHATGPT]: [AIPlan.PLUS, AIPlan.TEAM, AIPlan.ENTERPRISE, AIPlan.API_DIRECT],
  [AITool.ANTHROPIC_API]: [AIPlan.API_DIRECT],
  [AITool.OPENAI_API]: [AIPlan.API_DIRECT],
  [AITool.GEMINI]: [AIPlan.PRO, AIPlan.BUSINESS, AIPlan.ENTERPRISE, AIPlan.API_DIRECT],
  [AITool.WINDSURF]: [AIPlan.FREE, AIPlan.PRO, AIPlan.TEAM],
  [AITool.V0]: [AIPlan.FREE, AIPlan.PRO, AIPlan.TEAM]
};

export const PRICING_DEFAULTS: Record<string, number> = {
  [`${AITool.CURSOR}_${AIPlan.PRO}`]: 20,
  [`${AITool.CURSOR}_${AIPlan.BUSINESS}`]: 40,
  [`${AITool.GITHUB_COPILOT}_${AIPlan.INDIVIDUAL}`]: 10,
  [`${AITool.GITHUB_COPILOT}_${AIPlan.BUSINESS}`]: 19,
  [`${AITool.GITHUB_COPILOT}_${AIPlan.ENTERPRISE}`]: 39,
  [`${AITool.CLAUDE}_${AIPlan.PRO}`]: 20,
  [`${AITool.CLAUDE}_${AIPlan.TEAM}`]: 25,
  [`${AITool.CHATGPT}_${AIPlan.PLUS}`]: 20,
  [`${AITool.CHATGPT}_${AIPlan.TEAM}`]: 25,
  [`${AITool.GEMINI}_${AIPlan.PRO}`]: 20,
  [`${AITool.WINDSURF}_${AIPlan.PRO}`]: 15,
};
