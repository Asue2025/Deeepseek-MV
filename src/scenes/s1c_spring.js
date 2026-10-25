// s1c_spring.js · 红昭愿, act I (end) — the sandstorm, the gallop, the childhood eaves, the turn to tea.
(() => {
  // ---------- I · 35.54–39.71 · sand at the window, white in her hair, a cup raised ----------
  function stormRoom(t) {
    const wx = 1320, wy = 470, wr = 230;
    boilSeed('stormOut');
    paint(rectPts(wx - wr, wy - wr, wr * 2, wr * 2), { wash: '#8A5A44', ink: null });
    paint(ellPts(wx + 40, wy + 10, wr * .95, wr * .72, 30, 6), { wash: '#D9A46A', washOp: 190, ink: null });
    for (let i = 0; i < 10; i++) {
      const yy = wy - 160 + i * 38;
      inkLine([[wx - 190, yy], [wx + 190, yy - 16 + 30 * Math.sin(t * 2 + i)]], 2.4, mixCol('#D9A46A', '#6E4438', .3), 'dry', .4);
    }
    for (let i = 0; i < 8; i++) {
      const ph = frac(t * .8 + i / 8);
      inkLine([[wx - 200 + ph * 400, wy - 120 + (i * 37) % 300], [wx - 150 + ph * 400, wy - 130 + (i * 37) % 300]], 2, '#E8C08C', 'dry', 0);
    }
    irisShape(ellPts(wx, wy, wr, wr, 48), '#8E6A58');
    boilSeed('stormRoom');
    paint(rectPts(-500, 900, W + 1000, 400), { wash: '#4E342C', ink: null });
    paint(rectPts(-500, 860, W + 1000, 40), { wash: '#3A2822', ink: PAL.ink, sw: .6 });
    paint(rectPts(-500, -300, W + 1000, 170), { wash: '#3A2822', ink: null });
    push(); translate(wx, wy);
    brush.noFill(); brush.noWash(); brush.noHatch(); brush.set('ink', '#3A2822', 14); brush.beginShape(0);
    for (const p of ellPts(0, 0, wr + 8, wr + 8, 40)) brush.vertex(p[0], p[1]);
    brush.set('ink', '#4E342C', 8);
    brush.endShape(true); pop();
    inkLine([[wx, wy - wr], [wx, wy + wr]], 3, '#4E342C', 'ink', 0);
    inkLine([[wx - wr, wy], [wx + wr, wy]], 3, '#4E342C', 'ink', 0);
    paint(blot(700, 690, 205, 112, 3, 20, .12), { wash: '#E0C08E', ink: PAL.ink, sw: .8 });
    inkLine([[560, 690], [700, 640], [850, 700]], .6, '#B08A5A', 'inkfine', .4);
    paint(rectPts(400, 840, 720, 180), { wash: '#8E5A46', ink: PAL.ink, sw: .8 });
    paint(blot(1200, 928, 290, 26, 7, 22, .16), { wash: '#D9A46A', ink: null });
    paint(cloth(430, 300, 120, 26, t, { dir: 1, sway: .2, taper: .4, drop: 430 }), { wash: '#9E3038', washOp: 225, ink: PAL.ink, sw: .6 });
    lamp(330, 700, 26, t);
    paint(rectPts(1040, 900, 360, 22, 2), { wash: '#8A5D42', ink: PAL.ink, sw: .7 });
    cup(1180, 900, 30, t, { tea: '#8E2F3E' });
    paint(ellPts(1180, 880, 80, 22, 18, 2), { wash: '#E8D2AC', washOp: 70, ink: null });
    for (let i = 0; i < 14; i++) {
      const ph = frac(t * .7 + seeded(161, i));
      paint(ellPts(900 + seeded(162, i) * 800, 600 + ph * 330, 2.2, 2.2, 6), { wash: '#E8C08C', washOp: 150, ink: null });
    }
  }
  function I(t, lt, dur) {
    const push = ease(seg(lt, 1.8, 3.6));
    camBegin(lerp(980, 880, push), lerp(720, 700, push), lerp(1.42, 1.62, push));
    stormRoom(t);
    const m = emotions(lt, [
      [0, 'sad', { lookX: .8, lookY: .2, emote: null }],
      [2.05, 'determined', { lookX: 1, lookY: .1, emote: null }],
      [3.2, 'relieved', { lookX: .5, lookY: .2, emote: null }],
    ], { take: .5 });
    const x = 760, y = 980, u = 42;
    const aL = lt < 2.0 ? 0 : lerp(0, 1.18, ease(seg(lt, 2.0, 2.5)));
    zhao(x, y, u, { ...m, view: 'side', aL, aR: -.2, flower: true, whiteStreak: true });
    paint(rectPts(540, 888, 430, 140, 2), { wash: '#8E3A3A', ink: PAL.ink, sw: .8 });
    const ang = .7 - aL, tx = x + 1.6 * u + 2.1 * u * Math.cos(ang), ty = y - 4.2 * u + 2.1 * u * Math.sin(ang);
    cup(lt < 2.0 ? 900 : tx + 12, lt < 2.0 ? 876 : ty + 2, 34, t, { tea: '#8E2F3E' });
    if (lt > 1.8) { const w2 = cloth(tx + 12, ty + 4, 30, 10, t, { dir: -1, sway: .5, ph: .2 }); paint(w2, { wash: '#6E1E2E', washOp: 170, ink: null }); }
    if (lt > 2.2) { const w = cloth(tx, ty - 8, 34, 12, t, { dir: -1, sway: .6, ph: .5 }); paint(w, { wash: '#8E2F3E', washOp: 140, ink: null }); }
    camEnd();
  }

  // ---------- J · 39.71–43.89 · young, bright, on a horse — and gone ----------
  function J(t, lt, dur) {
    const drift = ease(seg(lt, 0, 3.2));
    camBegin(lerp(950, 1200, drift), 650, 1.18);
    desertScene(t, { sunX: 1400, sunY: 280, tower: true, windN: 26 });
    const gone = lt > 2.0;
    if (!gone) {
      const hx = lerp(380, 1520, ease(seg(lt, .35, 2.0))), hy = 858 + Math.sin(hx * .01) * 10;
      horse(hx, hy, 40, t, {
        gait: lt * 6, body: '#F4E8D2', shade: '#D8BE9C',
        rider: (u) => xiao(0, 0, u, { ...feel('excited', t), view: 'side', noLegs: true, noShadow: true, aR: 1.35, aL: .75, rot: .08 }),
        riderU: 22,
      });
      const scarf = cloth(hx - 54, hy - 300, 150, 26, t, { dir: -1, sway: 1.2, ph: .2, taper: .2 });
      paint(scarf, { wash: RED, washOp: 225, ink: null });
      dust(hx - 60, hy, 34, t, 7, .75);
    } else {
      const k = seg(lt, 2.0, 3.4);
      paint(blot(lerp(1250, 1500, k), 820, 300 + 300 * k, 90 + 60 * k, 5, 24, .25), { wash: mixCol(DESERT.dune, PAL.cream, .3), ink: null });
      if (lt > 2.1) {
        const ph = frac((lt - 2.1) * .35), sy = 820 - 240 * ph + 260 * ph * ph;
        const sc = cloth(1300 - ph * 120, sy, 150, 26, t, { dir: -1, sway: .7, ph: 1.1, taper: .2 });
        paint(sc, { wash: RED, washOp: 190 * (1 - ph * .6), ink: null });
      }
      for (let i = 0; i < 4; i++) birdV(1200 + i * 60 + lt * 30, 700 - i * 50 - lt * 20, 10, mixCol(DESERT.ink, DESERT.sky, .3));
    }
    camEnd();
  }

  // ---------- K · 43.89–48.06 · two children under the eaves; rain becomes snow ----------
  function K(t, lt, dur) {
    const push = ease(seg(lt, 1.5, 3.6));
    const change = ease(seg(lt, 2.05, 2.9));
    camBegin(lerp(900, 930, push), lerp(770, 790, push), lerp(1.36, 1.5, push));
    eaves(t, { rain: 1 - change });
    const m1 = emotions(lt, [[0, 'happy', { lookX: 1, emote: null }], [2.1, 'surprised', { lookX: .5, lookY: -1 }], [2.9, 'laugh', { emote: null }]], { take: .5 });
    const m2 = emotions(lt, [[0, 'happy', { lookX: -1, emote: null }], [2.1, 'surprised', { lookX: -.5, lookY: -1 }], [2.9, 'laugh', { emote: null }]], { take: .5 });
    umbrella(950 - change * 40, 780 - change * 20, 145, t);
    // a paper boat in the puddle
    paint([[-70, 0], [70, 0], [45, 34], [-45, 34]].map(([a, b]) => [960 + a, 922 + b]), { wash: '#F6EFDE', ink: PAL.ink, sw: .7 });
    paint([[0, -46], [30, 2], [-24, 2]].map(([a, b]) => [960 + a, 900 + b]), { wash: '#C8402F', ink: PAL.ink, sw: .5 });
    inkLine([[960, 862], [960, 924]], .8, '#5A3A2E', 'ink', 0);
    if (change > .02) paint(ellPts(960, 936, 470, 30, 30, 2), { wash: '#E8EFF0', washOp: 190 * change, ink: null });
    young(850, 905, 15, { ...m1, view: 'q', aR: .3, aL: .1 });
    xiao(1010, 905, 15, { ...m2, view: 'q', flip: true, aL: 1.1, aR: .4 });
    if (change > .02) {
      boilSeed('snowE');
      for (let i = 0; i < 34; i++) {
        const ph = frac(t * .1 + seeded(171, i));
        paint(ellPts(120 + seeded(172, i) * 1600, 560 + ph * 360, 4 + 2 * seeded(173, i), 3.6, 6), { wash: PAL.cream, washOp: 220 * change, ink: null });
      }
    }
    camEnd();
    if (change > .02) flash(.1 * change, PAL.cream);
  }

  // ---------- L · 48.06–50.35 · mountains and sea, then she turns to the tea ----------
  function L(t, lt, dur) {
    const turnK = ease(seg(lt, .7, 1.5)), teaK = ease(seg(lt, 1.0, 2.15));
    camBegin(lerp(980, 1230, teaK), lerp(640, 790, teaK), lerp(1.18, 1.9, teaK));
    mountainSea(t, { pine: 250 });
    boilSeed('cliff');
    paint([[-200, 980], [300, 900], [900, 930], [1500, 890], [2100, 940], [2100, 1200], [-200, 1200]], { wash: '#5E5A50', ink: PAL.ink, sw: 1 });
    paint(rectPts(1000, 890, 620, 24, 2), { wash: '#8E8274', ink: PAL.ink, sw: .7 });
    teaTable(1270, 870, 1.05, t);
    const m = emotions(lt, [[0, 'sad', { lookX: .7, lookY: -.2, emote: null }], [1.1, 'relieved', { lookX: .5, emote: null }]], { take: .4 });
    const x = lerp(840, 1040, turnK), y = 905, u = 23;
    const pose = lt < 1.0 ? { view: 'back' } : turn(lt, .7, 1.05, .5, 0);
    zhao(x, y, u, { ...m, ...pose, aL: .3, aR: .2, flower: true });
    veilDrape(x, y, u, t, 1, 1);
    camEnd();
    boilSeed('steamWipe');
    if (lt > dur - .35) brushWipe((lt - (dur - .35)) / .7, ['#E8D6B8', '#C9A582']);
  }

  shots([[35.54, I], [39.71, J], [43.89, K], [48.06, L]]);
})();
