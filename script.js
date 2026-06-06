"use strict";
/* =====================================================================
   THE SENTENCE FOUNDRY — Space-dark slide edition
   Full tracking: student name · correct/incorrect · detail log → Sheets
   Designed by Rosney Hernández
   ===================================================================== */

const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzMz4Vdq9rYDxbnj1APwDI79KyFxR-z5mcIjMttVXVHzWLv_FRGi17h1DO6Ec6c3t_j/exec";

/* ── GAME DATA ───────────────────────────────── */
const DIAGNOSIS = [
  { sentence:"Whenever the old lighthouse flickered against the rolling fog.", answer:"fragment", why:"It begins with <b>whenever</b>, a subordinating conjunction — the clause leans on a main thought that never arrives. No independent clause = fragment." },
  { sentence:"The beekeeper lifted the lid slowly, a golden cloud of bees rose into the warm air.", answer:"comma_splice", why:"Two whole sentences fastened by a lone comma. Cover each side — both halves stand alone. That's a <b>comma splice</b>." },
  { sentence:"Water the seedlings before the afternoon sun climbs too high.", answer:"correct", why:"This is a <b>command</b> — the subject <i>you</i> is implied. Imperatives are complete sentences." },
  { sentence:"The comet blazed across the night sky thousands of villagers gathered to watch it.", answer:"run_on", why:"Two independent clauses crash together with no punctuation — a <b>run-on</b> (fused) sentence." },
  { sentence:"After midnight, the museum belongs entirely to its shadows.", answer:"correct", why:"<b>After</b> here opens a prepositional phrase, not a clause. The main clause is complete and healthy." },
  { sentence:"Octopuses can taste with their arms they solve puzzles faster than most mammals.", answer:"run_on", why:"Two complete sentences with nothing between them. A textbook <b>run-on</b>." },
  { sentence:"Which no climber in the village had ever dared to attempt.", answer:"fragment", why:"The relative pronoun <b>which</b> forces this clause to lean on something outside itself. Alone it is a <b>fragment</b>." },
  { sentence:"The recipe looked simple, nevertheless, the stubborn dough refused to rise.", answer:"comma_splice", why:"<b>Nevertheless</b> is a conjunctive adverb — it needs a semicolon before it. This is a <b>comma splice</b>." },
  { sentence:"Drifting silently above the canyon, the eagle scanned the rocks for the smallest movement.", answer:"correct", why:"The participial phrase is correctly attached to the independent clause. <b>Complete and correct.</b>" },
  { sentence:"A narrow cobblestone street lined with crumbling balconies and tangles of flowering vine.", answer:"fragment", why:"A rich noun phrase with no main verb. <i>Lined</i> is a participle, not a finite verb. No verb = <b>fragment</b>." },
];

