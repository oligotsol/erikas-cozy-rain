import { cinemaArt, coffeeArt, icons, roomArt } from "./art";
import { books, beans, brews, treats, shows, pick, coffeeDone, bookDone, bakeDone, showDone } from "./copy";
import type { GameState } from "./state";
import { UNLOCK_THRESHOLD } from "./state";
import { escapeHtml, onAction } from "./ui";

export interface SceneApi {
  go: (scene: "title" | "hub" | "coffee" | "book" | "bake" | "show") => void;
  celebrate: (opts: {
    cozy: number;
    babe: number;
    title: string;
    body: string;
    special?: boolean;
    activity: "coffee" | "book" | "bake" | "show";
  }) => void;
  state: () => GameState;
}

export function renderTitle(root: HTMLElement, api: SceneApi): void {
  const returning = api.state().visited;
  root.innerHTML = `
    <section class="letter-scene">
      <div class="letter-sky" aria-hidden="true"></div>
      <article class="letter">
        <p class="letter-eyebrow">a little evening, just for you</p>
        <h1>Erika's Cozy Rain Game</h1>
        <p class="hand">For Erika,</p>
        <p>${
          returning
            ? "Welcome home. The rain remembered you. The lamp never really went out."
            : "It's raining outside, and I wanted you to have a night that feels like us — warm lamp, soft blanket, no rush at all."
        }</p>
        <p>Babe left the door unlocked. Come in whenever you're ready.</p>
        <p class="letter-sign">with a mug waiting,<br />babe</p>
        <button class="btn btn-lamp" type="button" data-action="enter">Come inside</button>
      </article>
    </section>
  `;
  onAction(root, (action) => {
    if (action === "enter") api.go("hub");
  });
}

export function renderHub(root: HTMLElement, api: SceneApi): void {
  const state = api.state();
  const unlocked = state.unlockedKeepsake;
  const progress = Math.min(100, Math.round((state.babePoints / UNLOCK_THRESHOLD) * 100));

  root.innerHTML = `
    <section class="hub">
      <div class="room-stage">
        ${roomArt(unlocked)}
        <canvas class="window-rain room-window-rain" aria-hidden="true"></canvas>
      </div>

      <div class="hub-copy">
        <p class="whisper">${
          unlocked
            ? "The room kept a little secret for you two. Look — the photo, the heart mug, the plant standing taller."
            : "The rain is being so gentle against the glass. What does Erika feel like doing?"
        }</p>
        ${
          !unlocked
            ? `<div class="progress" role="img" aria-label="Babe points toward a keepsake">
                <span>a little something is waiting</span>
                <div class="progress-bar"><i style="width:${progress}%"></i></div>
              </div>`
            : `<p class="unlocked-note hand">Babe points unlocked the keepsakes. The room looks more like both of you now.</p>`
        }
      </div>

      <div class="activities">
        <button class="activity" type="button" data-action="coffee">
          <span class="activity-art">${icons.coffee}</span>
          <span class="activity-kicker">in the kitchen</span>
          <strong>Make coffee</strong>
          <em>The kettle already knows your name.</em>
          <span class="chip">cozy points</span>
        </button>
        <button class="activity" type="button" data-action="book">
          <span class="activity-art">${icons.book}</span>
          <span class="activity-kicker">by the lamp</span>
          <strong>Read a book</strong>
          <em>The shelf saved you a quiet chapter.</em>
          <span class="chip">cozy points</span>
        </button>
        <button class="activity" type="button" data-action="bake">
          <span class="activity-art">${icons.bake}</span>
          <span class="activity-kicker">oven's warm</span>
          <strong>Bake a treat</strong>
          <em>The oven clicked on like it missed you.</em>
          <span class="chip">cozy points</span>
        </button>
        <button class="activity activity-special" type="button" data-action="show">
          <span class="activity-art">${icons.show}</span>
          <span class="activity-kicker">the sweet one</span>
          <strong>Watch a show with babe</strong>
          <em>The blanket is already big enough for two.</em>
          <span class="chip chip-babe">extra babe points</span>
        </button>
      </div>
      <p class="gift-line hand">made with a warm lamp and a lot of love</p>
    </section>
  `;

  onAction(root, (action) => {
    if (action === "coffee" || action === "book" || action === "bake" || action === "show") {
      api.go(action);
    }
  });
}

