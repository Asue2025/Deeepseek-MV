// world.js: 红昭愿 · one world, painted once and lived in for a lifetime.
// A Jiangnan water-town under a pagoda, its stone bridge, the desert beyond, the same town under snow,
// and the tea room where she waits. Characters, the horse, the carving and the tea are shared here.
// All coordinates are world pixels; y down. Nothing here keeps state between frames.

const ZHAO = { col: '#D46A5E', dk: '#9C3F42', lt: '#F4A58E' };
const XIAO = { col: '#4E7088', dk: '#2D4659', lt: '#93B4C6' };
const WOOD = { col: '#C89A5A', dk: '#8E6338', lt: '#E8C68C' };
const VERM = '#C13B3C', RED = '#B92F39', GOLD = '#E8AA38';
const SKY_SPRING = { sky: '#F6E4D2', sky2: '#F8D9C4', hill: '#AFC5AE', hill2: '#8FAE9C', far: '#C9D2BE',
  water: '#A9C7BE', water2: '#8DB5B1', stone: '#CDBEA5', stoneDk: '#A8977C', roof: '#3F4A5B', wall: '#F7EFE1',
  wood: '#8B5B42', woodDk: '#5D3B2C', willow: '#7FA35E', willowDk: '#557E48', blossom: '#EFA6AE', lantern: '#C8402F' };
const SKY_WINTER = { sky: '#C9D4D8', sky2: '#E8E4DC', hill: '#9FB0B4', hill2: '#81969C', far: '#C3CFD0',
  water: '#93AEB2', water2: '#7D9BA2', stone: '#BDB9AC', stoneDk: '#918D82', roof: '#384352', wall: '#F0EBE1',
  wood: '#77574A', woodDk: '#4E3A32', willow: '#7C7E70', willowDk: '#5E6054', blossom: '#D8B6BA', lantern: '#C8402F',
  snow: '#F7F5EC', snow2: '#DCE4E4' };
const DESERT = { sky: '#E9B98B', sky2: '#D98B72', sun: '#F6D79A', dune: '#D9A46A', dune2: '#C08754',
  duneDk: '#9A6540', far: '#B97A5E', ink: '#5B3A2E', night: '#4A3B5E' };

const BR = { x: 960, y: 716, span: 980 };
const bridgeY = x => BR.y + 88 * Math.pow((x - BR.x) / (BR.span / 2), 2);

// ---------- small shared utilities ----------
function seeded(seed, n) { return hash(seed * 37.1 + n * 11.7); }
function blot(cx, cy, rx, ry, seed, n = 16, wob = .18) {
  const p = [];
  for (let i = 0; i < n; i++) {
    const a = i / n * TAU, w = 1 + wob * Math.sin(a * 3 + seed) + wob * .5 * Math.sin(a * 5 - seed);
    p.push([cx + Math.cos(a) * rx * w, cy + Math.sin(a) * ry * w]);
  }
  return p;
}
// A ribbon of cloth fluttering in the wind: path from (x,y), length, sway.
function cloth(x, y, len, w, t, o = {}) {
  const P = [], dir = o.dir ?? 1, ph = o.ph || 0, sway = o.sway ?? .4;
  for (let i = 0; i <= 7; i++) {
    const k = i / 7;
    P.push([x + dir * (k * len + Math.sin(t * 2.2 + k * 3 + ph) * sway * 18 * k),
            y + Math.sin(t * 2.7 + k * 4 + ph) * 10 * k + k * (o.drop || 0)]);
  }
  return ribbon(P, w, w * (o.taper ?? .3));
}

// ---------- sky and land ----------
function skyWash(L, t, o = {}) {
  boilSeed('sky');
  paint(rectPts(-1200, -1400, W + 2400, 2600), { wash: L.sky, ink: null });
  paint(ellPts(W * .30, 760, 1500, 430, 32, 12), { fill: L.sky2, fillOp: 150, bleed: .3, tex: .5, ink: null });
  paint(ellPts(W * .72, 660, 900, 260, 28, 10), { fill: mixCol(L.sky2, L.wall, .3), fillOp: 80, bleed: .3, tex: .4, ink: null });
  if (o.sun !== false) {
    const sx = o.sunX ?? 1490, sy = o.sunY ?? 250, r = o.sunR ?? 74;
    glow(sx, sy, r * 4.4, o.sunCol || '#FFD9A0', .55);
    paint(ellPts(sx, sy, r, r, 24, 2), { wash: o.sunCol || '#F8D59A', washOp: 225, ink: null });
  }
  for (let i = 0; i < 3; i++) {   // long, soft clouds
    boilSeed('cl' + i);
    const x = ((seeded(3, i) * 2600 + t * (7 + i * 4)) % 3000) - 500, y = 190 + i * 130;
    paint(blot(x, y, 280 + 80 * i, 38, i + 2, 26, .22), { fill: mixCol(L.sky2, L.wall, .45), fillOp: 95, bleed: .3, tex: .4, ink: null });
  }
}
function farHills(L, t) {
  boilSeed('hills');
  paint([[ -200, 720], [180, 590], [420, 640], [700, 540], [980, 650], [1240, 580], [1500, 630], [1800, 560], [2100, 700], [2100, 1080], [-200, 1080]],
    { wash: L.far, fill: mixCol(L.far, L.sky2, .35), fillOp: 80, tex: .55, ink: null });
  paint([[-200, 780], [260, 700], [560, 745], [900, 680], [1220, 760], [1540, 700], [1900, 770], [2100, 760], [2100, 1080], [-200, 1080]],
    { wash: L.hill, fill: mixCol(L.hill, L.hill2, .5), fillOp: 95, tex: .6, ink: null });
  boilSeed('hills2');
  paint(ellPts(300, 830, 1000, 180, 38, 4), { wash: L.hill2, ink: null });
  paint(ellPts(1680, 845, 1100, 200, 38, 4), { wash: L.hill2, ink: null });
}
function river(L, t, y = 862) {
  boilSeed('river');
  paint(rectPts(-600, y, W + 1200, 800), { wash: L.water, ink: null });
  paint(ellPts(W * .5, y + 240, 1200, 180, 30, 8), { wash: L.water2, washOp: 90, ink: null });
  for (let i = 0; i < 9; i++) {
    const yy = y + 18 + i * 15 + Math.sin(t * .7 + i) * 3, w = 120 + 90 * seeded(8, i);
    inkLine([[-200 + seeded(9, i) * 1300, yy], [-200 + seeded(9, i) * 1300 + w, yy + 2]], .8 + .5 * seeded(10, i), mixCol(L.water2, PAL.cream, .25), 'inkfine', .3);
  }
  for (let i = 0; i < 6; i++) {   // a few glints on the beat
    const gx = 300 + seeded(11, i) * 1300, gy = y + 60 + seeded(12, i) * 130;
    if (pulse(t, 9) > .45) paint(ellPts(gx, gy, 16 + 10 * seeded(13, i), 2.4, 10), { wash: PAL.cream, washOp: 100 * pulse(t, 9), ink: null });
  }
}
function bank(L, y = 920) {
  boilSeed('bank');
  paint([[-200, y], [W + 200, y], [W + 200, y + 300], [-200, y + 300]], { wash: mixCol(L.stone, L.willowDk, .12), ink: null });
  for (let i = 0; i < 10; i++) inkLine([[-100 + i * 230, y + 2], [-180 + i * 230, y + 280]], .7, mixCol(L.stoneDk, PAL.ink, .3), 'inkfine', 0);
  paint(rectPts(-200, y - 8, W + 400, 16), { fill: L.stoneDk, fillOp: 80, bleed: .05, ink: null });
}

