import { Palace } from '../types';
import { Building2, Calendar, BrainCircuit } from 'lucide-react';

export function PalaceCard({ palace, onClick }: { palace: Palace, onClick: () => void }) {
  // A helper to format dates simply
  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div 
      className="chromatic-glass" 
      style={{ padding: 'var(--space-5)', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}
      onClick={onClick}
    >
      <div>
        <h3 className="text-title" style={{ fontSize: 'var(--text-xl)' }}>{palace.title}</h3>
        <span className="text-body" style={{ fontSize: 'var(--text-sm)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {palace.domain}
        </span>
      </div>

      <div style={{ display: 'flex', gap: 'var(--space-4)', marginTop: 'auto' }}>
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
    </div>
  );
}