const CHOICES = [
  { broken:"The volcano had slept for three centuries, no one expected the eruption.", prompt:"This is a comma splice. Which rewrite repairs it?",
    options:[
      {text:"The volcano had slept for three centuries no one expected the eruption.", correct:false, note:"Deleting the comma only makes things worse — now it's a run-on."},
      {text:"The volcano had slept for three centuries; no one expected the eruption.", correct:true,  note:"A semicolon binds two closely related independent clauses. Clean and correct."},
      {text:"The volcano had slept for three centuries, so, no one expected the eruption.", correct:false, note:"A coordinating conjunction takes a comma <i>before</i> it, never on both sides."},
      {text:"Because the volcano had slept for three centuries.", correct:false, note:"Now it's a dependent-clause fragment — the second thought vanished."},
    ]},
  { broken:"The librarian whispered a warning the students ignored it completely.", prompt:"This is a run-on. Which rewrite forges it whole?",
    options:[
      {text:"The librarian whispered a warning, the students ignored it completely.", correct:false, note:"A comma alone between two sentences is a comma splice."},
      {text:"The librarian whispered a warning, but the students ignored it completely.", correct:true,  note:"Comma + <i>but</i> joins two independent clauses and captures the contrast."},
      {text:"The librarian whispered a warning; but the students ignored it completely.", correct:false, note:"A semicolon already joins — pairing it with <i>but</i> is redundant."},
      {text:"The librarian whispered a warning. Ignored completely by the students.", correct:false, note:"<i>Ignored completely…</i> is now a fragment."},
    ]},
  { broken:"Although the desert looks lifeless at noon.", prompt:"This is a fragment. Which rewrite completes the thought correctly?",
    options:[
      {text:"Although the desert looks lifeless at noon, it teems with creatures after dark.", correct:true,  note:"An independent clause is added and the introductory clause gets a comma. Perfect."},
      {text:"Although the desert looks lifeless at noon it teems with creatures after dark.", correct:false, note:"Right idea — but an introductory dependent clause needs a comma before the main clause."},
      {text:"The desert looks lifeless at noon, it teems with creatures after dark.", correct:false, note:"Dropping <i>although</i> creates a comma splice."},
      {text:"Although the desert looks lifeless at noon; it teems with creatures after dark.", correct:false, note:"A semicolon can't follow a dependent clause."},
    ]},
  { broken:"Honey never truly spoils, therefore, archaeologists have tasted honey from ancient tombs.", prompt:"Comma splice with a conjunctive adverb. Which rewrite is correct?",
    options:[
      {text:"Honey never truly spoils, therefore archaeologists have tasted honey from ancient tombs.", correct:false, note:"Still a splice — <i>therefore</i> can't join two sentences with a comma."},
      {text:"Honey never truly spoils; therefore, archaeologists have tasted honey from ancient tombs.", correct:true,  note:"Semicolon before the conjunctive adverb, comma after it. Textbook-perfect."},
      {text:"Honey never truly spoils therefore, archaeologists have tasted honey from ancient tombs.", correct:false, note:"No punctuation before <i>therefore</i> creates a run-on."},
      {text:"Honey never truly spoils, therefore; archaeologists have tasted honey from ancient tombs.", correct:false, note:"The semicolon belongs <i>before</i> the conjunctive adverb."},
    ]},
  { broken:"The owl hunts in total darkness it locates its prey by sound alone.", prompt:"Run-on. Which rewrite is both correct AND logical?",
    options:[
      {text:"The owl hunts in total darkness, it locates its prey by sound alone.", correct:false, note:"A bare comma between two sentences is a comma splice."},
      {text:"The owl hunts in total darkness; it locates its prey by sound alone.", correct:true,  note:"The semicolon links two equal, closely related ideas."},
      {text:"The owl hunts in total darkness, but it locates its prey by sound alone.", correct:false, note:"<i>But</i> signals contrast — the second clause explains how, not opposes it."},
      {text:"The owl, hunts in total darkness it locates its prey by sound alone.", correct:false, note:"An intrusive comma splits subject from verb, and the run-on survives."},
    ]},
];