// ---------- architecture ----------
function roof(cx, y, w, h, L, o = {}) {
  const lift = o.lift ?? .28, col = o.col || L.roof;
  const P = [[cx - w / 2, y + h], [cx - w * .40, y + h * .25], [cx - w * .05, y], [cx + w * .05, y],
             [cx + w * .40, y + h * .25], [cx + w / 2, y + h],
             [cx + w * .54, y + h + h * lift], [cx + w / 2, y + h * (1 + lift)],
             [cx - w / 2, y + h * (1 + lift)], [cx - w * .54, y + h + h * lift]];
  paint(P, { wash: col, ink: PAL.ink, sw: o.sw ?? .9 });
  inkLine([[cx - w * .42, y + h * .45], [cx + w * .42, y + h * .45]], .5, mixCol(col, L.wall, .35), 'inkfine', .3);
  if (L.snow) paint([[cx - w / 2, y + h + h * lift * .2], [cx - w * .15, y - 4], [cx + w * .15, y - 4], [cx + w / 2, y + h + h * lift * .2],
    [cx + w * .38, y + h * .55], [cx - w * .38, y + h * .55]], { wash: L.snow, washOp: 235, ink: null });
}
function house(cx, base, w, h, L, t, o = {}) {
  boilSeed('house' + cx);
  paint(rectPts(cx - w / 2, base - h, w, h), { wash: L.wall, ink: PAL.ink, sw: .7 });
  paint(rectPts(cx - w / 2, base - h, w, 12), { wash: L.woodDk, ink: null });
  paint(rectPts(cx - 16, base - h, 14, h), { wash: L.woodDk, washOp: 210, ink: null });
  roof(cx, base - h - 42, w + 96, 48, L, { lift: .22 });
  const lit = o.lit ?? .55, n = Math.max(1, Math.round(w / 165));
  for (let i = 0; i < n; i++) {
    const wx = cx - w / 2 + (i + .5) * w / n - 34, wy = base - h * .65;
    paint(rectPts(wx, wy, 68, 78), { wash: mixCol(L.woodDk, lit > .45 ? L.lantern : L.woodDk, lit * .8), ink: null });
    paint(rectPts(wx + 6, wy + 6, 56, 66), { wash: '#F2D49A', washOp: 110 + 130 * lit, ink: null });
    if (i === 0 && lit > .5) glow(wx + 34, wy + 38, 46, '#FFC766', .22 * lit);
  }
  if (o.door !== false) paint(rectPts((o.doorX ?? cx) - 34, base - 108, 68, 108), { wash: L.woodDk, ink: PAL.ink, sw: .6 });
}
function pagoda(cx, base, s, L, t, o = {}) {
  const tiers = o.tiers ?? 6;
  boilSeed('pagoda');
  paint(rectPts(cx - s * .56, base - s * .18, s * 1.12, s * .18), { wash: L.stone, ink: PAL.ink, sw: .8 });
  let y = base - s * .18;
  for (let i = 0; i < tiers; i++) {
    const w = s * (1 - i * .105), h = s * .22;
    paint(rectPts(cx - w / 2, y - h, w, h), { wash: i % 2 ? mixCol(L.wall, L.stone, .18) : L.wall, ink: PAL.ink, sw: .7 });
    paint(rectPts(cx - w / 2, y - h, w, h * .16), { wash: VERM, washOp: 190, ink: null });
    const nw = i % 2 ? 2 : 3;
    for (let k = 0; k < nw; k++) {
      const wx = cx - w * .26 + k * (w * .52 / Math.max(1, nw - 1));
      paint(rectPts(wx - w * .045, y - h * .72, w * .09, h * .34), { wash: L.woodDk, ink: null });
    }
    roof(cx, y - h - s * .02, w + s * .28, s * .14, L, { lift: .35, sw: .7 });
    y -= h + s * .13;
  }
  roof(cx, y - s * .03, s * .34, s * .18, L, { lift: .5, sw: .7 });
  inkLine([[cx, y - s * .18], [cx, y - s * .95]], s * .03, PAL.ink, 'ink', 0);
  if (o.glow !== false) { glow(cx, base - s * 1.25, s * 1.7, '#FFCB80', .1); }
}
function lampOn(t, i, k) { return frac(t * .12 + i * .3 + k * .7) > .45; }

function willow(x, base, s, t, L, o = {}) {
  boilSeed('willow' + x);
  const sway = o.sway ?? 1;
  inkLine([[x, base], [x - 12 * sway, base - s * .55], [x + 10 * sway, base - s * .9], [x + 2 * sway, base - s * 1.2]], s * .045, L.woodDk, 'ink', .5);
  // the crown is one soft mass, and five long fronds hang from it
  paint(blot(x + 2 * sway, base - s * 1.12, s * .54, s * .22, 3, 14, .26), { wash: L.willow, washOp: 215, ink: null });
  for (let f = 0; f < 5; f++) {
    const fx = x + (f - 2) * s * .24 + Math.sin(t * .8 + f) * 5 * sway, fy = base - s * 1.02;
    const P = [];
    for (let i = 0; i <= 4; i++) { const k = i / 4; P.push([fx + Math.sin(t * 1.4 + k * 2.2 + f) * 13 * k * sway + (fx < x ? -k * 6 : k * 6), fy + k * s * (.6 + .1 * (f % 3))]); }
    paint(ribbon(P, s * .12, s * .025), { wash: mixCol(L.willow, L.willowDk, .35), washOp: 210, ink: null });
    inkLine([[fx, fy], [P[4][0], P[4][1]]], .7, L.willowDk, 'dry', .5);
  }
  inkLine([[x - s * .3, base - s * .96], [x - s * .06, base - s * 1.15]], s * .025, L.woodDk, 'inkfine', .4);
  inkLine([[x + s * .26, base - s * 1.0], [x + s * .04, base - s * 1.18]], s * .025, L.woodDk, 'inkfine', .4);
}
function blossomTree(x, base, s, t, L, o = {}) {
  boilSeed('blossom' + x);
  inkLine([[x, base], [x - s * .1, base - s * .4], [x + s * .05, base - s * .75]], s * .06, L.woodDk, 'ink', .5);
  inkLine([[x + s * .02, base - s * .7], [x - s * .3, base - s * .95]], s * .03, L.woodDk, 'ink', .4);
  inkLine([[x + s * .03, base - s * .74], [x + s * .32, base - s * .98]], s * .03, L.woodDk, 'ink', .4);
  for (let i = 0; i < 3; i++) {
    const cx = x + (i - 1) * s * .3, cy = base - s * (.98 + .08 * (i % 2));
    paint(blot(cx, cy, s * (.24 + .05 * (i % 2)), s * .16, i, 12, .28), { wash: i === 1 ? L.blossom : mixCol(L.blossom, L.wall, .2), washOp: 205, ink: null });
  }
  if (o.petals !== false) petals(t, o.n ?? 10, x - s * .5, x + s * .5, base - s * .9, base - s * .1, L.blossom, .3);
}
function petals(t, n, x0, x1, y0, y1, col, a = .8) {
  boilSeed('petals');
  for (let i = 0; i < n; i++) {
    const ph = frac(t * (.05 + .05 * seeded(41, i)) + seeded(42, i)), x = lerp(x0, x1, seeded(43, i)) + Math.sin(t * .9 + i) * 20 + ph * 40;
    const y = lerp(y0, y1, ph);
    paint(ellPts(x, y, 7 + 4 * seeded(44, i), 4, 10, 0, t + i), { wash: col, washOp: 190 * a, ink: null });
  }
}
function lantern(x, y, s, t, o = {}) {
  boilSeed('lan' + Math.round(x));
  const sway = Math.sin(t * 1.2 + x * .01) * .08;
  push(); translate(x, y); rotate(sway);
  inkLine([[0, -s * 1.8], [0, -s * 1.1]], s * .05, PAL.ink, 'ink', 0);
  paint(ellPts(0, 0, s, s * 1.08, 20, 1), { wash: o.lit === false ? '#8C4A48' : VERM, ink: PAL.ink, sw: .8 });
  for (const yy of [-s * .6, 0, s * .6]) inkLine([[-s * .85, yy], [s * .85, yy]], .5, mixCol(VERM, PAL.ink, .4), 'inkfine', .4);
  paint(rectPts(-s * .42, -s * 1.24, s * .84, s * .22), { wash: GOLD, ink: PAL.ink, sw: .5 });
  paint(rectPts(-s * .42, s * 1.02, s * .84, s * .2), { wash: GOLD, ink: PAL.ink, sw: .5 });
  inkLine([[0, s * 1.2], [Math.sin(t * 2 + x) * s * .2, s * 1.9]], s * .06, GOLD, 'ink', 0);
  if (o.lit !== false) glow(0, 0, s * 4.2, '#FFB85C', .7);
  pop();
}

// The stone bridge: an arched walk, its arch opening showing the river, a low far parapet, and stone joints.
function stoneBridge(L, t, o = {}) {
  boilSeed('bridgeBody');
  const top = [], bottom = [], n = 16;
  for (let i = 0; i <= n; i++) {
    const x = BR.x - BR.span / 2 + i / n * BR.span;
    top.push([x, bridgeY(x)]);
  }
  const P = [[BR.x - BR.span / 2 - 30, 940], [BR.x - BR.span / 2 - 30, bridgeY(BR.x - BR.span / 2) + 16],
    ...top, [BR.x + BR.span / 2 + 30, bridgeY(BR.x + BR.span / 2) + 16], [BR.x + BR.span / 2 + 30, 940],
    [BR.x + BR.span * .32, 940], [BR.x + BR.span * .28, 860], [BR.x + BR.span * .18, 800], [BR.x, 770],
    [BR.x - BR.span * .18, 800], [BR.x - BR.span * .28, 860], [BR.x - BR.span * .32, 940]];
  paint(P, { wash: L.stone, ink: PAL.ink, sw: 1.3 });
  // deck cap and the shadow under it
  boilSeed('bridgeDeck');
  const cap = top.map(([x, y]) => [x, y - 14]).concat(top.slice().reverse().map(([x, y]) => [x, y + 8]));
  paint(cap, { wash: L.snow ? L.snow : mixCol(L.stone, L.wall, .35), washOp: 255, ink: PAL.ink, sw: .9 });
  const joints = [];
  for (let i = 0; i <= n; i += 2) {
    const x = BR.x - BR.span / 2 + i / n * BR.span, y = bridgeY(x);
    joints.push([x, y + 6], [x + 2, y + 46]);
  }
  inkLine(joints, .5, mixCol(L.stoneDk, PAL.ink, .25), 'inkfine', 0);
  for (let i = 1; i < 6; i++) { const x = BR.x - BR.span * .46 + i * BR.span * .92 / 6, y = bridgeY(x); inkLine([[x - 6, y + 24], [x - 4, y + 100 + (i % 2) * 26]], .6, mixCol(L.stoneDk, PAL.ink, .3), 'inkfine', 0); }
  const arc = [];
  for (let i = 0; i <= 12; i++) {
    const a = Math.PI + i / 12 * Math.PI;
    arc.push([BR.x + Math.cos(a) * BR.span * .30, 940 + Math.sin(a) * 170]);
  }
  inkLine(arc, .9, mixCol(L.stoneDk, PAL.ink, .35), 'inkfine', .5);
  // far parapet: posts and a rail, drawn behind the actors
  boilSeed('bridgeRail');
  for (let i = 0; i <= 8; i++) {
    const x = BR.x - BR.span * .46 + i / 8 * BR.span * .92, y = bridgeY(x);
    paint(rectPts(x - 7, y - 92, 14, 80), { wash: mixCol(L.stone, L.wall, .2), ink: PAL.ink, sw: .7 });
    paint(rectPts(x - 11, y - 100, 22, 12, 1), { wash: L.stoneDk, ink: PAL.ink, sw: .5 });
  }
  const railP = [];
  for (let i = 0; i <= 16; i++) { const x = BR.x - BR.span * .46 + i / 16 * BR.span * .92; railP.push([x, bridgeY(x) - 80]); }
  inkLine(railP, 2.6, mixCol(L.stone, L.stoneDk, .6), 'ink', .4);
  if (L.snow) {
    const snowP = railP.map(([x, y]) => [x, y - 6]).concat(railP.slice().reverse().map(([x, y]) => [x, y + 4]));
    paint(snowP, { wash: L.snow, washOp: 235, ink: null });
  }
  if (o.lanterns) for (const k of [-.4, 0, .4]) {
    const x = BR.x + k * BR.span * .85; lantern(x, bridgeY(x) - 120, 22, t);
  }
}
function reflection(L, x, y, w, h) {
  boilSeed('refl' + x);
  paint(blot(x, y + 130, w, h, 4, 18, .2), { fill: mixCol(L.stoneDk, L.water2, .4), fillOp: 55, bleed: .3, tex: .5, ink: null });
}

