
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import HomeView from './components/HomeView';
import AboutView from './components/AboutView';
import MissionSelectView from './components/MissionSelectView';
import MissionDetailView from './components/MissionDetailView';
import LeaderboardView from './components/LeaderboardView';
import type { View, Mission, MissionCategory, Agent } from './types';
import { INITIAL_MISSIONS, INITIAL_LEADERBOARD } from './constants';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [missionsData, setMissionsData] = useState<MissionCategory[]>(INITIAL_MISSIONS);
  const [leaderboardData, setLeaderboardData] = useState<Agent[]>(INITIAL_LEADERBOARD);
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const navigateTo = (view: View) => {
    setCurrentView(view);
  };

  const startMission = (mission: Mission) => {
    setSelectedMission(mission);
    setCurrentView('missionDetail');
  };

  const completeMission = (missionId: string, points: number) => {
    // In a real app, this would update a specific user's score.
    // For this demo, we'll just add points to the top agent.
    setLeaderboardData(prev => {
        const newLeaderboard = [...prev];
        if (newLeaderboard.length > 0) {
            newLeaderboard[0].score += points;
        }
        return newLeaderboard.sort((a, b) => b.score - a.score);
    });

    // Update mission status
    setMissionsData(prevData => prevData.map(category => ({
        ...category,
        missions: category.missions.map(m => 
            m.id === missionId ? { ...m, status: 'completed' } : m
        )
    })));

    setSelectedMission(null);
    setCurrentView('missions');
  };

  const handleDataChange = useCallback((updatedMissions: MissionCategory[]) => {
      setMissionsData(updatedMissions);
  }, []);

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <HomeView onNavigate={() => navigateTo('missions')} />;
      case 'about':
        return <AboutView />;
      case 'missions':
        return (
            <MissionSelectView 
                missionCategories={missionsData} 
                onStartMission={startMission} 
                isEditMode={isEditMode}
                onDataChange={handleDataChange}
            />
        );
      case 'missionDetail':
        if (selectedMission) {
          return (
            <MissionDetailView 
                mission={selectedMission} 
                onCompleteMission={completeMission}
                onBack={() => setCurrentView('missions')}
                isEditMode={isEditMode}
                onMissionUpdate={(updatedMission) => {
                    const newMissionsData = missionsData.map(cat => ({
                        ...cat,
                        missions: cat.missions.map(m => m.id === updatedMission.id ? updatedMission : m)
                    }));
                    setMissionsData(newMissionsData);
                }}
            />
          );
        }
        return null;
      case 'leaderboard':
        return <LeaderboardView agents={leaderboardData} />;
      default:
        return <HomeView onNavigate={() => navigateTo('missions')} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-cyan-300 font-sans selection:bg-cyan-500 selection:text-black">
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-blue-900/50"></div>
      </div>
      <div className="relative z-10">
        <Header onNavigate={navigateTo} isEditMode={isEditMode} onToggleEditMode={() => setIsEditMode(!isEditMode)} />
        <main className="p-4 sm:p-6 md:p-8">
          {renderView()}
        </main>
      </div>
    </div>
  );
};

export default App;
   