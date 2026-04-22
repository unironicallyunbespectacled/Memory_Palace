import { useState, useEffect } from 'react';
import type { Palace } from './types';

// We prefix the key so it doesn't collide with other apps the user might run
const STORAGE_KEY = 'memory-palace-architect-v1';

export function usePalaceStore() {
  const [palaces, setPalaces] = useState<Palace[]>([]);
  const [apiKey, setApiKey] = useState<string>('');

  // Initial Load
  useEffect(() => {
    const rawData = localStorage.getItem(STORAGE_KEY);
    const rawApiKey = localStorage.getItem(`${STORAGE_KEY}-apikey`);
    
    if (rawData) {
      try {
        setPalaces(JSON.parse(rawData));
      } catch (e) {
        console.error("Failed to load palaces", e);
      }
    }
    
    if (rawApiKey) {
      setApiKey(rawApiKey);
    }
  }, []);

  // Save Palaces whenever they change
  useEffect(() => {
    // Basic debounce / save
    localStorage.setItem(STORAGE_KEY, JSON.stringify(palaces));
  }, [palaces]);

  const addPalace = (palace: Palace) => {
    setPalaces(prev => [...prev, palace]);
  };

  const updatePalace = (id: string, updatedPalace: Partial<Palace>) => {
    setPalaces(prev => prev.map(p => p.id === id ? { ...p, ...updatedPalace } : p));
  };

  const deletePalace = (id: string) => {
    setPalaces(prev => prev.filter(p => p.id !== id));
  };

  const saveApiKey = (key: string) => {
    setApiKey(key);
    localStorage.setItem(`${STORAGE_KEY}-apikey`, key);
  };

  return {
    palaces,
    addPalace,
    updatePalace,
    deletePalace,
    apiKey,
    saveApiKey
  };
}
