
import React from 'react';
import type { Agent } from '../types';
import { ShieldCheckIcon } from './IconComponents';

interface LeaderboardViewProps {
  agents: Agent[];
}

const LeaderboardView: React.FC<LeaderboardViewProps> = ({ agents }) => {
  const getRankColor = (rank: number) => {
    if (rank === 1) return 'text-yellow-400 border-yellow-400';
    if (rank === 2) return 'text-gray-300 border-gray-300';
    if (rank === 3) return 'text-yellow-600 border-yellow-600';
    return 'text-cyan-400 border-cyan-500';
  };

  return (
    <div className="max-w-4xl mx-auto animate-fadeIn">
      <h2 className="text-4xl font-bold font-orbitron text-cyan-400 mb-8 text-center">
        Agent Leaderboard
      </h2>
      <div className="bg-gray-800/50 rounded-lg border border-cyan-500/20">
        <ul className="divide-y divide-gray-700">
          {agents.map((agent, index) => (
            <li key={agent.id} className={`p-4 flex items-center justify-between transition-colors ${index === 0 ? 'bg-cyan-500/10' : ''}`}>
              <div className="flex items-center">
                <span className={`text-2xl font-bold w-12 text-center ${getRankColor(agent.rank)}`}>
                  #{agent.rank}
                </span>
                <ShieldCheckIcon className={`w-8 h-8 ml-4 mr-4 ${getRankColor(agent.rank)}`} />
                <span className="text-xl font-semibold text-gray-200">{agent.codename}</span>
              </div>
              <span className="text-2xl font-bold font-orbitron text-cyan-300">{agent.score} PTS</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LeaderboardView;
   