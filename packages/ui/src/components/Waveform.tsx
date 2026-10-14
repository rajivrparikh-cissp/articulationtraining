import React, { useRef, useEffect } from 'react';

export interface WaveformProps {
  isRecording: boolean;
  rmsVolume?: number;
  height?: number;
  color?: string;
}

export const Waveform: React.FC<WaveformProps> = ({
  isRecording,
  height = 96,
  color = '#f59e0b'
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let phase = 0;

    const render = () => {
      ctx.fillStyle = '#090d16';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (isRecording) {
        ctx.lineWidth = 2.5;
        ctx.strokeStyle = color;
        ctx.beginPath();

        const numBars = 48;
        const barWidth = canvas.width / numBars;

        for (let i = 0; i < numBars; i++) {
          const amplitude = Math.sin(phase + i * 0.25) * 18 + Math.random() * 8;
          const y = canvas.height / 2 + amplitude;
          if (i === 0) {
            ctx.moveTo(i * barWidth, y);
          } else {
            ctx.lineTo(i * barWidth, y);
          }
        }
        ctx.stroke();
        phase += 0.12;
      } else {
        // Flatline idle state
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = '#334155';
        ctx.beginPath();
        ctx.moveTo(0, canvas.height / 2);
        ctx.lineTo(canvas.width, canvas.height / 2);
        ctx.stroke();
      }

      animationId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationId);
  }, [isRecording, color]);

  return (
    <div 
      className="w-full bg-[#090d16] rounded-xl border border-slate-800 overflow-hidden relative"
      role="img"
      aria-label={isRecording ? "Live audio frequency recording in progress" : "Audio input standby"}
    >
      <canvas
        ref={canvasRef}
        width={480}
        height={height}
        className="w-full h-full block"
      />
    </div>
  );
};
