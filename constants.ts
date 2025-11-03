
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
        briefing: 'Agent, a key asset is hiding in plain sight. We have intercepted communications describing them. This mission is divided into three stages: learning descriptive adjectives, matching profiles to descriptions, and finally, writing your own detailed report on a new asset. Complete all stages to succeed.',
        stages: [
          {
            id: 's1',
            type: 'learning',
            title: 'Stage 1: Dossier Review - Adjectives',
            content: [
              {
                title: 'Appearance Adjectives',
                text: 'These words describe what someone looks like.\n- **Towering:** Very tall.\n- **Slender:** Thin in an attractive way.\n- **Stout:** Short and heavily built.\n- **Elegant:** Graceful and stylish in appearance.\n- **Disheveled:** Untidy hair, clothing, or appearance.'
              },
              {
                title: 'Personality Adjectives',
                text: 'These words describe someone\'s character.\n- **Charismatic:** Compellingly charming.\n- **Meticulous:** Showing great attention to detail; very careful and precise.\n- **Reserved:** Slow to reveal emotion or opinions.\n- **Jovial:** Cheerful and friendly.\n- **Cynical:** Believing that people are motivated by self-interest.'
              }
            ]
          },
          {
            id: 's2',
            type: 'matching',
            title: 'Stage 2: Target Recognition',
            items: [
              { id: 'm-i1', imagePrompt: 'A tall, thin man with neat, stylish clothing and a confident smile.', description: 'The elegant man greeted everyone with a charismatic smile.' },
              { id: 'm-i2', imagePrompt: 'A short, cheerful-looking woman with laugh lines around her eyes, wearing a brightly colored sweater.', description: 'The jovial woman was known for her kindness.' },
              { id: 'm-i3', imagePrompt: 'A person sitting alone at a cafe, with messy hair and wrinkled clothes, looking thoughtfully out the window.', description: 'The disheveled figure seemed lost in thought.' },
            ],
            options: [
              'The elegant man greeted everyone with a charismatic smile.',
              'The jovial woman was known for her kindness.',
              'The disheveled figure seemed lost in thought.',
              'The stout agent was surprisingly agile.'
            ]
          },
          {
            id: 's3',
            type: 'writing',
            title: 'Stage 3: Field Report',
            imagePrompt: 'A woman with sharp, intelligent eyes, wearing a perfectly tailored suit. Her desk is organized with extreme precision. She does not smile often.',
            prompt: 'Based on the image prompt above, write a detailed description of this new asset. Use at least two appearance adjectives and two personality adjectives from your dossier in Stage 1.'
          }
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
        stages: [
          {
            id: 's1',
            type: 'writing',
            title: 'Routine Analysis',
            imagePrompt: 'An image of a calendar or a clock.',
            prompt: 'List at least 10 activities you do every day, writing a full sentence for each using the simple present tense (e.g., "I wake up at 7 AM."). Organize your sentences in chronological order.'
          }
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
        stages: [
          {
            id: 's1',
            type: 'writing',
            title: 'Directional Protocol',
            imagePrompt: 'A stylized map with various landmarks like a library, a park, and a clock tower.',
            prompt: 'Imagine a starting point (e.g., "the library") and a destination (e.g., "the old clock tower"). Write at least 5 steps to get from the start to the destination. Use at least 4 different prepositions or directional phrases.'
          }
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
