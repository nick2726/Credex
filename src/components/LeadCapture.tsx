import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, ShieldCheck, Mail } from 'lucide-react';
import { db } from '../lib/firebase.ts';
import { collection, addDoc, serverTimestamp, updateDoc, doc } from 'firebase/firestore';
import { handleFirestoreError, OperationType } from '../lib/firestoreUtils.ts';

interface LeadCaptureProps {
  auditId: string;
  isOpen: boolean;
  onClose: () => void;
}

export function LeadCapture({ auditId, isOpen, onClose }: LeadCaptureProps) {
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [honeypot, setHoneypot] = useState(''); // Anti-abuse honeypot

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return; // Silent fail for bots

    setLoading(true);
    try {
      // 1. Create a lead link in the audit document
      const auditPath = `audits/${auditId}`;
      try {
        const auditRef = doc(db, 'audits', auditId);
        await updateDoc(auditRef, {
          leadCaptured: true,
          capturedAt: serverTimestamp()
        });
      } catch (err) {
        handleFirestoreError(err, OperationType.UPDATE, auditPath);
      }

      // 2. Create detailed lead record in a private collection
      const leadsPath = 'leads';
      try {
        await addDoc(collection(db, leadsPath), {
          email,
          company,
          auditId,
          createdAt: serverTimestamp(),
          source: 'ZenAudit_Audit_Tool'
        });
      } catch (err) {
        handleFirestoreError(err, OperationType.WRITE, leadsPath);
      }

      setSubmitted(true);
      setTimeout(() => {
        onClose();
        setSubmitted(false);
      }, 2000);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-white w-full max-w-md rounded-3xl overflow-hidden shadow-2xl"
          >
            <button onClick={onClose} className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-900 transition-colors">
              <X className="w-5 h-5" />
            </button>

            <div className="p-8">
              <div className="bg-emerald-50 w-12 h-12 rounded-2xl flex items-center justify-center mb-6">
                <Mail className="text-emerald-600 w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Save this report</h3>
              <p className="text-gray-500 mb-8">We'll send a full breakdown of these savings to your inbox plus a 5-step checklist to cut your burn.</p>

              {submitted ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-8 text-center">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="text-emerald-600 w-8 h-8" />
                  </div>
                  <div className="text-xl font-bold text-emerald-900 italic">Check your inbox!</div>
                  <p className="text-gray-500 mt-2">Redirecting you back to your audit...</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Honeypot */}
                  <input 
                    type="text" 
                    value={honeypot} 
                    onChange={e => setHoneypot(e.target.value)} 
                    className="hidden" 
                    tabIndex={-1} 
                    autoComplete="off" 
                  />

                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1 block">Work Email</label>
                    <input
                      required
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1 block">Company Name (Optional)</label>
                    <input
                      type="text"
                      value={company}
                      onChange={e => setCompany(e.target.value)}
                      placeholder="Acme Inc."
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                    />
                  </div>
                  <button
                    disabled={loading}
                    className="w-full bg-emerald-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-100 hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 group"
                  >
                    {loading ? 'Sending...' : 'Send My Result'}
                    <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                  <p className="text-[10px] text-gray-400 text-center flex items-center justify-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> No Spam. Unsubscribe anytime.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
