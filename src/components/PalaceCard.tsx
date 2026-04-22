import type { Palace } from '../types';
import { Building2, Calendar, BrainCircuit, Play } from 'lucide-react';

export function PalaceCard({ palace, onWalk, onQuiz }: { palace: Palace, onWalk: () => void, onQuiz: () => void }) {
  // A helper to format dates simply
  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div 
      className="chromatic-glass" 
      style={{ padding: 'var(--space-5)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}
    >
      <div style={{ cursor: 'pointer' }} onClick={onWalk}>
        <h3 className="text-title" style={{ fontSize: 'var(--text-xl)' }}>{palace.title}</h3>
        <span className="text-body" style={{ fontSize: 'var(--text-sm)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {palace.domain}
        </span>
      </div>

      <div style={{ display: 'flex', gap: 'var(--space-4)', marginTop: 'auto', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }} className="text-body">
          <Building2 size={16} />
          <span style={{ fontSize: 'var(--text-sm)' }}>{palace.rooms.length} Rooms</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }} className="text-body">
          <Calendar size={16} />
          <span style={{ fontSize: 'var(--text-sm)' }}>{formatDate(palace.lastReviewed)}</span>
        </div>
        {palace.reviewCount > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', color: 'var(--color-primary)' }}>
            <BrainCircuit size={16} />
            <span style={{ fontSize: 'var(--text-sm)' }}>Rev {palace.reviewCount}</span>
          </div>
        )}
      </div>

      <div style={{ display: 'flex', gap: 'var(--space-2)', marginTop: 'var(--space-2)' }}>
        <button 
          onClick={onWalk}
          style={{ flex: 1, padding: 'var(--space-2)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', background: 'transparent', color: 'var(--color-text)', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Walk
        </button>
        <button 
          onClick={onQuiz}
          style={{ flex: 1, padding: 'var(--space-2)', borderRadius: 'var(--radius-sm)', border: 'none', background: 'var(--color-primary)', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-2)', fontWeight: 'bold' }}
        >
          <Play size={16} /> Quiz
        </button>
      </div>
    </div>
  );
}
