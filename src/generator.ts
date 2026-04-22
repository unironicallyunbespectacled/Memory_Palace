import type { Palace, Room } from './types';

const SYSTEM_PROMPT = `
You are the Memory Palace Architect. You use the method of loci to generate vivid, grotesque, and spatially coherent memory palaces for learning frameworks.

Output ONLY valid JSON matching this structure:
{
  "id": "string",
  "title": "string",
  "domain": "string",
  "location": { "type": "fictional", "place": "string" },
  "architecture": { "style": "string", "material": "string", "colorPalette": ["#hex"] },
  "rooms": [
    {
      "id": "string",
      "name": "string",
      "sequence": 1,
      "description": "string",
      "imagery": "string",
      "sensory": { "visual": "string", "olfactory": "string", "auditory": "string", "kinesthetic": "string", "gustatory": "string" },
      "concepts": [
        { "id": "string", "term": "string", "image": "string", "mnemonic": "string", "relationships": [] }
      ],
      "exits": ["room_id"]
    }
  ]
}

Prioritize VIVID, SPATIALLY COHERENT, WEIRD imagery. Every image should be impossible to forget.
`;

export async function generatePalace(
  concepts: string[],
  apiKey: string,
  title: string,
  theme: string
): Promise<Palace> {
  if (!apiKey) {
    console.warn("No API key provided, falling back to mock generation.");
    return generateMockPalace(concepts, title);
  }

  const userPrompt = `Create a memory palace titled "${title}" with the tone/theme of "${theme}". 
  Embed these concepts into rooms: ${concepts.join(', ')}.`;

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: userPrompt }] }],
        systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
        generationConfig: { responseMimeType: 'application/json' }
      })
    });

    if (!response.ok) throw new Error("API Request Failed");
    
    const data = await response.json();
    const jsonString = data.candidates[0].content.parts[0].text;
    
    const palace: Palace = JSON.parse(jsonString);
    palace.createdAt = new Date().toISOString();
    palace.lastReviewed = new Date().toISOString();
    palace.reviewCount = 0;
    palace.decayLevel = 0;
    
    return palace;

  } catch (error) {
    console.error("Gemini Generation Error:", error);
    throw error;
  }
}

function generateMockPalace(concepts: string[], title: string): Palace {
  const rooms: Room[] = concepts.map((c, i) => ({
    id: `room-${i}`,
    name: `The Hall of ${c}`,
    sequence: i + 1,
    description: `A vast, echoing chamber built of obsidian. The air feels heavy here.`,
    imagery: `Giant statues of ${c} surround you, weeping black ink.`,
    sensory: {
      visual: 'Dark, high contrast, pulsating shadows',
      olfactory: 'Smells of ozone and old dust',
      auditory: 'A low, resonant hum like a distant turbine',
      kinesthetic: 'The floor vibrates slightly beneath your feet',
      gustatory: 'A metallic taste on the back of the tongue'
    },
    concepts: [{
      id: `concept-${i}`,
      term: c,
      image: `A melting clock with the word ${c} etched into it.`,
      mnemonic: `Time melts when you think of ${c}.`,
      relationships: []
    }],
    exits: i < concepts.length - 1 ? [`room-${i + 1}`] : ['exit']
  }));

  return {
    id: `mock-palace-${Date.now()}`,
    title: title || "Mock Memory Palace",
    domain: "general",
    location: { type: 'fictional', place: 'The Void' },
    architecture: {
      style: 'brutalist',
      material: 'obsidian and concrete',
      colorPalette: ['#111111', '#333333', '#888888']
    },
    rooms,
    createdAt: new Date().toISOString(),
    lastReviewed: new Date().toISOString(),
    reviewCount: 0,
    decayLevel: 0
  };
}
