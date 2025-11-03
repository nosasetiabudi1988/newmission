
export type View = 'home' | 'about' | 'missions' | 'missionDetail' | 'leaderboard';

export type StageType = 'learning' | 'matching' | 'writing';

export interface LearningContent {
  title: string;
  text: string;
}

export interface LearningStage {
  id: string;
  type: 'learning';
  title: string;
  content: LearningContent[];
}

export interface MatchingItem {
  id: string;
  imagePrompt: string; // A text description of an image
  description: string; // The correct descriptive sentence to match
}

export interface MatchingStage {
  id: string;
  type: 'matching';
  title: string;
  items: MatchingItem[];
  // All possible descriptions (correct ones + distractors) to populate options.
  options: string[]; 
}

export interface WritingStage {
  id: string;
  type: 'writing';
  title: string;
  imagePrompt: string;
  prompt: string;
}

export type Stage = LearningStage | MatchingStage | WritingStage;

export interface Mission {
  id: string;
  title: string;
  objective: string;
  briefing: string;
  stages: Stage[];
  points: number;
  status: 'pending' | 'completed';
}

export interface MissionCategory {
  id: string;
  name: string;
  missions: Mission[];
}

export interface Agent {
  id: string;
  codename: string;
  score: number;
  rank: number;
}
