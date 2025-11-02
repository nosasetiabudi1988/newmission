
import type { MissionCategory, Agent } from './types';

export const INITIAL_MISSIONS: MissionCategory[] = [
  {
    id: 'cat1',
    name: 'Describing People',
    missions: [
      {
        id: 'm101',
        title: 'Identify the Asset',
        objective: 'Learn and use adjectives to describe a person\'s appearance and personality.',
        briefing: 'Agent, a key asset is hiding in plain sight. We have intercepted communications describing them. Your mission is to create a detailed profile of a fictional character using at least 10 descriptive adjectives. This will help our field agents identify them.',
        steps: [
          { id: 's1', description: 'Review the dossier on descriptive adjectives (e.g., tall, friendly, mysterious, brave).' },
          { id: 's2', description: 'Invent a character. Give them a name and a background.' },
          { id: 's3', description: 'Write a paragraph describing your character\'s appearance.' },
          { id: 's4', description: 'Write another paragraph describing their personality.' },
          { id: 's5', description: 'File your report in the text box below. Ensure it is clear and detailed.' },
        ],
        points: 100,
        status: 'pending',
      },
    ],
  },
  {
    id: 'cat2',
    name: 'Daily Activities',
    missions: [
      {
        id: 'm201',
        title: 'A Day in the Life',
        objective: 'Practice using the simple present tense to describe daily routines.',
        briefing: 'We need to understand the daily routine of a person of interest. Your mission is to document your own daily routine, from waking up to going to bed, using the simple present tense. This will serve as a baseline for our behavioral analysis algorithms.',
        steps: [
            { id: 's1', description: 'List at least 10 activities you do every day.' },
            { id: 's2', description: 'Write a full sentence for each activity using the simple present tense (e.g., "I wake up at 7 AM.").' },
            { id: 's3', description: 'Organize your sentences in chronological order.' },
            { id: 's4', description: 'Submit your complete routine analysis.' },
        ],
        points: 120,
        status: 'pending',
      },
    ],
  },
  {
    id: 'cat3',
    name: 'Directions',
    missions: [
      {
        id: 'm301',
        title: 'The Safe House',
        objective: 'Practice giving and understanding directions using prepositions of place.',
        briefing: 'An agent needs to reach a safe house, but their GPS is down. You must provide clear, turn-by-turn directions. Use a fictional map (you can imagine one) and guide them from a starting point to a destination. Use terms like "turn left," "go straight," "next to," and "across from."',
        steps: [
            { id: 's1', description: 'Imagine a starting point (e.g., "the library").' },
            { id: 's2', description: 'Imagine a destination (e.g., "the old clock tower").' },
            { id: 's3', description: 'Write at least 5 steps to get from the start to the destination.' },
            { id: 's4', description: 'Use at least 4 different prepositions or directional phrases.' },
            { id: 's5', description: 'File your directional protocol.' },
        ],
        points: 150,
        status: 'pending',
      },
    ],
  },
];

export const INITIAL_LEADERBOARD: Agent[] = [
  { id: 'a1', codename: 'Shadow', score: 2580, rank: 1 },
  { id: 'a2', codename: 'Viper', score: 2450, rank: 2 },
  { id: 'a3', codename: 'Ghost', score: 2210, rank: 3 },
  { id: 'a4', codename: 'Phoenix', score: 1980, rank: 4 },
  { id: 'a5', codename: 'Rogue', score: 1750, rank: 5 },
];
   