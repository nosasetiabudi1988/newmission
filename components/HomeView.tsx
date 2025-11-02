
import React from 'react';

interface HomeViewProps {
  onNavigate: () => void;
}

const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {
  return (
    <div className="text-center py-20 px-4 animate-fadeIn">
      <h2 className="text-5xl md:text-7xl font-bold font-orbitron text-cyan-400 mb-4 tracking-wider">
        WELCOME, AGENT
      </h2>
      <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8">
        Your mission, should you choose to accept it, is to master the English language. This platform will provide you with the training and assignments necessary to become a top field operative. The world is watching.
      </p>
      <button
        onClick={onNavigate}
        className="bg-cyan-500 text-gray-900 font-bold py-3 px-8 rounded-lg text-lg uppercase tracking-widest hover:bg-cyan-300 hover:scale-105 transform transition-all duration-300 shadow-[0_0_15px_rgba(56,189,248,0.6)]"
      >
        View Your Missions
      </button>
    </div>
  );
};

export default HomeView;
   