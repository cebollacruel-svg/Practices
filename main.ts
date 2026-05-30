/* =========================================================
   THE SENTENCE FOUNDRY — game engine (TypeScript)
   Five trials. Trial IV is now a hands-on punctuation workshop:
   the student reads a raw paragraph and drops in the marks by hand
   (no multiple choice). All sentences are fresh.
   ========================================================= */

/* ----------------------- TYPES ----------------------- */
type Flaw = "correct" | "fragment" | "comma_splice" | "run_on";
interface DiagnosisItem { sentence: string; answer: Flaw; why: string; }

interface ChoiceOption { text: string; correct: boolean; note: string; }
interface ChoiceItem { broken: string; prompt: string; options: ChoiceOption[]; }

interface RepairItem { broken: string; kind: string; accepted: string[]; sampleFix: string; why: string; }

type Structure = "point" | "block";
interface ParagraphItem { text: string; answer: Structure; why: string; }

/* Trial IV — punctuation workshop.
   Each token is a word plus the mark that correctly follows it.
   mark "" means no mark belongs after this word. alt = other accepted marks. */
interface PToken { w: string; mark: string; alt: string[]; }
interface PunctuateItem { intro: string; tokens: PToken[]; solution: string; lesson: string; }

type GameId = "diagnose" | "choose" | "repair" | "punctuate" | "structure";
interface GameMeta { id: GameId; num: string; title: string; desc: string; tag: string; arenaName: string; prompt: string; }

/* ----------------------- GAME 1 — DIAGNOSE ----------------------- */
const DIAGNOSIS: DiagnosisItem[] = [
  { sentence: "Whenever the old lighthouse flickered against the rolling fog.", answer: "fragment",
    why: "It begins with <b>whenever</b>, a word that chains the clause to a thought that never arrives. Subject and verb are present, but the door swings open onto nothing." },
  { sentence: "The beekeeper lifted the lid slowly, a golden cloud of bees rose into the warm air.", answer: "comma_splice",
    why: "Two whole sentences fastened with a lone comma. Cover each side — both halves stand on their own, so a comma alone is far too frail to hold them." },
  { sentence: "Water the seedlings before the afternoon sun climbs too high.", answer: "correct",
    why: "It looks subjectless, but it is a <b>command</b> — the subject <i>you</i> is implied. Imperatives are complete sentences in disguise." },
  { sentence: "The comet blazed across the night sky thousands of villagers gathered to watch it.", answer: "run_on",
    why: "Two independent clauses crash together with no punctuation between them — a fused, or run-on, sentence." },
  { sentence: "After midnight, the museum belongs entirely to its shadows.", answer: "correct",
    why: "<b>After</b> tempts you, but here it opens a prepositional phrase, not a clause. The spine — <i>the museum belongs entirely to its shadows</i> — is a full sentence." },
  { sentence: "Octopuses can taste with their arms they solve puzzles faster than most mammals.", answer: "run_on",
    why: "Two complete sentences run straight into each other with no period, semicolon, or conjunction to mark the seam." },
  { sentence: "Which no climber in the village had ever dared to attempt.", answer: "fragment",
    why: "The relative pronoun <b>which</b> forces this clause to lean on something outside itself. Alone, it is a dependent clause masquerading as a sentence." },
  { sentence: "The recipe looked simple, nevertheless, the stubborn dough refused to rise.", answer: "comma_splice",
    why: "<b>Nevertheless</b> is a conjunctive adverb, not a coordinating conjunction — it cannot stitch two sentences with mere commas. It needs a period or semicolon before it." },
  { sentence: "Drifting silently above the canyon, the eagle scanned the rocks for the smallest movement.", answer: "correct",
    why: "<i>Drifting silently above the canyon</i> alone would be a fragment, but here it is properly fastened to the independent clause that follows." },
  { sentence: "A narrow cobblestone street lined with crumbling balconies and tangles of flowering vine.", answer: "fragment",
    why: "A long, lovely noun phrase — and not one true verb in sight (<i>lined</i> is a participle). Without a verb there is no sentence, only a fragment." },
];

