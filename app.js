// Renders the deck guide: cards and skills from window.DECK (data.js), the short guide, picture flows and combo
// scripts from window.GUIDE (content.js). Plain scripts, so the page also opens straight from disk.
const deck = window.DECK;
const guide = window.GUIDE;
const $ = selector => document.querySelector(selector);
const element = (tag, className, text) => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined && text !== null) node.textContent = text;
  return node;
};
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

// Whole cards as printed, so their own text stays readable.
function artFor(key) { return "art/full/" + key + ".webp"; }

function gradeLabel(card) { return card.type === "crest" ? "Crest" : "G" + (card.grade ?? "?"); }

function cardByArt(key) { return deck.cards.find(card => card.art === key); }

// A small card picture that opens the card's details.
function thumb(key, caption) {
  const card = cardByArt(key);
  const button = element("button", "thumb");
  button.setAttribute("aria-label", guide.names[key] || key);
  const img = element("img");
  img.src = artFor(key); img.alt = ""; img.loading = "lazy";
  button.append(img);
  if (caption !== undefined) button.append(element("span", "cap", caption === null ? guide.names[key] : caption));
  if (card) button.addEventListener("click", () => openCard(card));
  return button;
}

// ---------------------------------------------------------------- skill text in plain Thai

// Icon brackets on the card, said in Thai.
const ICONS = [
  [/【自[^】]*】/g, "【อัตโนมัติ】"], [/【永[^】]*】/g, "【ต่อเนื่อง】"], [/【起[^】]*】/g, "【กดใช้】"],
  [/【V】|【\(V\)】/g, "【ช่องแวน】"], [/【R\/G】/g, "【ช่องรีอาร์/การ์เดียน】"], [/【R】|【\(R\)】/g, "【ช่องรีอาร์】"],
  [/【G】|【\(G\)】/g, "【ช่องการ์เดียน】"], [/【ファントムスキル[^】]*】/g, "【Phantom Skill】"],
  [/【レガリスピース[^】]*】/g, "【Regalis Piece】"], [/【ライドデッキ】|【ไรด์เดค】/g, "【ใน Ride Deck】"]
];
const JAPANESE = /[぀-ヿ一-鿿]/;
// Card names quoted in Japanese inside a skill, said with the page's Thai names. 「月華」 stays: it is the name tag the deck is built on.
const NAME_PARTS = [["リシアフェール", "ลีเซียเฟล"], ["ルティカ", "ลูทิก้า"], ["ヴィレア", "วิเลีย"], ["ミリス", "มิลิส"], ["ミーファ", "มีฟา"],
  ["エルベリーナ", "เอลเบรีนา"], ["チェルナーチカ", "เชอร์นาชก้า"], ["ハビタブルゾォン", "ฮาบิทาเบิลโซน"], ["ヘニエイトラック", "เฮนิเอทแทร็ก"],
  ["リヴェサル", "ริเวซัล"], ["赫月光", "แสงจันทร์แดง"]];

// The translations carry Japanese readings in brackets for every term; the page keeps the Thai and any short code (CB, SB).
function plainThai(text) {
  let out = String(text || "");
  for (const [pattern, thai] of ICONS) out = out.replace(pattern, thai);
  out = out.replace(/「([^」]+)」/g, (whole, name) => {
    const hit = NAME_PARTS.find(([jp]) => name.includes(jp));
    return hit ? "「" + hit[1] + "」" : whole;
  });
  out = out.replace(/\s*[(（]([^()（）]*)[)）]/g, (whole, inner) => {
    if (/^(AUTO|CONT|ACT)$/i.test(inner.trim())) return "";
    if (!JAPANESE.test(inner) && !/Skill|Moon|Fant/i.test(inner)) return whole;
    const codes = inner.match(/\b[A-Z]{2,3}\b/g);
    return codes ? " (" + codes.join(", ") + ")" : "";
  });
  return out.replace(/[ \t]{2,}/g, " ").trim();
}

function paragraphs(target, text) {
  for (const part of String(text || "").split(/\n+/)) {
    if (part.trim()) target.append(element("p", "", part.trim()));
  }
}

// ---------------------------------------------------------------- cards

function cardButton(card) {
  const button = element("button", "vcard");
  button.setAttribute("aria-label", (guide.names[card.art] || card.name_jp) + ", " + gradeLabel(card) + (card.count ? ", " + card.count + " ใบ" : ""));
  const img = element("img");
  img.src = artFor(card.art); img.alt = ""; img.loading = "lazy";
  if (card.type === "crest") img.classList.add("sideways");
  button.append(img);
  if (card.count && card.zone === "main") button.append(element("span", "copies", "×" + card.count));
  const meta = element("span", "meta");
  meta.append(element("span", "name", guide.names[card.art] || card.name_jp));
  if (card.trigger) meta.append(element("span", "trigger", card.trigger));
  button.append(meta);
  button.addEventListener("click", () => openCard(card));
  return button;
}