// ---------- the spring town ----------
function springTown(t, o = {}) {
  const L = SKY_SPRING;
  skyWash(L, t, o);
  farHills(L, t);
  pagoda(o.pagodaX ?? 1520, o.pagodaBase ?? 726, o.pagodaS ?? 104, L, t, { glow: o.pagodaGlow });
  boilSeed('townBack');
  house(300, 760, 330, 170, L, t, { lit: .35 });
  house(620, 748, 260, 150, L, t, { lit: .3 });
  house(1270, 752, 300, 160, L, t, { lit: .4 });
  house(1540, 770, 260, 150, L, t, { lit: .35 });
  if (o.extraHouses !== false) { house(80, 790, 300, 180, L, t, { lit: .2 }); house(1830, 790, 300, 180, L, t, { lit: .3 }); }
  for (let i = 0; i < 3; i++) paint(rrPts(380 + i * 500, 640, 20, 34, 10, 1), { wash: RED, ink: PAL.ink, sw: .5 });
  river(L, t);
  reflection(L, 960, 820, 360, 40);
  stoneBridge(L, t, { lanterns: o.lanterns });
  if (o.willows !== false) { willow(210, 900, 230, t, L); willow(1760, 910, 210, t, L, { sway: .8 }); }
  if (o.blossoms !== false) blossomTree(o.blossomX ?? 1560, 900, 220, t, L, { petals: o.petals !== false, n: o.petalN ?? 16 });
  if (o.foreBank) bank(L, 928);
  if (o.drift !== false) petals(t, o.petalN ?? 16, -100, W + 100, -40, 1000, L.blossom, .45);
  if (o.farSnow) { /* reserved */ }
}
function springBridge(t, o = {}) {
  // a closer world: hill line, a slice of town, the big bridge, water. Actors stand on bridgeY(x).
  const L = SKY_SPRING;
  skyWash(L, t, o);
  farHills(L, t);
  pagoda(1520, 726, 104, L, t, { glow: o.pagodaGlow });
  boilSeed('townBack');
  house(330, 770, 300, 160, L, t, { lit: .3 });
  house(700, 756, 240, 140, L, t, { lit: .3 });
  house(1250, 760, 280, 150, L, t, { lit: .35 });
  house(1680, 780, 300, 170, L, t, { lit: .35 });
  river(L, t);
  stoneBridge(L, t, { lanterns: o.lanterns });
  if (o.willows !== false) { willow(180, 910, 230, t, L); willow(1780, 920, 210, t, L, { sway: .8 }); }
  if (o.blossoms !== false) blossomTree(1520, 900, 210, t, L, { petals: o.petals !== false, n: 14 });
  if (o.drift !== false) petals(t, 14, -100, W + 100, -40, 1000, L.blossom, .45);
}

// ---------- winter town ----------
function winterTown(t, o = {}) {
  const L = SKY_WINTER;
  skyWash(L, t, { ...o, sunCol: '#F6E8D2', sunR: 64, sunX: 1420, sunY: 270 });
  farHills(L, t);
  pagoda(o.pagodaX ?? 1520, 726, 104, L, t, { glow: o.pagodaGlow });
  boilSeed('townBack');
  house(300, 760, 330, 170, L, t, { lit: .7 });
  house(620, 748, 260, 150, L, t, { lit: .65 });
  house(1270, 752, 300, 160, L, t, { lit: .75 });
  house(1540, 770, 260, 150, L, t, { lit: .7 });
  river(L, t);
  boilSeed('ice');
  paint(blot(960, 900, 800, 60, 7, 30, .12), { fill: L.snow2, fillOp: 90, bleed: .2, ink: null });
  stoneBridge(L, t, { lanterns: o.lanterns });
  willow(210, 900, 220, t, L, { sway: .6 });
  willow(1760, 910, 200, t, L, { sway: .5 });
  house(1560, 880, 240, 130, L, t, { lit: .6 });
  if (o.foreBank) bank(L, 928);
  snowfall(t, o.snowN ?? 46, 1);
}
function snowfall(t, n = 46, a = 1) {
  boilSeed('snow');
  for (let i = 0; i < n; i++) {
    const ph = frac(t * (.045 + .035 * seeded(51, i)) + seeded(52, i));
    const x = (seeded(53, i) * (W + 240) - 120 + Math.sin(t * .7 + i) * 26 + ph * 30) % (W + 200) - 100;
    const y = ph * (H + 200) - 100;
    const r = 2.4 + 3.6 * seeded(54, i);
    paint(ellPts(x, y, r, r * .9, 8), { wash: PAL.cream, washOp: 175 * a, ink: null });
  }
}
function snowBank(x, y, w) {
  paint(blot(x, y, w, 26, x, 18, .12), { wash: SKY_WINTER.snow, ink: null });
}

// ---------- desert ----------
function desertSky(t, o = {}) {
  const D = DESERT;
  boilSeed('dsky');
  paint(rectPts(-900, -1200, W + 1800, 2600), { wash: D.sky, ink: null });
  paint(ellPts(W * .45, 760, 1500, 420, 30, 12), { fill: D.sky2, fillOp: 150, bleed: .3, tex: .5, ink: null });
  const sx = o.sunX ?? 1380, sy = o.sunY ?? 300;
  glow(sx, sy, 360, '#FFD9A0', .7);
  paint(ellPts(sx, sy, 92, 92, 24, 2), { wash: D.sun, washOp: 240, ink: null });
  for (let i = 0; i < 3; i++) {
    boilSeed('dcl' + i);
    paint(blot(300 + i * 620 + t * 12, 230 + i * 90, 330, 34, i + 9, 24, .2), { fill: mixCol(D.sky2, D.sun, .45), fillOp: 80, bleed: .3, ink: null });
  }
}
function dunes(t, o = {}) {
  const D = DESERT;
  boilSeed('dunes');
  paint([[ -200, 760], [260, 700], [700, 745], [1120, 690], [1560, 750], [2000, 700], [2200, 780], [2200, 1200], [-200, 1200]],
    { wash: D.dune2, ink: null });
  paint([[ -200, 840], [340, 780], [800, 830], [1260, 770], [1700, 835], [2200, 790], [2200, 1200], [-200, 1200]],
    { wash: D.dune, ink: null });
  boilSeed('dunesF');
  paint([[ -200, 940], [400, 880], [920, 930], [1460, 870], [2000, 940], [2200, 930], [2200, 1200], [-200, 1200]],
    { wash: mixCol(D.dune, D.duneDk, .25), ink: null });
  for (let i = 0; i < 7; i++) {
    const y = 720 + i * 42, x0 = -100 + seeded(61, i) * 400 + Math.sin(t * .4 + i) * 20;
    inkLine([[x0, y], [x0 + 420 + 200 * seeded(62, i), y - 18]], 1.1, mixCol(D.duneDk, PAL.ink, .25), 'dry', .3);
  }
  if (o.tower) {   // a frontier watchtower on the far dune
    const x = o.towerX ?? 1590, y = o.towerY ?? 690, s = o.towerS ?? 1;
    boilSeed('tower');
    paint(rectPts(x - 34 * s, y - 158 * s, 68 * s, 158 * s, 2), { wash: mixCol(D.duneDk, D.ink, .2), ink: PAL.ink, sw: 1 });
    paint(rectPts(x - 46 * s, y - 174 * s, 92 * s, 20 * s, 1), { wash: D.dune2, ink: PAL.ink, sw: .8 });
    paint(rectPts(x - 22 * s, y - 148 * s, 14 * s, 22 * s), { wash: D.ink, ink: null });
    inkLine([[x, y - 174 * s], [x, y - 240 * s]], 2.2 * s, D.ink, 'ink', 0);
    const flag = cloth(x, y - 238 * s, 60 * s, 20 * s, t, { dir: 1, sway: .8 });
    paint(flag, { wash: RED, ink: null });
  }
}
function windSand(t, n = 22, a = 1) {
  boilSeed('wind');
  for (let i = 0; i < n; i++) {
    const ph = frac(t * (.8 + .4 * seeded(71, i)) + seeded(72, i));
    const x = lerp(-200, W + 200, ph), y = 700 + seeded(73, i) * 260 + Math.sin(t * 3 + i) * 12;
    inkLine([[x, y], [x + 90 + 90 * seeded(74, i), y - 4]], 1 + 1.4 * a, mixCol(DESERT.dune2, PAL.cream, .4), 'dry', 0);
  }
}
function desertScene(t, o = {}) {
  desertSky(t, o);
  dunes(t, o);
  windSand(t, o.windN ?? 20, o.windA ?? 1);
}

