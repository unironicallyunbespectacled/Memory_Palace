export type Concept = {
  id: string;
  term: string;
  image: string; // The grotesque/memorable anchoring image
  mnemonic: string;
  relationships: string[]; // IDs of other concepts
};

export type SensoryDetails = {
  visual: string;
  olfactory: string;
  auditory: string;
  kinesthetic: string;
  gustatory: string;
};

export type Room = {
  id: string;
  name: string;
  sequence: number;
  description: string;
  imagery: string;
  sensory: SensoryDetails;
  concepts: Concept[];
  exits: string[]; // IDs of connected rooms
};

export type PalaceArchitecture = {
  style: string; // e.g., 'brutalist', 'minimalist'
  material: string;
  colorPalette: string[];
};

export type PalaceLocation = {
  type: 'fictional' | 'real';
  place?: string;
};

export type Palace = {
  id: string;
  title: string;
  domain: string;
  location: PalaceLocation;
  architecture: PalaceArchitecture;
  rooms: Room[];
  
  // Review & Decay System
  createdAt: string;
  lastReviewed: string;
  reviewCount: number;
  decayLevel: number; // 0.0 (sharp) to 1.0 (completely forgotten)
};