function openCard(card) {
  const img = element("img");
  img.src = artFor(card.art); img.alt = "ภาพการ์ด " + card.name_jp;
  const text = element("div", "text");
  const title = element("h2", "", guide.names[card.art] || card.name_jp);
  title.id = "card-name";
  const reading = element("p", "reading", card.name_jp);
  reading.lang = "ja";
  text.append(title, reading);

  const stats = element("ul", "stats");
  [gradeLabel(card), card.power && card.power !== "-" ? "Power " + card.power : null,
    card.shield && card.shield !== "-" ? "Shield " + card.shield : null, card.trigger, card.count ? "×" + card.count : null]
    .filter(Boolean).forEach(fact => stats.append(element("li", "", fact)));
  text.append(stats);

  text.append(element("h3", "", "Skill"));
  const effect = element("div", "effect");
  paragraphs(effect, plainThai(card.effect_th) || "ยังไม่มีคำแปล");
  text.append(effect);
  if (card.confirmed === false) text.append(element("p", "unconfirmed", "ใบนี้ยังยืนยันข้อความจากแหล่งทางการไม่ได้"));
  if (card.source_url) {
    const link = element("a", "src", "Source");
    link.href = card.source_url; link.target = "_blank"; link.rel = "noopener";
    text.append(link);
  }
  $("#card-detail").replaceChildren(img, text);
  $("#card-dialog").showModal();
}

function renderCards() {
  deck.cards.filter(card => card.zone === "ride").forEach(card => {
    const item = element("li"); item.append(cardButton(card)); $("#ride-ladder").append(item);
  });
  const main = deck.cards.filter(card => card.zone === "main");
  $("#main-total").textContent = main.reduce((sum, card) => sum + (card.count || 0), 0) + " ใบ";
  const grades = [...new Set(main.map(card => card.grade))].sort();
  let active = "all";
  const draw = () => $("#card-grid").replaceChildren(...main.filter(card => active === "all" || card.grade === active).map(cardButton));
  for (const grade of ["all", ...grades]) {
    const button = element("button", "", grade === "all" ? "All" : "Grade " + grade);
    button.setAttribute("aria-pressed", String(grade === active));
    button.addEventListener("click", () => {
      active = grade;
      document.querySelectorAll("#grade-filter button").forEach(other => other.setAttribute("aria-pressed", String(other === button)));
      draw();
    });
    $("#grade-filter").append(button);
  }
  draw();
}

// ---------------------------------------------------------------- combo board

// Card centres on the board in percent of its width (x) and height (y). The board is 16:10 and a card is 10% wide.
const ZONES = {
  G: { x: 50, y: 13, spread: 11, label: "G" },
  RL: { x: 34, y: 39, label: "R" }, V: { x: 50, y: 39, label: "V" }, RR: { x: 66, y: 39, label: "R" },
  BL: { x: 34, y: 65, label: "R" }, BC: { x: 50, y: 65, label: "R" }, BR: { x: 66, y: 65, label: "R" },
  soul: { x: 13, y: 24, pile: 5, label: "Soul" }, ride: { x: 13, y: 80, pile: -2.2, label: "Ride Deck" },
  deck: { x: 87, y: 18, pile: .5, label: "Deck" }, drop: { x: 87, y: 48, pile: 1.6, label: "Drop" }, bind: { x: 87, y: 80, pile: 1, label: "Bind" },
  hand: { x: 50, y: 90, spread: 6.5, label: "Hand" }
};
const CIRCLES = ["G", "RL", "V", "RR", "BL", "BC", "BR"];
const PILES = ["soul", "ride", "deck", "drop", "bind"];

const board = { combo: null, step: 0, cards: new Map(), timer: null };

function buildField() {
  const field = $("#field");
  field.replaceChildren();
  for (const key of CIRCLES) {
    const zone = ZONES[key];
    const ring = element("div", "ring" + (key === "V" ? " van" : key === "G" ? " guard" : ""));
    ring.style.left = zone.x + "%"; ring.style.top = zone.y + "%";
    ring.append(element("span", "", zone.label));
    field.append(ring);
  }
  for (const key of [...PILES, "hand"]) {
    const zone = ZONES[key];
    const slot = element("div", "slot" + (key === "hand" ? " hand" : ""));
    slot.style.left = zone.x + "%"; slot.style.top = zone.y + "%";
    slot.append(element("span", "", zone.label));
    field.append(slot);
  }
}

