/* =========================================================
   THE SENTENCE FOUNDRY — game engine (TypeScript)
   Five trials: fragments / run-ons / comma splices, punctuating
   a raw paragraph, and reading comparison-contrast structure.
   No timer. All sentences are fresh (none reused from the videos).
   ========================================================= */

/* ----------------------- TYPES ----------------------- */
type Flaw = "correct" | "fragment" | "comma_splice" | "run_on";

interface DiagnosisItem { sentence: string; answer: Flaw; why: string; }

interface ChoiceOption { text: string; correct: boolean; note: string; }
interface ChoiceItem { broken: string; prompt: string; options: ChoiceOption[]; }

interface RepairItem { broken: string; kind: string; accepted: string[]; sampleFix: string; why: string; }

type Structure = "point" | "block";
interface ParagraphItem { text: string; answer: Structure; why: string; }

interface SignalJunction { left: string; right: string; why: string; }
interface SignalParagraph { full: string; finale: string; junctions: SignalJunction[]; }
interface SignalOption { label: string; correct: boolean; }

type GameId = "diagnose" | "choose" | "repair" | "signal" | "structure";
interface GameMeta { id: GameId; num: string; title: string; desc: string; tag: string; arenaName: string; prompt: string; }

/* ----------------------- GAME 1 — DIAGNOSE ----------------------- */
const DIAGNOSIS: DiagnosisItem[] = [
  {
    sentence: "Whenever the old lighthouse flickered against the rolling fog.",
    answer: "fragment",
    why: "It begins with <b>whenever</b>, a word that chains the clause to a thought that never arrives. Subject and verb are present, but the door swings open onto nothing — no independent clause to complete it.",
  },
  {
    sentence: "The beekeeper lifted the lid slowly, a golden cloud of bees rose into the warm air.",
    answer: "comma_splice",
    why: "Two whole sentences fastened with a lone comma. Cover each side of the comma — both halves stand on their own, so a comma alone is far too frail to hold them. That's a comma splice.",
  },
  {
    sentence: "Water the seedlings before the afternoon sun climbs too high.",
    answer: "correct",
    why: "It looks subjectless, but it is a <b>command</b> — the subject <i>you</i> is implied. Imperatives are complete sentences wearing a disguise.",
  },
  {
    sentence: "The comet blazed across the night sky thousands of villagers gathered to watch it.",
    answer: "run_on",
    why: "Two independent clauses crash together with no punctuation between them — a fused, or run-on, sentence. Where one thought ends and the next begins is left to pure guesswork.",
  },
  {
    sentence: "After midnight, the museum belongs entirely to its shadows.",
    answer: "correct",
    why: "<b>After</b> tempts you to call this dependent, but here it opens a prepositional phrase, not a clause. The spine — <i>the museum belongs entirely to its shadows</i> — is a full, healthy sentence.",
  },
  {
    sentence: "Octopuses can taste with their arms they solve puzzles faster than most mammals.",
    answer: "run_on",
    why: "Two complete sentences run straight into each other with no period, semicolon, or conjunction to mark the seam. A textbook run-on.",
  },
  {
    sentence: "Which no climber in the village had ever dared to attempt.",
    answer: "fragment",
    why: "The relative pronoun <b>which</b> forces this clause to lean on something outside itself. Alone, it is a dependent clause masquerading as a sentence.",
  },
  {
    sentence: "The recipe looked simple, nevertheless, the stubborn dough refused to rise.",
    answer: "comma_splice",
    why: "<b>Nevertheless</b> is a conjunctive adverb, not a coordinating conjunction — it cannot stitch two sentences with mere commas. This is a comma splice in a fancy coat. It needs a period or semicolon before <i>nevertheless</i>.",
  },
  {
    sentence: "Drifting silently above the canyon, the eagle scanned the rocks for the smallest movement.",
    answer: "correct",
    why: "<i>Drifting silently above the canyon</i> alone would be a fragment, but it is properly fastened to the independent clause <i>the eagle scanned the rocks&hellip;</i> A complete, polished sentence.",
  },
  {
    sentence: "A narrow cobblestone street lined with crumbling balconies and tangles of flowering vine.",
    answer: "fragment",
    why: "A long, lovely noun phrase &mdash; and not one true verb in sight (<i>lined</i> is a participle dressing up the street). Without a verb there is no action, no sentence, only a fragment rich in detail.",
  },
];