const REPAIRS = [
  { broken:"The northern lights shimmered for hours, the campers forgot all about sleep.", kind:"comma splice",
    accepted:["The northern lights shimmered for hours. The campers forgot all about sleep.","The northern lights shimmered for hours; the campers forgot all about sleep.","The northern lights shimmered for hours, and the campers forgot all about sleep."],
    sampleFix:"The northern lights shimmered for hours. The campers forgot all about sleep.",
    why:"Two whole sentences glued with a comma. Split with a period, bind with a semicolon, or join with comma + <i>and</i>." },
  { broken:"The bridge swayed in the storm the engineers rushed to inspect it.", kind:"run-on",
    accepted:["The bridge swayed in the storm. The engineers rushed to inspect it.","The bridge swayed in the storm; the engineers rushed to inspect it.","The bridge swayed in the storm, so the engineers rushed to inspect it.","The bridge swayed in the storm, and the engineers rushed to inspect it."],
    sampleFix:"The bridge swayed in the storm, so the engineers rushed to inspect it.",
    why:"Two sentences fused with nothing. Comma + <i>so</i> captures the cause and effect." },
  { broken:"The bakery sells out by dawn, regulars line up long before sunrise.", kind:"comma splice",
    accepted:["The bakery sells out by dawn. Regulars line up long before sunrise.","The bakery sells out by dawn; regulars line up long before sunrise.","The bakery sells out by dawn, so regulars line up long before sunrise."],
    sampleFix:"The bakery sells out by dawn; regulars line up long before sunrise.",
    why:"A comma can't carry two independent clauses. A semicolon links cause and result elegantly." },
  { broken:"Spiders are not insects they have eight legs and two body parts.", kind:"run-on",
    accepted:["Spiders are not insects. They have eight legs and two body parts.","Spiders are not insects; they have eight legs and two body parts.","Spiders are not insects, and they have eight legs and two body parts."],
    sampleFix:"Spiders are not insects. They have eight legs and two body parts.",
    why:"Two complete thoughts rammed together. A period, semicolon, or comma + <i>and</i> all set it right." },
];

const PARAGRAPHS = [
  { text:"When it comes to energy, coffee delivers a sharp jolt within minutes, while tea offers a slower, steadier lift. In terms of ritual, brewing coffee is a quick morning sprint, whereas steeping tea is a patient little ceremony. As for flavor, coffee leans bold and bitter, but tea unfolds in delicate, shifting notes.", answer:"point", why:"Each sentence seizes one <b>criterion</b> — energy, ritual, flavor — and weighs BOTH drinks against it. That is the <b>point-by-point</b> blueprint." },
  { text:"Summer is a season of motion. Its days stretch long and golden, its streets hum until midnight, and its air smells of cut grass and sunscreen. Winter moves to a slower pulse. Its afternoons fade by four o'clock, its streets fall silent under early frost, and its air bites sharp and clean.", answer:"block", why:"Everything about summer is finished first, then the full portrait of winter. One subject, then the other: the <b>block</b> blueprint." },
  { text:"Consider cost first: a bicycle asks only for the occasional tire, whereas a car devours fuel, insurance, and repairs. Next, speed: the car swallows long highways with ease, but the bicycle slips through gridlock. Finally, health: the cyclist arrives with stronger legs, while the driver arrives exactly as sedentary as he left.", answer:"point", why:"Cost, then speed, then health — each criterion measured on BOTH machines in the same breath. <b>Point-by-point.</b>" },
  { text:"A paper book is a creature of the senses. It carries the weight of its pages, it smells faintly of dust and glue, and it wears its history in cracked spines and dog-eared corners. An e-reader lives by entirely different rules. It weighs nothing in a thousand-volume library, it glows in the dark, and it forgets every fingerprint.", answer:"block", why:"All of the paper book's traits are described first, then the e-reader. <b>Block blueprint.</b>" },
  { text:"My two brothers could not be more different. In temperament, Mateo is a still lake while Diego is a crashing wave. In their habits, Mateo rises before dawn, whereas Diego greets the world at noon. Even in their dreams: Mateo longs to build bridges, but Diego longs to tear down walls.", answer:"point", why:"Temperament, habits, dreams — each criterion applied to BOTH brothers at once. <b>Point-by-point.</b>" },
];

