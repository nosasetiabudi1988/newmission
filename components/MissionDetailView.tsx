
import React, { useState, useMemo } from 'react';
import type { Mission, Stage, LearningStage, MatchingStage, WritingStage, MatchingItem } from '../types';
import { getMissionTip } from '../services/geminiService';
import { ArrowLeftIcon, LightBulbIcon, PaperAirplaneIcon, SaveIcon, UserIcon, CheckIcon, XIcon } from './IconComponents';

// --- Helper Components ---

interface EditableFieldProps {
    value: string;
    onChange: (newValue: string) => void;
    isEditing: boolean;
    as?: 'input' | 'textarea';
    className?: string;
    textClassName?: string;
}

const EditableField: React.FC<EditableFieldProps> = ({ value, onChange, isEditing, as = 'input', className = '', textClassName = '' }) => {
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


// --- Stage View Components ---

const LearningStageView: React.FC<{ stage: LearningStage, isEditMode: boolean, onStageChange: (updatedStage: Stage) => void }> = ({ stage, isEditMode, onStageChange }) => (
    <div>
        {stage.content.map((item, index) => (
            <div key={index} className="mb-6">
                <EditableField
                    value={item.title}
                    onChange={v => {
                        const newContent = [...stage.content];
                        newContent[index].title = v;
                        onStageChange({...stage, content: newContent});
                    }}
                    isEditing={isEditMode}
                    textClassName="text-xl font-semibold text-cyan-300 border-b border-gray-600 pb-2 mb-3"
                    className="text-xl font-semibold"
                />
                 <EditableField
                    value={item.text}
                    onChange={v => {
                        const newContent = [...stage.content];
                        newContent[index].text = v;
                        onStageChange({...stage, content: newContent});
                    }}
                    isEditing={isEditMode}
                    as="textarea"
                    textClassName="text-gray-400 whitespace-pre-wrap"
                />
            </div>
        ))}
    </div>
);

const MatchingStageView: React.FC<{ stage: MatchingStage, onComplete: (isCorrect: boolean) => void, isEditMode: boolean, onStageChange: (updatedStage: Stage) => void }> = ({ stage, onComplete, isEditMode, onStageChange }) => {
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [results, setResults] = useState<Record<string, boolean>>({});
    const [submitted, setSubmitted] = useState(false);

    const handleSelect = (itemId: string, description: string) => {
        if (submitted) return;
        setAnswers(prev => ({ ...prev, [itemId]: description }));
    };

    const checkAnswers = () => {
        const newResults: Record<string, boolean> = {};
        let allCorrect = true;
        stage.items.forEach(item => {
            const isCorrect = answers[item.id] === item.description;
            newResults[item.id] = isCorrect;
            if (!isCorrect) allCorrect = false;
        });
        setResults(newResults);
        setSubmitted(true);
        onComplete(allCorrect && stage.items.length === Object.keys(answers).length);
    };

    return (
        <div className="space-y-6">
            {stage.items.map((item) => (
                <div key={item.id} className={`p-4 rounded-lg border-2 ${submitted ? (results[item.id] ? 'border-green-500' : 'border-red-500') : 'border-gray-600'} bg-gray-900/50 flex flex-col sm:flex-row items-start sm:items-center gap-4`}>
                    <div className="flex-shrink-0 flex items-center gap-3 w-full sm:w-1/3">
                        <UserIcon className="w-8 h-8 text-cyan-400" />
                        <EditableField 
                            value={item.imagePrompt}
                            onChange={(v) => {
                                const newItems = stage.items.map(i => i.id === item.id ? {...i, imagePrompt: v} : i);
                                onStageChange({...stage, items: newItems});
                            }}
                            isEditing={isEditMode}
                            as="textarea"
                            textClassName="text-gray-300 italic"
                        />
                    </div>
                    <div className="w-full sm:w-2/3">
                        <select
                            value={answers[item.id] || ''}
                            onChange={(e) => handleSelect(item.id, e.target.value)}
                            disabled={submitted}
                            className="w-full bg-gray-800 border border-gray-500 rounded-md p-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 disabled:opacity-70"
                        >
                            <option value="" disabled>Select a description...</option>
                            {stage.options.map((desc, idx) => (
                                <option key={idx} value={desc}>{desc}</option>
                            ))}
                        </select>
                    </div>
                    {submitted && (
                        <div className="flex-shrink-0">
                            {results[item.id] ? <CheckIcon className="w-6 h-6 text-green-500" /> : <XIcon className="w-6 h-6 text-red-500" />}
                        </div>
                    )}
                </div>
            ))}
            {!submitted && (
                <button
                    onClick={checkAnswers}
                    disabled={Object.keys(answers).length !== stage.items.length}
                    className="w-full bg-cyan-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-cyan-500 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
                >
                    Check Answers
                </button>
            )}
            {submitted && <p className="text-center text-lg text-yellow-300">Results are in. Proceed to the next stage.</p>}
        </div>
    );
};

const WritingStageView: React.FC<{ stage: WritingStage, report: string, onReportChange: (report: string) => void, isEditMode: boolean, onStageChange: (updatedStage: Stage) => void }> = ({ stage, report, onReportChange, isEditMode, onStageChange }) => (
    <div>
        <div className="mb-4 p-4 bg-gray-900/50 border border-cyan-500/30 rounded-md">
            <h4 className="font-semibold text-cyan-300 mb-2">Asset Profile</h4>
            <EditableField 
                value={stage.imagePrompt}
                onChange={v => onStageChange({...stage, imagePrompt: v})}
                isEditing={isEditMode}
                as="textarea"
                textClassName="text-gray-300 italic"
            />
        </div>
        <EditableField 
            value={stage.prompt}
            onChange={v => onStageChange({...stage, prompt: v})}
            isEditing={isEditMode}
            as="textarea"
            textClassName="text-gray-400 mb-4"
        />
        <h3 className="text-xl font-semibold text-gray-300 border-b border-gray-600 pb-2 mb-2">File Your Report</h3>
        <textarea
            className="w-full p-2 bg-gray-900 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400 text-gray-200"
            rows={8}
            placeholder="Type your mission report here, agent..."
            value={report}
            onChange={(e) => onReportChange(e.target.value)}
        ></textarea>
    </div>
);


// --- Main Component ---

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
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [stageCompletion, setStageCompletion] = useState<Record<number, boolean>>({});

  const currentMission = isEditMode ? editableMission : mission;
  const currentStage = currentMission.stages[currentStageIndex];
  const isLastStage = currentStageIndex === currentMission.stages.length - 1;

  const handleFieldChange = <K extends keyof Mission>(field: K, value: Mission[K]) => {
      setEditableMission(prev => ({...prev, [field]: value}));
  };

  const handleStageContentChange = (updatedStage: Stage) => {
    const newStages = [...editableMission.stages];
    newStages[currentStageIndex] = updatedStage;
    handleFieldChange('stages', newStages);
  };
  
  const handleSaveChanges = () => {
    onMissionUpdate(editableMission);
    alert("Changes saved!");
  };

  const handleGetTip = async () => {
    setIsGeneratingTip(true);
    setTip('');
    const fetchedTip = await getMissionTip(mission.objective, currentStage.title);
    setTip(fetchedTip);
    setIsGeneratingTip(false);
  };

  const goToNextStage = () => {
      if (!isLastStage) {
          setCurrentStageIndex(i => i + 1);
      }
  };
  const goToPrevStage = () => {
      if (currentStageIndex > 0) {
          setCurrentStageIndex(i => i - 1);
      }
  };
  
  const handleStageComplete = (isCorrect: boolean) => {
      setStageCompletion(prev => ({...prev, [currentStageIndex]: isCorrect}));
  };
  
  const canProceed = useMemo(() => {
    if (currentStage.type === 'learning') return true;
    if (currentStage.type === 'matching') return stageCompletion[currentStageIndex] === true;
    return true; // Writing stage doesn't block progression
  }, [currentStage, currentStageIndex, stageCompletion]);


  const renderStage = () => {
    switch(currentStage.type) {
        case 'learning':
            return <LearningStageView stage={currentStage} isEditMode={isEditMode} onStageChange={handleStageContentChange} />;
        case 'matching':
            return <MatchingStageView stage={currentStage} onComplete={handleStageComplete} isEditMode={isEditMode} onStageChange={handleStageContentChange}/>;
        case 'writing':
            return <WritingStageView stage={currentStage} report={report} onReportChange={setReport} isEditMode={isEditMode} onStageChange={handleStageContentChange}/>;
        default:
            return <div>Unknown stage type</div>;
    }
  };


  return (
    <div className="max-w-4xl mx-auto animate-fadeIn">
      <button onClick={onBack} className="flex items-center mb-6 text-cyan-400 hover:text-cyan-200 transition-colors">
        <ArrowLeftIcon className="w-5 h-5 mr-2" />
        Back to Missions
      </button>

      <div className="bg-gray-800/50 rounded-lg border border-cyan-500/20 p-6">
        <div className="flex justify-between items-start mb-4">
            <EditableField 
                value={currentMission.title}
                onChange={v => handleFieldChange('title', v)}
                isEditing={isEditMode}
                textClassName="text-4xl font-bold font-orbitron text-cyan-400"
                className="text-4xl font-bold font-orbitron text-cyan-400"
            />
          {isEditMode && (
              <button onClick={handleSaveChanges} className="flex items-center bg-green-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-500 transition-colors">
                  <SaveIcon className="w-5 h-5 mr-2" /> Save
              </button>
          )}
        </div>
        
        {/* Progress Bar */}
        <div className="my-6">
            <div className="flex justify-between mb-1">
                <span className="text-base font-medium text-cyan-300">Mission Progress</span>
                <span className="text-sm font-medium text-cyan-300">Stage {currentStageIndex + 1} of {currentMission.stages.length}</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div className="bg-cyan-500 h-2.5 rounded-full" style={{ width: `${((currentStageIndex + 1) / currentMission.stages.length) * 100}%` }}></div>
            </div>
        </div>
        
        <div className="mb-6 p-4 bg-black/20 rounded-lg">
            <EditableField
                value={currentStage.title}
                onChange={v => handleStageContentChange({...currentStage, title: v})}
                isEditing={isEditMode}
                textClassName="text-2xl font-semibold text-cyan-200 mb-4"
                className="text-2xl font-semibold"
            />
            {renderStage()}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-6">
            <button onClick={goToPrevStage} disabled={currentStageIndex === 0} className="bg-gray-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-gray-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                Previous Stage
            </button>
            {!isLastStage ? (
                <button onClick={goToNextStage} disabled={!canProceed} className="bg-cyan-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-cyan-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                    Next Stage
                </button>
            ) : (
                <button
                    onClick={() => onCompleteMission(mission.id, mission.points)}
                    disabled={!report.trim()}
                    className="flex items-center justify-center bg-green-600 text-white font-bold py-3 px-4 rounded-md hover:bg-green-500 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
                >
                    <PaperAirplaneIcon className="w-5 h-5 mr-2" />
                    Submit Report & Complete Mission
                </button>
            )}
        </div>
        
        <div className="mt-8">
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
      </div>
    </div>
  );
};

export default MissionDetailView;
