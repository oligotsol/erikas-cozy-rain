# Erika's Cozy Rain Game

A soft, wholesome rainy-evening game for Erika. No scores to chase, no fail states — just coffee, books, baking, and a show on the couch with babe.

The vibe is a love letter you can open in a browser.

## Play

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

## Build

```bash
npm install
npm run build
```

This writes a static site to `dist/`. Preview it with:

```bash
npm run preview
```

The Vite config uses `base: "./"` so the build works on GitHub Pages. `public/.nojekyll` is included so Pages will serve the files as-is.

## What Erika can do

From the rainy room, she can:

1. **Make coffee** — pick beans and a brew, watch the pour, maybe make a mug for babe.
2. **Read a book** — choose a title from the shelf and turn a few soft pages.
3. **Bake a treat** — cookies, brownies, banana bread, or cinnamon rolls. The oven never burns anything.
4. **Watch a show with babe** — the special one. Couch, rain on the window, shared blanket, streaming glow (no trademarks). This awards **Babe Points** on top of cozy points.

Cozy Points and Babe Points are saved in `localStorage`. Enough Babe Points unlock a little keepsake in the room: a shared photo, a heart mug, and a happier plant.

Rain sound is optional and procedural (Web Audio). Use the **rain on / sound off** toggle anytime.

## Tone

Warm, personal, lightly playful. Made to feel like a gift.