/* ----------------------- GAME 2 — CHOOSE THE FIX ----------------------- */
const CHOICES: ChoiceItem[] = [
  {
    broken: "The volcano had slept for three centuries, no one expected the eruption.",
    prompt: "This is a comma splice. Which rewrite repairs it without breaking something else?",
    options: [
      { text: "The volcano had slept for three centuries no one expected the eruption.", correct: false, note: "Deleting the comma only makes things worse — now it's a run-on." },
      { text: "The volcano had slept for three centuries; no one expected the eruption.", correct: true, note: "A semicolon binds two closely related independent clauses. Clean and correct." },
      { text: "The volcano had slept for three centuries, so, no one expected the eruption.", correct: false, note: "A coordinating conjunction takes a comma <i>before</i> it, never a comma on both sides." },
      { text: "Because the volcano had slept for three centuries.", correct: false, note: "Now it's a dependent-clause fragment — the second thought vanished entirely." },
    ],
  },
  {
    broken: "The librarian whispered a warning the students ignored it completely.",
    prompt: "This is a run-on. Which rewrite forges it whole?",
    options: [
      { text: "The librarian whispered a warning, the students ignored it completely.", correct: false, note: "A comma alone between two sentences is a comma splice — a different error, not a fix." },
      { text: "The librarian whispered a warning, but the students ignored it completely.", correct: true, note: "Comma + <i>but</i> joins two independent clauses and captures the contrast: warned, yet ignored." },
      { text: "The librarian whispered a warning; but the students ignored it completely.", correct: false, note: "A semicolon already joins; pairing it with <i>but</i> is redundant and nonstandard." },
      { text: "The librarian whispered a warning. Ignored completely by the students.", correct: false, note: "The second piece lost its engine — <i>Ignored completely&hellip;</i> is now a fragment." },
    ],
  },
  {
    broken: "Although the desert looks lifeless at noon.",
    prompt: "This is a fragment. Which rewrite completes the thought correctly?",
    options: [
      { text: "Although the desert looks lifeless at noon, it teems with creatures after dark.", correct: true, note: "An independent clause is added, and the introductory dependent clause is followed by a comma." },
      { text: "Although the desert looks lifeless at noon it teems with creatures after dark.", correct: false, note: "Right idea — but an introductory dependent clause needs a comma before the main clause." },
      { text: "The desert looks lifeless at noon, it teems with creatures after dark.", correct: false, note: "Dropping <i>although</i> leaves two sentences spliced by a comma — a comma splice." },
      { text: "Although the desert looks lifeless at noon; it teems with creatures after dark.", correct: false, note: "A semicolon can't follow a dependent clause — it expects two independent clauses." },
    ],
  },
  {
    broken: "Honey never truly spoils, therefore, archaeologists have tasted honey from ancient tombs.",
    prompt: "This is a comma splice with a conjunctive adverb. Which rewrite is correct?",
    options: [
      { text: "Honey never truly spoils, therefore archaeologists have tasted honey from ancient tombs.", correct: false, note: "Still a splice — <i>therefore</i> can't join two sentences with a comma in front of it." },
      { text: "Honey never truly spoils; therefore, archaeologists have tasted honey from ancient tombs.", correct: true, note: "Semicolon before the conjunctive adverb, comma after it. Textbook-perfect." },
      { text: "Honey never truly spoils therefore, archaeologists have tasted honey from ancient tombs.", correct: false, note: "No punctuation before <i>therefore</i> turns this into a run-on." },
      { text: "Honey never truly spoils, therefore; archaeologists have tasted honey from ancient tombs.", correct: false, note: "The semicolon is on the wrong side — it belongs <i>before</i> the conjunctive adverb." },
    ],
  },
  {
    broken: "The owl hunts in total darkness it locates its prey by sound alone.",
    prompt: "This is a run-on. Which rewrite is both correct AND logical?",
    options: [
      { text: "The owl hunts in total darkness, it locates its prey by sound alone.", correct: false, note: "A bare comma between two sentences is a comma splice." },
      { text: "The owl hunts in total darkness; it locates its prey by sound alone.", correct: true, note: "The semicolon links two equal, closely related ideas — and the meaning stays intact." },
      { text: "The owl hunts in total darkness, but it locates its prey by sound alone.", correct: false, note: "The punctuation is fine, yet <i>but</i> signals contrast — and the second clause explains <i>how</i> it hunts, it doesn't oppose it. Wrong connector, twisted meaning." },
      { text: "The owl, hunts in total darkness it locates its prey by sound alone.", correct: false, note: "An intrusive comma splits subject from verb, and the run-on survives. Two errors in one." },
    ],
  },
];

