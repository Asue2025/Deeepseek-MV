// s2_memory.js · 红昭愿, act II — the tea steam, a lifetime on the bridge, the carving, the chorus.
(() => {
  const TEAW = ['#E8D6B8', '#C9A582'];
  function cliffTerrace() {
    boilSeed('cliff2');
    paint([[-200, 980], [300, 900], [900, 930], [1500, 890], [2100, 940], [2100, 1200], [-200, 1200]], { wash: '#5E5A50', ink: PAL.ink, sw: 1 });
    paint(rectPts(1000, 890, 620, 24, 2), { wash: '#8E8274', ink: PAL.ink, sw: .7 });
  }

  // ---------- M1 · 50.35–53.50 · the tea, the steam ----------
  function M1(t, lt, dur) {
    const k = ease(seg(lt, 0, 2.4));
    camBegin(lerp(1270, 1160, k), lerp(800, 760, k), lerp(1.45, 1.82, k));
    mountainSea(t, { pine: 250 });
    cliffTerrace();
    teaTable(1270, 870, 1.05, t);
    teaSteam(1180, 842, 1, t, 2);
    const m = emotions(lt, [[0, 'hopeful', { lookX: .5, lookY: -.2, emote: null }], [1.5, 'relieved', { lookX: .3, emote: null }]], { take: .3 });
    const x = 1040, y = 905, u = 23;
    zhao(x, y, u, { ...m, view: 'q', aR: .5, aL: .2, flower: true });
    veilDrape(x, y, u, t, .9, 1);
    const tipX = x + (4.9 + 2.2 * Math.cos(.5)) * u, tipY = y - (4.5 + 2.2 * Math.sin(.5)) * u;
    cup(tipX + 4, tipY + 8, 26, t, { tea: '#B77A3E' });
    camEnd();
    if (lt < .3) { boilSeed('wipeM1'); brushWipe(.5 + lt / .6, TEAW); }
    if (lt > dur - .35) { boilSeed('wipeM1b'); brushWipe((lt - (dur - .35)) / .7, TEAW); }
  }

  // ---------- M2 · 53.50–62.68 · the bridge through spring, autumn and snow ----------
  function M2(t, lt, dur) {
    if (lt < .3) { boilSeed('wipeM2'); brushWipe(.5 + lt / .6, TEAW); }
    const push = ease(seg(lt, 3.8, 8.4));
    camBegin(lerp(980, 930, push), lerp(650, 680, push), lerp(1.14, 1.46, push));
    springBridge(t, { lanterns: false, pagodaGlow: false, petals: true, petalN: 22 });
    const autumn = ease(seg(lt, 2.0, 3.8)), winter = ease(seg(lt, 5.2, 6.4));
    if (autumn > .01) paint(rectPts(-200, -200, W + 400, H + 400), { wash: '#C98A4E', washOp: 52 * autumn, ink: null });
    if (winter > .01) paint(rectPts(-200, -200, W + 400, H + 400), { wash: '#6E86A4', washOp: 96 * winter, ink: null });
    if (autumn > .02) petals(t, 16, -100, W + 100, -50, 1000, '#C98A4E', .55 * autumn);
    if (winter > .02) {
      snowfall(t, Math.round(34 * winter), winter);
      // snow settles on the roofs, the blossom tree and the bridge rail
      for (const [hx, hy, hw] of [[300, 550, 200], [620, 540, 160], [1270, 542, 180], [1540, 560, 160], [80, 582, 200], [1830, 582, 200]])
        paint(blot(hx, hy, hw * .5, 8, hx, 14, .06), { wash: SKY_WINTER.snow, washOp: 225 * winter, ink: null });
      paint(blot(1520, 660, 130, 30, 4, 18, .2), { wash: SKY_WINTER.snow, washOp: 210 * winter, ink: null });
      const rail = [];
      for (let i = 0; i <= 10; i++) { const rx = BR.x - BR.span * .45 + i / 10 * BR.span * .9; rail.push([rx, bridgeY(rx) - 86]); }
      paint(ribbon(rail, 12, 12), { wash: SKY_WINTER.snow, washOp: 220 * winter, ink: null });
    }
    // the two of them on the bridge
    const x1 = 880, y1 = bridgeY(x1), u = 18;
    const x2 = 1090, y2 = bridgeY(x2);
    const go = ease(seg(lt, 5.5, 7.3)), turning = seg(lt, 5.2, 5.9);
    const walk = lt > 5.9 ? stroll(lt, 5.9, 7.4, 1090, 1830, u) : null;
    const mx = walk ? walk.x : 1090;
    const my = bridgeY(mx);
    const m1 = emotions(lt, [
      [0, 'happy', { lookX: 1, lookY: -.2, emote: null }],
      [4.9, 'hopeful', { lookX: 1, lookY: -.2, emote: null }],
      [6.2, 'sad', { lookX: .6, lookY: .4, emote: null }],
      [7.8, 'relieved', { lookX: .3, lookY: .3, emote: null }],
    ], { take: .4 });
    zhao(x1, y1, u, { ...m1, view: 'q', aL: .3, aR: .2, flower: true, whiteStreak: lt > 7.9 });
    veilDrape(x1, y1, u, t, .7, 1);
    if (lt < 7.7) {
      const m2 = emotions(lt, [[0, 'happy', { lookX: -1, lookY: -.2, emote: null }], [4.9, 'sad', { lookX: .8, emote: null }]], { take: .4 });
      const pose = lt < 5.45 ? { view: 'q', flip: true } : { ...turn(lt, 5.2, 5.9, -.25, .25), view: 'side', walk: 0 };
      xiao(mx, bridgeY(mx), u, {
        ...m2, ...pose, ...(walk ? { walk: walk.walk, flip: false, view: 'side', dy: walk.dy } : {}),
        aL: .2, aR: .2,
      });
    }
    // a last snow layer in front
    if (winter > .02) snowfall(t + .2, 12, winter * .8);
    camEnd();
  }

  // ---------- M3 · 62.68–68.30 · winter; she finishes his face ----------
  function M3(t, lt, dur) {
    const push = ease(seg(lt, 2.4, 5.4));
    camBegin(lerp(1240, 1110, push), lerp(740, 740, push), lerp(1.4, 1.75, push));
    const lift = ease(seg(lt, 3.5, 4.1));
    const m = emotions(lt, [
      [0, 'thinking', { lookX: -.8, lookY: .4, emote: null }],
      [3.4, 'surprised', { lookX: -.6, lookY: 0, emote: null }],
      [3.9, 'proud', { lookX: -.4, lookY: 0, emote: null }],
    ], { take: .6 });
    const x = 1250, y = 940, u = 28;
    const aL = lerp(.2, 1.15, lift);
    teaRoom(t, { actor: () => elder(x, y, u, { ...m, view: 'q', aL, aR: -.25, noLegs: true }) });
    // the work, on the table in front of her
    woodBlock(1040, 862, 36);
    shavings(1000, 850, 14, t, 5);
    const tipX = x - (4.7 + 2.2 * Math.cos(aL)) * u, tipY = y - (4.5 + 2.2 * Math.sin(aL)) * u;
    if (lift < .5) knife(1038, 812, -.2, 30);
    else knife(1110, 850, .1, 30);
    if (lift > .15) {
      const fx = lerp(1040, tipX, lift), fy = lerp(800, tipY, lift);
      carvedFace(fx, fy, 24, t, true);
      glow(fx, fy, 70, '#FFD89A', .22);
    }
    teaSteam(1160, 840, 1, t, 1);
    camEnd();
  }

  // ---------- C1 · 68.30–71.00 · one life, in the tea room ----------
  function C1(t, lt, dur) {
    camBegin(1240 + 8 * Math.sin(lt * .4), 720, 1.32 + .035 * lt);
    const m = emotions(lt, [
      [0, 'relieved', { lookX: .2, emote: null }],
      [1.3, 'happy', { lookX: .4, emote: null }],
    ], { take: .4 });
    teaRoom(t, { actor: () => elder(1250, 940, 28, { ...m, view: 'q', aL: .2, aR: .3, noLegs: true }) });
    teaSteam(1160, 842, 1, t, 2);
    camEnd();
  }

  // ---------- C2 · 71.00–73.30 · the veil released into the snow ----------
  function C2(t, lt, dur) {
    const tilt = ease(seg(lt, .3, 2.0));
    camBegin(960, lerp(740, 560, tilt), 1.06);
    boilSeed('nightSky');
    paint(rectPts(-300, -300, W + 600, H + 600), { wash: '#2A3050', ink: null });
    paint(ellPts(W * .55, 700, 1300, 500, 30, 10), { wash: '#3A4066', washOp: 90, ink: null });
    glow(1380, 230, 380, '#FFE0AE', .55);
    paint(ellPts(1380, 230, 74, 74, 24, 2), { wash: '#F8E4C0', ink: null });
    for (let i = 0; i < 26; i++) {
      const tw = .5 + .5 * Math.sin(t * 2 + i);
      paint(starPts(seeded(201, i) * W, 80 + seeded(202, i) * 500, 2 + 3 * tw, .4, 4), { wash: PAL.cream, washOp: 160, ink: null });
    }
    // the roof and the lit round window
    paint([[-100, 900], [500, 850], [960, 820], [1420, 850], [2020, 900], [2020, 1200], [-100, 1200]], { wash: '#252A44', ink: PAL.ink, sw: 1 });
    paint([[-100, 900], [500, 850], [960, 820], [1420, 850], [2020, 900], [2020, 940], [-100, 940]], { wash: '#D8E2E2', washOp: 200, ink: null });
    const wx = 960, wy = 810, wr = 84;
    glow(wx, wy, 260, '#FFC46A', .5);
    paint(ellPts(wx, wy, wr, wr, 36, 1), { wash: '#C9854E', ink: null });
    paint(ellPts(wx, wy + 14, wr * .9, wr * .62, 30, 1), { wash: '#7E3A3A', washOp: 160, ink: null });
    // her silhouette in the glow
    paint(rectPts(wx - 24, wy - 6, 48, 52, 2), { wash: '#4A3038', ink: null });
    paint(ellPts(wx - 11, wy + 22, 12, 15, 12), { wash: '#4A3038', ink: null });
    // the veil, rising
    const ph = ease(seg(lt, .25, 2.3));
    const P = [];
    for (let i = 0; i <= 8; i++) {
      const q = i / 8;
      P.push([wx + Math.sin(t * 1.6 + q * 4) * (14 + 60 * q) * (1 - ph * .4) - q * 40, wy - 20 - q * (520 * ph)]);
    }
    paint(ribbon(P, 34, 8), { wash: RED, washOp: 235, ink: null });
    snowfall(t, 34, 1);
    camEnd();
  }

  // ---------- C3 · 73.30–75.00 · a foolish memory: he tries to carve ----------
  function C3(t, lt, dur) {
    camBegin(1050, 720, 1.45);
    workRoom(t, { bench: false });
    const m1 = emotions(lt, [[0, 'laugh', { lookX: -1, emote: null }]], { take: .4 });
    zhao(880, 960, 30, { ...m1, view: 'q', aR: .2, aL: .1, flower: false });
    const m2 = emotions(lt, [[0, 'proud', { lookX: 1, emote: null }], [.7, 'smug', { lookX: .7, emote: null }]], { take: .4 });
    const x = 1120, u = 28;
    xiao(x, 960, u, { ...m2, view: 'q', flip: true, aR: .1, aL: 1.2 });
    workBench(t);
    // his misshapen "flower" held up
    const tx = x + (4.7 + 2.2 * Math.cos(1.2)) * u, ty = 960 - (4.5 + 2.2 * Math.sin(1.2)) * u;
    paint(blot(tx, ty - 8, 52, 38, 7, 14, .35), { wash: WOOD.lt, ink: PAL.ink, sw: .7 });
    for (let i = 0; i < 3; i++) inkLine([[tx - 14 + i * 16, ty + 8], [tx - 8 + i * 18, ty - 34 + (i % 2) * 14]], 1.8, WOOD.dk, 'inkfine', .4);
    inkLine([[tx - 14, ty + 2], [tx + 14, ty + 4]], 1.2, PAL.ink, 'inkfine', 0);
    shavings(1040, 846, 16, t, 6);
    camEnd();
  }

  // ---------- C4a · 75.00–77.00 · the carved face / his face ----------
  function C4a(t, lt, dur) {
    camBegin(960, 640, 1.32);
    teaRoom(t, { shelfObjects: true, kettle: false });
    const his = ease(seg(lt, .95, 1.3)) - ease(seg(lt, 1.75, 1.95));
    if (his < .5) carvedFace(960, 600, 170, t, false);
    if (his > .01) {
      paint(ellPts(960, 610, 360, 330, 36, 3), { wash: '#F0C88A', washOp: 170 * his, ink: null });
      xiao(960, 730, 32, { ...feel('happy', t), eyes: 'normal', mouth: 'smile', view: 'front', noLegs: true, noShadow: true, aL: .1, aR: .1, emote: null });
    }
    if (his < .01) for (const sx of [-1, 1]) paint(rrPts(960 + sx * 150 - 26, 620, 52, 76, 14, 1), { wash: '#D46A5E', ink: PAL.ink, sw: .8 });
    camEnd();
  }

  // ---------- C4b · 77.00–79.39 · frost, and two lines drawn on the glass ----------
  function C4b(t, lt, dur) {
    const push = ease(seg(lt, .5, 2.2));
    camBegin(lerp(690, 630, push), lerp(650, 620, push), lerp(1.44, 1.66, push));
    teaRoom(t, { shelfObjects: true });
    const wx = 530, wy = 452, wr = 268;
    paint(ellPts(wx, wy, wr - 8, wr - 8, 40, 1), { wash: '#DCEAEE', washOp: 60, ink: null });
    if (lt > .3) {
      boilSeed('frost');
      for (let i = 0; i < 16; i++) {
        const a = seeded(211, i) * TAU, r = 80 + 150 * seeded(212, i);
        const x = wx + Math.cos(a) * r, y = wy + Math.sin(a) * r;
        inkLine([[x, y], [x + Math.cos(a + .5) * (18 + 30 * seeded(213, i)), y + Math.sin(a + .5) * (18 + 30 * seeded(213, i))]], 2.2, '#F6FCFC', 'inkfine', .3);
      }
    }
    const m = emotions(lt, [[0, 'sad', { lookX: 1, lookY: -.4, emote: null }], [1.6, 'relieved', { lookX: .8, lookY: -.3, emote: null }]], { take: .4 });
    const u = 30, x = 700, y = 900;
    const aL = lt > 1.0 ? lerp(.3, 1.46, ease(seg(lt, 1.0, 1.4))) : .3;
    zhao(x, y, u, { ...m, view: 'front', aL, aR: -.2, flower: true, whiteStreak: true });
    // the two lines, drawn with a fingertip in the frost
    const ink = ease(seg(lt, 1.15, 1.7));
    if (ink > .02) {
      inkLine([[424, 646], [546, 614 + 8 * Math.sin(lt * 2)]], 11, '#3A2A22', 'ink', .4);
      inkLine([[424, 646], [546, 614 + 8 * Math.sin(lt * 2)]], 6, '#E8B45A', 'ink', .4);
      if (ink > .5) { inkLine([[430, 690], [552, 674]], 11, '#3A2A22', 'ink', .4); inkLine([[430, 690], [552, 674]], 6, '#E8B45A', 'ink', .4); }
      paint(ellPts(556, 700, 22, 15, 12), { wash: '#D46A5E', ink: PAL.ink, sw: .6 });
    }
    // drips as the frost gives way
    if (lt > 2.4) for (let i = 0; i < 4; i++) {
      const dy = (lt - 2.4) * (20 + i * 9) % 90;
      inkLine([[wx - 100 + i * 55, wy + 120 + dy], [wx - 98 + i * 55, wy + 134 + dy]], 2.2, '#CFE0E4', 'inkfine', 0);
    }
    camEnd();
  }

  // ---------- C5a · 79.39–82.00 · the small altar on the table ----------
  function C5a(t, lt, dur) {
    camBegin(1490 + 5 * Math.sin(lt * .4), 760, 1.62);
    const m = emotions(lt, [[0, 'hopeful', { lookX: -.8, emote: null }], [1.2, 'relieved', { lookX: -.5, emote: null }]], { take: .4 });
    teaRoom(t, { actor: () => elder(1250, 940, 28, { ...m, view: 'q', aL: .2, aR: 1.1, noLegs: true }) });
    // the altar: red cloth, a cup, the flower, the carved face, a candle
    paint(rectPts(1394, 826, 220, 38, 1.5), { wash: '#9E3038', ink: null });
    cup(1420, 828, 24, t, { tea: '#B77A3E' });
    carvedFlower(1550, 820, 30, .2, { t, petal: '#D9B77C' });
    carvedFace(1475, 812, 52, t, true);
    lamp(1580, 820, 22, t);
    teaSteam(1160, 842, 1, t, 1);
    camEnd();
  }

  // ---------- C5b · 82.00–84.45 · he is still in her heart ----------
  function C5b(t, lt, dur) {
    camBegin(1250, 760, 1.85 + .04 * lt);
    const m = emotions(lt, [[0, 'relieved', { lookX: .2, emote: null }], [.9, 'happy', { lookX: .2, emote: null }]], { take: .3 });
    teaRoom(t, { actor: () => elder(1250, 940, 30, { ...m, view: 'q', aL: .1, aR: .1, noLegs: true }) });
    // her paw on her heart, and the warm answer
    paint(ellPts(1250, 806, 34, 26, 16, 1), { wash: '#D46A5E', ink: PAL.ink, sw: .7 });
    glow(1250, 806, 180, '#FFC46A', .35 + .1 * pulse(t, 4));
    teaSteam(1160, 842, 1, t, 1);
    camEnd();
  }

  shots([
    [50.35, M1], [53.50, M2], [62.68, M3],
    [68.30, C1], [71.00, C2], [73.30, C3],
    [75.00, C4a], [77.00, C4b], [79.39, C5a], [82.00, C5b],
  ]);
})();
