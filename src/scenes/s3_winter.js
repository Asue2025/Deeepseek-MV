// s3_winter.js · 红昭愿, act III — the empty saddle, the horse comes home, the elder's verse.
(() => {
  const SNOWW = ['#E4EDEE', '#9EB4BA'];
  const groundY = x => x > 520 ? bridgeY(x) : (x > 430 ? lerp(bridgeY(520), 900, seg(x, 520, 430)) : 900);

  // a small snow scene seen through the tea-room window
  function winterOutside(t, horseAt) {
    return (cx, cy, r) => {
      boilSeed('wout');
      paint(rectPts(cx - r, cy - r, r * 2, r * 2), { wash: '#C9D4D8', ink: null });
      paint(blot(cx + 30, cy + 150, r * 1.1, r * .55, 3, 20, .12), { wash: SKY_WINTER.snow, ink: null });
      pagoda(cx + 120, cy + 150, 24, SKY_WINTER, t, { glow: false });
      house(cx - 150, cy + 150, 140, 80, SKY_WINTER, t, { lit: .7, door: false });
      paint(blot(cx - 80, cy + 195, 130, 20, 5, 16, .1), { wash: SKY_WINTER.snow, ink: null });
      if (horseAt) horseAt(cx, cy, r);
      for (let i = 0; i < 18; i++) {
        const ph = frac(t * .12 + seeded(231, i));
        paint(ellPts(cx - r + seeded(232, i) * r * 2, cy - r + ph * r * 2, 2.4, 2.4, 6), { wash: PAL.cream, washOp: 190, ink: null });
      }
    };
  }

  // ---------- N1 · 84.45–89.83 · the snow bridge; a lantern; something in the mist ----------
  function N1(t, lt, dur) {
    camBegin(lerp(860, 940, ease(seg(lt, 0, 4))), 650, 1.08);
    winterTown(t, { lanterns: true, foreBank: false });
    windLines(-100, 520, W + 100, 720, t, 9, '#E8F1F2');
    const w = stroll(lt, .4, 3.4, 640, 980, 22);
    const m = emotions(lt, [
      [0, 'sad', { lookX: .5, lookY: .3, emote: null }],
      [2.4, 'hopeful', { lookX: 1, lookY: 0, emote: null }],
    ], { take: .4 });
    const x = lt > .4 ? w.x : 640, y = bridgeY(x), u = 22;
    elder(x, y, u, { ...m, view: lt > .4 && lt < 3.4 ? 'side' : 'q', flip: lt > .4 && lt < 3.4, aL: lt > .4 && lt < 3.4 ? .8 : .2, aR: -.2, whiteStreak: true, flower: true });
    if (lt < 3.6) {
      const tx = x - (4.7 + 2.2 * Math.cos(.8)) * u, ty = y - (4.5 + 2.2 * Math.sin(.8)) * u;
      lantern(tx + 12, ty + 34, 22, t);
    } else {
      lantern(x + 2.2 * u, y - 8.2 * u, 22, t);
    }
    veilDrape(x, y, u, t, .8, 1);
    if (lt > 3.4) {   // a horse-shaped shadow at the far right of the mist
      boilSeed('hshape');
      paint(blot(1580, 690, 130, 40, 3, 18, .2), { wash: '#B8C6C8', washOp: 80, ink: null });
      paint(blot(1680, 650, 45, 60, 4, 16, .2), { wash: '#B8C6C8', washOp: 80, ink: null });
    }
    snowfall(t, 30, 1);
    camEnd();
  }

  // ---------- N2 · 89.83–96.10 · his horse comes back, the saddle empty ----------
  function N2(t, lt, dur) {
    camBegin(lerp(1020, 1000, ease(seg(lt, 0, 4))), 650, lerp(1.16, 1.34, ease(seg(lt, 0, 3))));
    winterTown(t, { lanterns: true, foreBank: false });
    const hx = lt < .6 ? 1640 : lerp(1640, 1150, ease(seg(lt, .6, 3.0)));
    const hy = bridgeY(hx);
    const m = emotions(lt, [
      [0, 'sad', { lookX: 1, lookY: .1, emote: null }],
      [2.2, 'surprised', { lookX: 1, lookY: -.1 }],
      [3.4, 'sad', { lookX: .7, lookY: .2, emote: null }],
      [4.6, 'relieved', { lookX: .6, lookY: .2, emote: null }],
    ], { take: .6 });
    const x = 900, y = bridgeY(x), u = 26;
    elder(x, y, u, { ...m, view: 'q', aL: .25, aR: lt > 3.6 ? lerp(.2, 1.05, ease(seg(lt, 3.6, 4.2))) : .2, whiteStreak: true, flower: true });
    veilDrape(x, y, u, t, .9, 1);
    horse(hx, hy, 32, t, { gait: (1640 - hx) / 90, body: '#F2E8D4', shade: '#D2C0A4', num: 1 });
    // her paw on the empty saddle
    if (lt > 3.8) {
      const k = ease(seg(lt, 3.8, 4.4));
      paint(ellPts(lerp(x + 6.8 * u, hx - 18, k), lerp(y - 5.2 * u, hy - 3.4 * 32, k), 18, 13, 12), { wash: '#D46A5E', ink: PAL.ink, sw: .7 });
    }
    snowfall(t, 34, 1);
    camEnd();
  }

  // ---------- N3 · 96.10–102.36 · she leads him home ----------
  function N3(t, lt, dur) {
    const walk = ease(seg(lt, .3, 4.3));
    const x = lerp(900, 360, walk), hx = lerp(1180, 470, walk);
    const y = groundY(x), hy = groundY(hx);
    camBegin(lerp(1000, 620, ease(seg(lt, .2, 4.4))), 660, 1.12);
    winterTown(t, { lanterns: true, foreBank: false });
    boilSeed('homeLamp');
    glow(300, 700, 280, '#FFC46A', .55);
    lantern(300, 650, 26, t);
    const m = emotions(lt, [[0, 'relieved', { lookX: -1, lookY: .2, emote: null }], [2.5, 'hopeful', { lookX: -1, emote: null }]], { take: .3 });
    elder(x, y, 22, { ...m, view: 'side', flip: true, walk: lt * 2.2, dy: -Math.abs(Math.sin(lt * 7)) * .4, aL: .7, aR: -.1, whiteStreak: true, flower: true });
    horse(hx, hy, 30, t, { gait: lt * 2.0, flip: true, body: '#F2E8D4', shade: '#D2C0A4' });
    // the rein from her paw to the bit
    inkLine([[x - 7 * 22, y - 5 * 22], [hx + 80, hy - 130]], .8, '#5A3A2E', 'inkfine', .4);
    veilDrape(x, y, 22, t, .7, -1);
    snowfall(t, 32, 1);
    camEnd();
  }

  // ---------- P1 · 102.36–108.62 · the elder carves by the window; the horse waits ----------
  function P1(t, lt, dur) {
    camBegin(700 + 10 * Math.sin(lt * .3), 690, 1.44);
    teaRoom(t, {
      outside: winterOutside(t, (cx, cy, r) => horse(cx + 30, cy + 168, 15, t, { body: '#F2E8D4', shade: '#D2C0A4' })),
      shelfObjects: true, kettle: false, tableX: 1700,
    });
    const m = emotions(lt, [
      [0, 'thinking', { lookX: -1, lookY: .45, emote: null }],
      [4.0, 'sad', { lookX: -1, lookY: 0, emote: null }],
      [5.2, 'relieved', { lookX: -.6, lookY: .2, emote: null }],
    ], { take: .4 });
    const x = 760, y = 940, u = 28;
    elder(x, y, u, { ...m, view: 'front', aL: .5, aR: -.2, whiteStreak: true, flower: true });
    // a low workbench by the window
    paint(rectPts(500, 850, 300, 26, 2), { wash: '#8A5D42', ink: PAL.ink, sw: .9 });
    for (const sx of [520, 780]) paint(rectPts(sx - 9, 876, 18, 90), { wash: '#6A4634', ink: PAL.ink, sw: .6 });
    woodBlock(590, 850, 24);
    shavings(546, 842, 12, t, 4);
    knife(560, 826, -.2, 26);
    carvedFace(660, 826, 22, t, true);
    camEnd();
  }

  // ---------- P2 · 106.00–114.89 · the pagoda, the house, then the warm wind ----------
  function P2(t, lt, dur) {
    const pan = ease(seg(lt, .2, 2.7)), push = ease(seg(lt, 4.2, 6.4));
    camBegin(lerp(lerp(1510, 1120, pan), 930, push), lerp(lerp(490, 640, pan), 600, push), lerp(lerp(1.34, 1.06, pan), 1.76, push));
    winterTown(t, { lanterns: true, foreBank: false });
    const gust = ease(seg(lt, 3.9, 5.7));
    if (gust > .01) {
      windLines(-100, 440, W + 100, 760, t, 16, mixCol(PAL.cream, '#F2C6B0', .4));
      petals(t, 22, -100, W + 100, -40, 900, '#E9A6B2', .8 * gust);
      for (let i = 0; i < 6; i++) {
        const sx = 260 + i * 260, sy = 540 + (i % 2) * 40;
        paint(blot(sx, sy + gust * 40, 80, 20, i, 12, .2), { wash: SKY_WINTER.snow, washOp: 200 * (1 - gust), ink: null });
      }
    }
    const m = emotions(lt, [
      [0, 'sad', { lookX: .4, lookY: .3, emote: null }],
      [3.8, 'hopeful', { lookX: .8, lookY: -.5, emote: null }],
      [5.6, 'happy', { lookX: .5, lookY: 0, emote: null }],
    ], { take: .4 });
    const x = 930, y = bridgeY(x), u = 23;
    elder(x, y, u, { ...m, view: 'q', aL: .3, aR: .2, whiteStreak: true, flower: true });
    veilDrape(x, y, u, t, 1, 1);
    snowfall(t, 28, 1);
    camEnd();
  }

  // ---------- P3 · 113.00–115.00 · she mends the veil; the horse at the glass ----------
  function P3(t, lt, dur) {
    camBegin(1110, 720, 1.34);
    const m = emotions(lt, [[0, 'relieved', { lookX: -.6, lookY: .3, emote: null }], [2.0, 'sad', { lookX: -.8, lookY: .2, emote: null }]], { take: .3 });
    teaRoom(t, {
      outside: winterOutside(t, (cx, cy, r) => horse(cx + 40, cy + 190, 18, t, { body: '#F2E8D4', shade: '#D2C0A4' })),
      actor: () => elder(1250, 940, 28, { ...m, view: 'q', aL: .8, aR: .6, noLegs: true, whiteStreak: true, flower: true }),
      kettle: false,
    });
    // the red veil on the table, a needle and thread
    paint(blot(1150, 846, 90, 26, 3, 16, .15), { wash: RED, ink: PAL.ink, sw: .6 });
    inkLine([[1110, 838], [1200, 846]], .8, GOLD, 'inkfine', .4);
    inkLine([[1200, 846], [1240, 790]], .6, '#E8D8B8', 'inkfine', .4);
    paint(ellPts(1200, 846, 8, 8, 8), { wash: '#DCD2C0', ink: PAL.ink, sw: .3 });
    teaSteam(1160, 842, 1, t, 1);
    camEnd();
  }

  // ---------- P3b · 115.00–119.07 · the mirror still shows the wedding ----------
  function P3b(t, lt, dur) {
    const push = ease(seg(lt, 2.6, 3.9));
    camBegin(lerp(1080, 1220, push), lerp(650, 640, push), lerp(1.85, 2.2, push));
    boilSeed('vanityElder');
    paint(rectPts(-400, -400, W + 800, 1600), { wash: '#B58A6A', ink: null });
    paint(rectPts(-400, 900, W + 800, 400), { wash: '#5E3F32', ink: null });
    paint(rectPts(-400, 840, W + 800, 34), { wash: '#4A3028', ink: PAL.ink, sw: .7 });
    paint(cloth(660, 60, 260, 70, t, { dir: 1, sway: .2, taper: .5, drop: 560 }), { wash: '#9E3038', washOp: 235, ink: PAL.ink, sw: .7 });
    lamp(1540, 790, 24, t);
    paint(rectPts(1180, 838, 470, 30, 2), { wash: '#9A6A4A', ink: PAL.ink, sw: 1 });
    for (const sx of [1210, 1610]) paint(rectPts(sx - 10, 868, 20, 130), { wash: '#6E4736', ink: PAL.ink, sw: .7 });
    const mx = 1330, my = 620, mr = 205;
    paint(rectPts(mx - 7, my + mr, 14, 220), { wash: '#6B4030', ink: PAL.ink, sw: .7 });
    paint(ellPts(mx, my, mr, mr, 40, 1), { wash: '#D9AE72', ink: null });
    boilSeed('mirrorWish2');
    paint(ellPts(mx, my, mr - 10, mr - 10, 40, 2), { wash: '#B84A44', ink: null });
    paint(ellPts(mx, my - 30, mr * .95, mr * .72, 30, 2), { wash: '#E8B86A', washOp: 150, ink: null });
    roof(mx, my - 120, 240, 26, { roof: '#7A2C34', wall: '#F2D8A8' }, { lift: .4, sw: .7 });
    for (const sx of [-1, 1]) paint(rectPts(mx + sx * 165 - 8, my - 100, 16, 240), { wash: '#7E2629', ink: PAL.ink, sw: .5 });
    zhao(mx - 62, my + 115, 14, { ...feel('shy', t), view: 'q', aL: .1, aR: .1, flower: true });
    xiao(mx + 62, my + 115, 14, { ...feel('proud', t), view: 'q', flip: true, aL: .1, aR: .1 });
    const vp = cloth(mx - 25, my - 30, 50, 18, t, { dir: 1, sway: .4, taper: .3, drop: 120 });
    paint(vp, { wash: RED, washOp: 210, ink: null });
    const ringOuter = ellPts(mx, my, mr + 14, mr + 14, 44), ringInner = ellPts(mx, my, mr - 6, mr - 6, 44).reverse();
    paint(ringOuter.concat(ringInner), { wash: GOLD, ink: PAL.ink, sw: 1 });
    const fade = ease(seg(lt, 2.9, 3.8));
    if (fade > .02) paint(ellPts(mx, my - 20, mr - 8, mr - 8, 40, 2), { wash: '#C89A62', washOp: 205 * fade, ink: null });
    const m = emotions(lt, [[0, 'hopeful', { lookX: 1, lookY: -.1, emote: null }], [2.8, 'happy', { lookX: 1, lookY: .1, emote: null }]], { take: .3 });
    elder(940, 1020, 42, { ...m, view: 'q', aR: .95, aL: -.2, and: 0, whiteStreak: true, flower: true, draw: (u, sw) => {
      makeupBrush(7.2 * u, -6.1 * u, -.5, 12);
      paint(ellPts(0, -4.28 * u, .42 * u, .16 * u, 12), { wash: '#C8324A', washOp: 210, ink: null });
    } });
    camEnd();
  }

  // ---------- P4 · 119.07–123.24 · two cups, one raised ----------
  function P4(t, lt, dur) {
    camBegin(1250, 760, 1.42);
    const m = emotions(lt, [[0, 'sad', { lookX: .6, lookY: .2, emote: null }], [1.4, 'hopeful', { lookX: .9, lookY: 0, emote: null }], [2.8, 'relieved', { lookX: .6, emote: null }]], { take: .4 });
    teaRoom(t, { actor: () => elder(1250, 940, 28, { ...m, view: 'q', aR: 1.15, aL: .1, noLegs: true, whiteStreak: true, flower: true }), kettle: false });
    const tipX = 1250 + (4.9 + 2.2 * Math.cos(1.15)) * 28, tipY = 940 - (4.5 + 2.2 * Math.sin(1.15)) * 28;
    cup(tipX + 8, tipY + 10, 24, t, { tea: '#8E2F3E' });
    // the empty place opposite, and his ghost cup
    cup(1500, 846, 24, t, { tea: '#8E2F3E' });
    const ghost = seg(lt, 1.2, 1.8) * (1 - ease(seg(lt, 2.8, 3.6)));
    if (ghost > .02) {
      paint(ellPts(1530, 780, 200, 200, 30, 3), { wash: '#F0C88A', washOp: 120 * ghost, ink: null });
      xiao(1530, 940, 24, { ...feel('happy', t), view: 'q', flip: true, noLegs: true, noShadow: true, aR: 1.15, aL: .1, emote: null });
      cup(1530 + 7 * 24, 940 - 6.5 * 24, 24, t, { tea: '#8E2F3E' });
    }
    teaSteam(1160, 842, 1, t, 1);
    camEnd();
  }

  // ---------- P5 · 123.24–127.42 · he gallops past the window ----------
  function P5(t, lt, dur) {
    camBegin(690, 650, 1.4);
    const gx = 260 + frac((lt - .5) / 1.6) * 560;
    const gallop = lt > .4 && lt < 2.2;
    teaRoom(t, {
      outside: winterOutside(t, (cx, cy, r) => {
        if (!gallop) return;
        horse(cx - r + gx, cy + 170, 13, t, {
          gait: lt * 6, body: '#F2E8D4', shade: '#D2C0A4',
          rider: (u) => xiao(0, 0, u, { ...feel('excited', t), view: 'side', noLegs: true, noShadow: true, aR: 1.3, aL: .7, rot: .08 }),
          riderU: 8,
        });
        const sc = cloth(cx - r + gx - 30, cy + 60, 70, 12, t, { dir: -1, sway: 1, taper: .2 });
        paint(sc, { wash: RED, washOp: 210, ink: null });
      }),
      shelfObjects: true, kettle: false,
    });
    const m = emotions(lt, [[0, 'sad', { lookX: -1, lookY: .1, emote: null }], [1.4, 'surprised', { lookX: -1, lookY: -.2 }], [2.5, 'relieved', { lookX: -.8, emote: null }]], { take: .5 });
    elder(880, 940, 28, { ...m, view: 'q', lookX: -1, aL: .2, aR: .2, whiteStreak: true, flower: true });
    camEnd();
  }

  // ---------- P6 · 127.42–131.59 · the puddle remembers ----------
  function P6(t, lt, dur) {
    camBegin(1020, 790, 1.28);
    eaves(t, { rain: 0 });
    // a larger, rounder puddle: a warm memory inside
    paint(ellPts(950, 940, 440, 52, 34, 2), { wash: '#A8BEC0', ink: PAL.ink, sw: .8 });
    paint(ellPts(950, 938, 410, 44, 34, 2), { wash: '#C9A07A', washOp: 130, ink: null });
    umbrella(950, 892, 105, t);
    young(900, 940, 10, { ...feel('happy', t), view: 'q', aL: .1, aR: .2 });
    xiao(1000, 940, 10, { ...feel('happy', t), view: 'q', flip: true, aL: .8, aR: .1 });
    for (let i = 0; i < 4; i++) {
      const rr = (t * 30 + i * 60) % 380;
      paint(ellPts(950, 936, rr, rr * .09, 26), { ink: null, wash: '#F2E6CE', washOp: 50 * (1 - rr / 380) });
    }
    const m = emotions(lt, [[0, 'sad', { lookX: -.4, lookY: 1, emote: null }], [1.8, 'relieved', { lookX: -.2, lookY: .8, emote: null }]], { take: .3 });
    elder(1250, 900, 26, { ...m, view: 'q', flip: true, aL: .2, aR: .1, whiteStreak: true, flower: true });
    snowfall(t, 26, 1);
    camEnd();
  }

  // ---------- P7 · 131.59–135.77 · the sea of mountains; she turns to the tea ----------
  function P7(t, lt, dur) {
    const turnK = ease(seg(lt, .8, 1.6)), teaK = ease(seg(lt, 1.4, 2.8));
    camBegin(lerp(980, 1230, teaK), lerp(640, 790, teaK), lerp(1.18, 1.85, teaK));
    mountainSea(t, { pine: 250 });
    boilSeed('cliff3');
    paint([[-200, 980], [300, 900], [900, 930], [1500, 890], [2100, 940], [2100, 1200], [-200, 1200]], { wash: '#5E5A50', ink: PAL.ink, sw: 1 });
    paint(rectPts(1000, 890, 620, 24, 2), { wash: '#8E8274', ink: PAL.ink, sw: .7 });
    teaTable(1270, 870, 1.05, t);
    const m = emotions(lt, [[0, 'sad', { lookX: .7, lookY: -.2, emote: null }], [1.2, 'relieved', { lookX: .5, emote: null }]], { take: .3 });
    const x = lerp(840, 1040, turnK);
    const pose = lt < 1.1 ? { view: 'back' } : turn(lt, .8, 1.15, .5, 0);
    elder(x, 905, 23, { ...m, ...pose, aL: .3, aR: .2, whiteStreak: true, flower: true });
    veilDrape(x, 905, 23, t, 1, 1);
    camEnd();
    boilSeed('wipeW');
    if (lt > dur - .4) brushWipe((lt - (dur - .4)) / .75, ['#E8D6B8', '#C9A582']);
  }

  shots([
    [84.45, N1], [89.83, N2], [96.10, N3],
    [102.36, P1], [106.00, P2], [113.00, P3], [115.00, P3b], [119.07, P4], [123.24, P5], [127.42, P6], [131.59, P7],
  ]);
})();
