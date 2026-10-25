// s1_spring.js · 红昭愿, act I — a spring by the bridge; the carving; the rider; the red veil.
// Song grid: 115 BPM, bar 2.08696 s, downbeat .048 s. LRC line times refined to the vocal.
(() => {
  // a small red veil tied to the bridge rail, two tails in the wind
  function veilOnRail(x, y, t, k = 1) {
    boilSeed('veilRail');
    paint(rrPts(x - 20, y - 8, 40, 26, 8, 1), { wash: RED, fill: '#E4635C', fillOp: 60, ink: PAL.ink, sw: .8 });
    const P1 = cloth(x - 12, y + 10, 120 * k, 34, t, { dir: -1, sway: .8, ph: .4, taper: .2 });
    const P2 = cloth(x + 8, y + 8, 96 * k, 28, t, { dir: 1, sway: .9, ph: 1.7, taper: .1 });
    paint(P1, { wash: RED, washOp: 225, fill: '#E4635C', fillOp: 55, bleed: .1, tex: .4, ink: PAL.ink, sw: .7 });
    paint(P2, { wash: RED, washOp: 210, fill: '#E4635C', fillOp: 50, bleed: .1, tex: .4, ink: PAL.ink, sw: .6 });
  }
  // the veil in her paws, and later over her shoulders
  function veilGift(x, y, s, t, k = 1) {
    boilSeed('veilGift');
    paint(rrPts(x - s * .55, y - s * .22, s * 1.1, s * .44, s * .12, 1), { wash: RED, fill: '#E4635C', fillOp: 60, ink: PAL.ink, sw: .7 });
    inkLine([[x - s * .5, y - s * .1], [x + s * .5, y + s * .04]], .5, GOLD, 'inkfine', .3);
    const P = cloth(x + s * .2, y + s * .1, s * 1.9 * k, s * .5, t, { dir: 1, sway: .6, ph: 2.2, taper: .2, drop: s * .3 });
    paint(P, { wash: RED, washOp: 200, fill: '#E4635C', fillOp: 50, bleed: .1, tex: .4, ink: PAL.ink, sw: .6 });
  }
  function veilDrape(x, y, u, t, k = 1, flip = 1) {
    if (k < .02) return;
    boilSeed('veilDrape');
    const P = cloth(x + flip * 4.6 * u, y - 7.7 * u, 5.3 * u * k, 1.5 * u, t, { dir: flip, sway: .7, ph: 1.1, taper: .35, drop: 2.2 * u });
    paint(P, { wash: RED, washOp: 150, fill: '#E4635C', fillOp: 35, bleed: .2, tex: .4, ink: null });
    const Q = cloth(x - flip * 3.6 * u, y - 8.3 * u, 4.1 * u * k, 1.1 * u, t, { dir: -flip, sway: .6, ph: .2, taper: .3, drop: 1.3 * u });
    paint(Q, { wash: RED, washOp: 135, fill: '#E4635C', fillOp: 30, bleed: .2, tex: .4, ink: null });
  }

  // ---------- A · 0.05–4.22 · the empty bridge, the veil on the rail ----------
  function A(t, lt, dur) {
    const zoom = 1.12 + .022 * lt;
    camBegin(1010 + 18 * Math.sin(lt * .5), 610 - 8 * lt, zoom);
    springBridge(t, { lanterns: false, pagodaGlow: true });
    veilOnRail(1040, 642, t, .9 + .1 * Math.sin(lt));
    const at = toScreen(1040, 660);
    camEnd();
    if (lt < 1.15) iris(at[0], at[1], lerp(8, 1750, easeIn(lt / 1.15)), PAL.paper);
    boilSeed('wipeA');
    if (lt > dur - .3) brushWipe((lt - (dur - .3)) / .6, ['#8B5B42', '#C89A5A']);
  }

  // ---------- B · 4.22–9.0 · her paws, the blade, the wooden flower opens ----------
  function B(t, lt, dur) {
    camBegin(960 + 12 * Math.sin(lt * .45), 780, 1.78 + .02 * lt);
    workRoom(t, { bench: false });
    const m = emotions(lt, [
      [0, 'thinking', { lookX: -.8, lookY: .55, emote: null }],
      [3.05, 'surprised', { lookX: -.6, lookY: -.1 }],
      [3.45, 'happy', { lookX: -.55, lookY: -.05, emote: null }],
    ], { take: .8 });
    const lift = ease(seg(lt, 3.28, 3.75));
    const aL = lerp(.12, 1.22, lift), aR = -.25;
    const x = 1080, y = 1000, u = 38;
    zhao(x, y, u, { ...m, view: 'front', aL, aR, flower: false });
    workBench(t);
    const tipX = x - (4.9 + 2.2 * Math.cos(aL)) * u + (m.dx || 0) * u;
    const tipY = y - (4.5 + 2.2 * Math.sin(aL)) * u + (m.dy || 0) * u;
    woodBlock(790, 838, 40);
    shavings(744, 824, 18, t, 7); shavings(842, 832, 14, t, 5);
    const grow = ease(seg(lt, 1.55, 2.85)), fr = lerp(22, 30, lift);
    const fx = lerp(790, tipX, lift), fy = lerp(790, tipY, lift) - lift * 4;
    if (grow > .02) carvedFlower(fx, fy, fr * (.55 + .45 * grow), -.06 + .12 * Math.sin(t * 1.1), { t, petal: WOOD.lt });
    if (grow > .9) glow(fx, fy, 40 + 30 * pulse(t, 4), '#FFD89A', .3 + .18 * pulse(t, 4));
    if (lift < .5) knife(784 + lift * 30, 796 - lift * 14, .17 - .04 * Math.sin(t * 14), 36);
    else knife(850, 832, -.08, 34);
    if (grow > .1 && lift < .1) for (let i = 0; i < 3; i++) {
      const ph = frac(t * .6 + i / 3), pp = arcPt([800, 786], [744 - i * 14, 838], 40, ph);
      inkLine([[pp[0], pp[1]], [pp[0] - 8, pp[1] + 5]], 1.2, '#C69C68', 'dry', .3);
    }
    if (lt < .3) { boilSeed('wipeB'); brushWipe(.5 + lt / .6, ['#8B5B42', '#C89A5A']); }
  }

  // ---------- C · 9.0–13.6 · she holds it up; the town and the pagoda open out ----------
  function C(t, lt, dur) {
    const k = ease(seg(lt, 0, 4.2));
    camBegin(lerp(1035, 985, k), lerp(625, 618, k), lerp(1.78, 1.05, k));
    springBridge(t, { lanterns: true, pagodaGlow: true, petalN: 20 });
    const m = emotions(lt, [
      [0, 'happy', { lookX: .55, lookY: -.35, emote: null }],
      [1.25, 'proud', { lookX: .4, lookY: -.25, emote: null }],
      [2.55, 'hopeful', { lookX: .9, lookY: 0, emote: null }],
      [3.9, 'surprised', { lookX: 1, lookY: -.15 }],
    ], { take: .6 });
    const flap = .5 + .15 * Math.sin(lt * 2.2);
    const aR = lt < 1.1 ? lerp(1.02, .55, ease(seg(lt, .7, 1.1))) : .55;
    const turnV = turn(lt, 2.7, 3.05, 0, .25);
    const x = 1040, y = bridgeY(x);
    zhao(x, y, 28, { ...m, ...turnV, aR, aL: .18, flower: false, whiteStreak: false });
    const tipX = x + (4.9 + 2.2 * Math.cos(aR)) * 28, tipY = y - (4.5 + 2.2 * Math.sin(aR)) * 28 + (m.dy || 0) * 28;
    carvedFlower(tipX, tipY, 19, -.1, { t, petal: WOOD.lt });
    camEnd();
  }

  // ---------- D · 13.6–18.95 · the rider brings the red veil ----------
  function D(t, lt, dur) {
    const push = ease(seg(lt, 3.2, 5.1));
    camBegin(lerp(1045, 1012, push), lerp(620, 615, push), lerp(1.55, 1.78, push));
    springBridge(t, { lanterns: true, pagodaGlow: true, petalN: 18 });
    // her, on the bridge, looking right for him
    const x = 840, y = bridgeY(x), u = 28;
    const m = emotions(lt, [
      [0, 'shy', { lookX: 1, lookY: -.1, emote: null }],
      [.32, 'surprised', { lookX: 1, lookY: -.25 }],
      [2.38, 'surprised', { lookX: .9, lookY: -.4 }],
      [2.98, 'shy', { lookX: .55, lookY: -.15, emote: null }],
      [4.45, 'happy', { lookX: .8, lookY: -.1, emote: null }],
    ], { take: .75 });
    const reach = seg(lt, 2.35, 2.85), hold = seg(lt, 2.95, 3.3);
    const aR = lerp(lerp(-.55, 1.22, ease(reach)), .25, hold);
    const aL = lerp(lerp(-.35, 1.05, ease(reach)), .18, hold);
    veilDrape(x, y, u, t, hold * .9, 1);
    zhao(x, y, u, { ...m, view: 'q', aR, aL, flower: true, whiteStreak: false });
    if (hold > .05) paint(rectPts(x - 4.2 * u, y - 8.55 * u, 8.4 * u, .38 * u, 1), { wash: RED, washOp: 190, ink: null });
    // the horse arrives from the right; stops beside her
    if (lt < 3.9) {
      const hx = lt < .4 ? 1680 : lerp(1680, 1170, ease(seg(lt, .4, 2.6)));
      const hy = bridgeY(hx);
      const lean = ease(seg(lt, 2.25, 2.75)) * (1 - ease(seg(lt, 3.05, 3.4)));
      horse(hx, hy, 30, t, {
        flip: true, gait: (hx - 1620) / 90,
        rider: (uu) => xiao(0, 0, uu, {
          view: 'side', noLegs: true, noShadow: true, tint: null,
          ...emotions(lt, [[0, 'happy', { lookX: 1, emote: null }], [2.35, 'shy', { lookX: .4, emote: null }], [3.1, 'happy', { lookX: .4, emote: null }]], { take: .5 }),
          aL: .85, aR: lerp(.95, -.55, lean), dy: .2 * lean,
        }),
        riderU: 18,
      });
      // his paw and hers meet at the veil
      const gk = ease(seg(lt, 2.35, 2.8)) * (1 - ease(seg(lt, 2.95, 3.2)));
      if (gk > .02) { veilGift(lerp(1044, 1000, gk), lerp(543, 535, gk), 34, t, gk); const pp = cloth(1044, 543, 46, 22, t, { dir: -1, sway: .5, ph: .8, taper: .4, drop: 10 }); paint(pp, { wash: RED, washOp: 210, ink: null }); }
      // the red scarf at his back snaps in the wind
      const scarf = cloth(hx - 28, hy - 196, 110, 20, t, { dir: -1, sway: 1, ph: .3, taper: .2 });
      paint(scarf, { wash: RED, washOp: 205, ink: null });
    } else {
      // he stays beside her; the horse's head lowers in
      horse(1170, bridgeY(1170), 30, t, {
        flip: true, gait: 0,
        rider: (uu) => xiao(0, 0, uu, {
          view: 'side', noLegs: true, noShadow: true, tint: null,
          ...emotions(lt, [[0, 'happy', { lookX: 1, emote: null }], [4.45, 'shy', { lookX: .5, emote: null }]], { take: .4 }),
          aL: .8, aR: .6, lookX: -.4,
        }),
        riderU: 18,
      });
    }
    if (hold > .1) veilGift(1000 + (x - 1000) * hold, 535 + (y - 4.5 * u - 535) * hold, 34, t, .5 + .5 * hold);
    camEnd();
  }

  shots([
    [.05, A],
    [4.22, B],
    [9.00, C],
    [13.60, D],
  ]);
})();

