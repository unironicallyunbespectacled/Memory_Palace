import { useState } from 'react';
import { Palace } from '../types';
import { ArrowLeft, Eye, CheckCircle } from 'lucide-react';
import { usePalaceStore } from '../useStore';

export function Quiz({ palace, onBack, store }: { palace: Palace, onBack: () => void, store: ReturnType<typeof usePalaceStore> }) {
  const [currentRoomIndex, setCurrentRoomIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const room = palace.rooms[currentRoomIndex];

  const handleReveal = () => setShowAnswer(true);

  const handleScore = (correct: boolean) => {
    if (correct) setScore(s => s + 1);
    
    if (currentRoomIndex < palace.rooms.length - 1) {
      setCurrentRoomIndex(prev => prev + 1);
      setShowAnswer(false);
    } else {
      setIsFinished(true);
      // Update review count and decay in store
      store.updatePalace(palace.id, {
        reviewCount: palace.reviewCount + 1,
        lastReviewed: new Date().toISOString()
      });
    }
  };

  if (isFinished) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-6)', height: '100%' }}>
        <CheckCircle size={64} color="var(--color-primary)" />
        <h2 className="text-title" style={{ fontSize: 'var(--text-3xl)' }}>Quiz Complete</h2>
        <p className="text-body" style={{ fontSize: 'var(--text-xl)' }}>You recalled {score} out of {palace.rooms.length} concepts.</p>
        <button 
          onClick={onBack}
          style={{ padding: 'var(--space-4) var(--space-8)', borderRadius: 'var(--radius-pill)', border: 'none', background: 'var(--color-primary)', color: 'white', cursor: 'pointer', fontSize: 'var(--text-lg)', fontWeight: 'bold' }}
        >
          Return to Library
        </button>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', height: '100%' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', background: 'transparent', border: 'none', color: 'var(--color-text)', cursor: 'pointer', fontWeight: '600' }}>
          <ArrowLeft size={20} /> Abort Quiz
        </button>
        <span className="text-body" style={{ fontSize: 'var(--text-sm)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Recall: Room {currentRoomIndex + 1} of {palace.rooms.length}
        </span>
      </header>

      <div className="chromatic-glass" style={{ padding: 'var(--space-8)', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-6)', textAlign: 'center' }}>
        
        <h2 className="text-title" style={{ fontSize: 'var(--text-3xl)' }}>You enter {room.name}...</h2>
        
        {!showAnswer ? (
          <>
            <p className="text-body" style={{ fontSize: 'var(--text-xl)', maxWidth: '600px' }}>
              What concept is anchored here, and what grotesque imagery represents it?
            </p>
            <button 
              onClick={handleReveal}
              style={{ marginTop: 'var(--space-6)', padding: 'var(--space-4) var(--space-8)', borderRadius: 'var(--radius-pill)', border: 'none', background: 'var(--color-primary)', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-lg)', fontWeight: 'bold' }}
            >
              <Eye size={20} /> Reveal Answer
            </button>
          </>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', width: '100%', maxWidth: '600px', textAlign: 'left' }}>
            <div style={{ padding: 'var(--space-6)', background: 'var(--color-bg)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)' }}>
              {room.concepts.map(concept => (
                <div key={concept.id}>
                  <h3 className="text-title" style={{ fontSize: 'var(--text-2xl)', color: 'var(--color-primary)' }}>{concept.term}</h3>
                  <p className="text-body" style={{ marginTop: 'var(--space-4)', fontSize: 'var(--text-lg)' }}><strong>Image:</strong> {concept.image}</p>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
              <button 
                onClick={() => handleScore(false)}
                style={{ flex: 1, padding: 'var(--space-4)', borderRadius: 'var(--radius-pill)', border: '1px solid var(--color-border)', background: 'transparent', color: 'var(--color-text)', cursor: 'pointer', fontSize: 'var(--text-lg)', fontWeight: 'bold' }}
              >
                Missed it
              </button>
              <button 
                onClick={() => handleScore(true)}
                style={{ flex: 1, padding: 'var(--space-4)', borderRadius: 'var(--radius-pill)', border: 'none', background: 'var(--color-primary)', color: 'white', cursor: 'pointer', fontSize: 'var(--text-lg)', fontWeight: 'bold' }}
              >
                Remembered it
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