export function renderCoffee(root: HTMLElement, api: SceneApi): void {
  let beanId = beans[0].id;
  let brewId = brews[0].id;
  let step: "pick" | "brew" | "share" = "pick";

  const paint = () => {
    const bean = beans.find((item) => item.id === beanId)!;
    const brew = brews.find((item) => item.id === brewId)!;

    if (step === "pick") {
      root.innerHTML = `
        <section class="play">
          <button class="back" type="button" data-action="hub">back to the room</button>
          <h2>Make coffee</h2>
          <p class="lead">Erika, the kettle is already humming. Pick something that smells like staying in.</p>
          <div class="choice-grid">
            ${beans
              .map(
                (item) => `
              <button class="choice ${item.id === beanId ? "is-on" : ""}" type="button" data-action="bean" data-id="${item.id}">
                <strong>${escapeHtml(item.name)}</strong>
                <em>${escapeHtml(item.note)}</em>
              </button>`,
              )
              .join("")}
          </div>
          <h3 class="subhead">How should it become a mug?</h3>
          <div class="choice-grid">
            ${brews
              .map(
                (item) => `
              <button class="choice ${item.id === brewId ? "is-on" : ""}" type="button" data-action="brew-style" data-id="${item.id}">
                <strong>${escapeHtml(item.name)}</strong>
                <em>${escapeHtml(item.note)}</em>
              </button>`,
              )
              .join("")}
          </div>
          <button class="btn btn-lamp" type="button" data-action="start-brew">Warm the mug</button>
        </section>
      `;
    } else if (step === "brew") {
      root.innerHTML = `
        <section class="play brew-scene">
          <h2>Almost a hug in a cup</h2>
          <p class="lead">${escapeHtml(bean.name)} · ${escapeHtml(brew.name)}</p>
          <div class="brew-stage is-pouring">
            ${coffeeArt}
          </div>
          <p class="hand brew-line">Listen — the rain and the pour are doing a little duet.</p>
        </section>
      `;
      window.setTimeout(() => {
        step = "share";
        paint();
      }, 2600);
    } else {
      root.innerHTML = `
        <section class="play">
          <h2>It's ready, Erika</h2>
          <p class="lead">The first sip fogs your eyelashes a little. ${escapeHtml(pick(coffeeDone))}</p>
          <div class="brew-stage is-ready">${coffeeArt}</div>
          <div class="share-row">
            <button class="btn btn-lamp" type="button" data-action="share">Pour a second mug for babe</button>
            <button class="btn btn-ghost" type="button" data-action="solo">Keep this one all to yourself</button>
          </div>
        </section>
      `;
    }

    onAction(root, (action, el) => {
      if (action === "hub") api.go("hub");
      if (action === "bean") beanId = (el.dataset.id as typeof beanId) ?? beanId;
      if (action === "brew-style") brewId = (el.dataset.id as typeof brewId) ?? brewId;
      if (action === "bean" || action === "brew-style") paint();
      if (action === "start-brew") {
        step = "brew";
        paint();
      }
      if (action === "share") {
        api.celebrate({
          cozy: 8,
          babe: 2,
          activity: "coffee",
          title: "Two mugs on the sill",
          body: `${bean.name}, ${brew.name.toLowerCase()} — and a cup waiting for babe. The kitchen feels twice as warm.`,
        });
      }
      if (action === "solo") {
        api.celebrate({
          cozy: 8,
          babe: 1,
          activity: "coffee",
          title: "A quiet first sip",
          body: `${bean.name} in your favorite mug. Babe will smell it from the other room and smile.`,
        });
      }
    });
  };

  paint();
}