/* ----------------------- GAME 3 — REPAIR SHOP ----------------------- */
const REPAIRS: RepairItem[] = [
  {
    broken: "The northern lights shimmered for hours, the campers forgot all about sleep.",
    kind: "comma splice",
    accepted: [
      "The northern lights shimmered for hours. The campers forgot all about sleep.",
      "The northern lights shimmered for hours; the campers forgot all about sleep.",
      "The northern lights shimmered for hours, and the campers forgot all about sleep.",
    ],
    sampleFix: "The northern lights shimmered for hours. The campers forgot all about sleep.",
    why: "Two whole sentences glued with a comma. Split them with a period, bind them with a semicolon, or join them with a comma + <i>and</i>.",
  },
  {
    broken: "The bridge swayed in the storm the engineers rushed to inspect it.",
    kind: "run-on",
    accepted: [
      "The bridge swayed in the storm. The engineers rushed to inspect it.",
      "The bridge swayed in the storm; the engineers rushed to inspect it.",
      "The bridge swayed in the storm, so the engineers rushed to inspect it.",
      "The bridge swayed in the storm, and the engineers rushed to inspect it.",
    ],
    sampleFix: "The bridge swayed in the storm, so the engineers rushed to inspect it.",
    why: "Two sentences fused with nothing between them. Because the second follows from the first, a comma + <i>so</i> captures the cause and effect — though a period or semicolon work too.",
  },
  {
    broken: "The bakery sells out by dawn, regulars line up long before sunrise.",
    kind: "comma splice",
    accepted: [
      "The bakery sells out by dawn. Regulars line up long before sunrise.",
      "The bakery sells out by dawn; regulars line up long before sunrise.",
      "The bakery sells out by dawn, so regulars line up long before sunrise.",
    ],
    sampleFix: "The bakery sells out by dawn; regulars line up long before sunrise.",
    why: "A comma can't carry two independent clauses. A semicolon links the cause and its result with elegance — or use a period, or a comma + <i>so</i>.",
  },
  {
    broken: "Spiders are not insects they have eight legs and two body parts.",
    kind: "run-on",
    accepted: [
      "Spiders are not insects. They have eight legs and two body parts.",
      "Spiders are not insects; they have eight legs and two body parts.",
      "Spiders are not insects, and they have eight legs and two body parts.",
    ],
    sampleFix: "Spiders are not insects. They have eight legs and two body parts.",
    why: "Two complete thoughts rammed together. The second offers the evidence for the first, so a period, a semicolon, or a comma + <i>and</i> all set it right.",
  },
];