const SIGNAL = {
  full:"the tide slips out at dawn it leaves a hundred glittering pools behind each pool looks calm on the surface it hides a fierce little world below hungry gulls patrol the wet sand above the smallest crabs burrow quickly out of sight",
  finale:"The tide slips out at dawn, and it leaves a hundred glittering pools behind. Each pool looks calm on the surface, but it hides a fierce little world below. Hungry gulls patrol the wet sand above, so the smallest crabs burrow quickly out of sight.",
  junctions:[
    {left:"the tide slips out at dawn",right:"it leaves a hundred glittering pools behind",why:"Two complete thoughts. Comma + <i>and</i> flows best. A lone comma = <b>comma splice</b>; nothing = <b>run-on</b>."},
    {left:"it leaves a hundred glittering pools behind",right:"each pool looks calm on the surface",why:"A fresh idea opens here. A <b>period</b> reads cleanest."},
    {left:"each pool looks calm on the surface",right:"it hides a fierce little world below",why:"The second thought <b>contradicts</b> the first — comma + <i>but</i> captures the contrast beautifully."},
    {left:"it hides a fierce little world below",right:"hungry gulls patrol the wet sand above",why:"A new scene arrives. A <b>period</b> or comma + <i>and</i> keeps the thoughts whole."},
    {left:"hungry gulls patrol the wet sand above",right:"the smallest crabs burrow quickly out of sight",why:"<b>Cause and effect</b>: gulls hunt, so crabs hide. Comma + <i>so</i> nails the logic."},
  ],
};
const SIGNAL_OPTIONS = [
  {label:"Add a period — split into two separate sentences.", correct:true},
  {label:"Add a comma + a joining word (and, but, so…).", correct:true},
  {label:"Add just a comma.", correct:false},
  {label:"Add nothing — let the words run together.", correct:false},
];

const GAMES = [
  {id:"diagnose",  num:"TRIAL I",   title:"The Diagnosis Lab",        desc:"Inspect each specimen and name its disease: fragment, comma splice, run-on — or healthy. Beware the impostors.",         tag:"Identify · 10 specimens",    arenaName:"Trial I · Diagnosis",      prompt:"What ails this sentence?"},
  {id:"choose",    num:"TRIAL II",  title:"The Right Hammer",         desc:"The flaw is named. Four rewrites tempt you — only one heals without wounding. The others smuggle in fresh errors.",     tag:"Choose the fix · 5 rounds",  arenaName:"Trial II · The Right Hammer", prompt:"Pick the one true repair."},
  {id:"repair",    num:"TRIAL III", title:"The Repair Shop",          desc:"No options now. Type the mended sentence with your own hands. Keep every word — change only the punctuation.",          tag:"Type the fix · 4 jobs",      arenaName:"Trial III · Repair Shop",  prompt:"Forge it whole."},
  {id:"signal",    num:"TRIAL IV",  title:"The Unpunctuated Scroll",  desc:"A whole paragraph arrives with every mark stripped away. Travel gap by gap and lay down the correct signal.",          tag:"Punctuate · 5 gaps",         arenaName:"Trial IV · The Scroll",    prompt:"What signal belongs in this gap?"},
  {id:"structure", num:"TRIAL V",   title:"Read the Blueprint",       desc:"Comparison–contrast paragraphs are built two ways. Name the architecture: point-by-point or block?",                  tag:"Identify structure · 5 para", arenaName:"Trial V · The Blueprint",  prompt:"Which blueprint built this paragraph?"},
];

const FLAW_LABEL = {correct:"Complete Sentence", fragment:"Fragment", comma_splice:"Comma Splice", run_on:"Run-on Sentence"};
const FLAW_ORDER = ["correct","fragment","comma_splice","run_on"];

/* ── STATE ───────────────────────────────────── */
let studentName  = "";
let currentGame  = null;
let order        = [];
let pos          = 0;
let score        = 0;
let streak       = 0;
let answeredThis = false;
let correctList  = [];
let wrongList    = [];
let detailList   = [];
let lastChoiceOrder = [];
let lastStructOrder = [];

/* ── SLIDES ──────────────────────────────────── */
const TOTAL_SLIDES = 4;
let currentSlide = 0;