/* ----------------------- GAME 2 — CHOOSE THE FIX ----------------------- */
const CHOICES: ChoiceItem[] = [
  { broken: "The volcano had slept for three centuries, no one expected the eruption.",
    prompt: "This is a comma splice. Which rewrite repairs it without breaking something else?",
    options: [
      { text: "The volcano had slept for three centuries no one expected the eruption.", correct: false, note: "Deleting the comma only makes it worse — now it's a run-on." },
      { text: "The volcano had slept for three centuries; no one expected the eruption.", correct: true, note: "A semicolon binds two closely related independent clauses. Clean and correct." },
      { text: "The volcano had slept for three centuries, so, no one expected the eruption.", correct: false, note: "A coordinating conjunction takes a comma <i>before</i> it, never on both sides." },
      { text: "Because the volcano had slept for three centuries.", correct: false, note: "Now it's a dependent-clause fragment — the second thought vanished." },
    ] },
  { broken: "The librarian whispered a warning the students ignored it completely.",
    prompt: "This is a run-on. Which rewrite forges it whole?",
    options: [
      { text: "The librarian whispered a warning, the students ignored it completely.", correct: false, note: "A comma alone between two sentences is a comma splice — not a fix." },
      { text: "The librarian whispered a warning, but the students ignored it completely.", correct: true, note: "Comma + <i>but</i> joins two independent clauses and captures the contrast: warned, yet ignored." },
      { text: "The librarian whispered a warning; but the students ignored it completely.", correct: false, note: "A semicolon already joins; pairing it with <i>but</i> is redundant." },
      { text: "The librarian whispered a warning. Ignored completely by the students.", correct: false, note: "The second piece lost its engine — <i>Ignored completely…</i> is a fragment." },
    ] },
  { broken: "Although the desert looks lifeless at noon.",
    prompt: "This is a fragment. Which rewrite completes the thought correctly?",
    options: [
      { text: "Although the desert looks lifeless at noon, it teems with creatures after dark.", correct: true, note: "An independent clause is added, and the introductory dependent clause is followed by a comma." },
      { text: "Although the desert looks lifeless at noon it teems with creatures after dark.", correct: false, note: "Right idea — but an introductory dependent clause needs a comma before the main clause." },
      { text: "The desert looks lifeless at noon, it teems with creatures after dark.", correct: false, note: "Dropping <i>although</i> leaves two sentences spliced by a comma." },
      { text: "Although the desert looks lifeless at noon; it teems with creatures after dark.", correct: false, note: "A semicolon can't follow a dependent clause — it expects two independent clauses." },
    ] },
  { broken: "Honey never truly spoils, therefore, archaeologists have tasted honey from ancient tombs.",
    prompt: "This is a comma splice with a conjunctive adverb. Which rewrite is correct?",
    options: [
      { text: "Honey never truly spoils, therefore archaeologists have tasted honey from ancient tombs.", correct: false, note: "Still a splice — <i>therefore</i> can't join two sentences with a comma before it." },
      { text: "Honey never truly spoils; therefore, archaeologists have tasted honey from ancient tombs.", correct: true, note: "Semicolon before the conjunctive adverb, comma after it. Textbook-perfect." },
      { text: "Honey never truly spoils therefore, archaeologists have tasted honey from ancient tombs.", correct: false, note: "No punctuation before <i>therefore</i> turns this into a run-on." },
      { text: "Honey never truly spoils, therefore; archaeologists have tasted honey from ancient tombs.", correct: false, note: "The semicolon belongs <i>before</i> the conjunctive adverb, not after." },
    ] },
  { broken: "The owl hunts in total darkness it locates its prey by sound alone.",
    prompt: "This is a run-on. Which rewrite is both correct AND logical?",
    options: [
      { text: "The owl hunts in total darkness, it locates its prey by sound alone.", correct: false, note: "A bare comma between two sentences is a comma splice." },
      { text: "The owl hunts in total darkness; it locates its prey by sound alone.", correct: true, note: "The semicolon links two equal, closely related ideas — and the meaning stays intact." },
      { text: "The owl hunts in total darkness, but it locates its prey by sound alone.", correct: false, note: "Punctuation is fine, yet <i>but</i> signals contrast — the second clause explains <i>how</i>, it doesn't oppose. Wrong connector." },
      { text: "The owl, hunts in total darkness it locates its prey by sound alone.", correct: false, note: "An intrusive comma splits subject from verb, and the run-on survives. Two errors in one." },
    ] },
];

