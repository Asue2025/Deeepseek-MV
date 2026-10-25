// s4_release.js · 红昭愿, act IV — the last chorus, the release, and paper again.
(() => {
  const TEAW = ['#E8D6B8', '#C9A582'];

  // a spring dawn seen through the tea-room window
  function springOutside(t) {
    return (cx, cy, r) => {
      boilSeed('sout');
      paint(rectPts(cx - r, cy - r, r * 2, r * 2), { wash: '#F4E0CE', ink: null });
      paint(blot(cx + 20, cy + 140, r * 1.1, r * .55, 3, 20, .1), { wash: '#B7CBB6', ink: null });
      pagoda(cx + 120, cy + 150, 26, SKY_SPRING, t, { glow: false });
      house(cx - 140, cy + 150, 160, 90, SKY_SPRING, t, { lit: .5, door: false });
      blossomTree(cx + 70, cy + 190, 90, t, SKY_SPRING, { petals: true, n: 8 });
      petals(t, 10, cx - r, cx + r, cy - r, cy + r, SKY_SPRING.blossom, .5);
    };
  }

  // ---------- Q1 · 135.77–140.00 · the room, the horse at the glass ----------
  function Q1(t, lt, dur) {
    const push = ease(seg(lt, 1.6, 3.8));
    camBegin(lerp(900, 1000, push), lerp(680, 700, push), lerp(1.22, 1.34, push));
    const m = emotions(lt, [[0, 'relieved', { lookX: -.8, lookY: .2, emote: null }], [1.8, 'hopeful', { lookX: -.4, lookY: 0, emote: null }]], { take: .3 });
    teaRoom(t, {
      outside: (cx, cy, r) => {
        boilSeed('qout');
        paint(rectPts(cx - r, cy - r, r * 2, r * 2), { wash: '#C9D4D8', ink: null });
        paint(blot(cx, cy + 160, r * 1.1, r * .5, 3, 20, .1), { wash: SKY_WINTER.snow, ink: null });
        pagoda(cx + 130, cy + 150, 24, SKY_WINTER, t, { glow: false });
        house(cx - 150, cy + 150, 140, 80, SKY_WINTER, t, { lit: .7, door: false });
        horse(cx + 30, cy + 190, 18, t, { body: '#F2E8D4', shade: '#D2C0A4' });
        for (let i = 0; i < 16; i++) paint(ellPts(cx - r + seeded(241, i) * r * 2, cy - r + frac(t * .1 + seeded(242, i)) * r * 2, 2.4, 2.4, 6), { wash: PAL.cream, washOp: 180, ink: null });
      },
      actor: () => elder(1250, 940, 28, { ...m, view: 'q', aL: .2, aR: .4, noLegs: true, whiteStreak: true, flower: true }),
      kettle: false,
    });
    // the veil folded on the table
    paint(blot(1150, 846, 80, 22, 3, 14, .15), { wash: RED, ink: PAL.ink, sw: .5 });
    teaSteam(1160, 842, 1, t, 1);
    camEnd();
    if (lt < .3) { boilSeed('wipeQ1'); brushWipe(.5 + lt / .7, TEAW); }
  }

  // ---------- Q2 · 140.00–142.00 · he tries to leap onto the horse ----------
  function Q2(t, lt, dur) {
    camBegin(1000, 720, 1.3);
    boilSeed('haySky');
    paint(rectPts(-300, -300, W + 600, 900), { wash: '#CFDADD', ink: null });
    paint(ellPts(1400, 740, 600, 200, 30, 8), { wash: '#B7C4C6', ink: null });
    house(1480, 740, 300, 160, SKY_WINTER, t, { lit: .6 });
    paint(rectPts(-300, 760, W + 600, 600), { wash: SKY_WINTER.snow, ink: null });
    // haystack
    boilSeed('hay');
    paint(blot(1120, 790, 190, 120, 4, 22, .14), { wash: '#D9AE62', ink: PAL.ink, sw: .9 });
    for (let i = 0; i < 10; i++) inkLine([[990 + i * 28, 880], [1000 + i * 30, 740 + (i % 3) * 22]], 1.2, '#A87838', 'dry', .2);
    // him upside down in the hay, boots up
    xiao(1120, 760, 20, { ...feel('surprised', t), view: 'back', rot: Math.PI, aL: -.4, aR: -.6, noShadow: true, emote: null });
    // his boots sticking up
    paint(rectPts(1098, 690, 18, 48, 2), { wash: '#3A2E2E', ink: PAL.ink, sw: .5 });
    paint(rectPts(1132, 682, 18, 48, 2), { wash: '#3A2E2E', ink: PAL.ink, sw: .5 });
    // the horse, innocent
    horse(1370, 900, 28, t, { flip: true, gait: 0, body: '#F2E8D4', shade: '#D2C0A4' });
    // her, laughing
    const m = emotions(lt, [[0, 'laugh', { lookX: -1, emote: null }]], { take: .5 });
    zhao(760, 900, 24, { ...m, view: 'q', aR: .2, aL: .1, flower: false });
    snowfall(t, 20, 1);
    camEnd();
  }

  // ---------- Q3 · 142.00–146.21 · the carved face; frost ----------
  function Q3(t, lt, dur) {
    camBegin(960, 640, 1.3 + .04 * lt);
    teaRoom(t, { shelfObjects: true, kettle: false, tableX: 1700 });
    const his = ease(seg(lt, .15, .45)) - ease(seg(lt, .8, 1.0));
    if (his < .5) carvedFace(960, 600, 170, t, false);
    if (his > .01) {
      paint(ellPts(960, 610, 360, 330, 36, 3), { wash: '#F0C88A', washOp: 170 * his, ink: null });
      xiao(960, 730, 32, { ...feel('happy', t), eyes: 'normal', mouth: 'smile', view: 'front', noLegs: true, noShadow: true, aL: .1, aR: .1, emote: null });
    }
    if (his < .01) for (const sx of [-1, 1]) paint(rrPts(960 + sx * 150 - 26, 620, 52, 76, 14, 1), { wash: '#D46A5E', ink: PAL.ink, sw: .8 });
    // her below, looking up
    elder(960, 1040, 34, { ...feel(lt > 1.3 ? 'relieved' : 'sad', t, { lookX: .1, lookY: -1, emote: null }), view: 'front', aL: .1, aR: -.1, whiteStreak: true, flower: true });
    const frost = ease(seg(lt, .9, 1.75));
    if (frost > .02) {
      boilSeed('frostQ3');
      paint(rectPts(-200, -200, W + 400, H + 400), { wash: '#B8D0D8', washOp: 85 * frost, ink: null });
      for (let i = 0; i < 12; i++) {
        const fx = 700 + i * 45, fy = 470 + (i % 3) * 60;
        inkLine([[fx, fy], [fx + 10, fy + 40], [fx + 4, fy + 80]], 2.2, '#EAF6F8', 'inkfine', .2);
      }
      for (let i = 0; i < 20; i++) {
        const a = seeded(251, i) * TAU, r0 = 760 + 90 * seeded(252, i), x = 960 + Math.cos(a) * r0, y = 600 + Math.sin(a) * r0 * .62;
        inkLine([[x, y], [x + Math.cos(a) * 40, y + Math.sin(a) * 26]], 2, '#E8F4F6', 'inkfine', .2);
      }
    }
    camEnd();
  }

  // ---------- Q4 · 146.21–148.30 · two lines on paper ----------
  function Q4(t, lt, dur) {
    camBegin(960, 700, 1.42);
    boilSeed('paperRoom');
    paint(rectPts(-300, -300, W + 600, 1100), { wash: '#B58A6A', ink: null });
    paint(rectPts(-300, 860, W + 600, 400), { wash: '#5E3F32', ink: null });
    paint(rectPts(620, 760, 680, 240, 1.5), { wash: '#F8F2E4', ink: PAL.ink, sw: .8 });
    paint(rrPts(1020, 800, 190, 70, 20, 1), { wash: '#3A3038', ink: PAL.ink, sw: .6 });
    // two painted strokes, no words
    const k = ease(seg(lt, .3, 1.2));
    if (k > .02) {
      inkLine([[700, 850], [760, 830], [860, 846], [990, 828]], 9, '#2B2233', 'ink', .4);
      if (k > .55) inkLine([[700, 892], [800, 884], [920, 892], [1030, 878]], 7, '#2B2233', 'ink', .4);
    }
    // the brush, held by her paw
    makeupBrush(1120, 790, -.4, 22);
    paint(ellPts(1170, 800, 24, 16, 12), { wash: '#D46A5E', ink: PAL.ink, sw: .6 });
    // a red seal
    paint(rrPts(1015, 918, 46, 46, 5, 1), { wash: '#B92F39', ink: PAL.ink, sw: .5 });
    inkLine([[1024, 940], [1050, 936]], 2, '#F2D8B0', 'inkfine', 0);
    camEnd();
  }

  // ---------- Q5 · 148.30–152.47 · the altar, and spring outside ----------
  function Q5(t, lt, dur) {
    const away = ease(seg(lt, .8, 4.4));
    camBegin(lerp(1510, 1080, away), lerp(780, 690, away), lerp(1.62, 1.12, away));
    const m = emotions(lt, [[0, 'relieved', { lookX: -.6, lookY: .2, emote: null }], [1.6, 'happy', { lookX: -.4, emote: null }]], { take: .3 });
    teaRoom(t, {
      outside: springOutside(t),
      actor: () => elder(1250, 940, 28, { ...m, view: 'q', aL: .2, aR: .6, noLegs: true, whiteStreak: true, flower: true }),
      kettle: false,
    });
    paint(rectPts(1360, 816, 280, 48, 1.5), { wash: '#9E3038', ink: null });
    cup(1400, 818, 26, t, { tea: '#B77A3E' });
    carvedFlower(1560, 808, 34, .2, { t, petal: '#D9B77C' });
    carvedFace(1470, 800, 62, t, true);
    lamp(1590, 806, 24, t);
    teaSteam(1160, 842, 1, t, 1);
    camEnd();
  }

  // ---------- R1 · 152.47–156.65 · the veil goes up over the dawn ----------
  function R1(t, lt, dur) {
    const lift = ease(seg(lt, 2.1, 4.0));
    camBegin(960, lerp(650, 600, lift), lerp(1.16, 1.04, lift));
    springBridge(t, { lanterns: true, pagodaGlow: false, petals: true, petalN: 22 });
    paint(rectPts(-200, -200, W + 400, H + 400), { wash: '#F6C98E', washOp: 40, ink: null });
    const m = emotions(lt, [[0, 'hopeful', { lookX: .8, lookY: -.4, emote: null }], [2.1, 'happy', { lookX: .6, lookY: -.5, emote: null }]], { take: .4 });
    const x = 820, y = bridgeY(x), u = 23;
    elder(x, y, u, { ...m, view: 'q', aL: .2, aR: .9, whiteStreak: true, flower: true });
    veilDrape(x, y, u, t, .7, 1);
    horse(1170, bridgeY(1170), 30, t, { flip: true, body: '#F2E8D4', shade: '#D2C0A4' });
    // the veil leaves her paw and climbs into the dawn
    const k = seg(lt, 2.2, 4.05);
    if (k > 0) {
      const P = [];
      for (let i = 0; i <= 7; i++) {
        const q = i / 7;
        P.push([lerp(x + 6.6 * u, 1220, q * k) + Math.sin(t * 1.2 + q * 4) * 40 * q,
                lerp(y - 6.4 * u, 250, q * k) - Math.sin(q * Math.PI) * 90]);
      }
      paint(ribbon(P, 44, 12), { wash: RED, washOp: 230, ink: null });
    }
    camEnd();
  }

  // ---------- R2 · 156.65–158.74 · a dance on the lantern bridge ----------
  function R2(t, lt, dur) {
    camBegin(960, 640, 1.55);
    springBridge(t, { lanterns: true, pagodaGlow: false, petals: true, petalN: 24 });
    const m1 = emotions(lt, [[0, 'laugh', { lookX: 1, emote: null }]], { take: .3 });
    const m2 = emotions(lt, [[0, 'excited', { lookX: -1, emote: null }]], { take: .3 });
    zhao(880, bridgeY(880), 22, { ...m1, ...move('sway', t, 0), view: 'q', aL: .5, aR: .5, flower: true });
    xiao(1050, bridgeY(1050), 22, { ...m2, ...move('sway', t, 1), view: 'q', flip: true, aL: .5, aR: .5 });
    camEnd();
  }

  // ---------- R3 · 158.74–162.91 · her face in the sunrise ----------
  function R3(t, lt, dur) {
    const push = ease(seg(lt, 0, 2.2));
    camBegin(lerp(930, 918, push), lerp(650, 630, push), lerp(1.46, 1.62, push));
    springBridge(t, { lanterns: true, pagodaGlow: false, petals: true, petalN: 18 });
    paint(rectPts(-200, -200, W + 400, H + 400), { wash: '#F6C98E', washOp: 46, ink: null });
    glow(1250, 440, 500, '#FFD8A0', .45);
    const m = emotions(lt, [[0, 'happy', { lookX: .4, lookY: .1, emote: null }], [1.6, 'relieved', { lookX: .2, emote: null }]], { take: .3 });
    const x = 930, y = bridgeY(x), u = 38;
    elder(x, y, u, { ...m, view: 'q', aL: .2, aR: .5, whiteStreak: true, flower: true });
    veilDrape(x, y, u, t, .6, 1);
    carvedFace(x + 3.2 * u, y - 4.4 * u, 20, t, true);
    camEnd();
  }

  // ---------- R4 · 162.91–167.09 · two lines in the water, and the flower on the rail ----------
  function R4(t, lt, dur) {
    const pan = ease(seg(lt, .4, 3.4));
    camBegin(1040, lerp(800, 660, pan), 1.9);
    springBridge(t, { lanterns: true, pagodaGlow: false, petals: true, petalN: 16 });
    paint(rectPts(-200, -200, W + 400, H + 400), { wash: '#F6C98E', washOp: 44, ink: null });
    // the two long strokes on the river
    const w = bridgeY(960) - 86;
    inkLine([[600, 900], [760, 888], [960, 898], [1200, 884], [1380, 894]], 6, '#F2D8B4', 'ink', .3);
    inkLine([[640, 950], [820, 944], [1040, 952], [1280, 938]], 4.5, '#E8C9A0', 'ink', .3);
    // the carved flower and a cup on the stone rail
    carvedFlower(1010, w - 10, 30, .1, { t, petal: '#D9B77C' });
    cup(1110, w - 2, 26, t, { tea: '#B77A3E' });
    teaSteam(1110, w - 40, .8, t, 1);
    // her paw, resting
    paint(ellPts(1180, w + 6, 26, 17, 12), { wash: '#D46A5E', ink: PAL.ink, sw: .6 });
    camEnd();
  }

  // ---------- R5 · 167.09–173.22 · he is still in her heart; back to paper ----------
  function R5(t, lt, dur) {
    const k = ease(seg(lt, 0, 3.3));
    if (lt < 4.4) {
      camBegin(lerp(940, 960, k), lerp(660, 640, k), lerp(1.65, 1.02, k));
      springBridge(t, { lanterns: true, pagodaGlow: false, petals: true, petalN: 20 });
      paint(rectPts(-200, -200, W + 400, H + 400), { wash: '#F6C98E', washOp: 42, ink: null });
      const m = emotions(lt, [[0, 'relieved', { lookX: .2, lookY: .1, emote: null }], [2.2, 'happy', { lookX: .2, emote: null }]], { take: .3 });
      const x = 940, y = bridgeY(x), u = 32;
      elder(x, y, u, { ...m, view: 'q', aR: .6, aL: .2, whiteStreak: true, flower: true });
      veilDrape(x, y, u, t, .5, 1);
      carvedFace(x + 3.2 * u, y - 4.4 * u, 22, t, true);
      horse(1210, bridgeY(1210), 28, t, { flip: true, body: '#F2E8D4', shade: '#D2C0A4' });
      // the veil, now a speck high in the sky
      paint(ribbon([[1300, 300], [1330, 260], [1360, 288], [1400, 250]], 18, 6), { wash: RED, washOp: 220, ink: null });
      camEnd();
    }
    const p = (lt - 4.4) / .85;
    if (lt >= 4.4 && lt < 4.825) { boilSeed('wipeEnd'); brushWipe(p, ['#F3EBDC', '#E0C8A4']); }
    else if (lt >= 4.825) {
      // the table again: the carved flower, the knife, the tea
      boilSeed('finalTable');
      paint(rectPts(-100, 700, W + 200, 380), { wash: '#B08A62', fill: '#8A5D42', fillOp: 50, ink: null });
      paint(rectPts(-100, 700, W + 200, 22), { wash: '#8A5D42', ink: null });
      inkLine([[0, 770], [1920, 764]], 1, '#7A5238', 'inkfine', 0);
      // a hanging red veil at the right
      paint(cloth(1510, 100, 150, 60, t, { dir: 1, sway: .2, taper: .4, drop: 560 }), { wash: RED, washOp: 210, ink: PAL.ink, sw: .6 });
      // the still life: the carved flower, his face, the tea
      woodBlock(690, 900, 70);
      carvedFlower(690, 770, 120, .2, { t, petal: '#E2C08E' });
      shavings(560, 880, 36, t, 8);
      knife(800, 820, -.16, 62);
      carvedFace(1010, 760, 150, t, true);
      cup(1260, 880, 66, t, { tea: '#B77A3E' });
      teaSteam(1260, 780, 1.5, t, 2);
      boilSeed('lastPetal');
      paint(ellPts(1360, 700, 18, 10, 10, 1, -.3), { wash: SKY_SPRING.blossom, ink: null });
      petals(t, 8, 500, 1400, 80, 650, SKY_SPRING.blossom, .5);
      boilSeed('wipeEnd2'); brushWipe(p, ['#F3EBDC', '#E0C8A4']);
    }
  }

  shots([
    [135.77, Q1], [140.00, Q2], [142.00, Q3], [144.00, Q4], [146.21, Q5],
    [152.47, R1], [156.65, R2], [158.74, R3], [161.00, R4], [167.09, R5],
  ]);
})();
