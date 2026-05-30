"use strict";
/* =========================================================
   THE SENTENCE FOUNDRY — game engine (TypeScript)
   Four trials testing fragments / run-ons / comma splices
   and comparison–contrast structure (point-by-point vs block).
   ========================================================= */
/* ----------------------- DATA: GAME 1 — DIAGNOSE ----------------------- */
const DIAGNOSIS = [
    {
        sentence: "Although the experiment failed after months of meticulous preparation.",
        answer: "fragment",
        why: "It opens with the subordinating conjunction <b>although</b>, which chains the clause to a thought that never arrives. A subject and verb are present, but the door is left hanging open — no independent clause to walk through.",
    },
    {
        sentence: "The data was inconclusive, the team decided to run the whole trial again.",
        answer: "comma_splice",
        why: "Two complete sentences are fastened with nothing but a comma. Cover each side of the comma: both halves stand alone, so a comma alone is far too weak to hold them.",
    },
    {
        sentence: "Run the simulation twice before you trust a single number.",
        answer: "correct",
        why: "It looks subjectless, but it is a <b>command</b> — the subject <i>you</i> is implied. Imperatives are whole sentences in disguise.",
    },
    {
        sentence: "The lab assistant logged the results she forgot to save the file.",
        answer: "run_on",
        why: "Two independent clauses collide with no punctuation between them — a fused, or run-on, sentence. Where one thought ends and the next begins is left to guesswork.",
    },
    {
        sentence: "Before the storm, the sky turned an eerie shade of green.",
        answer: "correct",
        why: "<b>Before</b> tempts you to call this dependent, but here it begins a prepositional phrase, not a clause. The spine — <i>the sky turned an eerie shade of green</i> — is a full sentence.",
    },
    {
        sentence: "Whales cannot breathe through solid ice they drown within minutes.",
        answer: "run_on",
        why: "Two sentences run straight into each other with no period, semicolon, or conjunction to mark the seam — a classic run-on.",
    },
    {
        sentence: "Which surprised every researcher in the room.",
        answer: "fragment",
        why: "The relative pronoun <b>which</b> makes this lean on something outside itself. Alone, it is a dependent clause masquerading as a sentence.",
    },
    {
        sentence: "The professor explained the paradox, however, most students left more confused than before.",
        answer: "comma_splice",
        why: "<b>However</b> is a conjunctive adverb, not a coordinating conjunction — it cannot stitch two sentences with mere commas. This is a comma splice wearing a fancy hat. It needs a period or semicolon before <i>however</i>.",
    },
    {
        sentence: "Hoping to finish before midnight, she typed faster than she ever had.",
        answer: "correct",
        why: "<i>Hoping to finish before midnight</i> alone would be a fragment, but it is properly attached to the independent clause <i>she typed faster…</i> — a complete, polished sentence.",
    },
    {
        sentence: "The old rotary telephone with the cracked plastic dial and the frayed cord.",
        answer: "fragment",
        why: "A long, lovely noun phrase — and not a single verb in sight. Without a verb there is no action, no sentence, only a fragment dressed up in detail.",
    },
];
/* ----------------------- DATA: GAME 2 — CHOOSE THE FIX ----------------------- */
const CHOICES = [
    {
        broken: "The icebergs broke off from the glacier, they drifted out into the open sea.",
        prompt: "This is a comma splice. Which rewrite repairs it without breaking something else?",
        options: [
            { text: "The icebergs broke off from the glacier they drifted out into the open sea.", correct: false, note: "Removing the comma only makes it worse — now it's a run-on." },
            { text: "The icebergs broke off from the glacier; they drifted out into the open sea.", correct: true, note: "A semicolon links two closely related independent clauses. Clean and correct." },
            { text: "The icebergs broke off from the glacier, so, they drifted out into the open sea.", correct: false, note: "A coordinating conjunction takes a comma before it, never a comma after it too." },
            { text: "Because the icebergs broke off from the glacier.", correct: false, note: "Now it's a dependent-clause fragment — the second thought vanished entirely." },
        ],
    },
    {
        broken: "Marie Curie discovered radium she won two Nobel Prizes.",
        prompt: "This is a run-on. Which rewrite forges it whole?",
        options: [
            { text: "Marie Curie discovered radium, she won two Nobel Prizes.", correct: false, note: "A comma alone between two sentences is a comma splice — a different error, not a fix." },
            { text: "Marie Curie discovered radium, and she won two Nobel Prizes.", correct: true, note: "Comma + the coordinating conjunction <i>and</i> joins two independent clauses correctly." },
            { text: "Marie Curie discovered radium; and she won two Nobel Prizes.", correct: false, note: "A semicolon already does the joining; pairing it with <i>and</i> is redundant and nonstandard." },
            { text: "Marie Curie discovered radium. Winning two Nobel Prizes.", correct: false, note: "The second piece lost its verb power — <i>Winning…</i> is now a fragment." },
        ],
    },
    {
        broken: "Because the telephone rang loudly at three in the morning.",
        prompt: "This is a fragment. Which rewrite completes the thought correctly?",
        options: [
            { text: "Because the telephone rang loudly at three in the morning, the whole house woke up.", correct: true, note: "An independent clause is added, and the introductory dependent clause is followed by a comma." },
            { text: "Because the telephone rang loudly at three in the morning the whole house woke up.", correct: false, note: "Right idea, but an introductory dependent clause needs a comma before the main clause." },
            { text: "The telephone rang loudly at three in the morning, the whole house woke up.", correct: false, note: "Dropping <i>because</i> leaves two sentences spliced by a comma — a comma splice." },
            { text: "Because the telephone rang loudly at three in the morning; the whole house woke up.", correct: false, note: "A semicolon can't follow a dependent clause like this — it expects two independent clauses." },
        ],
    },
    {
        broken: "Buying a car is a personal choice, however, leasing has real advantages.",
        prompt: "This is a comma splice with a conjunctive adverb. Which rewrite is correct?",
        options: [
            { text: "Buying a car is a personal choice, however leasing has real advantages.", correct: false, note: "Still a splice — <i>however</i> can't join two sentences with a comma in front of it." },
            { text: "Buying a car is a personal choice; however, leasing has real advantages.", correct: true, note: "Semicolon before the conjunctive adverb, comma after it. Textbook-perfect." },
            { text: "Buying a car is a personal choice however, leasing has real advantages.", correct: false, note: "No punctuation before <i>however</i> turns this into a run-on." },
            { text: "Buying a car is a personal choice, however; leasing has real advantages.", correct: false, note: "The semicolon is on the wrong side — it belongs <i>before</i> the conjunctive adverb." },
        ],
    },
    {
        broken: "A shark is built entirely of cartilage it does not own a single bone.",
        prompt: "This is a run-on. Which rewrite is both correct AND logical?",
        options: [
            { text: "A shark is built entirely of cartilage, it does not own a single bone.", correct: false, note: "A bare comma between two sentences is a comma splice." },
            { text: "A shark is built entirely of cartilage; it does not own a single bone.", correct: true, note: "The semicolon links two equal, closely related ideas — and the meaning stays intact." },
            { text: "A shark is built entirely of cartilage, yet it does not own a single bone.", correct: false, note: "The punctuation is fine, but <i>yet</i> signals contrast — and these two ideas agree, not clash. The wrong connector twists the meaning." },
            { text: "A shark, is built entirely of cartilage it does not own a single bone.", correct: false, note: "An intrusive comma splits subject from verb, and the run-on remains. Two errors for the price of one." },
        ],
    },
];
/* ----------------------- DATA: GAME 3 — THE REPAIR SHOP ----------------------- */
const REPAIRS = [
    {
        broken: "Sharks can smell a drop of blood from far away, they swim toward it instantly.",
        kind: "comma splice",
        accepted: [
            "Sharks can smell a drop of blood from far away. They swim toward it instantly.",
            "Sharks can smell a drop of blood from far away; they swim toward it instantly.",
            "Sharks can smell a drop of blood from far away, and they swim toward it instantly.",
        ],
        sampleFix: "Sharks can smell a drop of blood from far away. They swim toward it instantly.",
        why: "Two whole sentences were glued with a comma. Split them with a period, bind them with a semicolon, or join them with a comma + <i>and</i>.",
    },
    {
        broken: "The lab assistant logged every result she forgot to save the file.",
        kind: "run-on",
        accepted: [
            "The lab assistant logged every result. She forgot to save the file.",
            "The lab assistant logged every result; she forgot to save the file.",
            "The lab assistant logged every result, but she forgot to save the file.",
            "The lab assistant logged every result, and she forgot to save the file.",
        ],
        sampleFix: "The lab assistant logged every result, but she forgot to save the file.",
        why: "Two sentences fused with no punctuation. <i>But</i> fits beautifully here because the second clause contrasts the first — diligence undone by one slip.",
    },
    {
        broken: "The great white supposedly devours humans, research shows it usually spits them out.",
        kind: "comma splice",
        accepted: [
            "The great white supposedly devours humans. Research shows it usually spits them out.",
            "The great white supposedly devours humans; research shows it usually spits them out.",
            "The great white supposedly devours humans, but research shows it usually spits them out.",
        ],
        sampleFix: "The great white supposedly devours humans, but research shows it usually spits them out.",
        why: "A comma can't carry two independent clauses. Because the second idea overturns the first, <i>but</i> is the connector with the right flavor of contrast.",
    },
    {
        broken: "All living creatures give off faint electrical charges a shark's pores can detect them.",
        kind: "run-on",
        accepted: [
            "All living creatures give off faint electrical charges. A shark's pores can detect them.",
            "All living creatures give off faint electrical charges; a shark's pores can detect them.",
            "All living creatures give off faint electrical charges, and a shark's pores can detect them.",
        ],
        sampleFix: "All living creatures give off faint electrical charges, and a shark's pores can detect them.",
        why: "Two sentences rammed together. The ideas simply add to each other, so a period, a semicolon, or comma + <i>and</i> all set it right.",
    },
];
/* ----------------------- DATA: GAME 4 — STRUCTURE ----------------------- */
const PARAGRAPHS = [
    {
        text: "When it comes to flexibility, virtual classes let you study at any hour, while face-to-face classes lock you into a fixed timetable. In terms of human connection, online students relate through a screen, whereas in-person students share a living room of voices. As for cost, virtual learning erases the commute, but face-to-face learning demands daily travel and gas money.",
        answer: "point",
        why: "Each sentence tackles one <b>criterion</b> — flexibility, then connection, then cost — and judges BOTH subjects against it before moving on. Bouncing criterion-by-criterion is the signature of the <b>point-by-point</b> blueprint.",
    },
    {
        text: "Virtual classes offer remarkable freedom. You can learn at midnight or at dawn, you skip the commute entirely, and you spend nothing on gas. Face-to-face classes follow a stricter rhythm. You arrive at a set hour, you travel across town to get there, and your wallet feels every mile.",
        answer: "block",
        why: "The paragraph finishes EVERYTHING about virtual classes first — freedom, commute, cost — then turns and paints the full portrait of face-to-face classes. One subject completed, then the other: the <b>block</b> blueprint.",
    },
    {
        text: "Consider price first: the Apollo phone commands a premium, whereas the Titan sells for half as much. Next, the camera: the Apollo shoots razor-sharp portraits, but the Titan's photos turn grainy after dark. Finally, battery life: the Apollo glides through two full days, while the Titan gasps for a charger by dinnertime.",
        answer: "point",
        why: "Price, then camera, then battery — and each criterion is measured on BOTH phones in the same breath. That criterion-by-criterion march is <b>point-by-point</b>.",
    },
    {
        text: "Café Luna is a sanctuary. The lighting is low and golden, the espresso is bittersweet and bold, and the playlist drifts through quiet jazz. Café Sol could not be more different. Its windows blaze with daylight, its coffee runs mild and milky, and its speakers pump bright pop from open to close.",
        answer: "block",
        why: "All of Café Luna's traits — light, espresso, music — are described first, as a complete picture. Only then does Café Sol get its own full treatment. Subject-by-subject is the <b>block</b> blueprint.",
    },
    {
        text: "My grandmother and I are divided first by age: she has seen seventy winters, while I have weathered only twenty-five. We differ in looks, too — her eyes are a pale ocean blue, but mine are deep brown. Even our moods split us: she beams at strangers on the street, whereas I save my smiles for the people I love most.",
        answer: "point",
        why: "Don't be fooled by the single topic. Each sentence picks one criterion — age, then looks, then mood — and applies it to BOTH people at once. Criterion-by-criterion means <b>point-by-point</b>.",
    },
];
/* ----------------------- GAME META ----------------------- */
const GAMES = [
    { id: "diagnose", num: "TRIAL I", title: "The Diagnosis Lab", desc: "Inspect each specimen and name its disease: fragment, comma splice, run-on — or a perfectly healthy sentence. Beware the impostors.", tag: "Identify · 10 specimens", arenaName: "Trial I · Diagnosis", prompt: "What ails this sentence?" },
    { id: "choose", num: "TRIAL II", title: "The Right Hammer", desc: "The flaw is named. Four rewrites tempt you — but only one heals without wounding. The other three smuggle in fresh errors.", tag: "Choose the fix · 5 rounds", arenaName: "Trial II · The Right Hammer", prompt: "Pick the one true repair." },
    { id: "repair", num: "TRIAL III", title: "The Repair Shop", desc: "No options now. Type the sentence whole with your own hands. Keep the words; mend only the break — period, semicolon, or comma + conjunction.", tag: "Type the fix · 4 jobs", arenaName: "Trial III · Repair Shop", prompt: "Forge it whole." },
    { id: "structure", num: "TRIAL IV", title: "Read the Blueprint", desc: "Comparison–contrast paragraphs are built two ways. Read each one and name its architecture: point-by-point, or block?", tag: "Identify structure · 5 paragraphs", arenaName: "Trial IV · The Blueprint", prompt: "Which blueprint built this paragraph?" },
];
/* ----------------------- HELPERS ----------------------- */
const FLAW_LABEL = {
    correct: "Complete Sentence",
    fragment: "Fragment",
    comma_splice: "Comma Splice",
    run_on: "Run-on Sentence",
};
const FLAW_ORDER = ["correct", "fragment", "comma_splice", "run_on"];
function $(sel) {
    const el = document.querySelector(sel);
    if (!el)
        throw new Error("missing element: " + sel);
    return el;
}
function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}
/** Normalise a sentence for lenient-but-meaningful comparison.
 *  Capitalisation and curly quotes are forgiven; punctuation logic is not. */