// TEMP performance probe: each second adds one layer. Render with --loop=perf --sheet=.1,1.1,...
LOOPS.perf = t => {
  const n = Math.floor(t), L = SKY_SPRING;
  camBegin(960, 600, 1.05);
  skyWash(L, t);
  if (n >= 1) farHills(L, t);
  if (n >= 2) { house(300, 760, 330, 170, L, t); house(620, 748, 260, 150, L, t); house(1270, 752, 300, 160, L, t); }
  if (n >= 3) pagoda(1640, 704, 66, L, t, {});
  if (n >= 4) { river(L, t); stoneBridge(L, t, { lanterns: false }); }
  if (n >= 5) { willow(210, 900, 230, t, L); blossomTree(1560, 900, 220, t, L, { petals: false }); }
  if (n >= 6) petals(t, 16, -100, W + 100, -40, 1000, L.blossom, .45);
  if (n >= 7) zhao(960, bridgeY(960), 26, feel('happy', t));
  if (n >= 8) horse(1330, bridgeY(1330), 24, t, { flip: true, rider: (u) => xiao(0, 0, u, { view: 'side', noLegs: true, noShadow: true, aL: .8, aR: .8 }) });
  camEnd();
};
LOOPS.perf.len = 9;
LOOPS.perfChar = t => {
  boilSeed('pcbg');
  paint(rectPts(-200, -200, W + 400, H + 400), { wash: '#EFE5D2', ink: null });
  const n = Math.floor(t);
  if (n === 1) clawd(960, 900, 26, feel('happy', t));
  if (n === 2) zhao(960, 900, 26, feel('happy', t));
  if (n === 3) zhao(960, 900, 44, { ...feel('happy', t), aR: 1.2, aL: .3 });
  if (n === 4) xiao(960, 900, 26, feel('happy', t));
  if (n === 5) horse(960, 900, 26, t, { rider: (u) => xiao(0, 0, u, { view: 'side', noLegs: true, noShadow: true }) });
};
LOOPS.perfChar.len = 6;