export function renderBook(root: HTMLElement, api: SceneApi): void {
  let bookId: (typeof books)[number]["id"] | null = null;
  let page = 0;

  const paint = () => {
    const book = books.find((item) => item.id === bookId);

    if (!book) {
      root.innerHTML = `
        <section class="play">
          <button class="back" type="button" data-action="hub">back to the room</button>
          <h2>Read a book</h2>
          <p class="lead">The shelf is a little crooked on purpose. Pick something that wants to be held.</p>
          <div class="shelf">
            ${books
              .map(
                (item) => `
              <button class="spine" type="button" data-action="open" data-id="${item.id}" style="--spine:${item.color}">
                <span>${escapeHtml(item.title)}</span>
              </button>`,
              )
              .join("")}
          </div>
        </section>
      `;
    } else {
      const last = page >= book.pages.length - 1;
      root.innerHTML = `
        <section class="play reading">
          <button class="back" type="button" data-action="shelf">back to the shelf</button>
          <p class="book-meta">${escapeHtml(book.title)} <span>· ${escapeHtml(book.author)}</span></p>
          <article class="page ${page > 0 ? "flip" : ""}">
            <p>${escapeHtml(book.pages[page]!)}</p>
            <span class="page-no">${page + 1} / ${book.pages.length}</span>
          </article>
          <button class="btn btn-lamp" type="button" data-action="${last ? "finish" : "next"}">
            ${last ? "Close the book for now" : "Turn the page"}
          </button>
        </section>
      `;
    }

    onAction(root, (action, el) => {
      if (action === "hub") api.go("hub");
      if (action === "shelf") {
        bookId = null;
        page = 0;
        paint();
      }
      if (action === "open") {
        bookId = (el.dataset.id as typeof bookId) ?? null;
        page = 0;
        paint();
      }
      if (action === "next") {
        page += 1;
        paint();
      }
      if (action === "finish" && book) {
        api.celebrate({
          cozy: 10,
          babe: 1,
          activity: "book",
          title: "A ribbon in the page",
          body: `${book.title} stays on the arm of the chair. ${pick(bookDone)}`,
        });
      }
    });
  };

  paint();
}

export function renderBake(root: HTMLElement, api: SceneApi): void {
  let treatId = treats[0].id;
  let step: "pick" | "mix" | "oven" | "done" = "pick";
  let ovenReady = false;
  let ovenTimer = 0;

  const paint = () => {
    const treat = treats.find((item) => item.id === treatId)!;

    if (step === "pick") {
      root.innerHTML = `
        <section class="play">
          <button class="back" type="button" data-action="hub">back to the room</button>
          <h2>Bake a treat</h2>
          <p class="lead">The mixing bowl is already out, like it knew. What should the rain smell like tonight?</p>
          <div class="choice-grid">
            ${treats
              .map(
                (item) => `
              <button class="choice ${item.id === treatId ? "is-on" : ""}" type="button" data-action="treat" data-id="${item.id}">
                <strong>${escapeHtml(item.name)}</strong>
                <em>${escapeHtml(item.note)}</em>
              </button>`,
              )
              .join("")}
          </div>
          <button class="btn btn-lamp" type="button" data-action="mix">Start mixing</button>
        </section>
      `;
    } else if (step === "mix") {
      root.innerHTML = `
        <section class="play">
          <h2>A little swirl, Erika</h2>
          <p class="lead">Tap the bowl. There is no wrong way to do this.</p>
          <button class="bowl" type="button" data-action="stir" aria-label="Stir the bowl">
            <span class="batter"></span>
            <span class="spoon"></span>
          </button>
          <p class="hand">The batter understands you.</p>
        </section>
      `;
    } else if (step === "oven") {
      root.innerHTML = `
        <section class="play">
          <h2>${escapeHtml(treat.name)} in the oven</h2>
          <p class="lead">${
            ovenReady
              ? "They're ready whenever you are. Nothing will burn. This kitchen is on your side."
              : "A cozy little wait. You can check early. The rain will cover the time."
          }</p>
          <div class="oven ${ovenReady ? "is-ready" : "is-baking"}">
            <div class="oven-window">
              <div class="pan"></div>
              <div class="heat"></div>
            </div>
            <div class="oven-dial"></div>
          </div>
          <button class="btn btn-lamp" type="button" data-action="check">
            ${ovenReady ? "Take them out" : "Peek at the oven"}
          </button>
        </section>
      `;
    } else {
      root.innerHTML = `
        <section class="play">
          <h2>Oh, they came out darling</h2>
          <p class="lead">${escapeHtml(pick(bakeDone))}</p>
          <div class="treat-done" data-treat="${escapeHtml(treat.id)}"></div>
          <div class="share-row">
            <button class="btn btn-lamp" type="button" data-action="share">Save the corner piece for babe</button>
            <button class="btn btn-ghost" type="button" data-action="solo">A tiny taste first</button>
          </div>
        </section>
      `;
    }

    onAction(root, (action, el) => {
      if (action === "hub") {
        window.clearTimeout(ovenTimer);
        api.go("hub");
      }
      if (action === "treat") {
        treatId = (el.dataset.id as typeof treatId) ?? treatId;
        paint();
      }
      if (action === "mix") {
        step = "mix";
        paint();
      }
      if (action === "stir") {
        el.classList.add("is-stirring");
        window.setTimeout(() => {
          step = "oven";
          ovenReady = false;
          paint();
          ovenTimer = window.setTimeout(() => {
            ovenReady = true;
            if (step === "oven") paint();
          }, 3200);
        }, 700);
      }
      if (action === "check") {
        if (!ovenReady) {
          ovenReady = true;
          window.clearTimeout(ovenTimer);
          paint();
          return;
        }
        step = "done";
        paint();
      }
      if (action === "share") {
        api.celebrate({
          cozy: 12,
          babe: 2,
          activity: "bake",
          title: "The corner piece has a name on it",
          body: `${treat.name}, still warm. Babe's piece is the one with extra love in the middle.`,
        });
      }
      if (action === "solo") {
        api.celebrate({
          cozy: 12,
          babe: 1,
          activity: "bake",
          title: "Baker's privilege",
          body: `${treat.name} and a rainy window. You'll wrap one up for babe in a minute.`,
        });
      }
    });
  };

  paint();
}