// Where every card is after `upTo` steps: zone lists in arrival order, plus which units are rested.
function boardState(combo, upTo) {
  const zones = {};
  const where = new Map();
  const rested = new Set();
  const moved = new Set();
  const put = (id, zone) => {
    const from = where.get(id);
    if (from) zones[from] = zones[from].filter(other => other !== id);
    (zones[zone] ||= []).push(id);
    where.set(id, zone);
    rested.delete(id);
  };
  for (const [id, , zone] of combo.start) put(id, zone);
  for (let i = 1; i <= upTo; i++) {
    const step = combo.steps[i];
    moved.clear();
    for (const [id, zone] of step.moves || []) { put(id, zone); moved.add(id); }
    for (const id of step.rest || []) rested.add(id);
  }
  return { zones, rested, moved };
}

function place(zoneKey, index, count) {
  const zone = ZONES[zoneKey];
  if (zone.spread) return { x: zone.x + (index - (count - 1) / 2) * zone.spread, y: zone.y };
  if (zone.pile) return { x: zone.x + index * .35, y: zone.y + index * zone.pile };
  return { x: zone.x, y: zone.y };
}

function loadCombo(combo) {
  stopPlay();
  board.combo = combo;
  board.cards.clear();
  buildField();
  const field = $("#field");
  for (const [id, art] of combo.start) {
    const card = element("div", "fc");
    const img = element("img"); img.src = artFor(art); img.alt = "";
    card.append(img, element("span", "back"), element("span", "fc-name", guide.names[art] || ""));
    field.append(card);
    board.cards.set(id, card);
  }
  $("#combo-title").textContent = combo.title;
  $("#script").replaceChildren(...combo.steps.map((step, index) => {
    const item = element("li");
    const button = element("button", "", step.say);
    button.addEventListener("click", () => { stopPlay(); show(index); });
    item.append(button);
    return item;
  }));
  document.querySelectorAll("#combo-pick button").forEach(button => button.setAttribute("aria-checked", String(button.dataset.combo === combo.id)));
  show(0, true);
}

function show(stepIndex, instant) {
  const combo = board.combo;
  board.step = Math.max(0, Math.min(stepIndex, combo.steps.length - 1));
  const state = boardState(combo, board.step);
  const field = $("#field");
  field.classList.toggle("instant", Boolean(instant));
  let layer = 1;
  for (const [zoneKey, ids] of Object.entries(state.zones)) {
    ids.forEach((id, index) => {
      const card = board.cards.get(id);
      const at = place(zoneKey, index, ids.length);
      card.style.left = at.x + "%"; card.style.top = at.y + "%";
      card.style.zIndex = String((state.moved.has(id) ? 200 : 10) + layer++);
      card.classList.toggle("down", zoneKey === "deck");
      card.classList.toggle("rest", state.rested.has(id));
      card.classList.toggle("lit", state.moved.has(id));
      card.classList.toggle("small", zoneKey === "hand");
    });
  }
  field.querySelectorAll(".pop").forEach(pop => pop.remove());
  for (const [zoneKey, text, kind] of combo.steps[board.step].pops || []) {
    const pop = element("span", "pop " + kind, text);
    pop.style.left = ZONES[zoneKey].x + "%"; pop.style.top = ZONES[zoneKey].y + "%";
    field.append(pop);
  }
  if (instant) requestAnimationFrame(() => requestAnimationFrame(() => field.classList.remove("instant")));
  document.querySelectorAll("#script li").forEach((item, index) => {
    item.classList.toggle("now", index === board.step);
    item.classList.toggle("done", index < board.step);
  });
  $("#prev").disabled = board.step === 0;
  $("#next").disabled = board.step === combo.steps.length - 1;
  if (!board.timer) $("#play").textContent = board.step === combo.steps.length - 1 ? "Replay" : "Play";
}

function stopPlay() {
  clearInterval(board.timer);
  board.timer = null;
  $("#play").textContent = "Play";
}

function play() {
  if (board.timer) { stopPlay(); show(board.step); return; }
  if (board.step === board.combo.steps.length - 1) show(0, true);
  $("#play").textContent = "Pause";
  board.timer = setInterval(() => {
    if (board.step >= board.combo.steps.length - 1) { stopPlay(); show(board.step); return; }
    show(board.step + 1);
  }, reducedMotion.matches ? 2600 : 2000);
}

function renderCombos() {
  for (const combo of guide.combos) {
    const button = element("button", "", combo.title.split(":")[0]);
    button.setAttribute("role", "radio");
    button.dataset.combo = combo.id;
    button.addEventListener("click", () => loadCombo(combo));
    $("#combo-pick").append(button);
  }
  $("#prev").addEventListener("click", () => { stopPlay(); show(board.step - 1); });
  $("#next").addEventListener("click", () => { stopPlay(); show(board.step + 1); });
  $("#play").addEventListener("click", play);
  loadCombo(guide.combos[0]);
}

