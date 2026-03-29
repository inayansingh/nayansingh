import { useEffect, useRef } from 'react';

const CHARS = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%&';

export default function MatrixCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;

    const fontSize = 14;
    let cols, drops;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      cols  = Math.floor(canvas.width / fontSize);
      drops = Array.from({ length: cols }, () => Math.random() * -100);
    };

    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      // Black fade overlay — less opacity = longer trails
      ctx.fillStyle = 'rgba(7, 11, 17, 0.065)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px "Fira Code", monospace`;

      drops.forEach((y, i) => {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        const x = i * fontSize;

        // Head character — bright white/green
        if (y * fontSize > 0 && Math.random() > 0.95) {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
        } else {
          // Varying green brightness for depth
          const brightness = Math.random() > 0.7 ? 0.5 : 0.18;
          ctx.fillStyle = `rgba(0, 255, 65, ${brightness})`;
        }

        ctx.fillText(char, x, y * fontSize);

        // Reset drop randomly after passing bottom
        if (y * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i] += 0.5; // speed — slower = more elegant
      });

      animId = requestAnimationFrame(draw);
    };

    // Slight delay so the page renders first
    const timer = setTimeout(() => { animId = requestAnimationFrame(draw); }, 100);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 1,
      }}
    />
  );
}
