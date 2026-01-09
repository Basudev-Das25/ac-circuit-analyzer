export default function ControlPanel({
    frequency,
    setFrequency,
    resistance,
    setResistance,
}) {
    return (
        <div className="control-panel">
            <div className="control">
                <label>
                    Frequency (Hz): {frequency}
                    <input
                        type="range"
                        min="1"
                        max="500"
                        value={frequency}
                        onChange={(e) => setFrequency(+e.target.value)}
                    />
                </label>
            </div>

            <div className="control">
                <label>
                    Resistance (Ω): {resistance}
                    <input
                        type="range"
                        min="1"
                        max="200"
                        value={resistance}
                        onChange={(e) => setResistance(+e.target.value)}
                    />
                </label>
            </div>

        </div>
    );
}