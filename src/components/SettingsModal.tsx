import { useState } from 'react';
import { X, Key } from 'lucide-react';
import { usePalaceStore } from '../useStore';

export function SettingsModal({ onClose, store }: { onClose: () => void, store: ReturnType<typeof usePalaceStore> }) {
  const [apiKey, setApiKey] = useState(store.apiKey);

  const handleSave = () => {
    store.saveApiKey(apiKey.trim());
    onClose();
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
      backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100
    }}>
      <div className="chromatic-glass" style={{ width: '100%', maxWidth: '400px', padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 className="text-title" style={{ fontSize: 'var(--text-xl)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <Key size={24} /> Settings
          </h2>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--color-text)' }}><X /></button>
        </div>

        <p className="text-body" style={{ fontSize: 'var(--text-sm)' }}>
          Enter your Gemini API key to generate real memory palaces. It is saved securely in your browser's localStorage and never sent anywhere except directly to Google.
        </p>

        <input 
          type="password"
          placeholder="AIzaSy..." 
          value={apiKey} onChange={(e) => setApiKey(e.target.value)}
          style={{ width: '100%', padding: 'var(--space-3)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', background: 'var(--color-bg)', color: 'var(--color-text)' }}
        />

        <button 
          onClick={handleSave}
          style={{ 
            padding: 'var(--space-3)', background: 'var(--color-text)', color: 'var(--color-bg)', 
            border: 'none', borderRadius: 'var(--radius-sm)', cursor: 'pointer',
            fontWeight: '600'
          }}
        >
          Save Key
        </button>
      </div>
    </div>
  );
}