function buildDots() {
  const nav = document.getElementById("dotNav");
  for (let i = 0; i < TOTAL_SLIDES; i++) {
    const d = document.createElement("div");
    d.className = "dot" + (i === 0 ? " active" : "");
    d.onclick   = () => goToSlide(i);
    nav.appendChild(d);
  }
}
function updateDots(idx) {
  document.querySelectorAll(".dot").forEach((d,i) => d.classList.toggle("active", i===idx));
}
function goToSlide(idx) {
  if (idx < 0 || idx >= TOTAL_SLIDES) return;
  const prev = document.getElementById("slide-" + currentSlide);
  const next = document.getElementById("slide-" + idx);
  if (!next) return;
  if (prev) {
    prev.classList.add("exit-up");
    prev.classList.remove("active");
    setTimeout(() => prev.classList.remove("exit-up"), 500);
  }
  setTimeout(() => next.classList.add("active"), 50);
  currentSlide = idx;
  updateDots(idx);
}

/* ── PARTICLES ───────────────────────────────── */
function initParticles() {
  const canvas = document.getElementById("particles");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let W, H, particles = [];
  function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
  resize();
  window.addEventListener("resize", resize);
  const colors = ["#00f5c4","#c850f0","#ff4db8","#00c8ff","rgba(255,255,255,0.6)"];
  for (let i = 0; i < 80; i++) {
    particles.push({ x:Math.random()*1920, y:Math.random()*1080, r:Math.random()*1.8+0.3,
      vx:(Math.random()-.5)*.18, vy:(Math.random()-.5)*.18,
      color:colors[Math.floor(Math.random()*colors.length)], alpha:Math.random()*.5+.1 });
  }
  function draw() {
    ctx.clearRect(0,0,W,H);
    particles.forEach(p => {
      ctx.beginPath(); ctx.arc(p.x/1920*W, p.y/1080*H, p.r, 0, Math.PI*2);
      ctx.fillStyle = p.color; ctx.globalAlpha = p.alpha; ctx.fill();
      p.x += p.vx; p.y += p.vy;
      if (p.x<0) p.x=1920; if (p.x>1920) p.x=0;
      if (p.y<0) p.y=1080; if (p.y>1080) p.y=0;
    });
    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  }
  draw();
}

/* ── HUB ─────────────────────────────────────── */
function buildTrialGrid() {
  const grid = document.getElementById("trialGrid");
  grid.innerHTML = "";
  GAMES.forEach(g => {
    const card = document.createElement("button");
    card.className = "trial-card"; card.type = "button";
    card.innerHTML = `<div class="tc-num">${g.num}</div><h3 class="tc-title">${g.title}</h3><p class="tc-desc">${g.desc}</p><span class="tc-tag">${g.tag}</span>`;
    card.addEventListener("click", () => startGame(g.id));
    grid.appendChild(card);
  });
}

/* ── GAME ENGINE ─────────────────────────────── */
function lengthOf(id) {
  if (id==="diagnose")  return DIAGNOSIS.length;
  if (id==="choose")    return CHOICES.length;
  if (id==="repair")    return REPAIRS.length;
  if (id==="signal")    return SIGNAL.junctions.length;
  if (id==="structure") return PARAGRAPHS.length;
}
function shuffle(arr) {
  const a = arr.slice();
  for (let i=a.length-1;i>0;i--) { const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; }
  return a;
}
function normalize(s) {
  return s.toLowerCase().replace(/[\u2018\u2019]/g,"'").replace(/[\u201C\u201D]/g,'"')
    .replace(/\s*([,;.!?])\s*/g,"$1 ").replace(/\s+/g," ").replace(/[.\s]+$/g,"").trim();
}

function startGame(id) {
  currentGame  = id;
  const n      = lengthOf(id);
  const seq    = [...Array(n).keys()];
  order        = id==="signal" ? seq : shuffle(seq);
  pos          = 0; score = 0; streak = 0; answeredThis = false;
  correctList  = []; wrongList = []; detailList = [];
  document.getElementById("hud-score").textContent  = "0";
  document.getElementById("hud-streak").textContent = "0×";
  const meta = GAMES.find(g => g.id===id);
  document.getElementById("arenaGameName").textContent = meta.arenaName;
  goToSlide(2);
  renderQuestion();
}