/* ----------------------- GAME 3 — REPAIR SHOP ----------------------- */
const REPAIRS: RepairItem[] = [
  { broken: "The northern lights shimmered for hours, the campers forgot all about sleep.", kind: "comma splice",
    accepted: [
      "The northern lights shimmered for hours. The campers forgot all about sleep.",
      "The northern lights shimmered for hours; the campers forgot all about sleep.",
      "The northern lights shimmered for hours, and the campers forgot all about sleep." ],
    sampleFix: "The northern lights shimmered for hours. The campers forgot all about sleep.",
    why: "Two whole sentences glued with a comma. Split them with a period, bind them with a semicolon, or join them with a comma + <i>and</i>." },
  { broken: "The bridge swayed in the storm the engineers rushed to inspect it.", kind: "run-on",
    accepted: [
      "The bridge swayed in the storm. The engineers rushed to inspect it.",
      "The bridge swayed in the storm; the engineers rushed to inspect it.",
      "The bridge swayed in the storm, so the engineers rushed to inspect it.",
      "The bridge swayed in the storm, and the engineers rushed to inspect it." ],
    sampleFix: "The bridge swayed in the storm, so the engineers rushed to inspect it.",
    why: "Two sentences fused with nothing between them. Because the second follows from the first, a comma + <i>so</i> captures the cause and effect." },
  { broken: "The bakery sells out by dawn, regulars line up long before sunrise.", kind: "comma splice",
    accepted: [
      "The bakery sells out by dawn. Regulars line up long before sunrise.",
      "The bakery sells out by dawn; regulars line up long before sunrise.",
      "The bakery sells out by dawn, so regulars line up long before sunrise." ],
    sampleFix: "The bakery sells out by dawn; regulars line up long before sunrise.",
    why: "A comma can't carry two independent clauses. A semicolon links the cause and its result with elegance — or use a period, or a comma + <i>so</i>." },
  { broken: "Spiders are not insects they have eight legs and two body parts.", kind: "run-on",
    accepted: [
      "Spiders are not insects. They have eight legs and two body parts.",
      "Spiders are not insects; they have eight legs and two body parts.",
      "Spiders are not insects, and they have eight legs and two body parts." ],
    sampleFix: "Spiders are not insects. They have eight legs and two body parts.",
    why: "Two complete thoughts rammed together. A period, a semicolon, or a comma + <i>and</i> all set it right." },
];

/* ----------------------- GAME 4 — PUNCTUATION WORKSHOP ----------------------- */
/* Helper to build tokens tersely: each entry is "word" or "word|MARK" (MARK = , . ;)
   plus optional alternative accepted marks after a second pipe, e.g. "sky|;|." */
function tk(spec: string): PToken {
  const parts = spec.split("|");
  return { w: parts[0], mark: parts[1] || "", alt: parts[2] ? parts[2].split("") : [] };
}
function buildTokens(specs: string[]): PToken[] { return specs.map(tk); }

const PUNCTUATE: PunctuateItem[] = [
  {
    intro: "A school morning. Drop in the marks: a comma after an introductory clause, commas in the list, and periods to end each sentence.",
    tokens: buildTokens([
      "when","the","bell","rings|,","the","students","rush","outside|.",
      "they","bring","sandwiches|,","apples|,","and","cold","lemonade|.",
      "the","youngest","child","laughs","loudly|.",
    ]),
    solution: "When the bell rings, the students rush outside. They bring sandwiches, apples, and cold lemonade. The youngest child laughs loudly.",
    lesson: "<b>rings,</b> — a comma follows an introductory dependent clause. <b>sandwiches, apples,</b> — commas separate a list of three. Periods close each complete sentence.",
  },
  {
    intro: "A sudden storm. Watch for a comma before a joining word, and a semicolon between two closely linked thoughts.",
    tokens: buildTokens([
      "the","storm","rolled","in","fast|,","and","the","streets","emptied|.",
      "lightning","split","the","sky|;|.","thunder","shook","the","windows|.",
      "everyone","waited","indoors|.",
    ]),
    solution: "The storm rolled in fast, and the streets emptied. Lightning split the sky; thunder shook the windows. Everyone waited indoors.",
    lesson: "<b>fast,</b> — a comma goes before the coordinating conjunction <i>and</i> joining two independent clauses. <b>sky;</b> — a semicolon links two closely related sentences (a period would also be correct).",
  },
  {
    intro: "A quiet museum. Combine everything: an introductory-clause comma, list commas, and periods.",
    tokens: buildTokens([
      "although","the","museum","looked","empty|,","treasures","filled","every","room|.",
      "visitors","admired","paintings|,","sculptures|,","and","ancient","coins|.",
      "the","guard","smiled","quietly|.",
    ]),
    solution: "Although the museum looked empty, treasures filled every room. Visitors admired paintings, sculptures, and ancient coins. The guard smiled quietly.",
    lesson: "<b>empty,</b> — the introductory dependent clause takes a comma. <b>paintings, sculptures,</b> — list commas. Periods end each whole sentence.",
  },
];

