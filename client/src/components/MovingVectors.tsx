import { useEffect, useRef } from "react";
import { useTheme } from "./ThemeProvider";

export function MovingVectors() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();

    // Vector objects
    const vectors: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      length: number;
      angle: number;
      angleVel: number;
      opacity: number;
      type: 'line' | 'arrow' | 'circle' | 'triangle';
    }> = [];

    // Create initial vectors
    for (let i = 0; i < 15; i++) {
      vectors.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        length: 50 + Math.random() * 100,
        angle: Math.random() * Math.PI * 2,
        angleVel: (Math.random() - 0.5) * 0.02,
        opacity: 0.1 + Math.random() * 0.3,
        type: ['line', 'arrow', 'circle', 'triangle'][Math.floor(Math.random() * 4)] as any
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const strokeColor = theme === 'dark' ? 'rgba(255, 255, 255,' : 'rgba(0, 0, 0,';
      const fillColor = theme === 'dark' ? 'rgba(255, 255, 255,' : 'rgba(0, 0, 0,';

      vectors.forEach((vector) => {
        // Update position
        vector.x += vector.vx;
        vector.y += vector.vy;
        vector.angle += vector.angleVel;

        // Bounce off edges
        if (vector.x < 0 || vector.x > canvas.width) vector.vx *= -1;
        if (vector.y < 0 || vector.y > canvas.height) vector.vy *= -1;

        // Keep within bounds
        vector.x = Math.max(0, Math.min(canvas.width, vector.x));
        vector.y = Math.max(0, Math.min(canvas.height, vector.y));

        ctx.save();
        ctx.translate(vector.x, vector.y);
        ctx.rotate(vector.angle);
        ctx.globalAlpha = vector.opacity;

        switch (vector.type) {
          case 'line':
            ctx.strokeStyle = strokeColor + vector.opacity + ')';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(-vector.length / 2, 0);
            ctx.lineTo(vector.length / 2, 0);
            ctx.stroke();
            break;

          case 'arrow':
            ctx.strokeStyle = strokeColor + vector.opacity + ')';
            ctx.fillStyle = fillColor + vector.opacity + ')';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(-vector.length / 2, 0);
            ctx.lineTo(vector.length / 2 - 10, 0);
            ctx.moveTo(vector.length / 2 - 15, -5);
            ctx.lineTo(vector.length / 2, 0);
            ctx.lineTo(vector.length / 2 - 15, 5);
            ctx.stroke();
            break;

          case 'circle':
            ctx.strokeStyle = strokeColor + vector.opacity + ')';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(0, 0, vector.length / 8, 0, Math.PI * 2);
            ctx.stroke();
            break;

          case 'triangle':
            ctx.strokeStyle = strokeColor + vector.opacity + ')';
            ctx.lineWidth = 1;
            ctx.beginPath();
            const size = vector.length / 6;
            ctx.moveTo(0, -size);
            ctx.lineTo(-size, size);
            ctx.lineTo(size, size);
            ctx.closePath();
            ctx.stroke();
            break;
        }

        ctx.restore();
      });

      requestAnimationFrame(animate);
    };

    animate();

    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{ mixBlendMode: 'multiply' }}
    />
  );
}