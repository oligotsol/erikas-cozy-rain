export const roomArt = (unlocked: boolean): string => `
  <svg class="room-svg" viewBox="0 0 900 400" role="img" aria-label="Erika's rainy living room">
    <defs>
      <radialGradient id="lampGlow" cx="78%" cy="28%" r="38%">
        <stop offset="0%" stop-color="#ffd99a" stop-opacity="0.7"/>
        <stop offset="100%" stop-color="#f3e6d3" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="night" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#2a3b4d"/>
        <stop offset="100%" stop-color="#4d6478"/>
      </linearGradient>
      <linearGradient id="wall" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#f7edd9"/>
        <stop offset="100%" stop-color="#ecd5b4"/>
      </linearGradient>
    </defs>
    <rect width="900" height="400" fill="url(#wall)"/>
    <rect width="900" height="400" fill="url(#lampGlow)"/>
    <rect y="292" width="900" height="108" fill="#c9ae8a"/>
    ${[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => `<rect x="${i * 100}" y="292" width="3" height="108" fill="#bea17c"/>`).join("")}
    <ellipse cx="400" cy="360" rx="190" ry="28" fill="#c97b84" opacity="0.88"/>

    <rect x="58" y="28" width="304" height="214" rx="6" fill="#8a6844"/>
    <rect x="72" y="40" width="276" height="178" fill="url(#night)"/>
    <circle cx="310" cy="68" r="10" fill="#ffe8b0" opacity="0.55"/>
    <path d="M72 218 L72 160 L96 176 L120 132 L148 170 L176 118 L210 168 L248 108 L280 164 L348 128 L348 218 Z" fill="#1d2a36"/>
    <rect x="204" y="40" width="10" height="178" fill="#8a6844"/>
    <rect x="72" y="124" width="276" height="10" fill="#8a6844"/>
    <path d="M58 28 h42 c-8 70 -8 140 0 214 h-42 z" fill="#c48b8b"/>
    <path d="M362 28 h-42 c8 70 8 140 0 214 h42 z" fill="#c48b8b"/>
    <rect x="50" y="228" width="320" height="16" rx="3" fill="#d8bd93"/>

    <g class="sill-plant">
      <ellipse cx="108" cy="214" rx="9" ry="12" fill="#7f9a6c"/>
      <ellipse cx="122" cy="210" rx="8" ry="13" fill="#6f8f5c"/>
      <ellipse cx="115" cy="218" rx="7" ry="10" fill="#8fa87a"/>
      <path d="M106 226 h16 l-2 12 h-12 z" fill="#c77b84"/>
    </g>
    ${
      unlocked
        ? `<g class="heart-mug-art">
            <rect x="292" y="208" width="22" height="18" rx="4" fill="#fff8ef" stroke="#c77b84" stroke-width="2"/>
            <path d="M314 214 q6 0 6 6 q0 6 -6 6" fill="none" stroke="#c77b84" stroke-width="2"/>
            <text x="303" y="221" text-anchor="middle" font-size="10" fill="#c77b84">♡</text>
          </g>`
        : ""
    }

    <rect x="620" y="86" width="86" height="38" rx="8" fill="#e8b86d"/>
    <rect x="658" y="124" width="8" height="78" fill="#8a6844"/>
    <ellipse cx="662" cy="210" rx="22" ry="6" fill="#8a6844"/>
    <ellipse cx="662" cy="168" rx="70" ry="54" fill="#ffd99a" opacity="0.28"/>

    ${
      unlocked
        ? `<g>
            <rect x="548" y="70" width="62" height="50" fill="#8a6844"/>
            <rect x="554" y="76" width="50" height="30" fill="#5d7388"/>
            <rect x="554" y="100" width="50" height="14" fill="#d8bd93"/>
            <circle cx="568" cy="96" r="5" fill="#3f342c"/>
            <circle cx="586" cy="96" r="5" fill="#3f342c"/>
            <text x="579" y="134" text-anchor="middle" font-size="11" font-family="Caveat, cursive" fill="#8a6844">rainy tuesday</text>
          </g>`
        : `<circle cx="578" cy="88" r="4" fill="#c4a574"/>`
    }

    <rect x="200" y="268" width="268" height="62" rx="18" fill="#8ea6bb"/>
    <rect x="216" y="278" width="236" height="22" rx="8" fill="#b7c8d6"/>
    <rect x="338" y="282" width="96" height="36" rx="10" fill="#e4b4b4"/>
    <rect x="188" y="278" width="22" height="52" rx="8" fill="#7d93a8"/>
    <rect x="458" y="278" width="22" height="52" rx="8" fill="#7d93a8"/>
    <rect x="510" y="286" width="70" height="12" rx="3" fill="#8a6844"/>
    <rect x="518" y="274" width="16" height="14" rx="3" fill="#fff8ef" stroke="#c77b84" stroke-width="1.5"/>
    <rect x="542" y="274" width="16" height="14" rx="3" fill="#fff8ef" stroke="#8ea6bb" stroke-width="1.5"/>

    <rect x="742" y="248" width="96" height="64" rx="8" fill="#2f3f51"/>
    <rect x="752" y="256" width="76" height="42" rx="4" fill="#f2c57a" opacity="0.55"/>
    <rect x="776" y="312" width="28" height="10" fill="#3f342c"/>
    <rect x="758" y="322" width="64" height="8" rx="3" fill="#3f342c"/>
  </svg>
`;