// ---------- the tea room ----------
// Room world: wall to y 900, floor 900-1080. Round window at (520, 470) r 270; table at (1250, 800);
// shelf at (1580, 430); stove and kettle at (800, 840). Draw outside first, then the wall outside the window.
function roundWindowView(cx, cy, r, outside) {
  if (outside) outside(cx, cy, r);
  boilSeed('winWall');
  irisShape(ellPts(cx, cy, r, r, 48), '#C7A382');
}
function teaRoom(t, o = {}) {
  const L = o.L || SKY_WINTER;
  const wall = o.wall || '#D2B08C', wallDk = '#9A7355', beam = '#4E352B', floor = '#7A4F3C';
  // the world outside the round window
  roundWindowView(o.wx ?? 530, o.wy ?? 452, o.wr ?? 268, o.outside || ((cx, cy, r) => {
    boilSeed('outWin');
    paint(rectPts(cx - r, cy - r, r * 2, r * 2), { wash: L.sky, ink: null });
    paint(blot(cx + 60, cy + 100, r * 1.1, r * .7, 4, 20, .15), { wash: L.snow, ink: null });
    pagoda(cx + 150, cy + 170, 34, L, t, { glow: false });
    house(cx - 120, cy + 150, 170, 90, L, t, { lit: .8, door: false });
    for (let i = 0; i < 12; i++) {
      const ph = frac(t * .06 + seeded(81, i)), x = cx - r + ph * r * 2, y = cy - r + frac(seeded(82, i) + t * .12) * r * 2;
      paint(ellPts(x, y, 3, 3, 8), { wash: PAL.cream, washOp: 180, ink: null });
    }
  }));
  // interior plaster (outside the window, from roundWindowView) and the floor
  boilSeed('roomFloor');
  paint(rectPts(-500, 900, W + 1000, 400), { wash: floor, ink: null });
  for (let i = 0; i < 12; i++) inkLine([[-300 + i * 210, 900], [-480 + i * 210, 1200]], .7, mixCol(floor, PAL.ink, .35), 'inkfine', 0);
  paint(rectPts(-500, 860, W + 1000, 46), { wash: beam, ink: PAL.ink, sw: .7 });
  paint(rectPts(-500, -200, W + 1000, 210), { wash: beam, ink: null });
  for (let i = 0; i < 6; i++) inkLine([[i * 380 - 100, -200], [i * 380 - 100, 10]], .9, mixCol(beam, PAL.cream, .2), 'inkfine', 0);
  // window frame
  boilSeed('winFrame');
  const wx = o.wx ?? 530, wy = o.wy ?? 452, wr = o.wr ?? 268;
  push(); translate(wx, wy);
  brush.noFill(); brush.noWash(); brush.noHatch(); brush.set('ink', beam, 10); brush.beginShape(0);
  for (const p of ellPts(0, 0, wr + 10, wr + 10, 44)) brush.vertex(p[0], p[1]);
  brush.endShape(true); pop();
  inkLine([[wx, wy - wr + 6], [wx, wy + wr - 6]], 2.2, mixCol(beam, PAL.cream, .12), 'ink', 0);
  inkLine([[wx - wr + 6, wy], [wx + wr - 6, wy]], 2.2, mixCol(beam, PAL.cream, .12), 'ink', 0);
  paint(rectPts(wx - wr - 36, wy + wr + 2, wr * 2 + 72, 32, 2), { wash: beam, ink: PAL.ink, sw: .8 });
  // hanging scroll with a painted flower (no lettering)
  boilSeed('scroll');
  paint(rectPts(900, 70, 200, 470, 1.5), { wash: '#EFE3C8', ink: PAL.ink, sw: .8 });
  paint(rectPts(900, 70, 200, 22), { wash: beam, ink: null });
  paint(rectPts(900, 518, 200, 22), { wash: beam, ink: null });
  carvedFlower(1000, 300, 46, -.1, { t, ink: '#5E4634', petal: '#D9B77C' });
  inkLine([[960, 400], [980, 455], [1010, 430]], 1.6, mixCol('#5E7D5A', '#3E5A42', .4), 'ink', .5);
  // shelf with the carving, the flower, a lamp
  boilSeed('shelf');
  paint(rectPts(1450, 620, 380, 26, 1.5), { wash: '#8A5D42', ink: PAL.ink, sw: .9 });
  for (const sx of [1490, 1790]) paint(rectPts(sx - 9, 646, 18, 90), { wash: '#6A4634', ink: PAL.ink, sw: .7 });
  if (o.shelfObjects !== false) {
    carvedFace(1565, 552, 56, t, o.carveWhite);
    carvedFlower(1680, 588, 34, .2, { t, petal: '#D9B77C' });
    paint(rrPts(1478, 540, 26, 80, 5, .5), { wash: '#A85A52', ink: null });
    if (o.lamp !== false) lamp(1770, 610, 22, t);
  }
  // the actor sits behind the table (so the table hides their lap)
  if (o.actor) o.actor();
  // the actor sits behind the table (so the table hides their lap)
  if (o.actor) o.actor();
  // low table
  boilSeed('table');
  const tx = o.tableX ?? 1250, ty = o.tableY ?? 862;
  paint(ellPts(980, 1010, 300, 58, 28, 3), { wash: '#8E4A44', washOp: 90, ink: null });
  paint(rectPts(tx - 330, ty, 660, 34, 2), { wash: '#9A6A4A', ink: PAL.ink, sw: 1 });
  for (const sx of [-1, 1]) paint(rectPts(tx + sx * 290 - 12, ty + 34, 24, 150), { wash: '#6A4634', ink: PAL.ink, sw: .8 });
  paint(rectPts(tx - 300, ty + 48, 600, 18), { wash: '#5A3B2B', ink: null });
  // tea set on the table
  paint(rrPts(tx - 155, ty - 8, 310, 12, 5, .5), { wash: '#8E6A48', ink: PAL.ink, sw: .5 });
  teaPot(tx - 90, ty - 8, 32, t);
  cup(tx + 22, ty - 6, 22, t, { tea: '#B77A3E' });
  cup(tx + 96, ty - 6, 22, t, { tea: '#B77A3E' });
  // stove / kettle at the left of the table
  if (o.kettle !== false) stove(850, 900, .85, t);
  // cushion
  boilSeed('mat');
  paint(ellPts(1250, 952, 150, 38, 22, 3), { wash: '#A85A52', fill: '#7E3A3A', fillOp: 55, ink: PAL.ink, sw: .8 });
  // firelight from the stove and the shelf lamp
  glow(852, 790, 300, '#FFB45C', .28);
  glow(o.lamp === false ? 1760 : 1760, 590, 250, '#FFC46A', .22);
}
function lamp(x, y, s, t) {
  boilSeed('lamp' + x);
  paint(ellPts(x, y + s * .6, s * .9, s * .45, 16), { wash: '#7A5A3C', ink: PAL.ink, sw: .6 });
  paint(rectPts(x - s * .12, y - s * .35, s * .24, s * .95), { wash: '#8A6A48', ink: PAL.ink, sw: .5 });
  const f = 1 + .12 * Math.sin(t * 8 + x);
  glow(x, y - s * .55, s * 5.2, '#FFC46A', .65);
  paint(ellPts(x, y - s * .55, s * .3 * f, s * .62 * f, 12), { wash: '#FFE7A4', ink: PAL.ink, sw: .4 });
}
function stove(x, base, s, t) {
  boilSeed('stove');
  paint(ellPts(x, base - 36 * s, 70 * s, 44 * s, 20, 2), { wash: '#7D6A5A', ink: PAL.ink, sw: .9 });
  paint(rectPts(x - 64 * s, base - 36 * s, 128 * s, 36 * s), { wash: '#8E6A4E', ink: PAL.ink, sw: .8 });
  paint(rrPts(x - 44 * s, base - 118 * s, 88 * s, 84 * s, 10 * s, 1.5), { wash: '#8E7A64', ink: PAL.ink, sw: .9 });
  paint(ellPts(x + 74 * s, base - 130 * s, 12 * s, 8 * s, 10), { wash: GOLD, ink: PAL.ink, sw: .35 });
  for (let i = 0; i < 3; i++) {
    const a = 2 + i * 1.6, r = 42 * s;
    paint(ellPts(x + 86 * s, base - 210 * s + Math.sin(t * 2 + i) * 3, r, r * .62, 16, 1), { wash: '#A98C6A', ink: PAL.ink, sw: .7 });
  }
  glow(x, base - 60 * s, 160 * s, '#FF8E4A', .25 + .1 * pulse(t, 5));
}
function steam(x, y, s, t, o = {}) {
  boilSeed('steam');
  const n = o.n ?? 4, a = o.a ?? .8;
  for (let i = 0; i < n; i++) {
    const P = [];
    for (let k = 0; k <= 8; k++) {
      const q = k / 8, ph = t * .8 + i * 1.7 + q * 2.4;
      P.push([x + Math.sin(ph) * (10 + 30 * q) * s + (i - n / 2) * 12 * s - q * 20 * s,
              y - q * (150 + 50 * seeded(91, i)) * s]);
    }
    inkLine(P, (7 + 9 * seeded(92, i)) * s, o.col || PAL.cream, 'dry', .6);
  }
  const P2 = [];
  for (let k = 0; k <= 10; k++) { const q = k / 10; P2.push([x + Math.sin(t * 1.2 + q * 4) * 26 * q * s, y - q * 190 * s]); }
  inkLine(P2, 16 * s, o.col2 || mixCol(PAL.cream, '#D8CBB6', .3), 'dry', .7);
}
function cup(x, y, s, t, o = {}) {
  boilSeed('cup' + x);
  paint(ellPts(x, y, s * .62, s * .2, 18, 1), { wash: o.col || '#E8DCC4', ink: PAL.ink, sw: .55 });
  paint(ellPts(x, y - s * .07, s * .5, s * .16, 16, 1), { wash: o.tea || '#B77A3E', ink: null });
  paint(rrPts(x - s * .42, y - s * .5, s * .84, s * .5, s * .2, 1), { wash: o.col || '#E8DCC4', ink: PAL.ink, sw: .55 });
  paint(ellPts(x, y - s * .5, s * .42, s * .14, 16, 1), { wash: o.tea || '#B77A3E', ink: PAL.ink, sw: .5 });
}
function carvedFlower(x, y, r, rot, o = {}) {
  boilSeed('flower' + x);
  push(); translate(x, y); rotate(rot);
  for (let i = 0; i < 5; i++) {
    const a = i / 5 * TAU - Math.PI / 2;
    paint(ellPts(Math.cos(a) * r * .62, Math.sin(a) * r * .62, r * .52, r * .36, 14, 0, a),
      { wash: o.petal || WOOD.lt, ink: o.ink || PAL.ink, sw: .6 });
    inkLine([[Math.cos(a) * r * .3, Math.sin(a) * r * .3], [Math.cos(a) * r * .9, Math.sin(a) * r * .9]], .5, o.ink || WOOD.dk, 'inkfine', 0);
  }
  paint(ellPts(0, 0, r * .26, r * .26, 12), { wash: o.center || WOOD.col, ink: PAL.ink, sw: .55 });
  for (let i = 0; i < 3; i++) inkLine([[Math.cos(i * 2.1) * r * .1, Math.sin(i * 2.1) * r * .1], [Math.cos(i * 2.1) * r * .18, Math.sin(i * 2.1) * r * .18]], .4, WOOD.dk, 'inkfine', 0);
  pop();
}
function carvedFace(x, y, s, t, white) {
  boilSeed('carvedFace' + x);
  const grain = white ? '#E6DCC6' : '#D7B07A', dk = white ? '#B9AB90' : '#A47A48';
  paint(rrPts(x - s * .78, y - s * 1.0, s * 1.56, s * 1.9, s * .2, 1.2), { wash: grain, ink: PAL.ink, sw: .7 });
  // carved topknot and the two slit eyes, nose and mouth in relief
  paint(rectPts(x - s * .18, y - s * 1.28, s * .36, s * .34, 1), { wash: dk, ink: PAL.ink, sw: .45 });
  paint(rectPts(x - s * .2, y - s * .98, s * .4, s * .08), { wash: RED, washOp: 225, ink: null });
  for (const sx of [-1, 1]) {
    paint(rectPts(x + sx * s * .34 - s * .15, y - s * .52, s * .3, s * .44, 1), { wash: '#4E3228', ink: PAL.ink, sw: .4 });
    inkLine([[x + sx * s * .54, y - s * .62], [x + sx * s * .2, y - s * .56]], .8, dk, 'ink', .4);
    inkLine([[x + sx * s * .52, y - s * .18], [x + sx * s * .3, y + s * .2]], .6, dk, 'inkfine', .4);
  }
  inkLine([[x, y - s * .3], [x - s * .06, y + s * .04], [x + s * .3, y]], .9, dk, 'ink', .5);
  inkLine([[x - s * .3, y + s * .3], [x, y + s * .38], [x + s * .3, y + s * .3]], 1.1, '#4E3228', 'ink', .4);
  inkLine([[x - s * .62, y + s * .62], [x, y + s * .7], [x + s * .62, y + s * .62]], .8, dk, 'inkfine', .4);
  for (let i = 0; i < 3; i++) inkLine([[x - s * .6, y - s * .8 + i * s * .5], [x - s * .45, y - s * .72 + i * s * .5]], .3, dk, 'inkfine', 0);
  if (!white) { glow(x, y, s * 2.4, '#FFB86A', .18 + .05 * Math.sin(t * 1.6)); }
}
function woodBlock(x, y, s) {
  boilSeed('wood' + x);
  paint(rrPts(x - s * .55, y - s * 1.15, s * 1.1, s * 1.15, s * .08, 1.5), { wash: '#E0C49A', ink: PAL.ink, sw: .8 });
  for (let i = 0; i < 4; i++) inkLine([[x - s * .45, y - s * .95 + i * s * .24], [x + s * .42, y - s * .9 + i * s * .24]], .35, '#A47A48', 'inkfine', 0);
  paint(ellPts(x, y - s * 1.15, s * .55, s * .12, 18, 1), { wash: '#EBD6B2', ink: PAL.ink, sw: .5 });
}
function shavings(x, y, s, t, n = 7) {
  boilSeed('shavings' + x);
  for (let i = 0; i < n; i++) {
    const a = seeded(101, i) * TAU, len = s * (.5 + .7 * seeded(102, i));
    const P = []; for (let k = 0; k <= 4; k++) { const q = k / 4; P.push([x + Math.cos(a) * q * len + Math.sin(t * 1.5 + i) * 3, y + Math.sin(a) * q * len * .5 - q * q * s * .3]); }
    paint(ribbon(P, s * .12, s * .04), { wash: '#E8D0A8', ink: '#8E6338', sw: .35 });
  }
}
function knife(x, y, a, s, o = {}) {
  boilSeed('knife');
  push(); translate(x, y); rotate(a);
  paint([[-s * .9, -s * .08], [s * .9, -s * .05], [s * .75, s * .2], [-s * .85, s * .18]], { wash: '#DCD8CC', ink: PAL.ink, sw: .6 });
  paint(rrPts(-s * .95, -s * .18, s * .5, s * .38, s * .12, .5), { wash: '#6B3F2E', ink: PAL.ink, sw: .5 });
  inkLine([[-s * .45, s * .06], [s * .72, s * .02]], .5, '#FFFFFF', 'inkfine', 0);
  pop();
}
function teaPot(x, y, s, t) {
  boilSeed('pot');
  paint(ellPts(x, y, s * .62, s * .5, 18, 1), { wash: '#B7703F', ink: PAL.ink, sw: .8 });
  paint(ellPts(x, y - s * .5, s * .3, s * .12, 14, 1), { wash: '#C98A5A', ink: PAL.ink, sw: .5 });
  paint(rrPts(x + s * .4, y - s * .22, s * .7, s * .16, s * .06, .5), { wash: '#A8643A', ink: PAL.ink, sw: .5 });
  paint(rrPts(x - s * .85, y - s * .3, s * .3, s * .5, s * .1, .5), { wash: '#A8643A', ink: PAL.ink, sw: .5 });
  inkLine([[x, y - s * .55], [x, y - s * .9]], s * .12, '#8A4E32', 'ink', 0);
}
function scrollOfPetals(t, n, x0, x1, y0, y1) { petals(t, n, x0, x1, y0, y1, SKY_SPRING.blossom, .7); }

