
import React from 'react';
import type { Mission, MissionCategory } from '../types';
import { CheckCircleIcon, PlusIcon } from './IconComponents';

interface MissionSelectViewProps {
  missionCategories: MissionCategory[];
  onStartMission: (mission: Mission) => void;
  isEditMode: boolean;
  onDataChange: (data: MissionCategory[]) => void;
}

const MissionCard: React.FC<{ mission: Mission; onStart: () => void }> = ({ mission, onStart }) => {
  const isCompleted = mission.status === 'completed';
  return (
    <div className={`bg-gray-800/60 p-4 rounded-lg border ${isCompleted ? 'border-green-500/50' : 'border-cyan-500/30'} flex justify-between items-center transition-transform hover:scale-[1.02] hover:border-cyan-400`}>
      <div>
        <h4 className={`text-lg font-bold ${isCompleted ? 'text-green-400' : 'text-cyan-300'}`}>{mission.title}</h4>
        <p className="text-sm text-gray-400">{mission.objective}</p>
      </div>
      {isCompleted ? (
         <div className="flex items-center text-green-400">
            <CheckCircleIcon className="w-6 h-6 mr-2" />
            <span>Completed</span>
         </div>
      ) : (
        <button onClick={onStart} className="bg-cyan-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-cyan-500 transition-colors">
          Start Mission
        </button>
      )}
    </div>
  );
};

const MissionSelectView: React.FC<MissionSelectViewProps> = ({ missionCategories, onStartMission, isEditMode, onDataChange }) => {

  const handleAddCategory = () => {
    const newCategoryName = prompt("Enter new category name:");
    if (newCategoryName) {
      const newCategory: MissionCategory = {
        id: `cat${Date.now()}`,
        name: newCategoryName,
        missions: []
      };
      onDataChange([...missionCategories, newCategory]);
    }
  };

  const handleAddMission = (categoryId: string) => {
    const newMissionTitle = prompt("Enter new mission title:");
    if (newMissionTitle) {
      const newMission: Mission = {
        id: `m${Date.now()}`,
        title: newMissionTitle,
        objective: 'New mission objective.',
        briefing: 'New mission briefing.',
        steps: [{id: 's1', description: 'First step.'}],
        points: 100,
        status: 'pending'
      };
      const updatedCategories = missionCategories.map(cat => {
        if (cat.id === categoryId) {
          return { ...cat, missions: [...cat.missions, newMission] };
        }
        return cat;
      });
      onDataChange(updatedCategories);
    }
  };


  return (
    <div className="space-y-8 animate-fadeIn">
      <h2 className="text-4xl font-bold font-orbitron text-cyan-400 mb-6">Choose Your Mission</h2>
      {missionCategories.map((category) => (
        <div key={category.id} className="p-4 bg-black/20 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-semibold text-cyan-200">{category.name}</h3>
            {isEditMode && (
              <button onClick={() => handleAddMission(category.id)} className="flex items-center bg-green-600 text-white py-1 px-3 rounded-md hover:bg-green-500 transition-colors">
                <PlusIcon className="w-4 h-4 mr-1" /> Add Mission
              </button>
            )}
          </div>
          <div className="space-y-4">
            {category.missions.map((mission) => (
              <MissionCard key={mission.id} mission={mission} onStart={() => onStartMission(mission)} />
            ))}
          </div>
        </div>
      ))}
      {isEditMode && (
        <div className="mt-8 text-center">
            <button onClick={handleAddCategory} className="flex items-center mx-auto bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-500 transition-colors">
                <PlusIcon className="w-5 h-5 mr-2" /> Add New Category
            </button>
        </div>
      )}
    </div>
  );
};

export default MissionSelectView;
   