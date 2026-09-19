import "./style.css";
import { Game } from "./game";

const app = document.querySelector<HTMLElement>("#app");
if (!app) {
  throw new Error("Erika's evening could not find a place to land.");
}

new Game(app);