// ---------- characters ----------
function zhao(x, y, u, o = {}) {
  const draw = o.draw, flower = o.flower, whiteStreak = o.whiteStreak, collar = o.collar || PAL.cream;
  clawd(x, y, u, { ...o, ...ZHAO, tint: null, hat: o.hat ?? 'bun',
    draw: (uu, sw) => {
      if (flower) carvedFlower(-3.4 * uu, -10.1 * uu, .82 * uu, .18, { t: T, petal: WOOD.lt });
      if (whiteStreak) for (let i = 0; i < 6; i++)
        inkLine([[-3.5 * uu + i * .38 * uu, -8.3 * uu], [-4.0 * uu + i * .42 * uu, -6.95 * uu]], sw * .65, '#F4ECDC', 'inkfine', .3);
      paint(rectPts(-4.4 * uu, -2.78 * uu, 8.8 * uu, .72 * uu, .6), { wash: '#8E2F36', washOp: 235, ink: PAL.ink, sw: sw * .35 });
      paint([[-4.4 * uu, -4.05 * uu], [-.35 * uu, -3.2 * uu], [-.8 * uu, -2.8 * uu], [-4.4 * uu, -3.55 * uu]], { wash: collar, washOp: 225, ink: PAL.ink, sw: sw * .3 });
      paint([[4.4 * uu, -4.05 * uu], [.35 * uu, -3.2 * uu], [.8 * uu, -2.8 * uu], [4.4 * uu, -3.55 * uu]], { wash: collar, washOp: 225, ink: PAL.ink, sw: sw * .3 });
      for (const s of [-1, 1]) for (let k = 0; k < 2; k++)
        inkLine([[s * (1.9 + k * .55) * uu, -6.75 * uu], [s * (2.45 + k * .55) * uu, -6.95 * uu]], sw * .3, PAL.ink, 'inkfine', 0);
      if (draw) draw(uu, sw);
    } });
}
function elder(x, y, u, o = {}) {
  return zhao(x, y, u, { ...o, hat: o.hat ?? 'bunw', collar: o.collar ?? '#6E2A2E' });
}
function xiao(x, y, u, o = {}) {
  const draw = o.draw;
  clawd(x, y, u, { ...o, ...XIAO, tint: null, hat: o.hat ?? 'topknot',
    draw: (uu, sw) => {
      paint(rectPts(-4.4 * uu, -2.72 * uu, 8.8 * uu, .72 * uu, .6), { wash: '#2F3E4E', ink: PAL.ink, sw: sw * .35 });
      paint([[-4.3 * uu, -4.0 * uu], [-.5 * uu, -3.25 * uu], [-1.5 * uu, -2.55 * uu], [-4.5 * uu, -3.45 * uu]], { wash: RED, washOp: 225, ink: PAL.ink, sw: sw * .35 });
      if (o.sword) inkLine([[-5.8 * uu, -1.2 * uu], [-6.7 * uu, -4.6 * uu]], sw * .9, PAL.ink, 'ink', 0);
      if (draw) draw(uu, sw);
    } });
}
function young(x, y, u, o = {}) { return zhao(x, y, u, { ...o, hat: 'bun' }); }

