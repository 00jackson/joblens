// lib/useHistory.ts
import { useEffect, useState } from 'react';

type MatchSession = {
  id: string;
  resume: string;
  category: string;
  result: string;
  createdAt: Date;
};

export function useHistory() {
  const [history, setHistory] = useState<MatchSession[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const raw = localStorage.getItem('joblens-history');
      if (raw) {
        setHistory(JSON.parse(raw));
      }
    }
  }, []);

  const saveSession = (data: Omit<MatchSession, 'id' | 'createdAt'>) => {
    const newSession = {
      ...data,
      id: Math.random().toString(36).substring(2, 9),
      createdAt: new Date(),
    };
    const updatedHistory = [newSession, ...history.slice(0, 9)]; // Keep last 10
    setHistory(updatedHistory);
    localStorage.setItem('joblens-history', JSON.stringify(updatedHistory));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('joblens-history');
  };

  return { history, saveSession, clearHistory };
}