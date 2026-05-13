/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { AuditProvider, useAudit } from './AuditContext.tsx';
import { Hero } from './components/Hero.tsx';
import { SpendForm } from './components/SpendForm.tsx';
import { AuditResults } from './components/AuditResults.tsx';
import { LeadCapture } from './components/LeadCapture.tsx';
import { ShareView } from './components/ShareView.tsx';
import { Target, Github, Twitter, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

function LandingPage() {
  const { results } = useAudit();
  const formRef = useRef<HTMLDivElement>(null);
  const [isLeadOpen, setIsLeadOpen] = useState(false);
  const [activeAuditId, setActiveAuditId] = useState<string | null>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLeadGate = (id: string) => {
    setActiveAuditId(id);
    setIsLeadOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 font-bold text-xl text-gray-900 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="bg-emerald-600 p-1.5 rounded-lg text-white group-hover:rotate-12 transition-transform shadow-lg shadow-emerald-200">
              <Target className="w-5 h-5" />
            </div>
            ZenAudit<span className="text-emerald-600">AI</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-500">
            <a href="#how-it-works" className="hover:text-emerald-600 transition-colors">How it works</a>
            <a href="https://credex.rocks" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-600 transition-colors flex items-center justify-center gap-1">Credex Credits <ExternalLink className="w-3 h-3" /></a>
          </div>
          <button onClick={scrollToForm} className="bg-gray-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-gray-100 hover:scale-[1.02] transition-all">
            Audit My Stack
          </button>
        </div>
      </nav>

      <main className="pt-20">
        {!results ? (
          <>
            <Hero onStart={scrollToForm} />
            <div ref={formRef} className="scroll-mt-24">
              <SpendForm />
            </div>
          </>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <AuditResults onLeadGate={handleLeadGate} />
          </motion.div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-100 py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 font-bold text-2xl text-gray-900 mb-6 font-sans">
              <div className="bg-emerald-600 p-2 rounded-xl text-white">
                <Target className="w-6 h-6" />
              </div>
              ZenAudit<span className="text-emerald-600">AI</span>
            </div>
            <p className="text-gray-500 max-w-sm mb-6 leading-relaxed">
              Making AI startup spend defensible. Built by entrepreneurs for entrepreneurs, powered by the Credex ecosystem.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-white border rounded-lg text-gray-400 hover:text-emerald-600 transition-all"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="p-2 bg-white border rounded-lg text-gray-400 hover:text-emerald-600 transition-all"><Github className="w-5 h-5" /></a>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-gray-900">Project</h4>
            <ul className="space-y-4 text-gray-500 font-medium">
              <li><a href="#" className="hover:text-emerald-600 transition-colors">Pricing Data</a></li>
              <li><a href="#" className="hover:text-emerald-600 transition-colors">Audit Logic</a></li>
              <li><a href="#" className="hover:text-emerald-600 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-gray-900">Partner</h4>
            <ul className="space-y-4 text-gray-500 font-medium">
              <li><a href="https://credex.rocks" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-600 transition-colors">Get Credits</a></li>
              <li><a href="#" className="hover:text-emerald-600 transition-colors">Sell Surplus Capacity</a></li>
              <li><a href="#" className="hover:text-emerald-600 transition-colors">Book Consultation</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-gray-100 text-center text-gray-400 text-xs">
          © {new Date().getFullYear()} ZenAudit AI (Round 1 Build). All rights reserved. Identifiers trace to vendor pricing URLs.
        </div>
      </footer>

      {activeAuditId && (
        <LeadCapture 
          auditId={activeAuditId} 
          isOpen={isLeadOpen} 
          onClose={() => setIsLeadOpen(false)} 
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuditProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/share/:id" element={<ShareView />} />
        </Routes>
      </AuditProvider>
    </BrowserRouter>
  );
}
