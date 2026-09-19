export const beans = [
  {
    id: "rainy",
    name: "Rainy Day Blend",
    note: "Dark, a little chocolate — like the good umbrella.",
  },
  {
    id: "vanilla",
    name: "Vanilla Haze",
    note: "Soft and sweet, the sweater of coffees.",
  },
  {
    id: "letter",
    name: "Morning Letter",
    note: "Bright. The kind babe brews on slow Sundays.",
  },
] as const;

export const brews = [
  {
    id: "pour",
    name: "Pour over",
    note: "A little ceremony. Steam first, then patience.",
  },
  {
    id: "press",
    name: "French press",
    note: "Heavy mug energy. Perfect for the windowsill.",
  },
  {
    id: "mug",
    name: "Big cozy drip",
    note: "No fuss. Just a warm cup and the rain.",
  },
] as const;

export const books = [
  {
    id: "lamp",
    title: "The Lamp Stayed On",
    author: "M. Holloway",
    color: "#c97b84",
    pages: [
      "The house did not mind the storm. It had practiced this kind of weather for years — the tick of the radiator, the pale streetlight through the curtain, the kettle that always knew when someone needed it.",
      "She left the lamp on in the other room, not because she was afraid of the dark, but because it felt like leaving a light on for someone who was already home.",
      "Outside, the rain kept its promise. Inside, the page was warm. That was enough for one evening.",
    ],
  },
  {
    id: "letters",
    title: "Letters from the Window Seat",
    author: "Juniper Vale",
    color: "#7d9bb3",
    pages: [
      "I am writing this with my knees tucked up and the glass cold against my shoulder. The city is a watercolor tonight. I keep thinking of you every time a car passes and the window turns gold.",
      "Do you remember the night we decided rain was a season we could share? I still do. I still save you the good corner of the couch.",
      "If this letter finds you on a gray evening, consider it an invitation to stay in. I already put the kettle on.",
    ],
  },
  {
    id: "knit",
    title: "Knit, Purl, Darling",
    author: "S. Cardamom",
    color: "#8fa87a",
    pages: [
      "Chapter four is just about a scarf that refuses to be finished, and a person who keeps adding rows because the rain has not stopped and the company is good.",
      "There is a kind of love that looks like handing someone the other needle. There is a kind of evening that looks like that, too.",
      "She counted stitches the way some people count blessings. Softly. Without making a list.",
    ],
  },
  {
    id: "land",
    title: "A Soft Place to Land",
    author: "Ivy Brennan",
    color: "#d4a373",
    pages: [
      "They did not need a grand reunion. They needed socks, and leftover soup, and a show they had already seen, and the particular quiet of a room that knew both of their names.",
      "Erika — if a book could look up from the page, it would look at you like this: fondly, and with no hurry.",
      "Love, in this chapter, is a blanket pulled a little more to the left. You know the one.",
    ],
  },
  {
    id: "soup",
    title: "Soup for the Storm",
    author: "N. Willow",
    color: "#b08968",
    pages: [
      "Recipe: onions until they forgive you, broth that tastes like staying in, bread torn by hand. Serve in the mug that has a chip you refuse to throw away.",
      "The storm can have the streets. We have the stove, and we have time, and we have each other in the next room.",
      "She closed the book with a ribbon and smiled like the last page had been written for her. Maybe it had.",
    ],
  },
] as const;

export const treats = [
  {
    id: "cookies",
    name: "Chocolate chip cookies",
    note: "The classic. Extra chips, slightly underbaked in the middle.",
  },
  {
    id: "brownies",
    name: "Fudgy brownies",
    note: "Shiny top. Gooey center. Dangerous in the best way.",
  },
  {
    id: "banana",
    name: "Banana bread",
    note: "The bananas were waiting for a night like this.",
  },
  {
    id: "rolls",
    name: "Cinnamon rolls",
    note: "The whole apartment will smell like a hug.",
  },
] as const;

export const shows = [
  {
    id: "bakery",
    title: "The Bakery on Willow Lane",
    tag: "comfort series",
    blurb: "Small town, warm ovens, everyone ends up okay.",
  },
  {
    id: "raincheck",
    title: "Rain Check",
    tag: "gentle mystery",
    blurb: "Someone stole a soup recipe. The detective is mostly kind.",
  },
  {
    id: "rerun",
    title: "Our Favorite Rerun",
    tag: "the one you restart",
    blurb: "You both know every line. That is the point.",
  },
] as const;

export const coffeeDone = [
  "The kitchen smells like a hug, Erika.",
  "Steam on the window. Perfect.",
  "Babe would steal a sip of this and pretend it was an accident.",
];

export const bookDone = [
  "You dog-ear the page for later. The rain agrees.",
  "A quiet chapter, just for you.",
  "The lamp feels proud of itself.",
];

export const bakeDone = [
  "The oven did its little miracle.",
  "Warm. Sweet. The rain can keep the rest of the world.",
  "Babe is going to ask for the corner piece. Obviously.",
];

export const showDone = [
  "This is the best part of the storm.",
  "Babe's shoulder is the correct pillow. Science.",
  "The show could be anything. The evening is the point.",
];

export function pick<T>(list: readonly T[]): T {
  return list[Math.floor(Math.random() * list.length)]!;
}
