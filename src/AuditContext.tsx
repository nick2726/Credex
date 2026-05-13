import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuditStack, AuditResult, UseCase, AITool, AIPlan } from './types.ts';
import { runAudit } from './lib/auditEngine.ts';

interface AuditContextType {
  stack: AuditStack;
  setStack: React.Dispatch<React.SetStateAction<AuditStack>>;
  results: AuditResult | null;
  calculateAudit: () => void;
  resetAudit: () => void;
}

const DEFAULT_STACK: AuditStack = {
  tools: [],
  teamSize: 1,
  primaryUseCase: UseCase.CODING
};

const AuditContext = createContext<AuditContextType | undefined>(undefined);

export function AuditProvider({ children }: { children: React.ReactNode }) {
  const [stack, setStack] = useState<AuditStack>(() => {
    const saved = localStorage.getItem('zen_audit_stack');
    return saved ? JSON.parse(saved) : DEFAULT_STACK;
  });
  
  const [results, setResults] = useState<AuditResult | null>(null);

  useEffect(() => {
    localStorage.setItem('zen_audit_stack', JSON.stringify(stack));
  }, [stack]);

  const calculateAudit = () => {
    const res = runAudit(stack);
    setResults(res);
  };

  const resetAudit = () => {
    setStack(DEFAULT_STACK);
    setResults(null);
  };

  return (
    <AuditContext.Provider value={{ stack, setStack, results, calculateAudit, resetAudit }}>
      {children}
    </AuditContext.Provider>
  );
}

export function useAudit() {
  const context = useContext(AuditContext);
  if (!context) throw new Error('useAudit must be used within AuditProvider');
  return context;
}
