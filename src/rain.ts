interface Drop {
  x: number;
  y: number;
  len: number;
  speed: number;
  opacity: number;
  width: number;
}

export function attachRain(canvas: HTMLCanvasElement): () => void {
  const ctx = canvas.getContext("2d");
  if (!ctx) return () => undefined;

  let drops: Drop[] = [];
  let tickCount = 0;
  let frame = 0;
  let running = true;
  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = Math.max(canvas.clientWidth, 1);
    const height = Math.max(canvas.clientHeight, 1);
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    seed(width, height);
  };

  const seed = (width: number, height: number) => {
    const count = Math.min(140, Math.floor((width * height) / 2800));
    drops = Array.from({ length: count }, () => makeDrop(width, height, true));
  };

  const makeDrop = (width: number, height: number, anywhere: boolean): Drop => ({
    x: Math.random() * width,
    y: anywhere ? Math.random() * height : -20 - Math.random() * 40,
    len: 10 + Math.random() * 18,
    speed: 3.2 + Math.random() * 5.2,
    opacity: 0.18 + Math.random() * 0.42,
    width: 0.7 + Math.random() * 1.1,
  });

  const tick = () => {
    if (!running) return;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    ctx.clearRect(0, 0, width, height);

    ctx.strokeStyle = "rgba(230, 240, 250, 0.55)";
    for (const drop of drops) {
      ctx.globalAlpha = drop.opacity;
      ctx.lineWidth = drop.width;
      ctx.beginPath();
      ctx.moveTo(drop.x, drop.y);
      ctx.lineTo(drop.x - drop.len * 0.12, drop.y + drop.len);
      ctx.stroke();
      drop.y += drop.speed;
      drop.x -= drop.speed * 0.08;
      if (drop.y > height + 12) {
        Object.assign(drop, makeDrop(width, height, false));
      }
    }
    ctx.globalAlpha = 1;

    if (tickCount % 8 === 0) {
      const splashX = Math.random() * width;
      const splashY = height * (0.72 + Math.random() * 0.24);
      ctx.fillStyle = "rgba(210, 226, 238, 0.28)";
      ctx.beginPath();
      ctx.ellipse(splashX, splashY, 3 + Math.random() * 4, 1.2, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    tickCount += 1;
    frame = requestAnimationFrame(tick);
  };

  resize();
  window.addEventListener("resize", resize);
  frame = requestAnimationFrame(tick);

  return () => {
    running = false;
    cancelAnimationFrame(frame);
    window.removeEventListener("resize", resize);
  };
}