// ---------------------------------------------------------------- the other tabs

// A row of cards with arrows between them; each card after the first says what happens on the way to it.
function renderOverview() {
  for (const idea of guide.overview) {
    const box = element("article", "flow-box");
    const head = element("div", "flow-head");
    head.append(element("h3", "", idea.title));
    const watch = element("button", "watch", "▶ Watch");
    watch.addEventListener("click", () => {
      selectTab($("#tab-combos"));
      loadCombo(guide.combos.find(combo => combo.id === idea.combo));
      play();
    });
    head.append(watch);
    const row = element("div", "flow");
    idea.flow.forEach(([key, words], index) => {
      if (index > 0) {
        const arrow = element("div", "arrow");
        arrow.append(element("span", "", words));
        row.append(arrow);
      }
      // The first card has no arrow before it, so what it does goes with its name.
      row.append(thumb(key, index === 0 && words ? guide.names[key] + " " + words : null));
    });
    box.append(head, row);
    $("#flows").append(box);
  }
}

function renderPlan(which) {
  $("#turns").replaceChildren(...guide.plan[which].map(turn => {
    const item = element("li");
    const text = element("div", "turn-text");
    text.append(element("strong", "", turn.turn), element("p", "", turn.text));
    const cards = element("div", "thumbs small");
    turn.cards.forEach(key => cards.append(thumb(key)));
    item.append(text, cards);
    return item;
  }));
}

function setupPlan() {
  const buttons = [...document.querySelectorAll("[data-plan]")];
  buttons.forEach(button => button.addEventListener("click", () => {
    buttons.forEach(other => other.setAttribute("aria-checked", String(other === button)));
    renderPlan(button.dataset.plan);
  }));
  renderPlan("first");
  guide.plan.keep.forEach(key => $("#keep").append(thumb(key, null)));
  guide.plan.toss.forEach(key => $("#toss").append(thumb(key, null)));
  $("#mull-note").textContent = guide.plan.note;
}

function renderSituations() {
  for (const item of guide.situations) {
    const box = element("article", "sit");
    const cards = element("div", "thumbs small");
    item.cards.forEach(key => cards.append(thumb(key)));
    const body = element("div");
    body.append(element("h3", "", item.title));
    const list = element("ul");
    item.points.forEach(point => list.append(element("li", "", point)));
    body.append(list);
    box.append(cards, body);
    $("#sits").append(box);
  }
}

function renderRules() {
  for (const rule of guide.rules) {
    const box = element("article", "rule");
    box.append(element("h3", "", rule.title));
    const lines = rule.text.split("\n");
    if (lines.length > 1) {
      const list = element("ul");
      lines.forEach(line => list.append(element("li", "", line)));
      box.append(list);
    } else box.append(element("p", "", lines[0]));
    $("#rule-list").append(box);
  }
}

function renderFooter() {
  $("#footnote").textContent = guide.footnote;
  for (const url of deck.sources || []) {
    const item = element("li");
    const link = element("a", "", url);
    link.href = url; link.target = "_blank"; link.rel = "noopener";
    item.append(link);
    $("#sources").append(item);
  }
}

// ---------------------------------------------------------------- tabs

const tabs = [...document.querySelectorAll('[role="tab"]')];

function selectTab(tab, focus) {
  for (const other of tabs) {
    const on = other === tab;
    other.setAttribute("aria-selected", String(on));
    other.tabIndex = on ? 0 : -1;
    document.getElementById(other.getAttribute("aria-controls")).hidden = !on;
  }
  if (tab.id !== "tab-combos") stopPlay();
  if (focus) tab.focus();
  const row = tab.parentElement;
  row.scrollLeft = Math.max(0, tab.offsetLeft - (row.clientWidth - tab.offsetWidth) / 2);
  // A "show-" prefix keeps the browser from jumping to the panel's id on load.
  history.replaceState(null, "", "#show-" + tab.getAttribute("aria-controls"));
}

function setupTabs() {
  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => selectTab(tab, false));
    tab.addEventListener("keydown", event => {
      const step = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
      if (step) { event.preventDefault(); selectTab(tabs[(index + step + tabs.length) % tabs.length], true); }
    });
  });
  const start = tabs.find(tab => "#show-" + tab.getAttribute("aria-controls") === location.hash);
  if (start) selectTab(start, false);
}

renderOverview();
renderCombos();
renderCards();
setupPlan();
renderSituations();
renderRules();
renderFooter();
setupTabs();
$("#close-card").addEventListener("click", () => $("#card-dialog").close());
$("#card-dialog").addEventListener("click", event => { if (event.target === event.currentTarget) event.currentTarget.close(); });