// ---------- the horse ----------
// Side view, facing right; (x, y) is the ground between the hooves. s = shoulder height / 4.
// o.gait = leg phase, o.flip mirrors, o.rider(x, y, u, pose) draws a rider on the saddle.
function horse(x, y, s, t, o = {}) {
  const flip = o.flip, gait = o.gait ?? 0, body = o.body || '#EFE4D0', shade = o.shade || '#D2BEA0';
  const mane = o.mane || '#3A3040';
  push(); translate(x, y); if (flip) scale(-1, 1);
  const sw = clamp(s / 30, .5, 1.6);
  // tail
  boilSeed('horseTail');
  const tailP = [];
  for (let i = 0; i <= 6; i++) { const q = i / 6; tailP.push([-2.15 * s - q * .9 * s + Math.sin(t * 2.5 + q * 4) * .18 * s, -3.7 * s + q * 2.1 * s + q * q * .4 * s]); }
  paint(ribbon(tailP, .55 * s, .18 * s), { wash: mane, ink: PAL.ink, sw: sw * .6 });
  // shadow and legs
  boilSeed('horseShadow');
  paint(ellPts(0, 6, 2.5 * s, .42 * s, 20), { wash: PAL.ink, washOp: 34, ink: null });
  const leg = (hx, far) => {
    const ph = gait + hx * .9, swing = Math.sin(ph) * .7, lift = Math.max(0, Math.cos(ph)) * .32;
    const knee = [hx * s + swing * .6 * s, -1.8 * s - lift * s], hoof = [hx * s + swing * 1.15 * s, -0.05 * s - Math.max(0, Math.sin(ph)) * .12 * s];
    const P = [[hx * s, -2.45 * s], knee, hoof];
    paint(ribbon(P, (far ? .48 : .62) * s, (far ? .3 : .38) * s), { wash: far ? mixCol(shade, body, .15) : body, ink: PAL.ink, sw: sw * .5 });
    paint(ellPts(hoof[0], hoof[1] - .08 * s, .24 * s, .17 * s, 8), { wash: far ? mixCol(shade, PAL.ink, .35) : '#40322E', ink: null });
  };
  leg(-1.55, true); leg(1.45, true);
  // body
  boilSeed('horseBody');
  paint(blot(0, -3.05 * s, 2.25 * s, 1.1 * s, 3, 20, .05), { wash: body, ink: PAL.ink, sw: sw * .8 });
  // neck and head
  paint([[-1.35 * s, -3.7 * s], [-.3 * s, -4.6 * s], [.9 * s, -5.1 * s], [1.55 * s, -4.8 * s], [1.75 * s, -3.5 * s], [1.1 * s, -3.2 * s], [.25 * s, -3.5 * s]],
    { wash: body, ink: PAL.ink, sw: sw * .8 });
  paint([[1.55 * s, -4.95 * s], [2.2 * s, -5.4 * s], [2.75 * s, -5.1 * s], [2.9 * s, -4.45 * s], [2.6 * s, -4.1 * s], [2.0 * s, -4.25 * s], [1.7 * s, -4.5 * s]],
    { wash: body, ink: PAL.ink, sw: sw * .8 });
  paint(ellPts(2.82 * s, -4.62 * s, .14 * s, .12 * s, 8), { wash: '#3A2A2E', ink: null });
  paint([[1.95 * s, -5.35 * s], [2.05 * s, -5.95 * s], [2.2 * s, -5.35 * s]], { wash: body, ink: PAL.ink, sw: sw * .5 });
  paint([[2.5 * s, -5.2 * s], [2.62 * s, -5.75 * s], [2.72 * s, -5.15 * s]], { wash: body, ink: PAL.ink, sw: sw * .5 });
  inkLine([[2.9 * s, -4.5 * s], [3.05 * s, -4.2 * s]], sw * .5, PAL.ink, 'ink', 0);
  // mane
  for (let i = 0; i < 4; i++) {
    const q = i / 3, bx = lerp(-.4, 1.7, q) * s, by = (-4.7 + .5 * q) * s;
    inkLine([[bx, by], [bx - .3 * s + Math.sin(t * 2 + i) * .08 * s, by + .62 * s]], sw * .7, mane, 'dry', .3);
  }
  // saddle and blanket
  paint([[-1.0 * s, -3.75 * s], [.9 * s, -3.75 * s], [1.15 * s, -2.4 * s], [-1.25 * s, -2.4 * s]], { wash: '#A83A3A', ink: PAL.ink, sw: sw * .6 });
  paint(rrPts(-.65 * s, -4.0 * s, 1.35 * s, .5 * s, .18 * s, .5), { wash: '#5E3A2E', ink: PAL.ink, sw: sw * .6 });
  inkLine([[-1.2 * s, -2.55 * s], [-1.2 * s, -1.9 * s]], sw * .5, '#D9B77C', 'ink', 0);
  leg(-1.15, false); leg(1.05, false);
  // the rider, and the reins
  if (o.rider) {
    const u = o.riderU ?? s * .55, rx = o.riderX ?? .05 * s, ry = -4.35 * s;
    paint(ribbon([[.25 * s, -3.55 * s], [.55 * s, -3.0 * s], [.42 * s, -2.45 * s]], .5 * s, .34 * s), { wash: '#3E4C5A', ink: PAL.ink, sw: sw * .45 });
    paint(rectPts(.2 * s, -2.5 * s, .45 * s, .18 * s, 1), { wash: '#2E2A2A', ink: PAL.ink, sw: sw * .35 });
    push(); translate(rx, ry);
    o.rider(u, { gait, t });
    pop();
    inkLine([[2.2 * s, -4.55 * s], [.6 * s, -3.4 * s]], sw * .35, '#4A3A34', 'inkfine', 0);
  }
  pop();
}

