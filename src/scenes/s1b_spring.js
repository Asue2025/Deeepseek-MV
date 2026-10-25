// s1b_spring.js · 红昭愿, act I (cont.) — carving, the pagoda and the house, the gift, the mirror wish.
(() => {
  // ---------- E · 18.95–23.0 · she carves a little horse; the blade's line winds away ----------
  function E(t, lt, dur) {
    camBegin(960 + 10 * Math.sin(lt * .4), 780, 1.80 + .02 * lt);
    workRoom(t, { bench: false });
    const m = emotions(lt, [
      [0, 'thinking', { lookX: -.7, lookY: .55, emote: null }],
      [3.25, 'proud', { lookX: -.5, lookY: -.1, emote: null }],
    ], { take: .5 });
    const aL = lt < .6 ? lerp(-.1, .12, ease(lt / .6)) : .12 + .05 * Math.sin(lt * 2.4);
    veilDrape(1080, 1000, 38, t, .8, 1);
    zhao(1080, 1000, 38, { ...m, view: 'front', aL, aR: -.2, flower: true });
    workBench(t);
    woodToy(790, 838, 34);
    shavings(730, 824, 16, t, 5); shavings(860, 832, 12, t, 4);
    knife(776 + 2 * Math.sin(lt * 9), 800, .2, 34);
    const k = ease(seg(lt, 2.3, 3.9));
    if (k > .02) {
      const P = [];
      for (let i = 0; i <= 14; i++) {
        const q = i / 14;
        P.push([lerp(780, 1450, q), 800 + Math.sin(q * 6.5 + lt) * 40 + q * 120 + (q > .72 ? (q - .72) * 1300 : 0)]);
      }
      inkLine(P, 3.2, GOLD, 'ink', .5);
      inkLine(P.map(([x, y]) => [x, y + 5]), 1.1, PAL.ink, 'inkfine', .4);
    }
    camEnd();
  }

  // ---------- F · 23.0–27.18 · the pagoda, then the house by the bridge ----------
  function F(t, lt, dur) {
    const k = ease(seg(lt, .7, 3.3)), k2 = ease(seg(lt, 2.2, 3.8));
    camBegin(lerp(lerp(1500, 1260, k), 1030, k2), lerp(lerp(500, 610, k), 660, k2), lerp(lerp(1.3, 1.12, k), 1.04, k2));
    springBridge(t, { lanterns: false, pagodaGlow: false, petals: true, petalN: 18, pagodaX: 1520, pagodaBase: 726, pagodaS: 146 });
    for (let i = 0; i < 6; i++) {
      const ph = lt - 1.0 - i * .12;
      if (ph > 0 && ph < 3.2) birdV(1450 + i * 40 + ph * 90, 470 - ph * 110 - Math.sin(ph * 2 + i) * 20, 11 + 3 * (i % 2), PAL.ink);
    }
    const m = emotions(lt, [[0, 'hopeful', { lookX: .6, lookY: -.5, emote: null }], [2.6, 'happy', { lookX: .4, lookY: -.2, emote: null }]], { take: .4 });
    const x = 1010, y = bridgeY(x), u = 20;
    zhao(x, y, u, { ...m, view: 'q', aL: .4, aR: .3, flower: true });
    veilDrape(x, y, u, t, .65, 1);
    lantern(780, 600, 20, t, { lit: lt > 2.4 });
    camEnd();
  }

  // ---------- G · 27.18–31.36 · the spring wind, then the embroidery given ----------
  function G(t, lt, dur) {
    const pull = ease(seg(lt, 1.4, 3.1));
    camBegin(lerp(960, 1060, pull), lerp(600, 650, pull), lerp(2.15, 1.55, pull));
    springBridge(t, { lanterns: false, pagodaGlow: false, petals: true, petalN: 26 });
    windLines(-100, 420, W + 100, 620, t, 10, mixCol(PAL.cream, SKY_SPRING.blossom, .35));
    const x = 900, y = bridgeY(x), u = 30;
    const m = emotions(lt, [
      [0, 'happy', { lookX: .4, lookY: -.4, emote: null }],
      [1.8, 'shy', { lookX: 1, lookY: -.1, emote: null }],
      [3.0, 'shy', { lookX: .8, lookY: -.1, emote: null }],
    ], { take: .55 });
    const aR = lt < 2.2 ? .25 : lerp(.25, .95, ease(seg(lt, 2.2, 2.8)));
    veilDrape(x, y, u, t, .85, 1);
    zhao(x, y, u, { ...m, view: 'q', aR, aL: .2, flower: true });
    const x2 = 1210, y2 = bridgeY(x2), u2 = 25;
    const m2 = emotions(lt, [[0, 'happy', { lookX: -1, emote: null }], [2.9, 'proud', { lookX: -.6, emote: null }]], { take: .4 });
    const aR2 = lt < 2.9 ? .15 : lerp(.15, .9, ease(seg(lt, 2.9, 3.35)));
    xiao(x2, y2, u2, { ...m2, view: 'q', flip: true, aL: .1, aR: aR2, sword: false });
    const gx = lt < 2.85 ? 1052 : lerp(1052, 1032, ease(seg(lt, 2.85, 3.3)));
    const gy = y - 5.15 * u;
    embroidery(gx, gy, 46, t);
    inkLine([[1084, y - 6.3 * u], [gx + 20, gy - 6]], 1.2, RED, 'inkfine', .4);
    if (lt > 2.9) inkLine([[gx - 20, gy - 4], [x2 - 7.0 * u2, y2 - 5.0 * u2]], 1.2, RED, 'inkfine', .4);
    camEnd();
  }

  // ---------- H · 31.36–35.54 · the mirror shows the wedding she paints on ----------
  function H(t, lt, dur) {
    const push = ease(seg(lt, 3.2, 4.15));
    camBegin(lerp(1080, 1240, push), lerp(650, 640, push), lerp(1.85, 2.25, push));
    boilSeed('vanityRoom');
    paint(rectPts(-400, -400, W + 800, 1600), { wash: '#B58A6A', ink: null });
    paint(rectPts(-400, 900, W + 800, 400), { wash: '#5E3F32', ink: null });
    paint(rectPts(-400, 840, W + 800, 34), { wash: '#4A3028', ink: PAL.ink, sw: .7 });
    boilSeed('curtain');
    paint(cloth(660, 60, 260, 70, t, { dir: 1, sway: .2, taper: .5, drop: 560 }), { wash: '#9E3038', washOp: 235, ink: PAL.ink, sw: .7 });
    paint(rectPts(1400, 380, 420, 450), { wash: '#F0D8AE', ink: null });
    inkLine([[1400, 380], [1820, 380], [1820, 830], [1400, 830], [1400, 380]], 3, '#4A3028', 'ink', 0);
    lamp(1540, 790, 24, t);
    // the vanity table and the mirror
    paint(rectPts(1180, 838, 470, 30, 2), { wash: '#9A6A4A', ink: PAL.ink, sw: 1 });
    for (const sx of [1210, 1610]) paint(rectPts(sx - 10, 868, 20, 130), { wash: '#6E4736', ink: PAL.ink, sw: .7 });
    const mx = 1330, my = 620, mr = 205;
    paint(rectPts(mx - 7, my + mr, 14, 220), { wash: '#6B4030', ink: PAL.ink, sw: .7 });
    paint(ellPts(mx, my, mr, mr, 40, 1), { wash: '#D9AE72', ink: null });
    boilSeed('mirrorWish');
    paint(ellPts(mx, my, mr - 10, mr - 10, 40, 2), { wash: '#B84A44', ink: null });
    paint(ellPts(mx, my - 30, mr * .95, mr * .72, 30, 2), { wash: '#E8B86A', washOp: 150, ink: null });
    roof(mx, my - 120, 240, 26, { roof: '#7A2C34', wall: '#F2D8A8' }, { lift: .4, sw: .7 });
    for (const sx of [-1, 1]) paint(rectPts(mx + sx * 165 - 8, my - 100, 16, 240), { wash: '#7E2629', ink: PAL.ink, sw: .5 });
    inkLine([[mx, my - 100], [mx, my + 120]], .7, '#F2D8A8', 'inkfine', 0);
    const bow = ease(seg(lt, 2.15, 2.7));
    zhao(mx - 62, my + 115, 14, { ...feel('shy', t), view: 'q', rot: .06 * bow, aL: .1, aR: .1, flower: true });
    xiao(mx + 62, my + 115, 14, { ...feel('proud', t), view: 'q', flip: true, rot: -.06 * bow, aL: .1, aR: .1 });
    const vp = cloth(mx - 25, my - 30, 50, 18, t, { dir: 1, sway: .4, taper: .3, drop: 120 });
    paint(vp, { wash: RED, washOp: 210, ink: null });
    const ringOuter = ellPts(mx, my, mr + 14, mr + 14, 44), ringInner = ellPts(mx, my, mr - 6, mr - 6, 44).reverse();
    paint(ringOuter.concat(ringInner), { wash: GOLD, ink: PAL.ink, sw: 1 });
    const fade = ease(seg(lt, 3.3, 4.0));
    if (fade > .02) paint(ellPts(mx, my - 20, mr - 8, mr - 8, 40, 2), { wash: '#C89A62', washOp: 210 * fade, ink: null });
    // her, painting her face, watching the mirror
    const m = emotions(lt, [[0, 'hopeful', { lookX: 1, lookY: -.1, emote: null }], [3.2, 'happy', { lookX: 1, lookY: .1, emote: null }]], { take: .4 });
    zhao(940, 1020, 42, { ...m, view: 'q', aR: .95, aL: -.2, flower: true, draw: (u, sw) => {
      makeupBrush(7.2 * u, -6.1 * u, -.5, 12);
      paint(ellPts(0, -4.28 * u, .42 * u, .16 * u, 12), { wash: '#C8324A', washOp: 210, ink: null });
    } });
    camEnd();
  }

  shots([[18.95, E], [23.00, F], [27.18, G], [31.36, H]]);
})();