export const coffeeArt = `
  <svg class="still-svg" viewBox="0 0 280 180" aria-hidden="true">
    <ellipse cx="140" cy="164" rx="90" ry="10" fill="#3f342c" opacity="0.12"/>
    <path d="M70 70 h70 v50 a18 18 0 0 1 -18 18 h-34 a18 18 0 0 1 -18 -18 z" fill="#8ea6bb"/>
    <path d="M140 86 q28 4 34 22" fill="none" stroke="#8ea6bb" stroke-width="8" stroke-linecap="round"/>
    <rect class="pour-svg" x="168" y="92" width="5" height="36" rx="3" fill="#6b4a32"/>
    <path d="M176 128 h52 v34 a14 14 0 0 1 -14 14 h-24 a14 14 0 0 1 -14 -14 z" fill="#fff8ef" stroke="#e4b4b4" stroke-width="4"/>
    <rect x="186" y="142" width="32" height="16" rx="4" fill="#6b4a32"/>
    <path d="M228 140 q10 2 10 12 q0 10 -10 12" fill="none" stroke="#e4b4b4" stroke-width="4"/>
    <path d="M196 118 q-4 -16 0 -28" fill="none" stroke="#fff8ef" stroke-width="3" opacity="0.55"/>
    <path d="M208 116 q-2 -18 4 -30" fill="none" stroke="#fff8ef" stroke-width="3" opacity="0.4"/>
  </svg>
`;

export const cinemaArt = (title: string, closer: boolean): string => `
  <svg class="cinema-svg" viewBox="0 0 720 320" role="img" aria-label="Couch, rain, and a show with babe">
    <rect width="720" height="320" fill="#243140"/>
    <rect x="24" y="18" width="220" height="130" rx="8" fill="#8a6844"/>
    <rect x="36" y="28" width="196" height="100" fill="#2a3b4d"/>
    <path d="M36 128 L36 90 L58 100 L84 70 L110 102 L140 64 L176 98 L232 78 L232 128 Z" fill="#1d2a36"/>
    <rect x="36" y="128" width="196" height="10" fill="#d8bd93"/>
    <rect x="250" y="36" width="446" height="150" rx="16" fill="#1c2833"/>
    <rect x="266" y="50" width="414" height="122" rx="8" fill="#3d4f63"/>
    <circle cx="360" cy="100" r="26" fill="#f2c57a" opacity="0.35"/>
    <circle cx="470" cy="88" r="40" fill="#c77b84" opacity="0.28"/>
    <circle cx="560" cy="116" r="22" fill="#8ea6bb" opacity="0.45"/>
    <text x="473" y="118" text-anchor="middle" fill="#fff8ef" font-size="18" font-family="Fredoka, sans-serif">${title}</text>
    <rect x="80" y="214" width="560" height="86" rx="28" fill="#6a7f94"/>
    <rect x="108" y="228" width="200" height="28" rx="10" fill="#b7c8d6"/>
    <circle cx="${closer ? "300" : "268"}" cy="232" r="18" fill="#c77b84"/>
    <circle cx="${closer ? "338" : "328"}" cy="230" r="18" fill="#8a6844"/>
    <rect x="250" y="246" width="${closer ? "160" : "190"}" height="36" rx="16" fill="#e4b4b4"/>
    <rect x="160" y="268" width="18" height="14" rx="4" fill="#fff8ef"/>
    <rect x="186" y="268" width="18" height="14" rx="4" fill="#fff8ef"/>
    ${closer ? `<text x="360" y="210" fill="#ffd0d5" font-size="22">♡</text>` : ""}
  </svg>
`;

export const icons = {
  coffee: `<svg viewBox="0 0 48 48" aria-hidden="true"><rect width="48" height="48" rx="14" fill="#efe3d2"/><path d="M12 20 h16 v10 a6 6 0 0 1 -6 6 h-4 a6 6 0 0 1 -6 -6 z" fill="#6b4a32"/><path d="M28 24 q8 2 8 7 q0 5 -8 7" fill="none" stroke="#c77b84" stroke-width="2"/><path d="M16 12 q-2 8 2 12" fill="none" stroke="#fff8ef" stroke-width="2"/></svg>`,
  book: `<svg viewBox="0 0 48 48" aria-hidden="true"><rect width="48" height="48" rx="14" fill="#efe3d2"/><rect x="10" y="12" width="8" height="24" rx="2" fill="#c77b84"/><rect x="20" y="10" width="8" height="26" rx="2" fill="#7d9bb3"/><rect x="30" y="14" width="8" height="22" rx="2" fill="#8fa87a"/></svg>`,
  bake: `<svg viewBox="0 0 48 48" aria-hidden="true"><rect width="48" height="48" rx="14" fill="#efe3d2"/><ellipse cx="24" cy="28" rx="14" ry="8" fill="#d4a373"/><circle cx="18" cy="26" r="2" fill="#6b4a32"/><circle cx="25" cy="29" r="2" fill="#6b4a32"/><circle cx="30" cy="25" r="2" fill="#6b4a32"/><path d="M16 18 q8 -10 16 0" fill="none" stroke="#f2c57a" stroke-width="2"/></svg>`,
  show: `<svg viewBox="0 0 48 48" aria-hidden="true"><rect width="48" height="48" rx="14" fill="#f6dfe1"/><rect x="10" y="12" width="28" height="16" rx="3" fill="#2f3f51"/><rect x="14" y="16" width="20" height="8" fill="#f2c57a" opacity="0.55"/><rect x="12" y="32" width="24" height="8" rx="4" fill="#c77b84"/><circle cx="20" cy="32" r="4" fill="#8a6844"/><circle cx="28" cy="32" r="4" fill="#c77b84"/></svg>`,
};
