export enum AIPlan {
  HOBBY = 'Hobby',
  PRO = 'Pro',
  BUSINESS = 'Business',
  ENTERPRISE = 'Enterprise',
  STUDENT = 'Student',
  INDIVIDUAL = 'Individual',
  PLUS = 'Plus',
  TEAM = 'Team',
  MAX = 'Max',
  FREE = 'Free',
  API_DIRECT = 'API Direct'
}

export enum AITool {
  CURSOR = 'Cursor',
  GITHUB_COPILOT = 'GitHub Copilot',
  CLAUDE = 'Claude',
  CHATGPT = 'ChatGPT',
  ANTHROPIC_API = 'Anthropic API',
  OPENAI_API = 'OpenAI API',
  GEMINI = 'Gemini',
  WINDSURF = 'Windsurf',
  V0 = 'v0'
}

export enum UseCase {
  CODING = 'coding',
  WRITING = 'writing',
  DATA = 'data',
  RESEARCH = 'research',
  MIXED = 'mixed'
}

export interface ToolConfig {
  tool: AITool;
  plan: AIPlan;
  monthlySpend: number;
  seats: number;
}

export interface AuditStack {
  tools: ToolConfig[];
  teamSize: number;
  primaryUseCase: UseCase;
}

export interface AuditRecommendation {
  tool: AITool;
  currentSpend: number;
  recommendedAction: string;
  monthlySavings: number;
  reason: string;
}

export interface AuditResult {
  recommendations: AuditRecommendation[];
  totalMonthlySavings: number;
  totalAnnualSavings: number;
  aiSummary?: string;
  id?: string;
}

export interface LeadInfo {
  email: string;
  companyName?: string;
  role?: string;
  teamSize?: number;
  auditId: string;
}
