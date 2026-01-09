import { useState, useEffect } from 'react'
import './App.css'
import ControlPanel from './components/ControlPanel';
import WaveCanvas from './components/WaveCanvas';
import { calculateACValues } from './utils/acMath';

function App() {
  const [frequency, setFrequency] = useState(50);
  const [resistance, setResistance] = useState(50);

  const { omega, phase } = calculateACValues({
    frequency,
    resistance,
    inductance: 0.2,
    capacitance: 0.00001,
  });

  function getPhaseText(phase) {
    const EPS = 0.05;

    if (Math.abs(phase) < EPS) {
      return {
        text: "Current is in phase with Voltage (Resonance)",
        type: "nuetral"
      };
    } else if (phase > 0) {
      return {
        text: "Current lags Voltage (Inductive behavior)",
        type: "lag"
      };
    } else {
      return {
        text: "Current leads Voltage (Capacitive behavior)",
        type: "lead"
      };
    }
  }

  const phaseInfo = getPhaseText(phase);

  const resonanceFrequency = 1 / (2 * Math.sqrt(0.2 * 0.0001));

  function getResonanceStatus(frequency, f0) {
    const TOL = 2; // Hz tolerance

    if (Math.abs(frequency - f0) < TOL) {
      return { label: "Near Resonance", type: "resonance"};
    } else if (frequency < f0){
      return { label: "Capacitive Region", type: "capacitive"};
    } else {
      return { label: "Inductive Region", type: "inductive"};
    }
  }

  const resonanceStatus = getResonanceStatus(
    frequency,
    resonanceFrequency
  );

  const [demoMode, setDemoMode] = useState(false);

  useEffect(() => {
    if (!demoMode) return;

    const interval = setInterval(() => {
      setFrequency((f) => {
        if (f >= 500) return 1;
        return f+1;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [demoMode]);

  return (
    <>
    <div className="App">
      <h1>AC Circuit Analyzer</h1>

      <div className='card'>
        <ControlPanel
          frequency={frequency}
          setFrequency={setFrequency}
          resistance={resistance}
          setResistance={setResistance}
        />
        <button className='demo-btn' onClick={() => setDemoMode((d) => !d)}>
          {demoMode ? "Stop Demo" : "Start Demo"}
        </button>
      </div>
      <div className='card'>
        <WaveCanvas omega={omega} phase={phase} />
        <div className='legend'>
          <span style={{color: 'blue'}}> ● Voltage</span><br/>
          <span style={{color: 'red'}}> ● Current</span>
        </div>
        <p className={`phase-text ${phaseInfo.type}`}>
          {phaseInfo.text}
        </p>
        <div className={`resonance-box ${resonanceStatus.type}`}>
          {resonanceStatus.label}
        </div>
      </div>
    </div>
    </>
  );
}

export default App