/* ----------------------- GAME 5 — THE BLUEPRINT ----------------------- */
const PARAGRAPHS: ParagraphItem[] = [
  { text: "When it comes to energy, coffee delivers a sharp jolt within minutes, while tea offers a slower, steadier lift. In terms of ritual, brewing coffee is a quick morning sprint, whereas steeping tea is a patient little ceremony. As for flavor, coffee leans bold and bitter, but tea unfolds in delicate, shifting notes.",
    answer: "point",
    why: "Each sentence seizes one <b>criterion</b> — energy, then ritual, then flavor — and weighs BOTH drinks against it before moving on. Criterion-by-criterion is the <b>point-by-point</b> blueprint." },
  { text: "Summer is a season of motion. Its days stretch long and golden, its streets hum until midnight, and its air smells of cut grass and sunscreen. Winter moves to a slower pulse. Its afternoons fade by four o'clock, its streets fall silent under early frost, and its air bites sharp and clean.",
    answer: "block",
    why: "The paragraph finishes EVERYTHING about summer first, then turns and paints the full portrait of winter. One subject completed, then the other: the <b>block</b> blueprint." },
  { text: "Consider cost first: a bicycle asks only for the occasional tire, whereas a car devours fuel, insurance, and repairs. Next, speed: the car swallows long highways with ease, but the bicycle slips through gridlock the car cannot escape. Finally, health: the cyclist arrives with a pounding heart, while the driver arrives exactly as sedentary as he left.",
    answer: "point",
    why: "Cost, then speed, then health — and each criterion is measured on BOTH machines in the same breath. That march is <b>point-by-point</b>." },
  { text: "A paper book is a creature of the senses. It carries the weight of its pages, it smells faintly of dust and glue, and it wears its history in cracked spines. An e-reader lives by entirely different rules. It weighs nothing in a thousand-volume library, it glows in the dark without a lamp, and it forgets every fingerprint the moment you close it.",
    answer: "block",
    why: "All of the paper book's traits are described first as one complete picture. Only then does the e-reader receive its own full treatment. Subject-by-subject is the <b>block</b> blueprint." },
  { text: "My two brothers could not be more different. In temperament, Mateo is a still lake while Diego is a crashing wave. In their habits, Mateo rises before dawn, whereas Diego greets the world at noon. Even in their dreams they diverge: Mateo longs to build bridges, but Diego longs to tear down walls.",
    answer: "point",
    why: "Don't be fooled by the single subject. Each sentence picks one criterion — temperament, habits, dreams — and applies it to BOTH brothers at once. That is <b>point-by-point</b>." },
];

/* ----------------------- GAME META ----------------------- */
const GAMES: GameMeta[] = [
  { id: "diagnose", num: "TRIAL I", title: "The Diagnosis Lab", desc: "Inspect each specimen and name its disease: fragment, comma splice, run-on — or a perfectly healthy sentence. Beware the impostors.", tag: "Identify &middot; 10 specimens", arenaName: "Trial I &middot; Diagnosis", prompt: "What ails this sentence?" },
  { id: "choose", num: "TRIAL II", title: "The Right Hammer", desc: "The flaw is named. Four rewrites tempt you — but only one heals without wounding. The others smuggle in fresh errors.", tag: "Choose the fix &middot; 5 rounds", arenaName: "Trial II &middot; The Right Hammer", prompt: "Pick the one true repair." },
  { id: "repair", num: "TRIAL III", title: "The Repair Shop", desc: "No options now. Type the sentence whole with your own hands. Keep the words; mend only the break — period, semicolon, or comma + conjunction.", tag: "Type the fix &middot; 4 jobs", arenaName: "Trial III &middot; Repair Shop", prompt: "Forge it whole." },
  { id: "punctuate", num: "TRIAL IV", title: "The Unpunctuated Scroll", desc: "A whole paragraph arrives stripped of every mark. Read it, then click between the words to lay down each comma, period, and semicolon by hand.", tag: "Punctuate by hand &middot; 3 scrolls", arenaName: "Trial IV &middot; The Scroll", prompt: "Punctuate the paragraph." },
  { id: "structure", num: "TRIAL V", title: "Read the Blueprint", desc: "Comparison–contrast paragraphs are built two ways. Read each and name its architecture: point-by-point, or block?", tag: "Identify structure &middot; 5 paragraphs", arenaName: "Trial V &middot; The Blueprint", prompt: "Which blueprint built this paragraph?" },
];