// ---------- the workshop ----------
// A warm timber room: a square window on the spring town, a worktable, a shelf of half-finished carvings,
// hanging cloth, a lamp. The camera lives close; the table is at y 840.
function workRoom(t, o = {}) {
  const wall = '#D3AC82', beam = '#4A3228', floor = '#6E4736';
  boilSeed('workWall');
  paint(rectPts(-500, -400, W + 1000, 1500), { wash: wall, ink: null });
  // square window onto a small spring bridge
  const wx = o.wx ?? 610, wy = o.wy ?? 330, ww = o.ww ?? 330, wh = o.wh ?? 300;
  boilSeed('workWin');
  paint(rectPts(wx, wy, ww, wh), { wash: SKY_SPRING.sky, ink: null });
  paint(ellPts(wx + ww * .5, wy + wh * .78, ww * .55, wh * .18, 26, 3), { wash: SKY_SPRING.hill2, ink: null });
  paint(rectPts(wx, wy + wh * .76, ww, wh * .24), { wash: SKY_SPRING.water, ink: null });
  paint([[-40 + wx + ww * .5, wy + wh * .76], [0 + wx + ww * .5, wy + wh * .60], [40 + wx + ww * .5, wy + wh * .76]], { wash: SKY_SPRING.stone, ink: PAL.ink, sw: .7 });
  paint(rectPts(wx + ww * .12, wy + wh * .58, ww * .22, wh * .18), { wash: SKY_SPRING.wall, ink: PAL.ink, sw: .6 });
  roof(wx + ww * .23, wy + wh * .54, ww * .26, wh * .08, SKY_SPRING, { lift: .3, sw: .5 });
  paint(rectPts(wx + ww * .72, wy + wh * .57, ww * .13, wh * .19), { wash: SKY_SPRING.wall, ink: PAL.ink, sw: .6 });
  roof(wx + ww * .785, wy + wh * .53, ww * .17, wh * .08, SKY_SPRING, { lift: .3, sw: .5 });
  willow(wx + ww * .06, wy + wh * .76, 70, t, SKY_SPRING);
  paint(rectPts(wx, wy, ww, wh), { ink: PAL.ink, sw: 1.2 });
  inkLine([[wx + ww / 2, wy], [wx + ww / 2, wy + wh]], 4, beam, 'ink', 0);
  inkLine([[wx, wy + wh / 2], [wx + ww, wy + wh / 2]], 4, beam, 'ink', 0);
  paint(rectPts(wx - 26, wy + wh + 4, ww + 52, 24), { wash: beam, ink: PAL.ink, sw: .7 });
  // beams and a floor
  paint(rectPts(-500, -200, W + 1000, 190), { wash: beam, ink: null });
  paint(rectPts(-500, 900, W + 1000, 400), { wash: floor, ink: null });
  for (let i = 0; i < 12; i++) inkLine([[-300 + i * 210, 900], [-480 + i * 210, 1200]], .7, mixCol(floor, PAL.ink, .3), 'inkfine', 0);
  paint(rectPts(-500, 858, W + 1000, 42), { wash: beam, ink: PAL.ink, sw: .6 });
  // hanging strips of dyed cloth (red, indigo)
  boilSeed('hanging');
  for (let i = 0; i < 3; i++) {
    const hx = 1180 + i * 90, len = 190 + 60 * (i % 2);
    paint(rectPts(hx, 20, 34, len, .8), { wash: i === 1 ? RED : (i ? '#4E6B86' : '#C87A62'), ink: PAL.ink, sw: .5 });
  }
  // shelf with blanks, a jar, a finished bird
  boilSeed('workShelf');
  paint(rectPts(1420, 560, 360, 22, 1.5), { wash: '#8A5D42', ink: PAL.ink, sw: .9 });
  for (let i = 0; i < 3; i++) woodBlock(1480 + i * 80, 560, 38);
  paint(ellPts(1700, 500, 28, 34, 14, 1), { wash: '#7A6A58', ink: PAL.ink, sw: .7 });
  if (o.bench !== false) workBench(t, o);
  // a cushion and a lamp just behind the work
  boilSeed('workMat');
  paint(ellPts(1030, 952, 150, 38, 22, 3), { wash: '#B0895E', ink: PAL.ink, sw: .8 });
  lamp(1500, 780, 26, t);
}
function workBench(t, o = {}) {
  boilSeed('workTable');
  paint(rectPts(o.tx ?? 760, 838, 670, 34, 2), { wash: '#9A6A4A', ink: PAL.ink, sw: 1.1 });
  paint(rectPts(o.tx ?? 760, 872, 670, 128), { wash: '#6E4736', ink: PAL.ink, sw: 1 });
  for (let i = 0; i < 7; i++) inkLine([[820 + i * 90, 872], [800 + i * 90, 1000]], .6, '#4E332A', 'inkfine', 0);
}
function mountainSea(t, o = {}) {
  boilSeed('mtsky');
  paint(rectPts(-800, -1000, W + 1600, 2400), { wash: '#D9B9A4', ink: null });
  paint(ellPts(1180, 700, 1600, 420, 30, 12), { fill: '#E8C9A6', fillOp: 130, bleed: .3, tex: .5, ink: null });
  const sx = o.sunX ?? 1330, sy = o.sunY ?? 300;
  glow(sx, sy, 420, '#FFD8A0', .7);
  paint(ellPts(sx, sy, 90, 90, 24, 2), { wash: '#F8D59A', washOp: 235, ink: null });
  const peaks = [
    { y: 760, col: '#A98A82', a: .9, pts: [[-100, 860], [180, 560], [340, 690], [560, 470], [820, 720], [1040, 590], [1280, 760], [1520, 560], [1800, 760], [2100, 860]] },
    { y: 860, col: '#7E6E78', a: .95, pts: [[-100, 940], [240, 690], [470, 820], [720, 600], [980, 830], [1240, 680], [1480, 860], [1750, 660], [2100, 900]] },
    { y: 980, col: '#4E4A5E', a: 1, pts: [[-100, 1040], [300, 820], [560, 940], [840, 760], [1120, 960], [1380, 800], [1660, 960], [1950, 830], [2150, 1000]] },
  ];
  peaks.forEach((pk, i) => {
    boilSeed('mt' + i);
    paint(pk.pts.concat([[2100, 1200], [-100, 1200]]), { wash: pk.col, ink: null });
  });
  for (let i = 0; i < 9; i++) {   // the sea of clouds
    boilSeed('cloud' + i);
    const cy = 760 + i * 34, cx = 200 + seeded(141, i) * 1500 + Math.sin(t * .12 + i) * 40;
    paint(blot(cx, cy, 420 + 180 * seeded(142, i), 30, i, 22, .18), { fill: PAL.cream, fillOp: 120, bleed: .35, tex: .3, ink: null });
  }
  if (o.pine) {
    inkLine([[o.pine, 1000], [o.pine - 30, 690], [o.pine + 20, 520]], 16, '#3A2E2E', 'ink', .4);
    for (let i = 0; i < 5; i++) {
      const px = o.pine + Math.sin(i * 2) * 30, py = 560 + i * 54, w = 170 - i * 16;
      paint(blot(px, py, w * .5, 22, i + 4, 16, .3), { wash: '#4A5C4A', ink: null });
    }
  }
}
function teaTable(x, y, s, t, o = {}) {
  boilSeed('teaTable');
  paint(blot(x, y, 150 * s, 48 * s, 5, 24, .08), { wash: '#B8AD9C', ink: PAL.ink, sw: .9 });
  paint(rectPts(x - 120 * s, y, 240 * s, 120 * s), { wash: '#8E8274', ink: PAL.ink, sw: .9 });
  paint(rectPts(x - 120 * s, y + 40 * s, 240 * s, 10 * s), { wash: '#6E665C', ink: null });
  teaPot(x - 30 * s, y - 12 * s, 38 * s, t);
  cup(x + 82 * s, y - 14 * s, 26 * s, t);
  teaSteam(x - 30 * s, y - 52 * s, .95 * s, t, 2);
}
function courtyard(t, o = {}) {
  const L = SKY_WINTER;
  boilSeed('courtSky');
  paint(rectPts(-500, -600, W + 1000, 1600), { wash: L.sky, ink: null });
  pagoda(1520, 620, 48, L, t, { glow: true });
  house(320, 700, 320, 180, L, t, { lit: .7 });
  paint(rectPts(-500, 860, W + 1000, 500), { wash: L.snow, ink: null });
  // the courtyard wall with a gate: draw the outside through the opening first
  boilSeed('courtWall');
  const gx = o.gx ?? 960, gw = 260, gy = 470, gh = 390;
  paint(rectPts(gx - gw / 2, gy, gw, gh), { wash: mixCol(L.sky, L.snow, .25), ink: null });
  paint(blot(gx, gy + 180, 220, 90, 2, 18, .12), { wash: L.snow, ink: null });
  stoneBridge(L, t, {});
  paint(rectPts(gx - gw / 2, gy, gw, gh), { ink: PAL.ink, sw: 1.4 });
  // mask the bridge back to the opening
  const wallCol = '#C9B39A';
  paint(rectPts(-500, -600, W + 1000, gy + 600), { wash: wallCol, ink: null });
  paint(rectPts(-500, gy + gh, W + 1000, 600), { wash: wallCol, ink: null });
  paint(rectPts(-500, gy - 10, W / 2 - gw / 2 + 500, gh + 20), { wash: wallCol, ink: null });
  paint(rectPts(gx + gw / 2, gy - 10, 500, gh + 20), { wash: wallCol, ink: null });
  roof(gx, gy - 110, gw + 170, 56, L, { lift: .3 });
  paint(rectPts(gx - gw / 2 - 14, gy - 6, 14, gh + 6), { wash: L.woodDk, ink: PAL.ink, sw: .7 });
  paint(rectPts(gx + gw / 2, gy - 6, 14, gh + 6), { wash: L.woodDk, ink: PAL.ink, sw: .7 });
  // snow ground in front of the wall
  paint(rectPts(-500, 858, W + 1000, 500), { wash: L.snow, ink: null });
  snowBank(500, 900, 380); snowBank(1450, 930, 320);
  paint(rectPts(-500, 850, W + 1000, 20), { wash: L.snow, ink: null });
  if (o.horse) horse(o.horse[0], o.horse[1], o.horse[2], t, o.horse[3] || {});
  snowfall(t, 40, 1);
}
// Rain under the deep eaves: a tiled roof edge, a plaster wall, a step, and a puddle.
function eaves(t, o = {}) {
  boilSeed('eavesWall');
  paint(rectPts(-500, -400, W + 1600, 1600), { wash: '#C9B096', ink: null });
  // roof and tiles
  paint([[-400, 260], [500, 170], [1500, 170], [2300, 300], [2300, 520], [-400, 520]], { wash: '#3E4656', ink: PAL.ink, sw: 1.2 });
  for (let i = 0; i < 13; i++) {
    const x = -200 + i * 190;
    inkLine([[x, 520], [x + 40, 250]], 1, '#596173', 'inkfine', 0);
    paint(ellPts(x + 20, 522, 30, 20, 12, 1), { wash: '#4A5364', ink: PAL.ink, sw: .5 });
    inkLine([[x + 20, 530], [x + 20, 560]], .6, '#82909E', 'inkfine', 0);
  }
  paint(rectPts(-400, 520, 2700, 26), { wash: '#655E52', ink: PAL.ink, sw: .8 });
  // the plaster wall below, a dark wooden window
  paint(rectPts(-400, 560, 2700, 700), { wash: '#D8C4A6', ink: null });
  paint(rectPts(1230, 640, 360, 300), { wash: '#4E3E34', ink: PAL.ink, sw: 1 });
  paint(rectPts(1250, 660, 320, 260), { wash: mixCol('#8EA0A0', '#C9B096', .3), ink: null });
  for (let i = 0; i < 3; i++) inkLine([[1280 + i * 100, 660], [1280 + i * 100, 920]], 5, '#4E3E34', 'ink', 0);
  inkLine([[1250, 790], [1570, 790]], 5, '#4E3E34', 'ink', 0);
  // the step and a wet stone floor
  paint(rectPts(-400, 862, 2700, 38), { wash: '#9E8E78', ink: PAL.ink, sw: .9 });
  paint(rectPts(-400, 900, 2700, 300), { wash: '#6C6258', ink: null });
  // rain curtain from the eaves
  boilSeed('rain');
  const rainN = Math.round(46 * (o.rain ?? 1));
  for (let i = 0; i < rainN; i++) {
    const x = -100 + seeded(151, i) * (W + 200), off = frac(t * (1.1 + .5 * seeded(152, i)) + seeded(153, i));
    const y0 = 540 + off * 250, len = 40 + 50 * seeded(154, i);
    inkLine([[x, y0], [x + 3, y0 + len]], .7 + .6 * seeded(155, i), '#C6D3D8', 'inkfine', 0);
  }
  // puddle, above the karaoke band
  paint(blot(960, 936, 470, 30, 6, 28, .12), { wash: '#8FA4A4', ink: PAL.ink, sw: .8 });
  for (let i = 0; i < 5; i++) {
    const rr = (t * 70 + i * 46) % 240;
    paint(ellPts(960 + Math.sin(i * 4) * 110, 936, rr, rr * .1, 22), { ink: null, fill: '#D8E4E0', fillOp: 40 * (1 - rr / 240) });
  }
}

