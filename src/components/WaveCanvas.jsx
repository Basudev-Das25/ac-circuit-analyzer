import { useEffect, useRef } from "react";

export default function WaveCanvas({ omega, phase }) {
    const canvasRef = useRef();

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        let t = 0;

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            ctx.beginPath();
            for (let x = 0; x < canvas.width; x++) {
                const y = canvas.height / 2 + 
                    50 * Math.sin(omega * (t + x * 0.01));
                ctx.lineTo(x,y);    
            }
            ctx.strokeStyle = "blue";
            ctx.stroke();

            ctx.beginPath();
            for (let x = 0; x < canvas.width; x++) {
                const y = canvas.height / 2 + 
                    50 * Math.sin(omega * (t + x * 0.01) - phase);
                ctx.lineTo(x,y);    
            }
            ctx.strokeStyle = "red";
            ctx.stroke();

            t += 0.01;
            requestAnimationFrame(draw);
        }

        draw();
    }, [omega, phase]);

    return (
        <div className="canvas-container">
            <canvas ref={canvasRef} width={600} height={300} />
        </div>
    );
}