/* ----------------------- GAME 4 — THE BLUEPRINT (point vs block) ----------------------- */
const PARAGRAPHS: ParagraphItem[] = [
  {
    text: "When it comes to energy, coffee delivers a sharp jolt within minutes, while tea offers a slower, steadier lift. In terms of ritual, brewing coffee is a quick morning sprint, whereas steeping tea is a patient little ceremony. As for flavor, coffee leans bold and bitter, but tea unfolds in delicate, shifting notes.",
    answer: "point",
    why: "Each sentence seizes one <b>criterion</b> — energy, then ritual, then flavor — and weighs BOTH drinks against it before moving on. Bouncing criterion-by-criterion is the signature of the <b>point-by-point</b> blueprint.",
  },
  {
    text: "Summer is a season of motion. Its days stretch long and golden, its streets hum until midnight, and its air smells of cut grass and sunscreen. Winter moves to a slower pulse. Its afternoons fade by four o'clock, its streets fall silent under early frost, and its air bites sharp and clean.",
    answer: "block",
    why: "The paragraph finishes EVERYTHING about summer first — days, streets, air — then turns and paints the full portrait of winter using the same traits. One subject completed, then the other: the <b>block</b> blueprint.",
  },
  {
    text: "Consider cost first: a bicycle asks only for the occasional tire, whereas a car devours fuel, insurance, and repairs. Next, speed: the car swallows long highways with ease, but the bicycle slips through gridlock the car cannot escape. Finally, health: the cyclist arrives with a pounding heart and stronger legs, while the driver arrives exactly as sedentary as he left.",
    answer: "point",
    why: "Cost, then speed, then health — and each criterion is measured on BOTH machines in the same breath. That criterion-by-criterion march is <b>point-by-point</b>.",
  },
  {
    text: "A paper book is a creature of the senses. It carries the weight of its pages, it smells faintly of dust and glue, and it wears its history in cracked spines and dog-eared corners. An e-reader lives by entirely different rules. It weighs nothing in a thousand-volume library, it glows in the dark without a lamp, and it forgets every fingerprint the moment you close it.",
    answer: "block",
    why: "All of the paper book's traits — weight, smell, wear — are described first as one complete picture. Only then does the e-reader receive its own full treatment. Subject-by-subject is the <b>block</b> blueprint.",
  },
  {
    text: "My two brothers could not be more different. In temperament, Mateo is a still lake while Diego is a crashing wave. In their habits, Mateo rises before dawn, whereas Diego greets the world at noon. Even in their dreams they diverge: Mateo longs to build bridges, but Diego longs to tear down walls.",
    answer: "point",
    why: "Don't be fooled by the single subject. Each sentence picks one criterion — temperament, then habits, then dreams — and applies it to BOTH brothers at once. Criterion-by-criterion means <b>point-by-point</b>.",
  },
];