// ---------- effects ----------
function dust(x, y, s, t, n = 6, a = .6) {
  boilSeed('dust' + x);
  for (let i = 0; i < n; i++) {
    const ph = frac(t * (.7 + .3 * seeded(111, i)) + seeded(112, i));
    const cx = x - ph * s * 3.2, cy = y - ph * s * .7 + Math.sin(ph * 4 + i) * 10;
    paint(blot(cx, cy, s * (.35 + .5 * ph), s * (.25 + .35 * ph), i, 14, .3), { fill: mixCol(DESERT.dune, PAL.cream, .35), fillOp: 90 * a * (1 - ph), bleed: .3, tex: .5, ink: null });
  }
}
function windLines(x0, y0, x1, y1, t, n = 12, col = PAL.cream) {
  boilSeed('wlines');
  for (let i = 0; i < n; i++) {
    const y = lerp(y0, y1, seeded(121, i)), ph = frac(t * .45 + seeded(122, i));
    const xx = lerp(x0, x1, ph), len = 100 + 160 * seeded(123, i);
    inkLine([[xx, y], [xx + len, y - 8 + 12 * seeded(124, i)]], .8 + 1.2 * seeded(125, i), col, 'dry', .2);
  }
}
function sparkles(x, y, r, t, n = 8, col = '#FFD88A') {
  boilSeed('spark' + x);
  for (let i = 0; i < n; i++) {
    const a = seeded(131, i) * TAU + t * .5, rr = r * (.5 + .6 * seeded(132, i));
    const tw = .5 + .5 * Math.sin(t * 3 + i * 2.3);
    paint(starPts(x + Math.cos(a) * rr, y + Math.sin(a) * rr * .6, 4 + 5 * tw, .4, 4), { wash: col, washOp: 220, ink: null });
  }
}

// ---------- shared story props (act I–IV) ----------
function woodToy(x, y, s) {
  boilSeed('toy' + x);
  paint(rrPts(x - s * .75, y - s * .82, s * 1.5, s * .55, s * .2, 1), { wash: WOOD.lt, ink: PAL.ink, sw: .55 });
  for (const lx of [-.5, -.15, .3, .6]) paint(rectPts(x + lx * s, y - s * .28, s * .1, s * .28), { wash: WOOD.col, ink: PAL.ink, sw: .35 });
  paint([[-.55, -.82], [-.5, -1.32], [0, -1.48], [.3, -1.15], [.1, -.85]].map(([a, b]) => [x + a * s, y + b * s]), { wash: WOOD.lt, ink: PAL.ink, sw: .45 });
  inkLine([[x + .05 * s, y - 1.46 * s], [x + .12 * s, y - 1.62 * s]], .5, PAL.ink, 'ink', 0);
  inkLine([[x + .32 * s, y - 1.38 * s], [x + .38 * s, y - 1.54 * s]], .5, PAL.ink, 'ink', 0);
  paint(ribbon([[x - .75 * s, y - .75 * s], [x - 1.05 * s, y - .55 * s], [x - 1.15 * s, y - .3 * s]], .16 * s, .06 * s), { wash: WOOD.col, ink: PAL.ink, sw: .35 });
  paint(rectPts(x - .45 * s, y - .95 * s, .5 * s, .16 * s), { wash: '#8E3A3A', ink: null });
}
function birdV(x, y, s, col = PAL.ink) {
  inkLine([[x - s, y], [x - s * .35, y - s * .55], [x, y - s * .08]], .9, col, 'ink', .5);
  inkLine([[x, y - s * .08], [x + s * .35, y - s * .55], [x + s, y]], .9, col, 'ink', .5);
}
function embroidery(x, y, s, t) {
  boilSeed('emb' + x);
  paint(rrPts(x - s * .8, y - s * .32, s * 1.6, s * .64, s * .12, 1), { wash: RED, ink: PAL.ink, sw: .55 });
  paint([[-.6, -.05], [-.2, -.2], [.15, .05], [.55, -.18]].map(([a, b]) => [x + a * s, y + b * s]), { wash: '#E7B65E', washOp: 220, ink: null });
  inkLine([[x - .55 * s, y], [x - .2 * s, y - .18 * s], [x + .18 * s, y + .04 * s], [x + .55 * s, y - .16 * s]], 1.1, GOLD, 'inkfine', .4);
  for (let i = 0; i < 3; i++) paint(ellPts(x + (-.25 + i * .25) * s, y + (-.1 + (i % 2) * .12) * s, s * .05, s * .03, 8), { wash: '#F2D58A', ink: null });
  paint(rrPts(x - s * .84, y - s * .36, s * .18, s * .72, s * .05, .5), { wash: '#8E2F36', ink: PAL.ink, sw: .35 });
}
function makeupBrush(x, y, a, s) {
  push(); translate(x, y); rotate(a);
  paint(rrPts(-s * .6, -s * .1, s * 1.2, s * .2, s * .06, .5), { wash: '#6B4030', ink: PAL.ink, sw: .4 });
  paint(ellPts(s * .65, 0, s * .22, s * .16, 10), { wash: '#C8324A', ink: PAL.ink, sw: .35 });
  pop();
}
function umbrella(x, y, r, t, col = '#C7433E') {
  boilSeed('umb' + x);
  push(); translate(x, y); rotate(.06 + .025 * Math.sin(t * 1.3));
  paint(ellPts(0, 0, r, r * .56, 26, 2, 0), { wash: col, ink: PAL.ink, sw: 1.1 });
  for (let i = 0; i < 5; i++) {
    const a = -Math.PI + (i + .5) / 5 * Math.PI;
    inkLine([[0, 0], [Math.cos(a) * r, Math.sin(a) * r * .56]], .6, '#7E2629', 'inkfine', 0);
  }
  inkLine([[0, -r * .56], [0, r * 1.25]], 3, '#5A3A2E', 'ink', 0);
  paint(ellPts(0, 0, r * .1, r * .06, 10), { wash: GOLD, ink: PAL.ink, sw: .4 });
  pop();
}
function veilDrape(x, y, u, t, k = 1, flip = 1) {
  if (k < .02) return;
  boilSeed('veilDrape');
  const P = cloth(x + flip * 4.6 * u, y - 7.7 * u, 5.3 * u * k, 1.5 * u, t, { dir: flip, sway: .7, ph: 1.1, taper: .35, drop: 2.2 * u });
  paint(P, { wash: RED, washOp: 180, ink: null });
  const Q = cloth(x - flip * 3.6 * u, y - 8.3 * u, 4.1 * u * k, 1.1 * u, t, { dir: -flip, sway: .6, ph: .2, taper: .3, drop: 1.3 * u });
  paint(Q, { wash: RED, washOp: 155, ink: null });
}

// a thin curling tea steam: handwriting, not a cloud
function teaSteam(x, y, s, t, n = 2, col = '#F2E6CE') {
  boilSeed('tsteam' + x);
  for (let i = 0; i < n; i++) {
    const P = [];
    for (let k = 0; k <= 6; k++) {
      const q = k / 6;
      P.push([x + Math.sin(t * 1.1 + q * 3.4 + i * 2) * (6 + 18 * q) * s + (i - (n - 1) / 2) * 8 * s, y - q * (90 + 24 * i) * s]);
    }
    inkLine(P, 2.2 * s, col, 'inkfine', .6);
  }
}
