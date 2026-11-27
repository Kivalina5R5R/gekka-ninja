// The short guide text, card picture flows and combo scripts. Card details (skills, numbers, sources) come from data.js.
// Card keys are the picture names in art/full/.
window.GUIDE = {
  // Thai names shown under pictures and on the board.
  names: {
    "ride-g0": "มิลิส", "ride-g1": "วิเลีย", "ride-g2": "ลูทิก้า", "ride-g3": "ลีเซียเฟล", crest: "Energy Generator",
    r2c1: "มีฟา", r2c2: "ลีเซียเฟล", r2c3: "เอลเบรีนา", r2c4: "เชอร์นาชก้า", r2c5: "ฮาบิทาเบิลโซน",
    r2c6: "เฮนิเอทแทร็ก", r2c7: "ริเวซัล", r2c8: "อุทสึโรย", r2c9: "มิสบาฟ", r3c1: "ดรากเวดา",
    r3c2: "เบิร์นนิงเฟลล์", r3c3: "เฟลร์เวล", r3c4: "อามาวิเอร่า", r3c5: "แสงจันทร์แดง", r3c6: "祭禮", r3c7: "วงเวทคู่"
  },

  // Each idea is a row of cards read left to right, with a few words under each arrow.
  overview: [
    { title: "Attack", combo: "attack",
      flow: [["ride-g3", "ตี"], ["r2c7", "ดูดเข้าโซล 2 ใบ"], ["r2c3", "เรียกจากเด็ค + แถวหน้า +5000"]] },
    { title: "Defend", combo: "phantom",
      flow: [["ride-g3", "โดนตี"], ["r3c5", "ไบนด์ 赫月 1 ใบ"], ["r2c4", "เรียกพวกในโซลมากัน"]] },
    { title: "Ride line", combo: "ride",
      flow: [["ride-g0", ""], ["ride-g1", "ได้แสงจันทร์แดง"], ["ride-g2", "เติมโซล"], ["ride-g3", "คอลจากโซล"]] }
  ],

  plan: {
    first: [
      { turn: "Turn 1", cards: ["ride-g1", "r2c5", "r3c5"], text: "ไรด์วิเลีย ทิ้งฮาบิทาเบิลโซน → ได้แสงจันทร์แดง" },
      { turn: "Turn 2", cards: ["ride-g2", "r2c3", "r2c6"], text: "ไรด์ลูทิก้า → เอลเบรีนา + 赫月 เข้าโซล คอลเฮนิเอทแทร็กหาของ" },
      { turn: "Turn 3", cards: ["ride-g3", "r2c3", "r2c7"], text: "ไรด์ลีเซียเฟล → คอลพวกจากโซล ตั้งรีอาร์ไว้ให้ดูด" },
      { turn: "Turn 4+", cards: ["r2c2", "ride-g3"], text: "เพอร์โซนาไรด์ (จั่ว 1, แถวหน้า +10000) แล้วใช้คอมโบบุก" }
    ],
    second: [
      { turn: "Ride 1", cards: ["ride-g0", "crest", "r2c5"], text: "มิลิสจั่ว 1 ได้ EC3 ทันที จ่าย EB3 ให้ฮาบิทาเบิลโซนแทน SB1" },
      { turn: "Opponent's turn", cards: ["r3c6"], text: "祭禮 กัน +15000 ได้เสมอ เล่นทีหลังได้ตั๋วเพอร์โซนาชิลด์ (+10000) เพิ่ม" },
      { turn: "Every turn", cards: ["r3c5", "r2c6"], text: "เล่นแสงจันทร์แดงทุกเทิร์น เปิดเจอเฮนิเอทแทร็กจะคอลฟรี แล้วมันหาเกรด 3 ให้อีกใบ" },
      { turn: "Your turn 2", cards: ["ride-g3", "ride-g2"], text: "ขึ้นลีเซียเฟลได้ก่อน คอลพวกจากโซลแล้วตีหนักได้เลย" }
    ],
    keep: ["r2c5", "r2c2", "r2c6", "r2c3", "r2c4"],
    toss: ["r3c2", "r2c8", "r3c7", "r3c6"],
    note: "เหลือการ์ดไว้ทิ้งตอนไรด์ 3 ครั้งด้วย (เล่นก่อน 祭禮 ไม่ได้ตั๋ว แต่ยังกัน +15000 ได้)"
  },

  situations: [
    { title: "Opponent at 0–3 damage", cards: ["r2c3", "r2c7"], points: ["ดูดแค่ 2 ใบ ประหยัด CB", "เรียกเอลเบรีนาขุดการ์ด"] },
    { title: "Opponent at 4–5 damage", cards: ["r2c3", "r2c1"], points: ["ดูด 4 ใบ: เรียก 2 ใบ แถวหน้า +10000", "เอลเบรีนา EB3 สแตนด์ตีซ้ำ"] },
    { title: "You're at 5 damage", cards: ["r3c5", "r2c8", "r2c9"], points: ["โดนตีแวนใช้ Phantom Skill ก่อน", "Phantom Skill ได้เทิร์นละครั้ง ลูกเบากันด้วยมือ เก็บไว้ลูกที่แรงสุด", "อุทสึโรยเก็บไว้ตอนชิลด์ไม่พอ"] },
    { title: "Low hand", cards: ["r2c7", "crest"], points: ["ริเวซัลเข้าโซลจั่ว 1", "EB7 จั่ว 1", "กันด้วยโซลแทนมือ"] },
    { title: "Fast aggro", cards: ["ride-g1", "r3c4", "r3c6"], points: ["ใส่ 赫月 เข้าโซลให้ไว", "อามาวิเอร่ากัน 25000"] },
    { title: "Long games", cards: ["r2c4", "r2c1", "ride-g2"], points: ["คืน 月華 จากดรอปใต้เด็ค กันเด็คหมด", "เชอร์นาชก้าวางใต้เด็ค 3 ใบ → คอลมีฟาจากดรอป", "จบเทิร์นมีฟาเข้าโซล ไว้เรียกมากันรอบหน้า"] },
    { title: "Going for 6 attacks", cards: ["r2c3", "r2c7", "ride-g3"], points: ["รีอาร์ตีก่อน แวนตีทีหลัง", "ดูดตัวที่เรสต์แล้ว 4 ใบ → ได้ตัวใหม่ที่ยังสแตนด์ 2 ใบ", "ริเวซัลโดนดูด: จั่ว 1 แวน +5000", "เอลเบรีนาที่แวนเรียกมา ตีเกรด 3 แล้ว EB3 สแตนด์ตีอีก"] },
    { title: "Short on rear-guards", cards: ["ride-g1", "r2c5"], points: ["จ่าย SB ของฮาบิทาเบิลโซนด้วยวิเลียให้ลงดรอป", "แวนเป็นลีเซียเฟล: ACT วิเลีย SB1 คอลกลับจากดรอป", "แวนฝั่งตรงข้ามเกรด 3: วิเลีย +2000"] }
  ],

  rules: [
    { title: "Card icons", text: "【自】ทำงานเองเมื่อเงื่อนไขเกิด\n【永】มีผลตลอด\n【起】กดใช้เองในเมนเฟส\n【V】【R】【G】 ช่องแวน / รีอาร์ / การ์เดียน" },
    { title: "Costs", text: "CB คว่ำการ์ดดาเมจ\nSB ทิ้งการ์ดจากโซลลงดรอป\nEB จ่ายพลังงาน / EC เติมพลังงาน" },
    { title: "Ride Deck", text: "ไรด์ขึ้นเกรด +1 จาก Ride Deck ต้องทิ้งการ์ดในมือ 1 ใบ" },
    { title: "Persona Ride", text: "ไรด์ลีเซียเฟลทับลีเซียเฟล → จั่ว 1 และแถวหน้า +10000" },
    { title: "Energy", text: "EC3 ทุกต้นไรด์เฟส เก็บได้ 10\nเล่นทีหลังได้ EC3 ทันทีตอนไรด์แรก\nEB7 จั่ว 1 เทิร์นละครั้ง" },
    { title: "Deck building", text: "เด็คหลัก 50 ใบ ชื่อเดียวกันไม่เกิน 4\nทริกเกอร์ 16 (ฮีล ≤ 4, โอเวอร์ ≤ 1) ผู้พิทักษ์ ≤ 4" },
    { title: "JP vs EN", text: "กฎเหมือนกัน แต่รายการการ์ดจำกัดแยกกัน ตอนนี้ไม่มีใบไหนในเด็คนี้โดนจำกัด" }
  ],

  // Each combo: cards placed at the start, then steps. A step's moves are [card, zone]; pops are [zone, text, kind].
  // Zones: V, G, RL RR (front row), BL BC BR (back row), soul, drop, bind, deck, ride, hand.
  combos: [
    {
      id: "attack", title: "Attack: soul in, call out",
      start: [["a", "ride-g3", "V"], ["b", "r2c7", "BL"], ["c", "ride-g0", "BR"], ["d", "r2c3", "deck"], ["e", "r2c4", "deck"], ["f", "r3c2", "deck"]],
      steps: [
        { say: "ให้รีอาร์ตี/บูสต์ไปก่อน ตัวที่เรสต์แล้วค่อยเอามาดูด" },
        { say: "ลีเซียเฟลโจมตี", rest: ["a"], pops: [["V", "Attack", "act"]] },
        { say: "CB1 ดูดรีอาร์ 2 ใบเข้าโซล", moves: [["b", "soul"], ["c", "soul"]], pops: [["V", "CB 1", "cost"]] },
        { say: "ริเวซัล: จั่ว 1 แวน +5000", moves: [["f", "hand"]], pops: [["V", "+5000", "up"]] },
        { say: "เรียกพวก 月華 จากเด็ค", moves: [["d", "RL"]], pops: [["RL", "Call", "act"]] },
        { say: "แถวหน้าทุกใบ +5000", pops: [["V", "+5000", "up"], ["RL", "+5000", "up"]] },
        { say: "เอลเบรีนา: CB1 เรียกเพิ่มอีกใบ", moves: [["e", "RR"]], pops: [["RR", "Call", "act"]] }
      ]
    },
    {
      id: "phantom", title: "Phantom Skill: guard from the soul",
      start: [["a", "ride-g3", "V"], ["b", "r2c7", "soul"], ["c", "r2c4", "soul"], ["d", "ride-g2", "soul"], ["e", "ride-g0", "soul"], ["m", "r3c5", "hand"], ["h", "r3c2", "hand"], ["k", "r2c3", "drop"]],
      steps: [
        { say: "พวกที่ดูดไว้ยังอยู่ในโซล" },
        { say: "ฝั่งตรงข้ามตีแวน", pops: [["V", "Attack!", "foe"]] },
        { say: "ไบนด์แสงจันทร์แดง 1 ใบ", moves: [["m", "bind"]] },
        { say: "เรียกพวกจากโซลมากัน", moves: [["b", "G"], ["c", "G"], ["d", "G"]], pops: [["G", "Shield +30000", "up"]] },
        { say: "ลูทิก้าลง G: คืน 月華 จากดรอปไว้ใต้เด็ค ชิลด์ +5000", moves: [["k", "deck"]], pops: [["G", "+5000", "up"]] },
        { say: "จบการต่อสู้ ลงดรอปไว้ใช้ต่อ", moves: [["b", "drop"], ["c", "drop"], ["d", "drop"]] }
      ]
    },
    {
      id: "ride", title: "Ride line",
      start: [["a", "ride-g0", "V"], ["b", "ride-g1", "ride"], ["c", "ride-g2", "ride"], ["d", "ride-g3", "ride"], ["h", "r2c5", "hand"], ["x", "r3c3", "hand"], ["y", "r3c2", "hand"],
        ["m", "r3c5", "deck"], ["e", "r2c3", "deck"], ["n", "r3c5", "deck"]],
      steps: [
        { say: "เริ่มจากมิลิส" },
        { say: "ไรด์วิเลีย ทิ้งฮาบิทาเบิลโซน", moves: [["b", "V"], ["a", "soul"], ["h", "drop"]] },
        { say: "SB1 ค้นแสงจันทร์แดงขึ้นมือ", moves: [["a", "drop"], ["m", "hand"]], pops: [["soul", "SB 1", "cost"]] },
        { say: "ไรด์ลูทิก้า ทิ้งมือ 1", moves: [["c", "V"], ["b", "soul"], ["x", "drop"]] },
        { say: "วิเลีย: 月華 + 赫月 เข้าโซล", moves: [["e", "soul"], ["n", "soul"]] },
        { say: "ไรด์ลีเซียเฟล ทิ้งมือ 1", moves: [["d", "V"], ["c", "soul"], ["y", "drop"]] },
        { say: "ลูทิก้า: คอลเอลเบรีนาจากโซล", moves: [["e", "RL"]], pops: [["RL", "Call", "act"]] }
      ]
    },
    {
      id: "moonlight", title: "Crimson Moonlight → Henyeytrack",
      start: [["a", "ride-g2", "V"], ["m", "r3c5", "hand"], ["k", "r2c6", "deck"], ["g", "r2c2", "deck"]],
      steps: [
        { say: "แวนเป็น 幻影 เล่นแสงจันทร์แดงได้", moves: [["m", "drop"]] },
        { say: "ดูเด็ค 5 ใบ เจอเฮนิเอทแทร็ก (เกรดไม่เกินแวน)" },
        { say: "คอลลง R ฟรี", moves: [["k", "BL"]], pops: [["BL", "Call", "act"]] },
        { say: "เฮนิเอทแทร็กดูเด็ค 5 ใบ เอาลีเซียเฟลขึ้นมือ", moves: [["g", "hand"]] }
      ]
    },
    {
      id: "viilea", title: "Viilea comes back",
      start: [["a", "ride-g2", "V"], ["d", "ride-g3", "ride"], ["v", "ride-g1", "soul"], ["s", "r2c7", "soul"], ["h", "r2c5", "hand"], ["m", "r3c5", "deck"]],
      steps: [
        { say: "ไรด์ลีเซียเฟล ทิ้งฮาบิทาเบิลโซน", moves: [["d", "V"], ["a", "soul"], ["h", "drop"]] },
        { say: "SB1 โดยเอาวิเลียลงดรอป ค้นแสงจันทร์แดง", moves: [["v", "drop"], ["m", "hand"]], pops: [["soul", "SB 1", "cost"]] },
        { say: "ACT วิเลีย: SB1 คอลกลับจากดรอป", moves: [["s", "drop"], ["v", "RL"]], pops: [["RL", "Call", "act"]] },
        { say: "แวนฝั่งตรงข้ามเกรด 3: +2000", pops: [["RL", "+2000", "up"]] }
      ]
    },
    {
      id: "habitable", title: "Habitable Zone",
      start: [["a", "ride-g1", "V"], ["c", "ride-g2", "ride"], ["k", "r2c6", "hand"], ["h", "r2c5", "deck"], ["m", "r3c5", "deck"]],
      steps: [
        { say: "คอลเฮนิเอทแทร็ก", moves: [["k", "BL"]] },
        { say: "ดูเด็ค 5 ใบ เอาฮาบิทาเบิลโซน", moves: [["h", "hand"]] },
        { say: "ไรด์ ทิ้งฮาบิทาเบิลโซน", moves: [["c", "V"], ["a", "soul"], ["h", "drop"]] },
        { say: "EB3 ค้นแสงจันทร์แดงขึ้นมือ", moves: [["m", "hand"]], pops: [["V", "EB 3", "cost"]] }
      ]
    },
    {
      id: "cerna", title: "Cernacika → Milis",
      start: [["a", "ride-g3", "V"], ["m", "ride-g0", "soul"], ["s", "r2c7", "soul"], ["c", "r2c4", "hand"]],
      steps: [
        { say: "อยากได้รีอาร์ไว้ให้ดูดเพิ่ม" },
        { say: "คอลเชอร์นาชก้า", moves: [["c", "RR"]] },
        { say: "วางใต้เด็ค 0 ใบ + SB1", moves: [["s", "drop"]], pops: [["soul", "SB 1", "cost"]] },
        { say: "เรียกมิลิสจากโซลลง R", moves: [["m", "BR"]], pops: [["BR", "Call", "act"]] }
      ]
    }
  ],

  footnote: "ข้อความและภาพการ์ดทุกใบตรวจกับเว็บทางการญี่ปุ่น (cf-vanguard.com) แล้ว ชื่ออังกฤษจากเว็บทางการ EN วิธีเล่นส่วนใหญ่วิเคราะห์จากข้อความการ์ดและไกด์ yuyu-tei (24 ส.ค. 2026) และคลิปแข่ง TCG Nexus Battle #93 (28 ส.ค. 2026) กฎรวม ver. 4.62"
};