/* ----------------------- HELPERS ----------------------- */
const FLAW_LABEL: Record<Flaw, string> = { correct: "Complete Sentence", fragment: "Fragment", comma_splice: "Comma Splice", run_on: "Run-on Sentence" };
const FLAW_ORDER: Flaw[] = ["correct", "fragment", "comma_splice", "run_on"];

function $(sel: string): HTMLElement {
  const el = document.querySelector(sel);
  if (!el) throw new Error("missing element: " + sel);
  return el as HTMLElement;
}
function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}
function normalize(s: string): string {
  return s.toLowerCase().replace(/[\u2018\u2019]/g, "'").replace(/[\u201C\u201D]/g, '"')
    .replace(/\s*([,;.!?])\s*/g, "$1 ").replace(/\s+/g, " ").replace(/[.\s]+$/g, "").trim();
}

/* ----------------------- STATE ----------------------- */
let current: GameId | null = null;
let order: number[] = [];
let pos = 0;
let score = 0;
let streak = 0;
let answeredThis = false;

/* punctuation-workshop state */
let pMarks: string[] = [];
let pActive = ",";
let pGraded = false;

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
    card.innerHTML = '<span class="gc-num">' + g.num + "</span><h3 class=\"gc-title\">" + g.title + "</h3><p class=\"gc-desc\">" + g.desc + "</p><span class=\"gc-tag\">" + g.tag + "</span>";
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
    case "punctuate": return PUNCTUATE.length;
    case "structure": return PARAGRAPHS.length;
  }
}
function startGame(id: GameId): void {
  current = id;
  const seq = [...Array(lengthOf(id)).keys()];
  order = id === "punctuate" ? seq : shuffle(seq);
  pos = 0; score = 0; streak = 0;
  $("#hud-score").textContent = "0";
  $("#hud-streak").textContent = "0\u00D7";
  $("#arena-game-name").innerHTML = GAMES.find((g) => g.id === id)!.arenaName;
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
  specimen.style.display = "";

  if (current === "diagnose") renderDiagnose(specimen, options);
  else if (current === "choose") renderChoose(specimen, options);
  else if (current === "repair") renderRepair(specimen, options);
  else if (current === "punctuate") renderPunctuate(specimen, options);
  else if (current === "structure") renderStructure(specimen, options);
}

/* ----------------------- DIAGNOSE ----------------------- */
function renderDiagnose(specimen: HTMLElement, options: HTMLElement): void {
  const item = DIAGNOSIS[order[pos]];
  specimen.textContent = item.sentence;
  FLAW_ORDER.forEach((flaw, i) => {
    const b = makeOption(String.fromCharCode(65 + i), FLAW_LABEL[flaw]);
    b.addEventListener("click", () => { if (!answeredThis) lockOptions(i, [FLAW_ORDER.indexOf(item.answer)], item.why); });
    options.appendChild(b);
  });
}

/* ----------------------- CHOOSE ----------------------- */
let lastChoiceOrder: ChoiceOption[] = [];
function renderChoose(specimen: HTMLElement, options: HTMLElement): void {
  const item = CHOICES[order[pos]];
  specimen.textContent = item.broken;
  $("#arena-prompt").innerHTML = item.prompt;
  lastChoiceOrder = shuffle(item.options);
  lastChoiceOrder.forEach((opt, i) => {
    const b = makeOption(String.fromCharCode(65 + i), opt.text);
    b.addEventListener("click", () => { if (!answeredThis) lockOptions(i, [lastChoiceOrder.findIndex((o) => o.correct)], opt.note); });
    options.appendChild(b);
  });
}