/* ----------------------- GAME 5 — THE UNPUNCTUATED SCROLL ----------------------- */
const SIGNAL: SignalParagraph = {
  full: "the tide slips out at dawn it leaves a hundred glittering pools behind each pool looks calm on the surface it hides a fierce little world below hungry gulls patrol the wet sand above the smallest crabs burrow quickly out of sight",
  finale: "The tide slips out at dawn, and it leaves a hundred glittering pools behind. Each pool looks calm on the surface, but it hides a fierce little world below. Hungry gulls patrol the wet sand above, so the smallest crabs burrow quickly out of sight.",
  junctions: [
    {
      left: "the tide slips out at dawn",
      right: "it leaves a hundred glittering pools behind",
      why: "Two complete thoughts. Since the second simply <b>adds</b> to the first, a comma + <i>and</i> flows best — though a period would also be correct. A lone comma here is a <b>comma splice</b>; nothing at all is a <b>run-on</b>.",
    },
    {
      left: "it leaves a hundred glittering pools behind",
      right: "each pool looks calm on the surface",
      why: "A fresh idea opens here, so a <b>period</b> reads cleanest (a comma + <i>and</i> works too). The lone comma (splice) and the missing signal (run-on) are both errors.",
    },
    {
      left: "each pool looks calm on the surface",
      right: "it hides a fierce little world below",
      why: "The second thought <b>contradicts</b> the first — calm above, fierce below — so a comma + <i>but</i> captures the contrast beautifully. A period is fine too; a bare comma or no signal are the traps.",
    },
    {
      left: "it hides a fierce little world below",
      right: "hungry gulls patrol the wet sand above",
      why: "A new scene arrives — the gulls — so a <b>period</b> (or a comma + <i>and</i>) keeps the thoughts whole. Never a lone comma; never nothing.",
    },
    {
      left: "hungry gulls patrol the wet sand above",
      right: "the smallest crabs burrow quickly out of sight",
      why: "<b>Cause and effect</b>: gulls hunt, so crabs hide. A comma + <i>so</i> nails the logic, and a period works as well. A comma alone splices; no signal fuses.",
    },
  ],
};
const SIGNAL_OPTIONS: SignalOption[] = [
  { label: "Add a period — split it into two separate sentences.", correct: true },
  { label: "Add a comma + a joining word (and, but, so&hellip;).", correct: true },
  { label: "Add just a comma.", correct: false },
  { label: "Add nothing — let the words run together.", correct: false },
];

/* ----------------------- GAME META ----------------------- */
const GAMES: GameMeta[] = [
  { id: "diagnose", num: "TRIAL I", title: "The Diagnosis Lab", desc: "Inspect each specimen and name its disease: fragment, comma splice, run-on — or a perfectly healthy sentence. Beware the impostors.", tag: "Identify &middot; 10 specimens", arenaName: "Trial I &middot; Diagnosis", prompt: "What ails this sentence?" },
  { id: "choose", num: "TRIAL II", title: "The Right Hammer", desc: "The flaw is named. Four rewrites tempt you — but only one heals without wounding. The others smuggle in fresh errors.", tag: "Choose the fix &middot; 5 rounds", arenaName: "Trial II &middot; The Right Hammer", prompt: "Pick the one true repair." },
  { id: "repair", num: "TRIAL III", title: "The Repair Shop", desc: "No options now. Type the sentence whole with your own hands. Keep the words; mend only the break — period, semicolon, or comma + conjunction.", tag: "Type the fix &middot; 4 jobs", arenaName: "Trial III &middot; Repair Shop", prompt: "Forge it whole." },
  { id: "signal", num: "TRIAL IV", title: "The Unpunctuated Scroll", desc: "A whole paragraph arrives with every mark stripped away. Travel gap by gap and lay down the correct signal so the sentences breathe again.", tag: "Punctuate &middot; 5 gaps", arenaName: "Trial IV &middot; The Scroll", prompt: "What signal belongs in this gap?" },
  { id: "structure", num: "TRIAL V", title: "Read the Blueprint", desc: "Comparison–contrast paragraphs are built two ways. Read each and name its architecture: point-by-point, or block?", tag: "Identify structure &middot; 5 paragraphs", arenaName: "Trial V &middot; The Blueprint", prompt: "Which blueprint built this paragraph?" },
];

/* ----------------------- HELPERS ----------------------- */
const FLAW_LABEL: Record<Flaw, string> = {
  correct: "Complete Sentence",
  fragment: "Fragment",
  comma_splice: "Comma Splice",
  run_on: "Run-on Sentence",
};
const FLAW_ORDER: Flaw[] = ["correct", "fragment", "comma_splice", "run_on"];

function $(sel: string): HTMLElement {
  const el = document.querySelector(sel);
  if (!el) throw new Error("missing element: " + sel);
  return el as HTMLElement;
}

function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Lenient-but-meaningful comparison: forgive capitalization and curly
 *  quotes; never forgive punctuation logic. */
function normalize(s: string): string {
  return s
    .toLowerCase()
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/\s*([,;.!?])\s*/g, "$1 ")
    .replace(/\s+/g, " ")
    .replace(/[.\s]+$/g, "")
    .trim();
}

