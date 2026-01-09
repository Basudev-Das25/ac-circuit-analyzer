export function calculateACValues({
    frequency,
    resistance,
    inductance,
    capacitance,
    voltageAmplitude = 1
}) {
    const omega = 2 * Math.PI * frequency;

    const XL = omega * inductance;
    const XC = 1/(omega * capacitance);

    const impedance = Math.sqrt(
        resistance ** 2 + (XL - XC) ** 2
    );

    const phase = Math.atan((XL - XC) / resistance);

    return {
        omega,
        XL,
        XC,
        impedance,
        phase,
        currentAmplitude: voltageAmplitude / impedance
    };
}