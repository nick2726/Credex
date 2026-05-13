import React, { useEffect, useState } from 'react';
import { useAudit } from '../AuditContext.tsx';
import { motion } from 'motion/react';
import { DollarSign, ArrowRight, CheckCircle2, TrendingDown, BookOpen, Share2 } from 'lucide-react';
import { generateAuditSummary } from '../services/aiService.ts';
import { db } from '../lib/firebase.ts';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { handleFirestoreError, OperationType } from '../lib/firestoreUtils.ts';

export function AuditResults({ onLeadGate }: { onLeadGate: (auditId: string) => void }) {
  const { results, stack, resetAudit } = useAudit();
  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const [loadingAi, setLoadingAi] = useState(true);
  const [auditId, setAuditId] = useState<string | null>(null);

  useEffect(() => {
    if (results && !aiSummary) {
      setLoadingAi(true);
      generateAuditSummary(stack, results).then(res => {
        setAiSummary(res);
        setLoadingAi(false);
      });
    }

    // Save initial audit to firestore for permanence & sharing
    if (results && !auditId) {
      const saveAudit = async () => {
        const path = 'audits';
        try {
          const docRef = await addDoc(collection(db, path), {
            stack,
            results: {
              recommendations: results.recommendations,
              totalMonthlySavings: results.totalMonthlySavings,
              totalAnnualSavings: results.totalAnnualSavings
            },
            createdAt: serverTimestamp(),
            public: true
          });
          setAuditId(docRef.id);
        } catch (e) {
          handleFirestoreError(e, OperationType.WRITE, path);
        }
      };
      saveAudit();
    }
  }, [results, stack, aiSummary, auditId]);

  if (!results) return null;

  const totalMonthlySpend = stack.tools.reduce((sum, t) => sum + t.monthlySpend, 0);
  const isHighSavings = results.totalMonthlySavings > 500;
  const isLowSavings = results.totalMonthlySavings < 100;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 pb-32" id="results-view">
      {/* Hero Savings Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="bg-emerald-600 rounded-3xl p-10 text-white shadow-2xl shadow-emerald-200 mb-12 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <DollarSign className="w-48 h-48" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <p className="text-emerald-100 font-medium mb-2 uppercase tracking-widest text-xs">Total Potential Savings</p>
            <div className="text-6xl font-black mb-1">${results.totalMonthlySavings.toLocaleString()}<span className="text-2xl font-normal opacity-60">/mo</span></div>
            <div className="text-2xl font-bold text-emerald-200">${results.totalAnnualSavings.toLocaleString()}/year</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 text-center">
            <div className="text-sm opacity-80 mb-1">Current AI Burn</div>
            <div className="text-3xl font-bold">${totalMonthlySpend.toLocaleString()}</div>
          </div>
        </div>
      </motion.div>

      {/* AI Summary Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white border-2 border-emerald-100 rounded-3xl p-8 mb-12 shadow-md relative group"
      >
        <div className="absolute -top-4 left-8 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-tighter">Personalized AI Insights</div>
        {loadingAi ? (
          <div className="flex items-center gap-4 animate-pulse">
            <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        ) : (
          <p className="text-lg text-gray-700 leading-relaxed italic">
            "{aiSummary}"
          </p>
        )}
      </motion.div>

      {/* Per-Tool Breakdown */}
      <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
        <TrendingDown className="text-emerald-600 w-6 h-6" />
        Optimization Breakdown
      </h3>
      <div className="space-y-4 mb-12">
        {results.recommendations.length > 0 ? (
          results.recommendations.map((rec, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-wrap md:flex-nowrap items-center gap-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex-1 min-w-[200px]">
                <div className="font-bold text-gray-500 text-xs uppercase mb-1">{rec.tool}</div>
                <div className="font-bold text-lg text-gray-900 line-through opacity-40">${rec.currentSpend}/mo</div>
                <div className="font-black text-2xl text-emerald-600 flex items-center gap-2">
                  <ArrowRight className="w-5 h-5" /> ${Math.max(0, rec.currentSpend - rec.monthlySavings)}/mo
                </div>
              </div>
              <div className="flex-[2] min-w-[250px]">
                <div className="font-bold text-emerald-700 mb-1">{rec.recommendedAction}</div>
                <p className="text-sm text-gray-500 leading-snug">{rec.reason}</p>
              </div>
              <div className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-xl font-bold flex items-center gap-1 shrink-0">
                <DollarSign className="w-4 h-4" /> Save ${rec.monthlySavings}/mo
              </div>
            </motion.div>
          ))
        ) : (
          <div className="bg-gray-50 border border-gray-100 rounded-3xl p-12 text-center">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
            <h4 className="text-xl font-bold text-gray-900 mb-2">Already Optimized!</h4>
            <p className="text-gray-500">Your AI stack is looking lean. We couldn't find any obvious overspend here. Well done.</p>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="border-t border-gray-100 pt-12 text-center">
        {isHighSavings ? (
          <div className="bg-gray-900 text-white rounded-3xl p-10 shadow-2xl">
            <h2 className="text-3xl font-bold mb-4">You're leaving money on the table.</h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">Our audit suggests significant savings. Credex can help you bundle these tools into a single discounted enterprise credit package.</p>
            <button
              onClick={() => auditId && onLeadGate(auditId)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-4 rounded-xl font-bold text-lg transition-all"
            >
              Book a Free Credex Consultation
            </button>
          </div>
        ) : (
          <div className="bg-white border rounded-3xl p-10">
            <h2 className="text-2xl font-bold mb-4">Want to track future optimizations?</h2>
            <p className="text-gray-500 mb-8 max-w-xl mx-auto">We'll notify you when new plan changes or tool alternatives are released for your specific stack.</p>
            <button
              onClick={() => auditId && onLeadGate(auditId)}
              className="border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 px-10 py-4 rounded-xl font-bold text-lg transition-all"
            >
              Get Optimization Alerts
            </button>
          </div>
        )}

        <div className="flex justify-center gap-4 mt-8">
          <button 
            onClick={() => auditId && navigator.clipboard.writeText(`${window.location.origin}/share/${auditId}`)}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-900 font-medium transition-colors"
          >
            <Share2 className="w-4 h-4" /> Copy Share Link
          </button>
          <button onClick={resetAudit} className="flex items-center gap-2 text-gray-400 hover:text-red-500 font-medium transition-colors">
            Reset Audit
          </button>
        </div>
      </div>
    </div>
  );
}