/* ----------------------- STATE ----------------------- */
let current: GameId | null = null;
let order: number[] = [];
let pos = 0;
let score = 0;
let streak = 0;
let answeredThis = false;

/* ----------------------- SCREENS ----------------------- */
function show(screen: "hub" | "game" | "result"): void {
  ["hub", "game", "result"].forEach((s) => $("#" + s).classList.toggle("is-active", s === screen));
}

/* ----------------------- HUB ----------------------- */
function buildHub(): void {
  const grid = $("#hub-grid");
  grid.innerHTML = "";
  GAMES.forEach((g) => {
    const card = document.createElement("button");
    card.className = "game-card";
    card.type = "button";
    card.innerHTML =
      '<span class="gc-num">' + g.num + "</span>" +
      '<h3 class="gc-title">' + g.title + "</h3>" +
      '<p class="gc-desc">' + g.desc + "</p>" +
      '<span class="gc-tag">' + g.tag + "</span>";
    card.addEventListener("click", () => startGame(g.id));
    grid.appendChild(card);
  });
}

/* ----------------------- START / FLOW ----------------------- */
function lengthOf(id: GameId): number {
  switch (id) {
    case "diagnose": return DIAGNOSIS.length;
    case "choose": return CHOICES.length;
    case "repair": return REPAIRS.length;
    case "signal": return SIGNAL.junctions.length;
    case "structure": return PARAGRAPHS.length;
  }
}

function startGame(id: GameId): void {
  current = id;
  const n = lengthOf(id);
  const seq = [...Array(n).keys()];
  order = id === "signal" ? seq : shuffle(seq); // the scroll must stay in order
  pos = 0; score = 0; streak = 0;
  $("#hud-score").textContent = "0";
  $("#hud-streak").textContent = "0\u00D7";
  const meta = GAMES.find((g) => g.id === id)!;
  $("#arena-game-name").innerHTML = meta.arenaName;
  show("game");
  renderQuestion();
}

function renderQuestion(): void {
  answeredThis = false;
  const meta = GAMES.find((g) => g.id === current)!;
  const total = order.length;
  $("#hud-progress").textContent = (pos + 1) + " / " + total;
  ($("#progress-fill") as HTMLElement).style.width = (pos / total) * 100 + "%";
  $("#arena-prompt").innerHTML = meta.prompt;
  ($("#verdict") as HTMLElement).hidden = true;

  const specimen = $("#specimen");
  const options = $("#options");
  options.innerHTML = "";
  specimen.className = "specimen";

  if (current === "diagnose") renderDiagnose(specimen, options);
  else if (current === "choose") renderChoose(specimen, options);
  else if (current === "repair") renderRepair(specimen, options);
  else if (current === "signal") renderSignal(specimen, options);
  else if (current === "structure") renderStructure(specimen, options);
}

/* ----------------------- RENDER: DIAGNOSE ----------------------- */
function renderDiagnose(specimen: HTMLElement, options: HTMLElement): void {
  const item = DIAGNOSIS[order[pos]];
  specimen.textContent = item.sentence;
  FLAW_ORDER.forEach((flaw, i) => {
    const b = makeOption(String.fromCharCode(65 + i), FLAW_LABEL[flaw]);
    b.addEventListener("click", () => {
      if (answeredThis) return;
      lockOptions(i, [FLAW_ORDER.indexOf(item.answer)], item.why);
    });
    options.appendChild(b);
  });
}