function renderQuestion() {
  answeredThis = false;
  const meta  = GAMES.find(g => g.id===currentGame);
  const total = order.length;
  document.getElementById("hud-progress").textContent = (pos+1)+" / "+total;
  document.getElementById("progFill").style.width    = (pos/total*100)+"%";
  document.getElementById("arenaPrompt").innerHTML   = meta.prompt;
  document.getElementById("verdict").hidden          = true;
  const specimen = document.getElementById("specimen");
  const options  = document.getElementById("options");
  options.innerHTML = ""; specimen.className = "specimen";
  if      (currentGame==="diagnose")  renderDiagnose(specimen, options);
  else if (currentGame==="choose")    renderChoose(specimen, options);
  else if (currentGame==="repair")    renderRepair(specimen, options);
  else if (currentGame==="signal")    renderSignal(specimen, options);
  else if (currentGame==="structure") renderStructure(specimen, options);
}

/* ── RENDER DIAGNOSE ─────────────────────────── */
function renderDiagnose(specimen, options) {
  const item = DIAGNOSIS[order[pos]];
  specimen.textContent = item.sentence;
  FLAW_ORDER.forEach((flaw,i) => {
    const b = makeOpt(String.fromCharCode(65+i), FLAW_LABEL[flaw]);
    b.addEventListener("click", () => {
      if (answeredThis) return;
      lockOptions(i, [FLAW_ORDER.indexOf(item.answer)], item.why,
        `Q${pos+1} [${item.sentence.substring(0,30)}…]: answered=${FLAW_LABEL[flaw]}, correct=${FLAW_LABEL[item.answer]}`);
    });
    options.appendChild(b);
  });
}

/* ── RENDER CHOOSE ───────────────────────────── */
function renderChoose(specimen, options) {
  const item = CHOICES[order[pos]];
  specimen.textContent = item.broken;
  document.getElementById("arenaPrompt").innerHTML = item.prompt;
  lastChoiceOrder = shuffle(item.options);
  lastChoiceOrder.forEach((opt,i) => {
    const b = makeOpt(String.fromCharCode(65+i), opt.text);
    b.addEventListener("click", () => {
      if (answeredThis) return;
      const ci = lastChoiceOrder.findIndex(o => o.correct);
      lockOptions(i, [ci], opt.note,
        `Q${pos+1} [${item.broken.substring(0,30)}…]: answered="${opt.text.substring(0,20)}…", correct="${lastChoiceOrder[ci].text.substring(0,20)}…"`);
    });
    options.appendChild(b);
  });
}

/* ── RENDER STRUCTURE ────────────────────────── */
function renderStructure(specimen, options) {
  const item = PARAGRAPHS[order[pos]];
  specimen.className = "specimen is-paragraph";
  specimen.textContent = item.text;
  lastStructOrder = ["point","block"];
  const labels = { point:"Point-by-Point · each criterion judged on both subjects", block:"Block · all of subject X, then all of subject Y" };
  lastStructOrder.forEach((st,i) => {
    const b = makeOpt(String.fromCharCode(65+i), labels[st]);
    b.addEventListener("click", () => {
      if (answeredThis) return;
      lockOptions(i, [lastStructOrder.indexOf(item.answer)], item.why,
        `Q${pos+1} [structure]: answered=${st}, correct=${item.answer}`);
    });
    options.appendChild(b);
  });
}

/* ── RENDER SIGNAL ───────────────────────────── */
function renderSignal(specimen, options) {
  const j = SIGNAL.junctions[pos];
  specimen.className = "specimen is-scroll";
  specimen.textContent = SIGNAL.full;
  const ctx = document.createElement("p");
  ctx.className = "gap-context";
  ctx.innerHTML = "… "+j.left+' <span class="gap-mark">▐</span> '+j.right+" …";
  options.appendChild(ctx);
  SIGNAL_OPTIONS.forEach((opt,i) => {
    const b = makeOpt(String.fromCharCode(65+i), opt.label);
    b.addEventListener("click", () => {
      if (answeredThis) return;
      const correctIdxs = SIGNAL_OPTIONS.map((o,idx) => o.correct ? idx : -1).filter(x=>x>=0);
      let why = j.why;
      if (pos===SIGNAL.junctions.length-1) why += '<br><br>Whole and mended: <span class="fix">'+SIGNAL.finale+'</span>';
      lockOptions(i, correctIdxs, why,
        `Q${pos+1} [gap ${pos+1}]: answered="${opt.label.substring(0,25)}…", correct=${opt.correct}`);
    });
    options.appendChild(b);
  });
}