export function renderShow(root: HTMLElement, api: SceneApi): void {
  let showId = shows[0].id;
  let step: "pick" | "watch" | "lean" = "pick";

  const paint = () => {
    const show = shows.find((item) => item.id === showId)!;

    if (step === "pick") {
      root.innerHTML = `
        <section class="play show-pick">
          <button class="back" type="button" data-action="hub">back to the room</button>
          <p class="special-tag">the sweetest activity</p>
          <h2>A show on the couch with babe</h2>
          <p class="lead">Babe already dimmed the lamp and pulled the blanket across the middle. The streaming glow is waiting — no logos, no rush, just the two of you and the rain.</p>
          <div class="choice-grid">
            ${shows
              .map(
                (item) => `
              <button class="choice ${item.id === showId ? "is-on" : ""}" type="button" data-action="pick-show" data-id="${item.id}">
                <span class="tag">${escapeHtml(item.tag)}</span>
                <strong>${escapeHtml(item.title)}</strong>
                <em>${escapeHtml(item.blurb)}</em>
              </button>`,
              )
              .join("")}
          </div>
          <button class="btn btn-babe" type="button" data-action="dim">Dim the lights with babe</button>
        </section>
      `;
    } else if (step === "watch") {
      root.innerHTML = `
        <section class="cinema">
          <div class="cinema-frame">
            ${cinemaArt(escapeHtml(show.title), false)}
            <canvas class="window-rain cinema-rain" aria-hidden="true"></canvas>
          </div>
          <p class="cinema-caption hand">Rain on the window. Soft TV glow. A blanket that forgot how to be for one person.</p>
          <button class="btn btn-babe" type="button" data-action="lean">Lean a little closer</button>
        </section>
      `;
    } else {
      root.innerHTML = `
        <section class="cinema cinema-close">
          <div class="cinema-frame">
            ${cinemaArt(escapeHtml(show.title), true)}
            <canvas class="window-rain cinema-rain" aria-hidden="true"></canvas>
          </div>
          <p class="cinema-caption">${escapeHtml(pick(showDone))}</p>
          <button class="btn btn-babe" type="button" data-action="finish">Stay in this glow</button>
        </section>
      `;
    }

    onAction(root, (action, el) => {
      if (action === "hub") api.go("hub");
      if (action === "pick-show") {
        showId = (el.dataset.id as typeof showId) ?? showId;
        paint();
      }
      if (action === "dim") {
        step = "watch";
        paint();
      }
      if (action === "lean") {
        step = "lean";
        paint();
      }
      if (action === "finish") {
        api.celebrate({
          cozy: 10,
          babe: 18,
          special: true,
          activity: "show",
          title: "Babe points, plenty",
          body: `${show.title} flickers on. Erika and babe under one blanket, the rain keeping watch. This is the whole point of the evening.`,
        });
      }
    });
  };

  paint();
}