/* ----------------------- RENDER: CHOOSE ----------------------- */
let lastChoiceOrder: ChoiceOption[] = [];
function renderChoose(specimen: HTMLElement, options: HTMLElement): void {
  const item = CHOICES[order[pos]];
  specimen.textContent = item.broken;
  $("#arena-prompt").innerHTML = item.prompt;
  lastChoiceOrder = shuffle(item.options);
  lastChoiceOrder.forEach((opt, i) => {
    const b = makeOption(String.fromCharCode(65 + i), opt.text);
    b.addEventListener("click", () => {
      if (answeredThis) return;
      const correctIdx = lastChoiceOrder.findIndex((o) => o.correct);
      lockOptions(i, [correctIdx], opt.note);
    });
    options.appendChild(b);
  });
}

/* ----------------------- RENDER: STRUCTURE ----------------------- */
let lastStructOrder: Structure[] = [];
function renderStructure(specimen: HTMLElement, options: HTMLElement): void {
  const item = PARAGRAPHS[order[pos]];
  specimen.className = "specimen is-paragraph";
  specimen.textContent = item.text;
  lastStructOrder = ["point", "block"];
  const labels: Record<Structure, string> = {
    point: "Point-by-Point \u00B7 each criterion judged on both subjects",
    block: "Block \u00B7 all of subject X, then all of subject Y",
  };
  lastStructOrder.forEach((st, i) => {
    const b = makeOption(String.fromCharCode(65 + i), labels[st]);
    b.addEventListener("click", () => {
      if (answeredThis) return;
      lockOptions(i, [lastStructOrder.indexOf(item.answer)], item.why);
    });
    options.appendChild(b);
  });
}

/* ----------------------- RENDER: SIGNAL (the scroll) ----------------------- */
function renderSignal(specimen: HTMLElement, options: HTMLElement): void {
  const j = SIGNAL.junctions[pos];
  specimen.className = "specimen is-scroll";
  specimen.textContent = SIGNAL.full;

  const ctx = document.createElement("p");
  ctx.className = "gap-context";
  ctx.innerHTML = "&hellip; " + j.left + " <span class=\"gap-mark\">&#9646;</span> " + j.right + " &hellip;";
  options.appendChild(ctx);

  SIGNAL_OPTIONS.forEach((opt, i) => {
    const b = makeOption(String.fromCharCode(65 + i), opt.label);
    b.addEventListener("click", () => {
      if (answeredThis) return;
      const correctIdxs = SIGNAL_OPTIONS.map((o, idx) => (o.correct ? idx : -1)).filter((x) => x >= 0);
      let why = j.why;
      if (pos === SIGNAL.junctions.length - 1) {
        why += "<br><br>Whole and mended: <span class=\"fix\">" + SIGNAL.finale + "</span>";
      }
      lockOptions(i, correctIdxs, why);
    });
    options.appendChild(b);
  });
}

/* ----------------------- RENDER: REPAIR ----------------------- */
function renderRepair(specimen: HTMLElement, options: HTMLElement): void {
  const item = REPAIRS[order[pos]];
  specimen.textContent = item.broken;
  const box = document.createElement("div");
  box.className = "repair-box";
  box.innerHTML =
    '<p class="repair-hint">Diagnosis: <b>' + item.kind + "</b>. Keep the same words — change only the punctuation, or add a coordinating conjunction (and, but, or, nor, for, yet, so).</p>" +
    '<textarea class="repair-input" id="repair-input" placeholder="Type the mended sentence here&hellip;" autocomplete="off" spellcheck="false"></textarea>' +
    '<div class="repair-row">' +
    '<button class="forge-btn" id="repair-submit" type="button">Strike the Anvil</button>' +
    '<span class="repair-note">period &middot; semicolon &middot; comma + conjunction</span>' +
    "</div>";
  options.appendChild(box);

  const input = $("#repair-input") as HTMLTextAreaElement;
  const submit = () => {
    if (answeredThis) return;
    const ok = item.accepted.some((a) => normalize(a) === normalize(input.value));
    if (ok) { revealRepair(true); }
    else {
      input.classList.remove("shake"); void input.offsetWidth; input.classList.add("shake");
      $(".repair-note").textContent = "Not yet — check your punctuation and keep every original word.";
    }
  };
  $("#repair-submit").addEventListener("click", submit);
  input.addEventListener("keydown", (e) => {
    const ev = e as KeyboardEvent;
    if (ev.key === "Enter" && ev.ctrlKey) submit();
  });
  input.focus();
}

