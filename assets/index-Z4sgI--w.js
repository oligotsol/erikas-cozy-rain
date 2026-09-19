var C=Object.defineProperty;var P=(a,t,e)=>t in a?C(a,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):a[t]=e;var p=(a,t,e)=>P(a,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function e(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(s){if(s.ep)return;s.ep=!0;const o=e(s);fetch(s.href,o)}})();function $(a){const t=a.getContext("2d");if(!t)return()=>{};let e=[],i=0,s=0,o=!0;const n=()=>{const d=Math.min(window.devicePixelRatio||1,2),u=Math.max(a.clientWidth,1),l=Math.max(a.clientHeight,1);a.width=Math.floor(u*d),a.height=Math.floor(l*d),t.setTransform(d,0,0,d,0,0),h(u,l)},h=(d,u)=>{const l=Math.min(140,Math.floor(d*u/2800));e=Array.from({length:l},()=>r(d,u,!0))},r=(d,u,l)=>({x:Math.random()*d,y:l?Math.random()*u:-20-Math.random()*40,len:10+Math.random()*18,speed:3.2+Math.random()*5.2,opacity:.18+Math.random()*.42,width:.7+Math.random()*1.1}),f=()=>{if(!o)return;const d=a.clientWidth,u=a.clientHeight;t.clearRect(0,0,d,u),t.strokeStyle="rgba(230, 240, 250, 0.55)";for(const l of e)t.globalAlpha=l.opacity,t.lineWidth=l.width,t.beginPath(),t.moveTo(l.x,l.y),t.lineTo(l.x-l.len*.12,l.y+l.len),t.stroke(),l.y+=l.speed,l.x-=l.speed*.08,l.y>u+12&&Object.assign(l,r(d,u,!1));if(t.globalAlpha=1,i%8===0){const l=Math.random()*d,B=u*(.72+Math.random()*.24);t.fillStyle="rgba(210, 226, 238, 0.28)",t.beginPath(),t.ellipse(l,B,3+Math.random()*4,1.2,0,0,Math.PI*2),t.fill()}i+=1,s=requestAnimationFrame(f)};return n(),window.addEventListener("resize",n),s=requestAnimationFrame(f),()=>{o=!1,cancelAnimationFrame(s),window.removeEventListener("resize",n)}}class H{constructor(){p(this,"ctx",null);p(this,"master",null);p(this,"sources",[]);p(this,"dropletTimer",0);p(this,"started",!1);p(this,"muted",!1)}setMuted(t){var e;this.muted=t,this.master&&this.master.gain.setTargetAtTime(t?0:.22,((e=this.ctx)==null?void 0:e.currentTime)??0,.08)}async start(){var n;if(this.started){((n=this.ctx)==null?void 0:n.state)==="suspended"&&await this.ctx.resume(),this.setMuted(this.muted);return}const t=window.AudioContext||window.webkitAudioContext;if(!t)return;this.ctx=new t,this.master=this.ctx.createGain(),this.master.gain.value=0,this.master.connect(this.ctx.destination);const e=this.makeNoiseSource(),i=this.ctx.createBiquadFilter();i.type="lowpass",i.frequency.value=820,i.Q.value=.7;const s=this.ctx.createBiquadFilter();s.type="bandpass",s.frequency.value=420,s.Q.value=.55;const o=this.ctx.createGain();o.gain.value=.55,e.connect(i),i.connect(s),s.connect(o),o.connect(this.master),this.sources.push(e),this.started=!0,this.setMuted(this.muted),this.scheduleDroplets()}stop(){var t;window.clearTimeout(this.dropletTimer);for(const e of this.sources)try{e.stop()}catch{}this.sources=[],(t=this.ctx)==null||t.close(),this.ctx=null,this.master=null,this.started=!1}makeNoiseSource(){if(!this.ctx)throw new Error("audio missing");const e=this.ctx.createBuffer(1,this.ctx.sampleRate*3,this.ctx.sampleRate),i=e.getChannelData(0);let s=0;for(let n=0;n<i.length;n+=1){const h=Math.random()*2-1;s=s*.86+h*.14,i[n]=s*.9}const o=this.ctx.createBufferSource();return o.buffer=e,o.loop=!0,o.start(),o}scheduleDroplets(){const t=()=>{this.ctx&&this.master&&!this.muted&&this.playDroplet(),this.dropletTimer=window.setTimeout(t,700+Math.random()*1800)};this.dropletTimer=window.setTimeout(t,900)}playDroplet(){if(!this.ctx||!this.master)return;const t=this.ctx.createOscillator(),e=this.ctx.createGain(),i=this.ctx.createBiquadFilter();i.type="highpass",i.frequency.value=1200,t.type="sine",t.frequency.setValueAtTime(1800+Math.random()*900,this.ctx.currentTime),t.frequency.exponentialRampToValueAtTime(420,this.ctx.currentTime+.12),e.gain.setValueAtTime(1e-4,this.ctx.currentTime),e.gain.exponentialRampToValueAtTime(.045,this.ctx.currentTime+.012),e.gain.exponentialRampToValueAtTime(1e-4,this.ctx.currentTime+.18),t.connect(i),i.connect(e),e.connect(this.master),t.start(),t.stop(this.ctx.currentTime+.2)}}const z="erika-cozy-rain-v1",A=15,g={cozyPoints:0,babePoints:0,unlockedKeepsake:!1,muted:!1,visited:!1,coffeeCount:0,bookCount:0,bakeCount:0,showCount:0};function E(){try{const a=localStorage.getItem(z);if(!a)return{...g};const t=JSON.parse(a);return{...g,...t}}catch{return{...g}}}function T(a){localStorage.setItem(z,JSON.stringify(a))}function R(a){const t={...a,visited:!0};return T(t),t}function I(a,t){const e={...a,muted:t};return T(e),e}function D(a,t,e,i){const s=a.unlockedKeepsake,o={...a,cozyPoints:a.cozyPoints+t,babePoints:a.babePoints+e};if(i){const n=`${i}Count`;o[n]=a[n]+1}return o.babePoints>=A&&(o.unlockedKeepsake=!0),T(o),{state:o,justUnlocked:!s&&o.unlockedKeepsake}}const O=a=>`
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
    ${[0,1,2,3,4,5,6,7,8].map(t=>`<rect x="${t*100}" y="292" width="3" height="108" fill="#bea17c"/>`).join("")}
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
    ${a?`<g class="heart-mug-art">
            <rect x="292" y="208" width="22" height="18" rx="4" fill="#fff8ef" stroke="#c77b84" stroke-width="2"/>
            <path d="M314 214 q6 0 6 6 q0 6 -6 6" fill="none" stroke="#c77b84" stroke-width="2"/>
            <text x="303" y="221" text-anchor="middle" font-size="10" fill="#c77b84">♡</text>
          </g>`:""}

    <rect x="620" y="86" width="86" height="38" rx="8" fill="#e8b86d"/>
    <rect x="658" y="124" width="8" height="78" fill="#8a6844"/>
    <ellipse cx="662" cy="210" rx="22" ry="6" fill="#8a6844"/>
    <ellipse cx="662" cy="168" rx="70" ry="54" fill="#ffd99a" opacity="0.28"/>

    ${a?`<g>
            <rect x="548" y="70" width="62" height="50" fill="#8a6844"/>
            <rect x="554" y="76" width="50" height="30" fill="#5d7388"/>
            <rect x="554" y="100" width="50" height="14" fill="#d8bd93"/>
            <circle cx="568" cy="96" r="5" fill="#3f342c"/>
            <circle cx="586" cy="96" r="5" fill="#3f342c"/>
            <text x="579" y="134" text-anchor="middle" font-size="11" font-family="Caveat, cursive" fill="#8a6844">rainy tuesday</text>
          </g>`:'<circle cx="578" cy="88" r="4" fill="#c4a574"/>'}

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
`,M=`
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
`,S=(a,t)=>`
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
    <text x="473" y="118" text-anchor="middle" fill="#fff8ef" font-size="18" font-family="Fredoka, sans-serif">${a}</text>
    <rect x="80" y="214" width="560" height="86" rx="28" fill="#6a7f94"/>
    <rect x="108" y="228" width="200" height="28" rx="10" fill="#b7c8d6"/>
    <circle cx="${t?"300":"268"}" cy="232" r="18" fill="#c77b84"/>
    <circle cx="${t?"338":"328"}" cy="230" r="18" fill="#8a6844"/>
    <rect x="250" y="246" width="${t?"160":"190"}" height="36" rx="16" fill="#e4b4b4"/>
    <rect x="160" y="268" width="18" height="14" rx="4" fill="#fff8ef"/>
    <rect x="186" y="268" width="18" height="14" rx="4" fill="#fff8ef"/>
    ${t?'<text x="360" y="210" fill="#ffd0d5" font-size="22">♡</text>':""}
  </svg>
`,y={coffee:'<svg viewBox="0 0 48 48" aria-hidden="true"><rect width="48" height="48" rx="14" fill="#efe3d2"/><path d="M12 20 h16 v10 a6 6 0 0 1 -6 6 h-4 a6 6 0 0 1 -6 -6 z" fill="#6b4a32"/><path d="M28 24 q8 2 8 7 q0 5 -8 7" fill="none" stroke="#c77b84" stroke-width="2"/><path d="M16 12 q-2 8 2 12" fill="none" stroke="#fff8ef" stroke-width="2"/></svg>',book:'<svg viewBox="0 0 48 48" aria-hidden="true"><rect width="48" height="48" rx="14" fill="#efe3d2"/><rect x="10" y="12" width="8" height="24" rx="2" fill="#c77b84"/><rect x="20" y="10" width="8" height="26" rx="2" fill="#7d9bb3"/><rect x="30" y="14" width="8" height="22" rx="2" fill="#8fa87a"/></svg>',bake:'<svg viewBox="0 0 48 48" aria-hidden="true"><rect width="48" height="48" rx="14" fill="#efe3d2"/><ellipse cx="24" cy="28" rx="14" ry="8" fill="#d4a373"/><circle cx="18" cy="26" r="2" fill="#6b4a32"/><circle cx="25" cy="29" r="2" fill="#6b4a32"/><circle cx="30" cy="25" r="2" fill="#6b4a32"/><path d="M16 18 q8 -10 16 0" fill="none" stroke="#f2c57a" stroke-width="2"/></svg>',show:'<svg viewBox="0 0 48 48" aria-hidden="true"><rect width="48" height="48" rx="14" fill="#f6dfe1"/><rect x="10" y="12" width="28" height="16" rx="3" fill="#2f3f51"/><rect x="14" y="16" width="20" height="8" fill="#f2c57a" opacity="0.55"/><rect x="12" y="32" width="24" height="8" rx="4" fill="#c77b84"/><circle cx="20" cy="32" r="4" fill="#8a6844"/><circle cx="28" cy="32" r="4" fill="#c77b84"/></svg>'},w=[{id:"rainy",name:"Rainy Day Blend",note:"Dark, a little chocolate — like the good umbrella."},{id:"vanilla",name:"Vanilla Haze",note:"Soft and sweet, the sweater of coffees."},{id:"letter",name:"Morning Letter",note:"Bright. The kind babe brews on slow Sundays."}],k=[{id:"pour",name:"Pour over",note:"A little ceremony. Steam first, then patience."},{id:"press",name:"French press",note:"Heavy mug energy. Perfect for the windowsill."},{id:"mug",name:"Big cozy drip",note:"No fuss. Just a warm cup and the rain."}],L=[{id:"lamp",title:"The Lamp Stayed On",author:"M. Holloway",color:"#c97b84",pages:["The house did not mind the storm. It had practiced this kind of weather for years — the tick of the radiator, the pale streetlight through the curtain, the kettle that always knew when someone needed it.","She left the lamp on in the other room, not because she was afraid of the dark, but because it felt like leaving a light on for someone who was already home.","Outside, the rain kept its promise. Inside, the page was warm. That was enough for one evening."]},{id:"letters",title:"Letters from the Window Seat",author:"Juniper Vale",color:"#7d9bb3",pages:["I am writing this with my knees tucked up and the glass cold against my shoulder. The city is a watercolor tonight. I keep thinking of you every time a car passes and the window turns gold.","Do you remember the night we decided rain was a season we could share? I still do. I still save you the good corner of the couch.","If this letter finds you on a gray evening, consider it an invitation to stay in. I already put the kettle on."]},{id:"knit",title:"Knit, Purl, Darling",author:"S. Cardamom",color:"#8fa87a",pages:["Chapter four is just about a scarf that refuses to be finished, and a person who keeps adding rows because the rain has not stopped and the company is good.","There is a kind of love that looks like handing someone the other needle. There is a kind of evening that looks like that, too.","She counted stitches the way some people count blessings. Softly. Without making a list."]},{id:"land",title:"A Soft Place to Land",author:"Ivy Brennan",color:"#d4a373",pages:["They did not need a grand reunion. They needed socks, and leftover soup, and a show they had already seen, and the particular quiet of a room that knew both of their names.","Erika — if a book could look up from the page, it would look at you like this: fondly, and with no hurry.","Love, in this chapter, is a blanket pulled a little more to the left. You know the one."]},{id:"soup",title:"Soup for the Storm",author:"N. Willow",color:"#b08968",pages:["Recipe: onions until they forgive you, broth that tastes like staying in, bread torn by hand. Serve in the mug that has a chip you refuse to throw away.","The storm can have the streets. We have the stove, and we have time, and we have each other in the next room.","She closed the book with a ribbon and smiled like the last page had been written for her. Maybe it had."]}],v=[{id:"cookies",name:"Chocolate chip cookies",note:"The classic. Extra chips, slightly underbaked in the middle."},{id:"brownies",name:"Fudgy brownies",note:"Shiny top. Gooey center. Dangerous in the best way."},{id:"banana",name:"Banana bread",note:"The bananas were waiting for a night like this."},{id:"rolls",name:"Cinnamon rolls",note:"The whole apartment will smell like a hug."}],x=[{id:"bakery",title:"The Bakery on Willow Lane",tag:"comfort series",blurb:"Small town, warm ovens, everyone ends up okay."},{id:"raincheck",title:"Rain Check",tag:"gentle mystery",blurb:"Someone stole a soup recipe. The detective is mostly kind."},{id:"rerun",title:"Our Favorite Rerun",tag:"the one you restart",blurb:"You both know every line. That is the point."}],W=["The kitchen smells like a hug, Erika.","Steam on the window. Perfect.","Babe would steal a sip of this and pretend it was an accident."],G=["You dog-ear the page for later. The rain agrees.","A quiet chapter, just for you.","The lamp feels proud of itself."],j=["The oven did its little miracle.","Warm. Sweet. The rain can keep the rest of the world.","Babe is going to ask for the corner piece. Obviously."],F=["This is the best part of the storm.","Babe's shoulder is the correct pillow. Science.","The show could be anything. The evening is the point."];function m(a){return a[Math.floor(Math.random()*a.length)]}function b(a,t){a.querySelectorAll("[data-action]").forEach(e=>{e.addEventListener("click",()=>{const i=e.dataset.action;i&&t(i,e)})})}function c(a){return a.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;")}function N(a,t){const e=t.state().visited;a.innerHTML=`
    <section class="letter-scene">
      <div class="letter-sky" aria-hidden="true"></div>
      <article class="letter">
        <p class="letter-eyebrow">a little evening, just for you</p>
        <h1>Erika's Cozy Rain Game</h1>
        <p class="hand">For Erika,</p>
        <p>${e?"Welcome home. The rain remembered you. The lamp never really went out.":"It's raining outside, and I wanted you to have a night that feels like us — warm lamp, soft blanket, no rush at all."}</p>
        <p>Babe left the door unlocked. Come in whenever you're ready.</p>
        <p class="letter-sign">with a mug waiting,<br />babe</p>
        <button class="btn btn-lamp" type="button" data-action="enter">Come inside</button>
      </article>
    </section>
  `,b(a,i=>{i==="enter"&&t.go("hub")})}function K(a,t){const e=t.state(),i=e.unlockedKeepsake,s=Math.min(100,Math.round(e.babePoints/A*100));a.innerHTML=`
    <section class="hub">
      <div class="room-stage">
        ${O(i)}
        <canvas class="window-rain room-window-rain" aria-hidden="true"></canvas>
      </div>

      <div class="hub-copy">
        <p class="whisper">${i?"The room kept a little secret for you two. Look — the photo, the heart mug, the plant standing taller.":"The rain is being so gentle against the glass. What does Erika feel like doing?"}</p>
        ${i?'<p class="unlocked-note hand">Babe points unlocked the keepsakes. The room looks more like both of you now.</p>':`<div class="progress" role="img" aria-label="Babe points toward a keepsake">
                <span>a little something is waiting</span>
                <div class="progress-bar"><i style="width:${s}%"></i></div>
              </div>`}
      </div>

      <div class="activities">
        <button class="activity" type="button" data-action="coffee">
          <span class="activity-art">${y.coffee}</span>
          <span class="activity-kicker">in the kitchen</span>
          <strong>Make coffee</strong>
          <em>The kettle already knows your name.</em>
          <span class="chip">cozy points</span>
        </button>
        <button class="activity" type="button" data-action="book">
          <span class="activity-art">${y.book}</span>
          <span class="activity-kicker">by the lamp</span>
          <strong>Read a book</strong>
          <em>The shelf saved you a quiet chapter.</em>
          <span class="chip">cozy points</span>
        </button>
        <button class="activity" type="button" data-action="bake">
          <span class="activity-art">${y.bake}</span>
          <span class="activity-kicker">oven's warm</span>
          <strong>Bake a treat</strong>
          <em>The oven clicked on like it missed you.</em>
          <span class="chip">cozy points</span>
        </button>
        <button class="activity activity-special" type="button" data-action="show">
          <span class="activity-art">${y.show}</span>
          <span class="activity-kicker">the sweet one</span>
          <strong>Watch a show with babe</strong>
          <em>The blanket is already big enough for two.</em>
          <span class="chip chip-babe">extra babe points</span>
        </button>
      </div>
      <p class="gift-line hand">made with a warm lamp and a lot of love</p>
    </section>
  `,b(a,o=>{(o==="coffee"||o==="book"||o==="bake"||o==="show")&&t.go(o)})}function V(a,t){let e=w[0].id,i=k[0].id,s="pick";const o=()=>{const n=w.find(r=>r.id===e),h=k.find(r=>r.id===i);s==="pick"?a.innerHTML=`
        <section class="play">
          <button class="back" type="button" data-action="hub">back to the room</button>
          <h2>Make coffee</h2>
          <p class="lead">Erika, the kettle is already humming. Pick something that smells like staying in.</p>
          <div class="choice-grid">
            ${w.map(r=>`
              <button class="choice ${r.id===e?"is-on":""}" type="button" data-action="bean" data-id="${r.id}">
                <strong>${c(r.name)}</strong>
                <em>${c(r.note)}</em>
              </button>`).join("")}
          </div>
          <h3 class="subhead">How should it become a mug?</h3>
          <div class="choice-grid">
            ${k.map(r=>`
              <button class="choice ${r.id===i?"is-on":""}" type="button" data-action="brew-style" data-id="${r.id}">
                <strong>${c(r.name)}</strong>
                <em>${c(r.note)}</em>
              </button>`).join("")}
          </div>
          <button class="btn btn-lamp" type="button" data-action="start-brew">Warm the mug</button>
        </section>
      `:s==="brew"?(a.innerHTML=`
        <section class="play brew-scene">
          <h2>Almost a hug in a cup</h2>
          <p class="lead">${c(n.name)} · ${c(h.name)}</p>
          <div class="brew-stage is-pouring">
            ${M}
          </div>
          <p class="hand brew-line">Listen — the rain and the pour are doing a little duet.</p>
        </section>
      `,window.setTimeout(()=>{s="share",o()},2600)):a.innerHTML=`
        <section class="play">
          <h2>It's ready, Erika</h2>
          <p class="lead">The first sip fogs your eyelashes a little. ${c(m(W))}</p>
          <div class="brew-stage is-ready">${M}</div>
          <div class="share-row">
            <button class="btn btn-lamp" type="button" data-action="share">Pour a second mug for babe</button>
            <button class="btn btn-ghost" type="button" data-action="solo">Keep this one all to yourself</button>
          </div>
        </section>
      `,b(a,(r,f)=>{r==="hub"&&t.go("hub"),r==="bean"&&(e=f.dataset.id??e),r==="brew-style"&&(i=f.dataset.id??i),(r==="bean"||r==="brew-style")&&o(),r==="start-brew"&&(s="brew",o()),r==="share"&&t.celebrate({cozy:8,babe:2,activity:"coffee",title:"Two mugs on the sill",body:`${n.name}, ${h.name.toLowerCase()} — and a cup waiting for babe. The kitchen feels twice as warm.`}),r==="solo"&&t.celebrate({cozy:8,babe:1,activity:"coffee",title:"A quiet first sip",body:`${n.name} in your favorite mug. Babe will smell it from the other room and smile.`})})};o()}function Y(a,t){let e=null,i=0;const s=()=>{const o=L.find(n=>n.id===e);if(!o)a.innerHTML=`
        <section class="play">
          <button class="back" type="button" data-action="hub">back to the room</button>
          <h2>Read a book</h2>
          <p class="lead">The shelf is a little crooked on purpose. Pick something that wants to be held.</p>
          <div class="shelf">
            ${L.map(n=>`
              <button class="spine" type="button" data-action="open" data-id="${n.id}" style="--spine:${n.color}">
                <span>${c(n.title)}</span>
              </button>`).join("")}
          </div>
        </section>
      `;else{const n=i>=o.pages.length-1;a.innerHTML=`
        <section class="play reading">
          <button class="back" type="button" data-action="shelf">back to the shelf</button>
          <p class="book-meta">${c(o.title)} <span>· ${c(o.author)}</span></p>
          <article class="page ${i>0?"flip":""}">
            <p>${c(o.pages[i])}</p>
            <span class="page-no">${i+1} / ${o.pages.length}</span>
          </article>
          <button class="btn btn-lamp" type="button" data-action="${n?"finish":"next"}">
            ${n?"Close the book for now":"Turn the page"}
          </button>
        </section>
      `}b(a,(n,h)=>{n==="hub"&&t.go("hub"),n==="shelf"&&(e=null,i=0,s()),n==="open"&&(e=h.dataset.id??null,i=0,s()),n==="next"&&(i+=1,s()),n==="finish"&&o&&t.celebrate({cozy:10,babe:1,activity:"book",title:"A ribbon in the page",body:`${o.title} stays on the arm of the chair. ${m(G)}`})})};s()}function U(a,t){let e=v[0].id,i="pick",s=!1,o=0;const n=()=>{const h=v.find(r=>r.id===e);i==="pick"?a.innerHTML=`
        <section class="play">
          <button class="back" type="button" data-action="hub">back to the room</button>
          <h2>Bake a treat</h2>
          <p class="lead">The mixing bowl is already out, like it knew. What should the rain smell like tonight?</p>
          <div class="choice-grid">
            ${v.map(r=>`
              <button class="choice ${r.id===e?"is-on":""}" type="button" data-action="treat" data-id="${r.id}">
                <strong>${c(r.name)}</strong>
                <em>${c(r.note)}</em>
              </button>`).join("")}
          </div>
          <button class="btn btn-lamp" type="button" data-action="mix">Start mixing</button>
        </section>
      `:i==="mix"?a.innerHTML=`
        <section class="play">
          <h2>A little swirl, Erika</h2>
          <p class="lead">Tap the bowl. There is no wrong way to do this.</p>
          <button class="bowl" type="button" data-action="stir" aria-label="Stir the bowl">
            <span class="batter"></span>
            <span class="spoon"></span>
          </button>
          <p class="hand">The batter understands you.</p>
        </section>
      `:i==="oven"?a.innerHTML=`
        <section class="play">
          <h2>${c(h.name)} in the oven</h2>
          <p class="lead">${s?"They're ready whenever you are. Nothing will burn. This kitchen is on your side.":"A cozy little wait. You can check early. The rain will cover the time."}</p>
          <div class="oven ${s?"is-ready":"is-baking"}">
            <div class="oven-window">
              <div class="pan"></div>
              <div class="heat"></div>
            </div>
            <div class="oven-dial"></div>
          </div>
          <button class="btn btn-lamp" type="button" data-action="check">
            ${s?"Take them out":"Peek at the oven"}
          </button>
        </section>
      `:a.innerHTML=`
        <section class="play">
          <h2>Oh, they came out darling</h2>
          <p class="lead">${c(m(j))}</p>
          <div class="treat-done" data-treat="${c(h.id)}"></div>
          <div class="share-row">
            <button class="btn btn-lamp" type="button" data-action="share">Save the corner piece for babe</button>
            <button class="btn btn-ghost" type="button" data-action="solo">A tiny taste first</button>
          </div>
        </section>
      `,b(a,(r,f)=>{if(r==="hub"&&(window.clearTimeout(o),t.go("hub")),r==="treat"&&(e=f.dataset.id??e,n()),r==="mix"&&(i="mix",n()),r==="stir"&&(f.classList.add("is-stirring"),window.setTimeout(()=>{i="oven",s=!1,n(),o=window.setTimeout(()=>{s=!0,i==="oven"&&n()},3200)},700)),r==="check"){if(!s){s=!0,window.clearTimeout(o),n();return}i="done",n()}r==="share"&&t.celebrate({cozy:12,babe:2,activity:"bake",title:"The corner piece has a name on it",body:`${h.name}, still warm. Babe's piece is the one with extra love in the middle.`}),r==="solo"&&t.celebrate({cozy:12,babe:1,activity:"bake",title:"Baker's privilege",body:`${h.name} and a rainy window. You'll wrap one up for babe in a minute.`})})};n()}function J(a,t){let e=x[0].id,i="pick";const s=()=>{const o=x.find(n=>n.id===e);i==="pick"?a.innerHTML=`
        <section class="play show-pick">
          <button class="back" type="button" data-action="hub">back to the room</button>
          <p class="special-tag">the sweetest activity</p>
          <h2>A show on the couch with babe</h2>
          <p class="lead">Babe already dimmed the lamp and pulled the blanket across the middle. The streaming glow is waiting — no logos, no rush, just the two of you and the rain.</p>
          <div class="choice-grid">
            ${x.map(n=>`
              <button class="choice ${n.id===e?"is-on":""}" type="button" data-action="pick-show" data-id="${n.id}">
                <span class="tag">${c(n.tag)}</span>
                <strong>${c(n.title)}</strong>
                <em>${c(n.blurb)}</em>
              </button>`).join("")}
          </div>
          <button class="btn btn-babe" type="button" data-action="dim">Dim the lights with babe</button>
        </section>
      `:i==="watch"?a.innerHTML=`
        <section class="cinema">
          <div class="cinema-frame">
            ${S(c(o.title),!1)}
            <canvas class="window-rain cinema-rain" aria-hidden="true"></canvas>
          </div>
          <p class="cinema-caption hand">Rain on the window. Soft TV glow. A blanket that forgot how to be for one person.</p>
          <button class="btn btn-babe" type="button" data-action="lean">Lean a little closer</button>
        </section>
      `:a.innerHTML=`
        <section class="cinema cinema-close">
          <div class="cinema-frame">
            ${S(c(o.title),!0)}
            <canvas class="window-rain cinema-rain" aria-hidden="true"></canvas>
          </div>
          <p class="cinema-caption">${c(m(F))}</p>
          <button class="btn btn-babe" type="button" data-action="finish">Stay in this glow</button>
        </section>
      `,b(a,(n,h)=>{n==="hub"&&t.go("hub"),n==="pick-show"&&(e=h.dataset.id??e,s()),n==="dim"&&(i="watch",s()),n==="lean"&&(i="lean",s()),n==="finish"&&t.celebrate({cozy:10,babe:18,special:!0,activity:"show",title:"Babe points, plenty",body:`${o.title} flickers on. Erika and babe under one blanket, the rain keeping watch. This is the whole point of the evening.`})})};s()}class _{constructor(t){p(this,"state");p(this,"audio",new H);p(this,"rainStops",[]);this.app=t,this.state=E(),this.audio.setMuted(this.state.muted),this.renderChrome(),this.go(this.state.visited?"hub":"title")}renderChrome(){var e;this.app.innerHTML=`
      <div class="app-shell">
        <canvas class="ambient-rain" aria-hidden="true"></canvas>
        <header class="hud" hidden>
          <div class="brand">
            <p class="brand-kicker">a rainy evening</p>
            <p class="brand-title">Erika's Cozy Rain Game</p>
          </div>
          <div class="meters">
            <p class="meter cozy" title="Cozy Points"><span>Cozy</span> <strong data-cozy>0</strong></p>
            <p class="meter babe" title="Babe Points"><span>Babe</span> <strong data-babe>0</strong></p>
            <button class="mute" type="button" aria-pressed="false" aria-label="Toggle rain sounds"></button>
          </div>
        </header>
        <main class="scene" id="scene"></main>
        <div class="overlay" id="overlay" hidden></div>
      </div>
    `,(e=this.app.querySelector(".mute"))==null||e.addEventListener("click",()=>{this.toggleMute()});const t=this.app.querySelector(".ambient-rain");t&&this.rainStops.push($(t))}api(){return{go:t=>this.go(t),celebrate:t=>this.celebrate(t),state:()=>this.state}}go(t){const e=this.app.querySelector("#scene"),i=this.app.querySelector(".hud");!e||!i||(t==="hub"&&(this.state=R(this.state)),i.hidden=t==="title",i.classList.toggle("is-off",t==="title"),this.syncHud(),this.clearWindowRain(),t==="title"&&N(e,this.api()),t==="hub"&&K(e,this.api()),t==="coffee"&&V(e,this.api()),t==="book"&&Y(e,this.api()),t==="bake"&&U(e,this.api()),t==="show"&&J(e,this.api()),this.bindWindowRain(e),this.audio.start(),this.audio.setMuted(this.state.muted))}celebrate(t){var s;const e=D(this.state,t.cozy,t.babe,t.activity);this.state=e.state,this.syncHud();const i=this.app.querySelector("#overlay");i&&(i.hidden=!1,i.innerHTML=`
      <div class="celebrate ${t.special?"is-special":""} ${e.justUnlocked?"is-unlock":""}">
        <p class="celebrate-kicker">${t.special?"a night with babe":"a cozy little moment"}</p>
        <h2>${t.title}</h2>
        <p>${t.body}</p>
        <div class="point-pills">
          <span class="pill cozy">+${t.cozy} Cozy Points</span>
          ${t.babe?`<span class="pill babe">+${t.babe} Babe Points</span>`:""}
        </div>
        ${e.justUnlocked?'<p class="unlock-line">A keepsake appeared in the room — a shared photo, a heart mug, and a plant that decided to grow.</p>':""}
        <button class="btn ${t.special?"btn-babe":"btn-lamp"}" type="button" data-home>Back to the rainy room</button>
      </div>
    `,(s=i.querySelector("[data-home]"))==null||s.addEventListener("click",()=>{i.hidden=!0,i.innerHTML="",this.go("hub")}))}toggleMute(){this.state=I(this.state,!this.state.muted),this.audio.setMuted(this.state.muted),this.syncHud(),this.state.muted||this.audio.start()}syncHud(){const t=this.app.querySelector("[data-cozy]"),e=this.app.querySelector("[data-babe]"),i=this.app.querySelector(".mute");t&&(t.textContent=String(this.state.cozyPoints)),e&&(e.textContent=String(this.state.babePoints)),i&&(i.setAttribute("aria-pressed",String(this.state.muted)),i.textContent=this.state.muted?"sound off":"rain on")}bindWindowRain(t){t.querySelectorAll("canvas.window-rain").forEach(e=>{this.rainStops.push($(e))})}clearWindowRain(){var e,i;const t=this.rainStops[0];for(let s=1;s<this.rainStops.length;s+=1)(i=(e=this.rainStops)[s])==null||i.call(e);this.rainStops=t?[t]:[]}}const q=document.querySelector("#app");if(!q)throw new Error("Erika's evening could not find a place to land.");new _(q);
