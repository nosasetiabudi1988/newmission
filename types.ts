
export type View = 'home' | 'about' | 'missions' | 'missionDetail' | 'leaderboard';

export interface MissionStep {
  id: string;
  description: string;
}

export interface Mission {
  id: string;
  title: string;
  objective: string;
  briefing: string;
  steps: MissionStep[];
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
   