function revealRepair(success: boolean): void {
  answeredThis = true;
  const item = REPAIRS[order[pos]];
  const input = $("#repair-input") as HTMLTextAreaElement;
  input.disabled = true;
  $("#repair-submit").setAttribute("disabled", "true");
  if (success) { score++; streak++; } else { streak = 0; }
  $("#hud-score").textContent = String(score);
  $("#hud-streak").textContent = streak + "\u00D7";
  const head = $("#verdict-head");
  head.textContent = success ? "Forged whole. \u2726" : "Reveal";
  head.className = "verdict-head " + (success ? "good" : "bad");
  $("#verdict-why").innerHTML = item.why + "<br><br>One clean repair: <span class=\"fix\">" + item.sampleFix + "</span>";
  ($("#verdict") as HTMLElement).hidden = false;
}

/* ----------------------- SHARED: option element + locking ----------------------- */
function makeOption(key: string, text: string): HTMLButtonElement {
  const b = document.createElement("button");
  b.className = "opt";
  b.type = "button";
  b.innerHTML = '<span class="opt-key">' + key + '</span><span class="opt-text">' + text + "</span>";
  return b;
}

function lockOptions(chosenIdx: number, correctIdxs: number[], why: string): void {
  answeredThis = true;
  const opts = Array.from($("#options").querySelectorAll(".opt")) as HTMLButtonElement[];
  opts.forEach((o, i) => {
    o.setAttribute("disabled", "true");
    if (correctIdxs.indexOf(i) >= 0) o.classList.add("correct");
    else if (i === chosenIdx) o.classList.add("wrong");
    else o.classList.add("dim");
  });
  const success = correctIdxs.indexOf(chosenIdx) >= 0;
  if (success) { score++; streak++; } else { streak = 0; }
  $("#hud-score").textContent = String(score);
  $("#hud-streak").textContent = streak + "\u00D7";

  const head = $("#verdict-head");
  head.textContent = success ? "Correct. \u2726" : "Not quite.";
  head.className = "verdict-head " + (success ? "good" : "bad");
  $("#verdict-why").innerHTML = why;
  ($("#verdict") as HTMLElement).hidden = false;
}

/* ----------------------- NEXT / END ----------------------- */
function next(): void {
  pos++;
  if (pos >= order.length) endGame();
  else renderQuestion();
}

function endGame(): void {
  const total = order.length;
  ($("#progress-fill") as HTMLElement).style.width = "100%";
  $("#result-score").innerHTML = score + ' <span class="slash">/</span> ' + total;
  const pct = score / total;
  let rank: string, blurb: string;
  if (pct === 1) { rank = "Master Smith"; blurb = "A flawless run. Every flaw named, every break mended. The forge bows to you."; }
  else if (pct >= 0.7) { rank = "Journeyman Editor"; blurb = "Strong hands at the anvil. A few sparks escaped, but your sentences hold."; }
  else if (pct >= 0.4) { rank = "Apprentice"; blurb = "The craft is coming. Re-read the verdicts, then return to the fire."; }
  else { rank = "Bellows Tender"; blurb = "Every master once burned the first batch. Study the explanations and forge again."; }
  $("#result-rank").textContent = rank;
  $("#result-blurb").textContent = blurb;
  show("result");
}

/* ----------------------- WIRING ----------------------- */
function init(): void {
  buildHub();
  $("#next-btn").addEventListener("click", next);
  $("#quit-btn").addEventListener("click", () => show("hub"));
  $("#home-btn").addEventListener("click", () => show("hub"));
  $("#retry-btn").addEventListener("click", () => { if (current) startGame(current); });
  show("hub");
}

document.addEventListener("DOMContentLoaded", init);