/* ── RENDER REPAIR ───────────────────────────── */
function renderRepair(specimen, options) {
  const item = REPAIRS[order[pos]];
  specimen.textContent = item.broken;
  const box = document.createElement("div");
  box.className = "repair-box";
  box.innerHTML = `<p class="repair-hint">Diagnosis: <b>${item.kind}</b>. Keep the same words — change only the punctuation, or add a coordinating conjunction.</p>
    <textarea class="repair-input" id="repairInput" placeholder="Type the mended sentence here…" autocomplete="off" spellcheck="false"></textarea>
    <div class="repair-row">
      <button class="cta-btn small-cta" id="repairSubmit" type="button">Strike the Anvil</button>
      <span class="repair-note">period · semicolon · comma + conjunction</span>
    </div>`;
  options.appendChild(box);
  const input = document.getElementById("repairInput");
  const submit = () => {
    if (answeredThis) return;
    const val = input.value.trim();
    const ok  = item.accepted.some(a => normalize(a)===normalize(val));
    if (ok) {
      revealRepair(true, val);
    } else {
      input.classList.remove("shake"); void input.offsetWidth; input.classList.add("shake");
      document.querySelector(".repair-note").textContent = "Not yet — check punctuation and keep every original word.";
    }
  };
  document.getElementById("repairSubmit").addEventListener("click", submit);
  input.addEventListener("keydown", e => { if (e.key==="Enter" && e.ctrlKey) submit(); });
  input.focus();
}
function revealRepair(success, typed) {
  answeredThis = true;
  const item = REPAIRS[order[pos]];
  const input = document.getElementById("repairInput");
  if (input) input.disabled = true;
  const rs = document.getElementById("repairSubmit");
  if (rs) rs.setAttribute("disabled","true");
  const qLabel = `Q${pos+1} [repair "${item.broken.substring(0,25)}…"]: typed="${(typed||"—").substring(0,30)}…" → ${success?"CORRECT":"WRONG"}, sample="${item.sampleFix.substring(0,30)}…"`;
  if (success) { score++; streak++; correctList.push("Q"+(pos+1)); } else { streak=0; wrongList.push("Q"+(pos+1)); }
  detailList.push(qLabel);
  document.getElementById("hud-score").textContent  = String(score);
  document.getElementById("hud-streak").textContent = streak+"×";
  const head = document.getElementById("verdictHead");
  head.textContent = success ? "Forged whole. ★" : "Reveal";
  head.className   = "verdict-head "+(success?"good":"bad");
  document.getElementById("verdictWhy").innerHTML = item.why+'<br><br>One clean repair: <span class="fix">'+item.sampleFix+'</span>';
  document.getElementById("verdict").hidden = false;
}

