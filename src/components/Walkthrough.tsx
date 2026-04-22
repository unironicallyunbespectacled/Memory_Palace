import { useState } from 'react';
import type { Palace } from '../types';
import { ArrowLeft, ArrowRight, Eye, Ear, Wind, Hand, Coffee, CheckCircle } from 'lucide-react';

export function Walkthrough({ palace, onBack }: { palace: Palace, onBack: () => void }) {
  const [currentRoomIndex, setCurrentRoomIndex] = useState(0);
  const room = palace.rooms[currentRoomIndex];

  const nextRoom = () => {
    if (currentRoomIndex < palace.rooms.length - 1) setCurrentRoomIndex(prev => prev + 1);
  };
  
  const prevRoom = () => {
    if (currentRoomIndex > 0) setCurrentRoomIndex(prev => prev - 1);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', height: '100%' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', background: 'transparent', border: 'none', color: 'var(--color-text)', cursor: 'pointer', fontWeight: '600' }}>
          <ArrowLeft size={20} /> Back to Library
        </button>
        <span className="text-body" style={{ fontSize: 'var(--text-sm)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Room {currentRoomIndex + 1} of {palace.rooms.length}
        </span>
      </header>

      <div className="chromatic-glass" style={{ padding: 'var(--space-8)', flex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
        <div>
          <h2 className="text-title" style={{ fontSize: 'var(--text-3xl)' }}>{room.name}</h2>
          <p className="text-body" style={{ fontSize: 'var(--text-lg)', marginTop: 'var(--space-2)' }}>{room.description}</p>
        </div>

        <div style={{ padding: 'var(--space-4)', background: 'var(--color-bg-subtle)', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--color-primary)' }}>
          <p style={{ fontStyle: 'italic', fontSize: 'var(--text-lg)' }}>"{room.imagery}"</p>
        </div>

        {/* Sensory Anchors - 2026 UI grid approach */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-3)', marginTop: 'var(--space-4)' }}>
          <SensoryPill icon={<Eye size={16}/>} label="Visual" text={room.sensory.visual} />
          <SensoryPill icon={<Ear size={16}/>} label="Auditory" text={room.sensory.auditory} />
          <SensoryPill icon={<Wind size={16}/>} label="Olfactory" text={room.sensory.olfactory} />
          <SensoryPill icon={<Hand size={16}/>} label="Kinesthetic" text={room.sensory.kinesthetic} />
          <SensoryPill icon={<Coffee size={16}/>} label="Gustatory" text={room.sensory.gustatory} />
        </div>

        {/* Concepts in this room */}
        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <h3 className="text-title" style={{ fontSize: 'var(--text-xl)' }}>Anchored Concepts:</h3>
          {room.concepts.map(concept => (
            <div key={concept.id} style={{ padding: 'var(--space-4)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)' }}>
              <h4 style={{ fontSize: 'var(--text-lg)', fontWeight: 'bold' }}>{concept.term}</h4>
              <p className="text-body" style={{ marginTop: 'var(--space-2)' }}><strong>Image:</strong> {concept.image}</p>
              <p className="text-body" style={{ marginTop: 'var(--space-1)' }}><strong>Mnemonic:</strong> {concept.mnemonic}</p>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'var(--space-6)' }}>
          <button 
            onClick={prevRoom} 
            disabled={currentRoomIndex === 0}
            style={{ opacity: currentRoomIndex === 0 ? 0.3 : 1, padding: 'var(--space-3) var(--space-5)', borderRadius: 'var(--radius-pill)', border: '1px solid var(--color-border)', background: 'transparent', color: 'var(--color-text)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontWeight: 'bold' }}
          >
            <ArrowLeft size={18} /> Previous Room
          </button>
          
          {currentRoomIndex < palace.rooms.length - 1 ? (
            <button 
              onClick={nextRoom}
              style={{ padding: 'var(--space-3) var(--space-5)', borderRadius: 'var(--radius-pill)', border: 'none', background: 'var(--color-primary)', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontWeight: 'bold' }}
            >
              Next Room <ArrowRight size={18} />
            </button>
          ) : (
            <button 
              onClick={onBack}
              style={{ padding: 'var(--space-3) var(--space-5)', borderRadius: 'var(--radius-pill)', border: 'none', background: 'var(--color-text)', color: 'var(--color-bg)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontWeight: 'bold' }}
            >
              Finish Walkthrough <CheckCircle size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function SensoryPill({ icon, label, text }: { icon: React.ReactNode, label: string, text: string }) {
  if (!text || text === 'N/A' || text === 'null') return null;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)', padding: 'var(--space-3)', background: 'var(--color-bg)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', color: 'var(--color-text-muted)', fontSize: 'var(--text-xs)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        {icon} {label}
      </div>
      <span style={{ fontSize: 'var(--text-sm)' }}>{text}</span>
    </div>
  );
}
