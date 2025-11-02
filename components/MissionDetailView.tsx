
import React, { useState } from 'react';
import type { Mission, MissionStep } from '../types';
import { getMissionTip } from '../services/geminiService';
import { ArrowLeftIcon, LightBulbIcon, PaperAirplaneIcon, SaveIcon } from './IconComponents';

interface EditableFieldProps {
    value: string;
    onChange: (newValue: string) => void;
    isEditing: boolean;
    as?: 'input' | 'textarea';
    className?: string;
    textClassName?: string;
}

const EditableField: React.FC<EditableFieldProps> = ({ value, onChange, isEditing, as = 'input', className, textClassName }) => {
    if (isEditing) {
        const commonProps = {
            value,
            onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(e.target.value),
            className: `bg-gray-900/50 border border-cyan-500 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-cyan-400 ${className}`,
        };
        if (as === 'textarea') {
            return <textarea {...commonProps} rows={5} />;
        }
        return <input type="text" {...commonProps} />;
    }
    return <p className={textClassName}>{value}</p>;
};

interface MissionDetailViewProps {
  mission: Mission;
  onCompleteMission: (missionId: string, points: number) => void;
  onBack: () => void;
  isEditMode: boolean;
  onMissionUpdate: (mission: Mission) => void;
}

const MissionDetailView: React.FC<MissionDetailViewProps> = ({ mission, onCompleteMission, onBack, isEditMode, onMissionUpdate }) => {
  const [report, setReport] = useState('');
  const [tip, setTip] = useState('');
  const [isGeneratingTip, setIsGeneratingTip] = useState(false);
  
  const [editableMission, setEditableMission] = useState<Mission>(mission);

  const handleFieldChange = <K extends keyof Mission>(field: K, value: Mission[K]) => {
      setEditableMission(prev => ({...prev, [field]: value}));
  };
  
  const handleStepChange = (stepId: string, newDescription: string) => {
      const newSteps = editableMission.steps.map(step => 
          step.id === stepId ? { ...step, description: newDescription } : step
      );
      handleFieldChange('steps', newSteps);
  };
  
  const handleSaveChanges = () => {
    onMissionUpdate(editableMission);
    alert("Changes saved!");
  };

  const handleGetTip = async () => {
    setIsGeneratingTip(true);
    setTip('');
    const fetchedTip = await getMissionTip(mission.objective);
    setTip(fetchedTip);
    setIsGeneratingTip(false);
  };

  const currentMission = isEditMode ? editableMission : mission;

  return (
    <div className="max-w-4xl mx-auto animate-fadeIn">
      <button onClick={onBack} className="flex items-center mb-6 text-cyan-400 hover:text-cyan-200 transition-colors">
        <ArrowLeftIcon className="w-5 h-5 mr-2" />
        Back to Missions
      </button>

      <div className="bg-gray-800/50 rounded-lg border border-cyan-500/20 p-6">
        <div className="flex justify-between items-start">
            <EditableField 
                value={currentMission.title}
                onChange={v => handleFieldChange('title', v)}
                isEditing={isEditMode}
                textClassName="text-4xl font-bold font-orbitron text-cyan-400 mb-2"
                className="text-4xl font-bold font-orbitron text-cyan-400"
            />
          {isEditMode && (
              <button onClick={handleSaveChanges} className="flex items-center bg-green-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-500 transition-colors">
                  <SaveIcon className="w-5 h-5 mr-2" /> Save
              </button>
          )}
        </div>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-300 border-b border-gray-600 pb-2 mb-2">Objective</h3>
           <EditableField 
                value={currentMission.objective}
                onChange={v => handleFieldChange('objective', v)}
                isEditing={isEditMode}
                as="textarea"
                textClassName="text-gray-400"
            />
        </div>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-300 border-b border-gray-600 pb-2 mb-2">Briefing</h3>
           <EditableField 
                value={currentMission.briefing}
                onChange={v => handleFieldChange('briefing', v)}
                isEditing={isEditMode}
                as="textarea"
                textClassName="text-gray-400"
            />
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-300 border-b border-gray-600 pb-2 mb-2">Mission Steps</h3>
          <ul className="space-y-3 list-decimal list-inside text-gray-400">
            {currentMission.steps.map((step, index) => (
              <li key={step.id} className="flex items-center">
                 <span className="mr-2 text-cyan-400">{index + 1}.</span> 
                 <EditableField 
                    value={step.description}
                    onChange={v => handleStepChange(step.id, v)}
                    isEditing={isEditMode}
                    textClassName="flex-1"
                    className="flex-1"
                />
              </li>
            ))}
          </ul>
        </div>
        
        <div className="mb-6">
            <button onClick={handleGetTip} disabled={isGeneratingTip} className="w-full flex items-center justify-center bg-yellow-600/80 text-white font-semibold py-2 px-4 rounded-md hover:bg-yellow-500/80 transition-colors disabled:bg-gray-500">
                <LightBulbIcon className="w-5 h-5 mr-2" />
                {isGeneratingTip ? 'Contacting HQ...' : 'Get Tip from HQ'}
            </button>
            {isGeneratingTip && <div className="text-center mt-2 text-yellow-300">Receiving transmission...</div>}
            {tip && (
                <div className="mt-4 p-4 bg-gray-900/50 border border-yellow-500/50 rounded-md text-yellow-200">
                    <p className="whitespace-pre-wrap">{tip}</p>
                </div>
            )}
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-300 border-b border-gray-600 pb-2 mb-2">File Your Report</h3>
          <textarea
            className="w-full p-2 bg-gray-900 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400 text-gray-200"
            rows={8}
            placeholder="Type your mission report here, agent..."
            value={report}
            onChange={(e) => setReport(e.target.value)}
          ></textarea>
          <button
            onClick={() => onCompleteMission(mission.id, mission.points)}
            disabled={!report.trim()}
            className="w-full mt-4 flex items-center justify-center bg-cyan-600 text-white font-bold py-3 px-4 rounded-md hover:bg-cyan-500 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
          >
            <PaperAirplaneIcon className="w-5 h-5 mr-2" />
            Submit Report & Complete Mission
          </button>
        </div>
      </div>
    </div>
  );
};

export default MissionDetailView;
   