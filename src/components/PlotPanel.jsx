import Plot from 'react-plotly.js';

export default function PlotPanel({ frequencyData, phaseData }) {
    return (
        <Plot
            data={[
                {
                    x: frequencyData,
                    y: phaseData,
                    type: 'scatter',
                    mode: 'lines',
                    name: 'Phase vs Frequency'
                }
            ]}

            layout={{
                title: "Phase Angle vs Frequency",
                xaxis: { title: "Frequency (Hz)" },
                yaxis: { title: "Phase (rad)" }
            }}
        />
    );
}