/* ── SHARED OPTION HELPERS ───────────────────── */
function makeOpt(key, text) {
  const b = document.createElement("button");
  b.className = "opt"; b.type = "button";
  b.innerHTML = '<span class="opt-key">'+key+'</span><span class="opt-text">'+text+'</span>';
  return b;
}
function lockOptions(chosenIdx, correctIdxs, why, detailEntry) {
  answeredThis = true;
  const opts = Array.from(document.querySelectorAll("#options .opt"));
  opts.forEach((o,i) => {
    o.setAttribute("disabled","true");
    if (correctIdxs.includes(i))    o.classList.add("correct");
    else if (i===chosenIdx)         o.classList.add("wrong");
    else                            o.classList.add("dim");
  });
  const success = correctIdxs.includes(chosenIdx);
  if (success) { score++; streak++; correctList.push("Q"+(pos+1)); }
  else         { streak=0;           wrongList.push("Q"+(pos+1)); }
  if (detailEntry) detailList.push(detailEntry + (success?" ✓":" ✗"));
  document.getElementById("hud-score").textContent  = String(score);
  document.getElementById("hud-streak").textContent = streak+"×";
  const head = document.getElementById("verdictHead");
  head.textContent = success ? "Correct. ★" : "Not quite.";
  head.className   = "verdict-head "+(success?"good":"bad");
  document.getElementById("verdictWhy").innerHTML = why;
  document.getElementById("verdict").hidden = false;
}

/* ── NEXT / END ──────────────────────────────── */
function nextQ() {
  pos++;
  if (pos >= order.length) endGame(); else renderQuestion();
}
function endGame() {
  document.getElementById("progFill").style.width = "100%";
  const total = order.length;
  const pct   = score / total;
  let rank, blurb;
  if (pct===1)      { rank="Master Smith";      blurb="A flawless run. Every flaw named, every break mended. The forge bows to you."; }
  else if (pct>=.7) { rank="Journeyman Editor"; blurb="Strong hands at the anvil. A few sparks escaped, but your sentences hold."; }
  else if (pct>=.4) { rank="Apprentice";        blurb="The craft is coming. Re-read the verdicts, then return to the fire."; }
  else              { rank="Bellows Tender";     blurb="Every master once burned the first batch. Study the explanations and forge again."; }
  document.getElementById("resultRank").textContent  = rank;
  document.getElementById("resultScore").innerHTML   = score+' <span style="color:#ff4db8;font-style:italic;">/</span> '+total;
  document.getElementById("resultBlurb").textContent = blurb;

  // Send to Sheets
  const meta = GAMES.find(g => g.id===currentGame);
  sendToSheets({
    student:    studentName,
    trial:      meta ? meta.arenaName : currentGame,
    score:      score+"/"+total,

    correct:    correctList.join(", ") || "none",
    incorrect:  wrongList.join(", ")   || "none",
    detail:     detailList.join(" | ")
  });
  goToSlide(3);
}

/* ── SEND TO SHEETS ──────────────────────────── */
function sendToSheets(data) {
  if (!APPS_SCRIPT_URL || APPS_SCRIPT_URL.includes("PASTE_YOUR")) return;
  fetch(APPS_SCRIPT_URL, {
    method:  "POST",
    headers: {"Content-Type":"text/plain;charset=utf-8"},
    body:    JSON.stringify(data)
  })
  .then(r => r.text())
  .then(raw => { try { JSON.parse(raw); } catch(e) { console.warn("Sheets response:", raw); } })
  .catch(err => console.error("Sheets error:", err.message));
}

/* ── INIT ────────────────────────────────────── */
window.addEventListener("DOMContentLoaded", () => {
  initParticles();
  buildDots();
  buildTrialGrid();
  goToSlide(0);

  // Name gate
  const enterBtn = document.getElementById("enterForgeBtn");
  if (enterBtn) {
    enterBtn.addEventListener("click", () => {
      const n = document.getElementById("studentName").value.trim();
      if (!n) {
        document.getElementById("studentName").focus();
        document.getElementById("studentName").style.borderColor = "#ff4db8";
        return;
      }
      studentName = n;
      goToSlide(1);
    });
    document.getElementById("studentName").addEventListener("keydown", e => {
      if (e.key==="Enter") enterBtn.click();
    });
  }

  document.getElementById("nextBtn").addEventListener("click", nextQ);
  document.getElementById("retryBtn").addEventListener("click", () => { if(currentGame) startGame(currentGame); });
  document.getElementById("homeBtn").addEventListener("click",  () => goToSlide(1));
});
