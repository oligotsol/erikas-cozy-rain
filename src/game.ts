import { attachRain } from "./rain";
import { RainAudio } from "./audio";
import { awardPoints, loadState, markVisited, setMuted, type GameState } from "./state";
import { renderBake, renderBook, renderCoffee, renderHub, renderShow, renderTitle, type SceneApi } from "./scenes";

type SceneName = "title" | "hub" | "coffee" | "book" | "bake" | "show";

export class Game {
  private state: GameState;
  private audio = new RainAudio();
  private rainStops: Array<() => void> = [];

  constructor(private readonly app: HTMLElement) {
    this.state = loadState();
    this.audio.setMuted(this.state.muted);
    this.renderChrome();
    this.go(this.state.visited ? "hub" : "title");
  }

  private renderChrome(): void {
    this.app.innerHTML = `
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
    `;

    this.app.querySelector(".mute")?.addEventListener("click", () => {
      this.toggleMute();
    });

    const ambient = this.app.querySelector<HTMLCanvasElement>(".ambient-rain");
    if (ambient) this.rainStops.push(attachRain(ambient));
  }

  private api(): SceneApi {
    return {
      go: (scene) => this.go(scene),
      celebrate: (opts) => this.celebrate(opts),
      state: () => this.state,
    };
  }

  private go(scene: SceneName): void {
    const sceneEl = this.app.querySelector<HTMLElement>("#scene");
    const hud = this.app.querySelector<HTMLElement>(".hud");
    if (!sceneEl || !hud) return;

    if (scene === "hub") {
      this.state = markVisited(this.state);
    }

    hud.hidden = scene === "title";
    hud.classList.toggle("is-off", scene === "title");
    this.syncHud();
    this.clearWindowRain();

    if (scene === "title") renderTitle(sceneEl, this.api());
    if (scene === "hub") renderHub(sceneEl, this.api());
    if (scene === "coffee") renderCoffee(sceneEl, this.api());
    if (scene === "book") renderBook(sceneEl, this.api());
    if (scene === "bake") renderBake(sceneEl, this.api());
    if (scene === "show") renderShow(sceneEl, this.api());

    this.bindWindowRain(sceneEl);
    void this.audio.start();
    this.audio.setMuted(this.state.muted);
  }

  private celebrate(opts: {
    cozy: number;
    babe: number;
    title: string;
    body: string;
    special?: boolean;
    activity: "coffee" | "book" | "bake" | "show";
  }): void {
    const result = awardPoints(this.state, opts.cozy, opts.babe, opts.activity);
    this.state = result.state;
    this.syncHud();

    const overlay = this.app.querySelector<HTMLElement>("#overlay");
    if (!overlay) return;
    overlay.hidden = false;
    overlay.innerHTML = `
      <div class="celebrate ${opts.special ? "is-special" : ""} ${result.justUnlocked ? "is-unlock" : ""}">
        <p class="celebrate-kicker">${opts.special ? "a night with babe" : "a cozy little moment"}</p>
        <h2>${opts.title}</h2>
        <p>${opts.body}</p>
        <div class="point-pills">
          <span class="pill cozy">+${opts.cozy} Cozy Points</span>
          ${opts.babe ? `<span class="pill babe">+${opts.babe} Babe Points</span>` : ""}
        </div>
        ${
          result.justUnlocked
            ? `<p class="unlock-line">A keepsake appeared in the room — a shared photo, a heart mug, and a plant that decided to grow.</p>`
            : ""
        }
        <button class="btn ${opts.special ? "btn-babe" : "btn-lamp"}" type="button" data-home>Back to the rainy room</button>
      </div>
    `;
    overlay.querySelector("[data-home]")?.addEventListener("click", () => {
      overlay.hidden = true;
      overlay.innerHTML = "";
      this.go("hub");
    });
  }

  private toggleMute(): void {
    this.state = setMuted(this.state, !this.state.muted);
    this.audio.setMuted(this.state.muted);
    this.syncHud();
    if (!this.state.muted) void this.audio.start();
  }

  private syncHud(): void {
    const cozy = this.app.querySelector("[data-cozy]");
    const babe = this.app.querySelector("[data-babe]");
    const mute = this.app.querySelector<HTMLButtonElement>(".mute");
    if (cozy) cozy.textContent = String(this.state.cozyPoints);
    if (babe) babe.textContent = String(this.state.babePoints);
    if (mute) {
      mute.setAttribute("aria-pressed", String(this.state.muted));
      mute.textContent = this.state.muted ? "sound off" : "rain on";
    }
  }

  private bindWindowRain(sceneEl: HTMLElement): void {
    sceneEl.querySelectorAll<HTMLCanvasElement>("canvas.window-rain").forEach((canvas) => {
      this.rainStops.push(attachRain(canvas));
    });
  }

  private clearWindowRain(): void {
    const ambient = this.rainStops[0];
    for (let i = 1; i < this.rainStops.length; i += 1) {
      this.rainStops[i]?.();
    }
    this.rainStops = ambient ? [ambient] : [];
  }
}