/* ----------------------- STRUCTURE ----------------------- */
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
    b.addEventListener("click", () => { if (!answeredThis) lockOptions(i, [lastStructOrder.indexOf(item.answer)], item.why); });
    options.appendChild(b);
  });
}

/* ----------------------- PUNCTUATE (Trial IV) ----------------------- */
function renderPunctuate(specimen: HTMLElement, options: HTMLElement): void {
  const item = PUNCTUATE[order[pos]];
  specimen.style.display = "none";
  pMarks = item.tokens.map(() => "");
  pActive = ",";
  pGraded = false;

  const wrap = document.createElement("div");
  wrap.className = "punc-wrap";

  const intro = document.createElement("p");
  intro.className = "punc-instructions";
  intro.innerHTML = item.intro + " Pick a mark below, then click the gap (&#8203;<span class=\"caret-demo\">&#8896;</span>&#8203;) where it belongs. Click a placed mark again to remove it.";
  wrap.appendChild(intro);

  // palette
  const palette = document.createElement("div");
  palette.className = "palette";
  const marks: { m: string; label: string }[] = [
    { m: ",", label: "," }, { m: ".", label: "." }, { m: ";", label: ";" }, { m: "", label: "erase" },
  ];
  marks.forEach((mk) => {
    const pb = document.createElement("button");
    pb.type = "button";
    pb.className = "pmark" + (mk.m === pActive ? " active" : "");
    pb.dataset.mark = mk.m;
    pb.innerHTML = mk.m === "" ? "&#9003; erase" : mk.label;
    pb.addEventListener("click", () => {
      pActive = mk.m;
      Array.from(palette.querySelectorAll(".pmark")).forEach((x) => x.classList.toggle("active", (x as HTMLElement).dataset.mark === pActive));
    });
    palette.appendChild(pb);
  });
  wrap.appendChild(palette);

  // the paragraph editor
  const para = document.createElement("div");
  para.className = "punc-para";
  para.id = "punc-para";
  wrap.appendChild(para);

  // actions + feedback
  const actions = document.createElement("div");
  actions.className = "punc-actions";
  actions.innerHTML =
    '<button class="forge-btn" id="punc-check" type="button">Check Punctuation</button>' +
    '<button class="link-btn" id="punc-reveal" type="button">Reveal answer</button>';
  wrap.appendChild(actions);

  const fb = document.createElement("p");
  fb.className = "punc-feedback";
  fb.id = "punc-feedback";
  wrap.appendChild(fb);

  options.appendChild(wrap);

  drawPara();
  $("#punc-check").addEventListener("click", checkPunctuation);
  $("#punc-reveal").addEventListener("click", revealPunctuation);
}

