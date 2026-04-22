import { useState } from 'react';
import { X } from 'lucide-react';
import { usePalaceStore } from '../useStore';
import { generatePalace } from '../generator';

export function NewPalaceModal({ onClose, store }: { onClose: () => void, store: ReturnType<typeof usePalaceStore> }) {
  const [title, setTitle] = useState('');
  const [theme, setTheme] = useState('elegant');
  const [conceptsText, setConceptsText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      const concepts = conceptsText.split(',').map(c => c.trim()).filter(Boolean);
      const newPalace = await generatePalace(concepts, store.apiKey, title, theme);
      store.addPalace(newPalace);
      onClose();
    } catch (e) {
      alert("Failed to generate palace. Check API Key or console for details.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
      backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100
    }}>
      <div className="chromatic-glass" style={{ width: '100%', maxWidth: '500px', padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 className="text-title" style={{ fontSize: 'var(--text-xl)' }}>Generate Memory Palace</h2>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--color-text)' }}><X /></button>
        </div>

        <input 
          placeholder="Palace Title (e.g. Cognitive Biases)" 
          value={title} onChange={(e) => setTitle(e.target.value)}
          style={{ width: '100%', padding: 'var(--space-3)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', background: 'var(--color-bg)', color: 'var(--color-text)' }}
        />
        
        <select 
          value={theme} onChange={(e) => setTheme(e.target.value)}
          style={{ width: '100%', padding: 'var(--space-3)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', background: 'var(--color-bg)', color: 'var(--color-text)' }}
        >
          <option value="whimsical">Whimsical & Surreal</option>
          <option value="elegant">Elegant & Neoclassical</option>
          <option value="dark">Dark & Gothic</option>
          <option value="minimalist">Minimalist & Brutalist</option>
        </select>

        <textarea 
          placeholder="Enter concepts separated by commas (e.g. Anchoring, Sunk Cost, Dissonance)..." 
          value={conceptsText} onChange={(e) => setConceptsText(e.target.value)}
          rows={4}
          style={{ width: '100%', padding: 'var(--space-3)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', background: 'var(--color-bg)', color: 'var(--color-text)', resize: 'vertical' }}
        />

        <button 
          onClick={handleGenerate}
          disabled={isLoading || !title || !conceptsText}
          style={{ 
            padding: 'var(--space-3)', background: 'var(--color-primary)', color: 'white', 
            border: 'none', borderRadius: 'var(--radius-sm)', cursor: isLoading ? 'not-allowed' : 'pointer',
            fontWeight: '600', opacity: isLoading ? 0.7 : 1 
          }}
        >
          {isLoading ? 'Architecting Palace...' : 'Generate Palace'}
        </button>
        
        {!store.apiKey && (
          <p className="text-body" style={{ fontSize: 'var(--text-sm)', textAlign: 'center', color: '#ff6b6b' }}>
            No API Key set. A mock palace will be generated.
          </p>
        )}
      </div>
    </div>
  );
}
