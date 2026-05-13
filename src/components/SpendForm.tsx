import React from 'react';
import { useAudit } from '../AuditContext.tsx';
import { AITool, AIPlan, ToolConfig, UseCase } from '../types.ts';
import { TOOL_PLANS } from '../constants.ts';
import { motion } from 'motion/react';
import { Plus, Trash2, ShieldCheck, HelpCircle } from 'lucide-react';
import { cn } from '../lib/utils.ts';

export function SpendForm() {
  const { stack, setStack, calculateAudit } = useAudit();

  const addTool = () => {
    setStack(prev => ({
      ...prev,
      tools: [...prev.tools, { tool: AITool.CURSOR, plan: AIPlan.PRO, monthlySpend: 20, seats: 1 }]
    }));
  };

  const removeTool = (index: number) => {
    setStack(prev => ({
      ...prev,
      tools: prev.tools.filter((_, i) => i !== index)
    }));
  };

  const updateTool = (index: number, updates: Partial<ToolConfig>) => {
    setStack(prev => ({
      ...prev,
      tools: prev.tools.map((t, i) => i === index ? { ...t, ...updates } : t)
    }));
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-12" id="audit-form-container">
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
        <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
          1. Your Current AI Stack
        </h2>

        <div className="space-y-6 mb-10">
          {stack.tools.map((item, idx) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              key={idx}
              className="p-5 border border-gray-100 rounded-2xl bg-gray-50/50 flex flex-wrap gap-4 items-end"
            >
              <div className="flex-1 min-w-[150px]">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Tool</label>
                <select
                  value={item.tool}
                  onChange={(e) => updateTool(idx, { tool: e.target.value as AITool })}
                  className="w-full bg-white border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-emerald-500 outline-none"
                >
                  {Object.values(AITool).map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              <div className="flex-1 min-w-[150px]">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Plan</label>
                <select
                  value={item.plan}
                  onChange={(e) => updateTool(idx, { plan: e.target.value as AIPlan })}
                  className="w-full bg-white border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-emerald-500 outline-none"
                >
                  {TOOL_PLANS[item.tool].map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>

              <div className="w-24">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Spend ($)</label>
                <input
                  type="number"
                  value={item.monthlySpend}
                  onChange={(e) => updateTool(idx, { monthlySpend: Number(e.target.value) })}
                  className="w-full bg-white border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div className="w-20">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Seats</label>
                <input
                  type="number"
                  value={item.seats}
                  onChange={(e) => updateTool(idx, { seats: Number(e.target.value) })}
                  className="w-full bg-white border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <button
                onClick={() => removeTool(idx)}
                className="p-3 text-gray-400 hover:text-red-500 transition-colors"
                title="Remove tool"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </motion.div>
          ))}

          <button
            onClick={addTool}
            className="w-full py-4 border-2 border-dashed border-gray-200 rounded-2xl text-gray-500 hover:border-emerald-300 hover:text-emerald-500 transition-all flex items-center justify-center gap-2 font-medium"
          >
            <Plus className="w-5 h-5" /> Add Tool to Audit
          </button>
        </div>

        <h2 className="text-2xl font-bold mb-8 flex items-center gap-2 border-t pt-10 border-gray-100">
          2. Company Context
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Total Team Size</label>
            <input
              type="number"
              value={stack.teamSize}
              onChange={(e) => setStack(prev => ({ ...prev, teamSize: Number(e.target.value) }))}
              className="w-full bg-white border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Primary Use Case</label>
            <select
              value={stack.primaryUseCase}
              onChange={(e) => setStack(prev => ({ ...prev, primaryUseCase: e.target.value as UseCase }))}
              className="w-full bg-white border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-emerald-500 outline-none"
            >
              {Object.values(UseCase).map(u => <option key={u} value={u}>{u.charAt(0).toUpperCase() + u.slice(1)}</option>)}
            </select>
          </div>
        </div>

        <button
          onClick={calculateAudit}
          disabled={stack.tools.length === 0}
          className={cn(
            "w-full py-5 rounded-2xl text-lg font-bold transition-all shadow-xl",
            stack.tools.length === 0 
              ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
              : "bg-gray-900 text-white hover:bg-black active:scale-[0.98]"
          )}
        >
          Generate My Savings Audit
        </button>

        <p className="text-center text-gray-400 text-xs mt-6 flex items-center justify-center gap-1">
          <ShieldCheck className="w-3 h-3 text-emerald-500" />
          Secure & Anonymous. No login required.
        </p>
      </div>
    </div>
  );
}
