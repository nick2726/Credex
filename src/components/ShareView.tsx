import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db } from '../lib/firebase.ts';
import { doc, getDoc } from 'firebase/firestore';
import { handleFirestoreError, OperationType } from '../lib/firestoreUtils.ts';
import { AuditResult, AuditStack } from '../types.ts';
import { motion } from 'motion/react';
import { DollarSign, ArrowRight, ShieldCheck, TrendingDown, Target } from 'lucide-react';

export function ShareView() {
  const { id } = useParams();
  const [data, setData] = useState<{ results: AuditResult, stack: AuditStack } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
       const path = `audits/${id}`;
       getDoc(doc(db, 'audits', id)).then(snap => {
         if (snap.exists()) {
           setData(snap.data() as any);
         }
         setLoading(false);
       }).catch(err => {
         handleFirestoreError(err, OperationType.GET, path);
       });
    }
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
       <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 bg-emerald-200 rounded-2xl mb-4"></div>
          <div className="h-4 bg-gray-200 w-32 rounded"></div>
       </div>
    </div>
  );

  if (!data) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
       <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Audit Not Found</h2>
          <Link to="/" className="text-emerald-600 font-bold hover:underline">Go Home</Link>
       </div>
    </div>
  );

  const { results, stack } = data;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <nav className="p-6 flex justify-between items-center border-b bg-white">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl text-gray-900 group">
             <div className="bg-emerald-600 p-1.5 rounded-lg text-white group-hover:rotate-12 transition-transform">
                <Target className="w-5 h-5" />
             </div>
             ZenAudit<span className="text-emerald-600">AI</span>
          </Link>
          <Link to="/" className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg shadow-emerald-100 hover:scale-105 transition-all">
             Audit Your Stack
          </Link>
      </nav>

      <main className="flex-1 py-12 px-6">
          <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                 <div className="bg-emerald-100 text-emerald-700 px-4 py-1 rounded-full text-xs font-bold inline-block uppercase tracking-widest mb-4">Shared AI Stack Audit</div>
                 <h1 className="text-4xl font-bold text-gray-900 mb-2 font-sans tracking-tight">Financial Savings Breakdown</h1>
                 <p className="text-gray-500 italic">Identified savings for a team of {stack.teamSize} members</p>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-xl mb-12 border border-gray-100 relative">
                  <div className="grid grid-cols-2 gap-8 text-center">
                      <div>
                          <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Monthly Savings</div>
                          <div className="text-4xl font-black text-emerald-600">${results.totalMonthlySavings.toLocaleString()}</div>
                      </div>
                      <div className="border-l border-gray-100">
                          <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Annual Potential</div>
                          <div className="text-4xl font-black text-gray-900">${results.totalAnnualSavings.toLocaleString()}</div>
                      </div>
                  </div>
              </div>

              <div className="space-y-4">
                  {results.recommendations.map((rec, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-wrap md:flex-nowrap items-center gap-6 shadow-sm"
                      >
                         <div className="flex-1 min-w-[150px]">
                            <div className="font-bold text-gray-400 text-[10px] uppercase mb-1 tracking-widest">{rec.tool}</div>
                            <div className="font-bold text-emerald-700 text-sm">{rec.recommendedAction}</div>
                         </div>
                         <div className="flex-[2]">
                             <p className="text-sm text-gray-600 italic">"{rec.reason}"</p>
                         </div>
                         <div className="text-emerald-600 font-black whitespace-nowrap text-lg">
                            + ${rec.monthlySavings}/mo
                         </div>
                      </motion.div>
                  ))}
              </div>

              <div className="mt-16 text-center border-t border-gray-200 pt-12">
                  <p className="text-gray-500 mb-6 font-medium">Curious what your own stack could save?</p>
                  <Link to="/" className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-xl font-bold shadow-2xl hover:scale-105 transition-all group">
                     Run Your Own Audit <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <p className="text-[10px] text-gray-400 mt-8 flex items-center justify-center gap-1 group">
                    <ShieldCheck className="w-3 h-3 text-emerald-500" />
                    Secure & Anonymous reporting by ZenAudit AI
                  </p>
              </div>
          </div>
      </main>
    </div>
  );
}
