import { useState } from 'react';
import { Building2, Plus, Settings } from 'lucide-react';
import './index.css';

function App() {
  return (
    <div style={{ 
      minHeight: '100dvh', 
      padding: 'var(--space-6)',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-8)'
    }}>
      
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="text-title" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <Building2 size={32} color="var(--color-primary)" />
            Memory Palace Architect
          </h1>
          <p className="text-body" style={{ marginTop: 'var(--space-1)' }}>Spatial memory mapping with 2026 aesthetics.</p>
        </div>
        
        <button 
          className="chromatic-glass touch-target" 
          style={{ 
            border: 'none', 
            borderRadius: 'var(--radius-pill)', 
            padding: 'var(--space-2) var(--space-4)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-2)',
            color: 'var(--color-text)',
            fontWeight: '600'
          }}
        >
          <Plus size={20} />
          <span>New Palace</span>
        </button>
      </header>

      <main className="bento-grid">
        <div className="chromatic-glass bento-span-2" style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <h2 style={{ fontSize: 'var(--text-xl)' }}>Liquid Glass & OKLCH Demo</h2>
          <p className="text-body">
            This UI is built entirely without traditional CSS frameworks. It uses native CSS nesting, `oklch()` color spaces for mathematically uniform perceptual gradients, and CSS `clamp()` for truly fluid typography. 
            The borders of this very panel simulate the "Liquid Glass" chromatic aberration.
          </p>
        </div>
        
        <div className="chromatic-glass" style={{ padding: 'var(--space-6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p className="text-body" style={{ textAlign: 'center' }}>Space for Recent Palaces</p>
        </div>
        
        <div className="chromatic-glass" style={{ padding: 'var(--space-6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p className="text-body" style={{ textAlign: 'center' }}>Space for Analytics/Decay</p>
        </div>
      </main>

    </div>
  );
}

export default App;