/** Render the editable paragraph from current marks, with live capitalization. */
function drawPara(): void {
  const item = PUNCTUATE[order[pos]];
  const para = $("#punc-para");
  para.innerHTML = "";
  let capNext = true;
  item.tokens.forEach((t, i) => {
    const word = document.createElement("span");
    word.className = "word";
    word.textContent = capNext ? t.w.charAt(0).toUpperCase() + t.w.slice(1) : t.w;
    para.appendChild(word);

    const gap = document.createElement("span");
    gap.className = "gap" + (pMarks[i] ? " filled" : "");
    gap.dataset.index = String(i);
    if (pGraded) {
      const accepted = t.mark === "" ? [""] : [t.mark, ...t.alt];
      gap.classList.add(accepted.indexOf(pMarks[i]) >= 0 ? "ok" : "bad");
    }
    gap.innerHTML = pMarks[i] ? '<span class="mk">' + pMarks[i] + "</span>" : '<span class="caret">&#8896;</span>';
    gap.addEventListener("click", () => onGapClick(i));
    para.appendChild(gap);

    // decide capitalization for the NEXT word
    capNext = pMarks[i] === "." ;
    if (i === 0 && false) capNext = false;
  });
}
function onGapClick(i: number): void {
  if (answeredThis) return;
  if (pMarks[i] === pActive && pActive !== "") pMarks[i] = "";
  else pMarks[i] = pActive;
  pGraded = false;
  $("#punc-feedback").textContent = "";
  drawPara();
}
function gradePunctuation(): { allOk: boolean; placed: number; misplaced: number; missing: number } {
  const item = PUNCTUATE[order[pos]];
  let placed = 0, misplaced = 0, missing = 0, allOk = true;
  item.tokens.forEach((t, i) => {
    const accepted = t.mark === "" ? [""] : [t.mark, ...t.alt];
    const sm = pMarks[i];
    if (sm !== "") placed++;
    const ok = accepted.indexOf(sm) >= 0;
    if (!ok) {
      allOk = false;
      if (sm === "") missing++; else misplaced++;
    }
  });
  return { allOk, placed, misplaced, missing };
}
function checkPunctuation(): void {
  if (answeredThis) return;
  const g = gradePunctuation();
  pGraded = true;
  drawPara();
  if (g.allOk) {
    answeredThis = true;
    score++; streak++;
    $("#hud-score").textContent = String(score);
    $("#hud-streak").textContent = streak + "\u00D7";
    ($("#punc-check") as HTMLButtonElement).disabled = true;
    ($("#punc-reveal") as HTMLButtonElement).style.display = "none";
    finishPunctuation(true);
  } else {
    const bits: string[] = [];
    if (g.misplaced > 0) bits.push(g.misplaced + (g.misplaced === 1 ? " mark is misplaced or wrong" : " marks are misplaced or wrong"));
    if (g.missing > 0) bits.push(g.missing + (g.missing === 1 ? " needed mark is still missing" : " needed marks are still missing"));
    const fb = $("#punc-feedback");
    fb.className = "punc-feedback bad";
    fb.innerHTML = "Not yet — " + bits.join(", and ") + ". The green marks are right; adjust the rest and check again.";
  }
}
function revealPunctuation(): void {
  if (answeredThis) return;
  answeredThis = true;
  streak = 0;
  $("#hud-streak").textContent = "0\u00D7";
  ($("#punc-check") as HTMLButtonElement).disabled = true;
  ($("#punc-reveal") as HTMLButtonElement).style.display = "none";
  finishPunctuation(false);
}
function finishPunctuation(success: boolean): void {
  const item = PUNCTUATE[order[pos]];
  const head = $("#verdict-head");
  head.textContent = success ? "Perfectly punctuated. \u2726" : "Here is the mended scroll.";
  head.className = "verdict-head " + (success ? "good" : "bad");
  $("#verdict-why").innerHTML = item.lesson + "<br><br>The whole, mended scroll: <span class=\"fix\">" + item.solution + "</span>";
  ($("#verdict") as HTMLElement).hidden = false;
}

/* ----------------------- REPAIR ----------------------- */
function renderRepair(specimen: HTMLElement, options: HTMLElement): void {
  const item = REPAIRS[order[pos]];
  specimen.textContent = item.broken;
  const box = document.createElement("div");
  box.className = "repair-box";
  box.innerHTML =
    '<p class="repair-hint">Diagnosis: <b>' + item.kind + "</b>. Keep the same words — change only the punctuation, or add a coordinating conjunction (and, but, or, nor, for, yet, so).</p>" +
    '<textarea class="repair-input" id="repair-input" placeholder="Type the mended sentence here&hellip;" autocomplete="off" spellcheck="false"></textarea>' +
    '<div class="repair-row"><button class="forge-btn" id="repair-submit" type="button">Strike the Anvil</button><span class="repair-note">period &middot; semicolon &middot; comma + conjunction</span></div>';
  options.appendChild(box);
  const input = $("#repair-input") as HTMLTextAreaElement;
  const submit = () => {
    if (answeredThis) return;
    const ok = item.accepted.some((a) => normalize(a) === normalize(input.value));
    if (ok) revealRepair(true);
    else {
      input.classList.remove("shake"); void input.offsetWidth; input.classList.add("shake");
      $(".repair-note").textContent = "Not yet — check your punctuation and keep every original word.";
    }
  };
  $("#repair-submit").addEventListener("click", submit);
  input.addEventListener("keydown", (e) => { const ev = e as KeyboardEvent; if (ev.key === "Enter" && ev.ctrlKey) submit(); });
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

/* ----------------------- SHARED ----------------------- */
function makeOption(key: string, text: string): HTMLButtonElement {
  const b = document.createElement("button");
  b.className = "opt"; b.type = "button";
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
function next(): void { pos++; if (pos >= order.length) endGame(); else renderQuestion(); }
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
