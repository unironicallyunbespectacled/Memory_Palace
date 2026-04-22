import { useState } from 'react';
import { Building2, Plus, Settings } from 'lucide-react';
import './index.css';
import { usePalaceStore } from './useStore';
import { PalaceCard } from './components/PalaceCard';
import { NewPalaceModal } from './components/NewPalaceModal';
import { SettingsModal } from './components/SettingsModal';
import { Walkthrough } from './components/Walkthrough';
import { Quiz } from './components/Quiz';
import { Palace } from './types';

function App() {
  const store = usePalaceStore();
  const [showNewModal, setShowNewModal] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  
  const [activeWalkthrough, setActiveWalkthrough] = useState<Palace | null>(null);
  const [activeQuiz, setActiveQuiz] = useState<Palace | null>(null);

  if (activeWalkthrough) {
    return (
      <div style={{ minHeight: '100dvh', padding: 'var(--space-6)' }}>
        <Walkthrough palace={activeWalkthrough} onBack={() => setActiveWalkthrough(null)} />
      </div>
    );
  }

  if (activeQuiz) {
    return (
      <div style={{ minHeight: '100dvh', padding: 'var(--space-6)' }}>
        <Quiz palace={activeQuiz} onBack={() => setActiveQuiz(null)} store={store} />
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: '100dvh', 
      padding: 'var(--space-6)',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-8)'
    }}>
      
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
        <div>
          <h1 className="text-title" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <Building2 size={32} color="var(--color-primary)" />
            Memory Palace Architect
          </h1>
          <p className="text-body" style={{ marginTop: 'var(--space-1)' }}>Spatial memory mapping with 2026 aesthetics.</p>
        </div>
        
        <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
          <button 
            className="chromatic-glass touch-target" 
            onClick={() => setShowSettings(true)}
            style={{ 
              border: 'none', borderRadius: 'var(--radius-pill)', padding: 'var(--space-2) var(--space-4)',
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 'var(--space-2)',
              color: 'var(--color-text)', fontWeight: '600'
            }}
          >
            <Settings size={20} />
          </button>

          <button 
            className="chromatic-glass touch-target" 
            onClick={() => setShowNewModal(true)}
            style={{ 
              border: 'none', borderRadius: 'var(--radius-pill)', padding: 'var(--space-2) var(--space-4)',
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 'var(--space-2)',
              color: 'white', background: 'var(--color-primary)', fontWeight: '600'
            }}
          >
            <Plus size={20} />
            <span>New Palace</span>
          </button>
        </div>
      </header>

      <main>
        {store.palaces.length === 0 ? (
          <div className="chromatic-glass" style={{ padding: 'var(--space-8)', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-4)' }}>
            <Building2 size={64} color="var(--color-border)" />
            <h2 className="text-title" style={{ fontSize: 'var(--text-xl)' }}>No Palaces Architected Yet</h2>
            <p className="text-body" style={{ maxWidth: '400px' }}>
              Click "New Palace" to generate your first spatial memory journey. Ensure you've set your API key in Settings for real generation.
            </p>
          </div>
        ) : (
          <div className="bento-grid">
            {store.palaces.map(palace => (
              <PalaceCard 
                key={palace.id} 
                palace={palace} 
                onWalk={() => setActiveWalkthrough(palace)} 
                onQuiz={() => setActiveQuiz(palace)}
              />
            ))}
          </div>
        )}
      </main>

      {showNewModal && <NewPalaceModal store={store} onClose={() => setShowNewModal(false)} />}
      {showSettings && <SettingsModal store={store} onClose={() => setShowSettings(false)} />}
    </div>
  );
}

export default App;
