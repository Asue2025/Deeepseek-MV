// cover.js · 红昭愿 poster (standalone image, not part of the film timeline)
(() => {
  window.EXTRA_FONTS = (window.EXTRA_FONTS || []).concat([[`210px "Ma Shan Zheng"`, '红昭愿音阙诗听']]);
  LOOPS.cover = t => {
    // the bridge at dawn
    camBegin(960, 620, 1.05);
    springBridge(t, { lanterns: true, pagodaGlow: true, petals: true, petalN: 30 });
    paint(rectPts(-200, -200, W + 400, H + 400), { wash: '#F6C98E', washOp: 34, ink: null });
    // the red veil, a tall painted swash down the left
    boilSeed('coverVeil');
    const V = [[150, -120], [250, 220], [205, 560], [270, 880], [225, 1120]];
    paint(ribbon(V, 380, 330), { wash: RED, washOp: 238, ink: PAL.ink, sw: 1.5 });
    for (let i = 0; i < 5; i++) {
      inkLine([[165 + i * 42, -80], [230 + i * 34, 240], [195 + i * 40, 620], [250 + i * 34, 1120]], 1.4, '#7A1E28', 'dry', .4);
    }
    inkLine([[190, -40], [300, 500], [240, 1040]], 1.2, '#E36A62', 'dry', .5);
    // her, on the bridge, holding the carved flower; the veil at her back
    const x = 1130, y = bridgeY(1130), u = 34;
    const m = { ...feel('hopeful', t), view: 'q', aR: 1.05, aL: .2, flower: true };
    veilDrape(x, y, u, t, 1.05, 1);
    zhao(x, y, u, m);
    // a few birds and extra petals
    for (let i = 0; i < 5; i++) birdV(1280 + i * 55, 250 - i * 26, 10 + (i % 2) * 3, PAL.ink);
    petals(t, 18, 550, W + 100, -40, 900, SKY_SPRING.blossom, .55);
    camEnd();

    // the title, screen-space, on the veil
    const font = '210px "Ma Shan Zheng", "Kaiti SC", serif';
    letter('红', 258, 262, 210, PAL.cream, { font, align: 'left', stroke: '#2B2233', ink: true, rot: -.025 });
    letter('昭', 258, 482, 210, PAL.cream, { font, align: 'left', stroke: '#2B2233', ink: true, rot: .012 });
    letter('愿', 258, 702, 210, PAL.cream, { font, align: 'left', stroke: '#2B2233', ink: true, rot: -.012 });
    // a gold rule, the artist, and a flower seal
    inkLine([[272, 820], [486, 814]], 2.2, GOLD, 'ink', .2);
    letter('音阙诗听', 270, 876, 40, PAL.cream, { font: '40px "Ma Shan Zheng", "Kaiti SC", serif', align: 'left', stroke: '#2B2233', ink: true });
    paint(rrPts(268, 914, 78, 78, 7, 1), { wash: '#2B2233', ink: null });
    carvedFlower(307, 953, 25, .2, { t, petal: GOLD });
  };
  LOOPS.cover.len = 1;
})();