function normalize(s) {
    return s
        .toLowerCase()
        .replace(/[\u2018\u2019]/g, "'")
        .replace(/[\u201C\u201D]/g, '"')
        .replace(/\s*([,;.!?])\s*/g, "$1 ") // tidy spacing around punctuation
        .replace(/\s+/g, " ")
        .replace(/[.\s]+$/g, "") // drop trailing period/space
        .trim();
}
/* ----------------------- STATE ----------------------- */
let current = null;
let order = [];
let pos = 0;
let score = 0;
let streak = 0;
let answeredThis = false;
let timerHandle = null;
let timeLeft = 0;
const TIME_LIMITS = { diagnose: 25, choose: 30, repair: 60, structure: 45 };
/* ----------------------- SCREENS ----------------------- */
function show(screen) {
    ["hub", "game", "result"].forEach((s) => $("#" + s).classList.toggle("is-active", s === screen));
}
/* ----------------------- HUB ----------------------- */
function buildHub() {
    const grid = $("#hub-grid");
    grid.innerHTML = "";
    GAMES.forEach((g) => {
        const card = document.createElement("button");
        card.className = "game-card";
        card.type = "button";
        card.innerHTML = `
      <span class="gc-num">${g.num}</span>
      <h3 class="gc-title">${g.title}</h3>
      <p class="gc-desc">${g.desc}</p>
      <span class="gc-tag">${g.tag}</span>`;
        card.addEventListener("click", () => startGame(g.id));
        grid.appendChild(card);
    });
}
/* ----------------------- START / FLOW ----------------------- */
function lengthOf(id) {
    switch (id) {
        case "diagnose": return DIAGNOSIS.length;
        case "choose": return CHOICES.length;
        case "repair": return REPAIRS.length;
        case "structure": return PARAGRAPHS.length;
    }
}
function startGame(id) {
    current = id;
    order = shuffle([...Array(lengthOf(id)).keys()]);
    pos = 0;
    score = 0;
    streak = 0;
    $("#hud-score").textContent = "0";
    $("#hud-streak").textContent = "0×";
    const meta = GAMES.find((g) => g.id === id);
    $("#arena-game-name").textContent = meta.arenaName;
    show("game");
    renderQuestion();
}
function renderQuestion() {
    answeredThis = false;
    const meta = GAMES.find((g) => g.id === current);
    const total = order.length;
    $("#hud-progress").textContent = `${pos + 1} / ${total}`;
    $("#progress-fill").style.width = `${(pos / total) * 100}%`;
    $("#arena-prompt").textContent = meta.prompt;
    $("#verdict").hidden = true;
    const specimen = $("#specimen");
    const options = $("#options");
    options.innerHTML = "";
    specimen.className = "specimen";
    if (current === "diagnose")
        renderDiagnose(specimen, options);
    else if (current === "choose")
        renderChoose(specimen, options);
    else if (current === "repair")
        renderRepair(specimen, options);
    else if (current === "structure")
        renderStructure(specimen, options);
    startTimer();
}
/* ----------------------- TIMER ----------------------- */
function startTimer() {
    stopTimer();
    timeLeft = TIME_LIMITS[current];
    const wrap = $("#hud-timer-wrap");
    const out = $("#hud-timer");
    out.textContent = String(timeLeft);
    wrap.classList.remove("is-low");
    timerHandle = window.setInterval(() => {
        timeLeft--;
        out.textContent = String(Math.max(timeLeft, 0));
        if (timeLeft <= 8)
            wrap.classList.add("is-low");
        if (timeLeft <= 0) {
            stopTimer();
            onTimeout();
        }
    }, 1000);
}
function stopTimer() { if (timerHandle !== null) {
    clearInterval(timerHandle);
    timerHandle = null;
} }
function onTimeout() {
    if (answeredThis)
        return;
    if (current === "diagnose")
        lockChoices(-1, FLAW_ORDER.indexOf(DIAGNOSIS[order[pos]].answer), DIAGNOSIS[order[pos]].why, true);
    else if (current === "choose") {
        const item = CHOICES[order[pos]];
        const ci = lastChoiceOrder.findIndex((o) => o.correct);
        lockChoices(-1, ci, item.options.find(o => o.correct).note, true);
    }
    else if (current === "structure") {
        const item = PARAGRAPHS[order[pos]];
        const ci = lastStructOrder.indexOf(item.answer);
        lockChoices(-1, ci, item.why, true);
    }
    else if (current === "repair")
        revealRepair(false, true);
}
/* ----------------------- RENDER: DIAGNOSE ----------------------- */
function renderDiagnose(specimen, options) {
    const item = DIAGNOSIS[order[pos]];
    specimen.textContent = item.sentence;
    FLAW_ORDER.forEach((flaw, i) => {
        const b = makeOption(String.fromCharCode(65 + i), FLAW_LABEL[flaw]);
        b.addEventListener("click", () => {
            if (answeredThis)
                return;
            const correctIdx = FLAW_ORDER.indexOf(item.answer);
            lockChoices(i, correctIdx, item.why, false);
        });
        options.appendChild(b);
    });
}
/* ----------------------- RENDER: CHOOSE ----------------------- */
let lastChoiceOrder = [];
function renderChoose(specimen, options) {
    const item = CHOICES[order[pos]];
    specimen.textContent = item.broken;
    $("#arena-prompt").textContent = item.prompt;
    lastChoiceOrder = shuffle(item.options);
    lastChoiceOrder.forEach((opt, i) => {
        const b = makeOption(String.fromCharCode(65 + i), opt.text);
        b.addEventListener("click", () => {
            if (answeredThis)
                return;
            const correctIdx = lastChoiceOrder.findIndex((o) => o.correct);
            const note = opt.correct ? opt.note : `${opt.note}<br><br><span class="tiny">Correct answer: option ${String.fromCharCode(65 + correctIdx)}.</span>`;
            lockChoices(i, correctIdx, note, false);
        });
        options.appendChild(b);
    });
}
/* ----------------------- RENDER: STRUCTURE ----------------------- */
let lastStructOrder = [];
function renderStructure(specimen, options) {
    const item = PARAGRAPHS[order[pos]];
    specimen.className = "specimen is-paragraph";
    specimen.textContent = item.text;
    lastStructOrder = ["point", "block"];
    const labels = {
        point: "Point-by-Point  (each criterion judged on both subjects)",
        block: "Block  (all of subject X, then all of subject Y)",
    };
    lastStructOrder.forEach((st, i) => {
        const b = makeOption(String.fromCharCode(65 + i), labels[st]);
        b.addEventListener("click", () => {
            if (answeredThis)
                return;
            const correctIdx = lastStructOrder.indexOf(item.answer);
            lockChoices(i, correctIdx, item.why, false);
        });
        options.appendChild(b);
    });
}
/* ----------------------- RENDER: REPAIR ----------------------- */
function renderRepair(specimen, options) {
    const item = REPAIRS[order[pos]];
    specimen.textContent = item.broken;
    const box = document.createElement("div");
    box.className = "repair-box";
    box.innerHTML = `
    <p class="repair-hint">Diagnosis: <b>${item.kind}</b>. Keep the same words — change only the punctuation, or add a coordinating conjunction (and, but, or, nor, for, yet, so).</p>
    <textarea class="repair-input" id="repair-input" placeholder="Type the mended sentence here…" autocomplete="off" spellcheck="false"></textarea>
    <div class="repair-row">
      <button class="forge-btn" id="repair-submit" type="button">Strike the Anvil</button>
      <span class="repair-note">period · semicolon · comma + conjunction</span>
    </div>`;
    options.appendChild(box);
    const input = $("#repair-input");
    const submit = () => {
        if (answeredThis)
            return;
        const ok = item.accepted.some((a) => normalize(a) === normalize(input.value));
        if (ok) {
            revealRepair(true, false);
        }
        else {
            input.classList.remove("shake");
            void input.offsetWidth;
            input.classList.add("shake");
            // a near-miss nudge without giving it away
            const note = $(".repair-note");
            note.textContent = "Not yet — check your punctuation and keep every original word.";
        }
    };
    $("#repair-submit").addEventListener("click", submit);
    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && e.ctrlKey)
            submit();
    });
    input.focus();
}
function revealRepair(success, timedOut) {
    answeredThis = true;
    stopTimer();
    const item = REPAIRS[order[pos]];
    const input = $("#repair-input");
    input.disabled = true;
    $("#repair-submit").setAttribute("disabled", "true");
    if (success) {
        score++;
        streak++;
    }
    else {
        streak = 0;
    }
    $("#hud-score").textContent = String(score);
    $("#hud-streak").textContent = streak + "×";
    const head = $("#verdict-head");
    head.textContent = success ? "Forged whole. ✦" : timedOut ? "The forge cooled — time's up." : "Reveal";
    head.className = "verdict-head " + (success ? "good" : "bad");
    $("#verdict-why").innerHTML = `${item.why}<br><br>One clean repair: <span class="fix">${item.sampleFix}</span>`;
    $("#verdict").hidden = false;
}
/* ----------------------- SHARED: option element + locking ----------------------- */
function makeOption(key, text) {
    const b = document.createElement("button");
    b.className = "opt";
    b.type = "button";
    b.innerHTML = `<span class="opt-key">${key}</span><span class="opt-text">${text}</span>`;
    return b;
}
function lockChoices(chosenIdx, correctIdx, why, timedOut) {
    answeredThis = true;
    stopTimer();
    const opts = Array.from($("#options").querySelectorAll(".opt"));
    opts.forEach((o, i) => {
        o.setAttribute("disabled", "true");
        if (i === correctIdx)
            o.classList.add("correct");
        else if (i === chosenIdx)
            o.classList.add("wrong");
        else
            o.classList.add("dim");
    });
    const success = chosenIdx === correctIdx;
    if (success) {
        score++;
        streak++;
    }
    else {
        streak = 0;
    }
    $("#hud-score").textContent = String(score);
    $("#hud-streak").textContent = streak + "×";
    const head = $("#verdict-head");
    head.textContent = success ? "Correct. ✦" : timedOut ? "Time's up." : "Not quite.";
    head.className = "verdict-head " + (success ? "good" : "bad");
    $("#verdict-why").innerHTML = why;
    $("#verdict").hidden = false;
}
/* ----------------------- NEXT / END ----------------------- */
function next() {
    pos++;
    if (pos >= order.length)
        endGame();
    else
        renderQuestion();
}
function endGame() {
    stopTimer();
    const total = order.length;
    $("#progress-fill").style.width = "100%";
    $("#result-score").innerHTML = `${score} <span class="slash">/</span> ${total}`;
    const pct = score / total;
    let rank, blurb;
    if (pct === 1) {
        rank = "Master Smith";
        blurb = "A flawless run. Every flaw named, every break mended. The forge bows to you.";
    }
    else if (pct >= 0.7) {
        rank = "Journeyman Editor";
        blurb = "Strong hands at the anvil. A few sparks escaped, but your sentences hold.";
    }
    else if (pct >= 0.4) {
        rank = "Apprentice";
        blurb = "The craft is coming. Re-read the verdicts, then return to the fire.";
    }
    else {
        rank = "Bellows Tender";
        blurb = "Every master once burned the first batch. Study the explanations and forge again.";
    }
    $("#result-rank").textContent = rank;
    $("#result-blurb").textContent = blurb;
    show("result");
}
/* ----------------------- WIRING ----------------------- */
function init() {
    buildHub();
    $("#next-btn").addEventListener("click", next);
    $("#quit-btn").addEventListener("click", () => { stopTimer(); show("hub"); });
    $("#home-btn").addEventListener("click", () => show("hub"));
    $("#retry-btn").addEventListener("click", () => { if (current)
        startGame(current); });
    show("hub");
}
document.addEventListener("DOMContentLoaded", init);
