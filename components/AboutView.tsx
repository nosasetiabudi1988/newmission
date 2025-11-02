
import React from 'react';

const AboutView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-800/50 rounded-lg border border-cyan-500/20 animate-fadeIn">
      <h2 className="text-4xl font-bold font-orbitron text-cyan-400 mb-6 border-b-2 border-cyan-500/30 pb-3">
        [ TOP SECRET ]
      </h2>
      <div className="space-y-4 text-gray-300">
        <h3 className="text-2xl font-semibold text-cyan-300">Operation: English Mastery</h3>
        <p>
          This training platform, codenamed "Mission: Possible", is a state-of-the-art educational tool developed by the Agency's Linguistics Division. Our goal is to equip junior agents (grades 7-9) with superior English communication skills for international operations.
        </p>
        <h3 className="text-2xl font-semibold text-cyan-300">Methodology: PjBL</h3>
        <p>
          We employ Project-Based Learning (PjBL) protocols. Each "mission" is a simulated assignment that requires you to apply language skills in a practical context. Instead of rote memorization, you will be creating reports, giving directions, and profiling subjects—just like a real agent.
        </p>
        <h3 className="text-2xl font-semibold text-cyan-300">Gamification Directives</h3>
        <p>
          To enhance agent engagement, we have integrated gamification principles. Completing missions earns you points, improving your rank on the agent leaderboard. Top agents may be recognized for their outstanding performance.
        </p>
         <h3 className="text-2xl font-semibold text-cyan-300">Teacher Protocol: Field Customization</h3>
        <p>
          This system is designed for adaptability. Field commanders (teachers) can activate "Teacher Mode" to modify existing missions or author new training modules on the fly, ensuring the curriculum remains relevant to current operational needs.
        </p>
      </div>
    </div>
  );
};

export default AboutView;
   