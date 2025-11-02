
import React from 'react';
import type { View } from '../types';
import { TargetIcon } from './IconComponents';

interface HeaderProps {
  onNavigate: (view: View) => void;
  isEditMode: boolean;
  onToggleEditMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, isEditMode, onToggleEditMode }) => {
  const navItemClasses = "px-3 py-2 rounded-md text-sm font-medium hover:bg-cyan-400 hover:text-gray-900 transition-colors duration-300 cursor-pointer";

  return (
    <header className="bg-gray-900/50 backdrop-blur-sm border-b border-cyan-500/30 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div 
              className="flex-shrink-0 flex items-center cursor-pointer"
              onClick={() => onNavigate('home')}
            >
              <TargetIcon className="h-8 w-8 text-cyan-400" />
              <h1 className="ml-3 text-2xl font-bold text-cyan-400 font-orbitron">
                MISSION: POSSIBLE
              </h1>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a onClick={() => onNavigate('home')} className={navItemClasses}>Home</a>
                <a onClick={() => onNavigate('missions')} className={navItemClasses}>Missions</a>
                <a onClick={() => onNavigate('leaderboard')} className={navItemClasses}>Leaderboard</a>
                <a onClick={() => onNavigate('about')} className={navItemClasses}>About</a>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <span className="text-xs mr-3 text-gray-400 hidden sm:inline">Teacher Mode</span>
            <label htmlFor="editModeToggle" className="flex items-center cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  id="editModeToggle"
                  className="sr-only"
                  checked={isEditMode}
                  onChange={onToggleEditMode}
                />
                <div className="block bg-gray-700 w-14 h-8 rounded-full"></div>
                <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${isEditMode ? 'transform translate-x-6 bg-cyan-400' : ''}`}></div>
              </div>
            </label>
          </div>
        </div>
      </nav>
    </header>
  );
};
   