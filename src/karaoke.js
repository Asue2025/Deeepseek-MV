// karaoke.js: 红昭愿 · line-by-line brush karaoke. Times are song time; the LRC is whole-second, refined
// against the vocal onsets and the 115 BPM grid. The sung line fills left to right as it is sung.
const LY = [
  [18.95, 20.92, '手中雕刻生花', { sing: 1.55 }],
  [20.92, 22.95, '刀锋千转蜿蜒成画', { sing: 1.65 }],
  [22.95, 23.92, '盛名功德塔', { sing: .82 }],
  [23.92, 26.95, '是桥畔某处人家', { sing: 1.8 }],
  [26.95, 28.95, '春风绕过发梢红纱', { sing: 1.75 }],
  [28.95, 30.95, '刺绣赠他', { sing: 1.15 }],
  [30.95, 35.40, '眉目刚烈拟作妆嫁', { sing: 2.5 }],
  [35.35, 37.50, '轰烈流沙枕上白发', { sing: 1.85 }],
  [37.50, 39.60, '杯中酒比划', { sing: 1.4 }],
  [39.60, 41.70, '年少风雅鲜衣怒马', { sing: 1.75 }],
  [41.70, 43.80, '也不过一刹那', { sing: 1.5 }],
  [43.80, 45.90, '难免疏漏儿时檐下', { sing: 1.8 }],
  [45.90, 47.95, '莫测变化', { sing: 1.3 }],
  [47.95, 49.00, '隔却山海', { sing: .9 }],
  [49.00, 50.35, '转身从容煎茶', { sing: 1.2 }],

  [68.30, 68.92, '一生长', { sing: .72 }],
  [68.92, 71.00, '重寄一段过往', { sing: 1.85 }],
  [71.00, 73.30, '将希冀都流放', { sing: 1.9 }],
  [73.30, 75.00, '可曾添些荒唐', { sing: 1.5 }],
  [75.00, 77.00, '才记得你的模样', { sing: 1.8 }],
  [77.00, 78.00, '一身霜', { sing: .85 }],
  [78.00, 79.00, '谁提笔只两行', { sing: .9 }],
  [79.00, 82.00, '换一隅你安康', { sing: 2.5 }],
  [82.00, 83.00, '便销得这沧桑', { sing: 1.05 }],
  [83.00, 84.45, '你还在我的心上', { sing: 1.7 }],

  [101.95, 104.00, '手中雕刻生花', { sing: 1.6 }],
  [104.00, 106.00, '刀锋千转蜿蜒成画', { sing: 1.7 }],
  [106.00, 108.00, '盛名功德塔', { sing: 1.4 }],
  [108.00, 110.00, '是桥畔某处人家', { sing: 1.8 }],
  [110.00, 112.90, '春风绕过发梢红纱', { sing: 1.8 }],
  [113.00, 115.00, '刺绣赠他', { sing: 1.3 }],
  [115.00, 119.00, '眉目刚烈拟作妆嫁', { sing: 2.7 }],
  [119.00, 121.00, '轰烈流沙枕上白发', { sing: 1.9 }],
  [121.00, 123.00, '杯中酒比划', { sing: 1.5 }],
  [123.00, 125.00, '年少风雅鲜衣怒马', { sing: 1.8 }],
  [125.00, 127.00, '也不过一刹那', { sing: 1.55 }],
  [127.00, 129.00, '难免疏漏儿时檐下', { sing: 1.85 }],
  [129.00, 131.00, '莫测变化', { sing: 1.4 }],
  [131.00, 133.00, '隔却山海', { sing: 1.4 }],
  [133.00, 135.55, '转身从容煎茶', { sing: 1.6 }],

  [134.95, 136.00, '一生长', { sing: .78 }],
  [136.00, 138.00, '重寄一段过往', { sing: 1.9 }],
  [138.00, 140.00, '将希冀都流放', { sing: 1.9 }],
  [140.00, 141.00, '可曾添些荒唐', { sing: .95 }],
  [141.00, 143.00, '才记得你的模样', { sing: 1.85 }],
  [143.00, 144.00, '一身霜', { sing: .85 }],
  [144.00, 146.00, '谁提笔只两行', { sing: 1.4 }],
  [146.00, 148.00, '换一隅你安康', { sing: 1.9 }],
  [148.00, 150.00, '便销得这沧桑', { sing: 1.85 }],
  [150.00, 152.40, '你还在我的心上', { sing: 1.8 }],

  [152.30, 153.00, '一生长', { sing: .75 }],
  [153.00, 154.00, '重寄一段过往', { sing: .95 }],
  [154.00, 156.95, '将希冀都流放', { sing: 2.2 }],
  [156.95, 158.00, '可曾添些荒唐', { sing: .95 }],
  [158.00, 160.00, '才记得你的模样', { sing: 1.85 }],
  [160.00, 161.00, '一身霜', { sing: .85 }],
  [161.00, 163.00, '谁提笔只两行', { sing: 1.45 }],
  [163.00, 165.00, '换一隅你安康', { sing: 1.9 }],
  [165.00, 167.00, '便销得这沧桑', { sing: 1.85 }],
  [167.00, 173.0, '你还在我的心上', { sing: 2.3 }],
];
const KFONT = '"Ma Shan Zheng", "Kaiti SC", "STKaiti", serif';
window.EXTRA_FONTS = [[`64px ${KFONT}`, LY.map(l => l[2] + ((l[3] && l[3].pun && l[3].pun.to) || '')).join('')]];

window.overlayHook = (c, t) => {
  const i = LY.findIndex(l => t >= l[0] && t < l[1]);
  const P = LY.find(l => l[3] && l[3].hold && t >= l[1] && t < l[1] + l[3].hold);
  if (P) { const a = t - P[1], k = ease(a / .15); kLine(c, P, t, 1010 - 108 * k, 1 - .3 * k, 1 - ease((a - (P[3].hold - .3)) / .3), true); }
  if (i >= 0) kLine(c, LY[i], t, 1010, 1, 1, false);
};
function kLine(c, L, t, y, sc, alpha, held) {
  const [a, b, txt, opt = {}] = L;
  const grow = held ? 1 : easeOut((t - a) / .18) * 1;
  if (grow < .02 || alpha <= .01) return;
  c.save(); c.globalAlpha = alpha; c.translate(960, y); c.scale(sc, sc); c.translate(-960, -y);
  c.font = `64px ${KFONT}`; c.textBaseline = 'middle'; c.textAlign = 'left';
  const total = c.measureText(txt).width;
  const w = (total + 120) * grow, x0 = 960 - w / 2, y0 = y - 48, r = n => hash(BOILN * 13 + n) * 8 - 4;
  c.globalAlpha = .84 * alpha; c.fillStyle = PAL.ink; c.beginPath();
  c.moveTo(x0 + r(1), y0 + r(2)); c.lineTo(x0 + w / 2, y0 - 5 + r(3)); c.lineTo(x0 + w + r(4), y0 + r(5));
  c.lineTo(x0 + w + 16, y0 + 46); c.lineTo(x0 + w + r(6), y0 + 92 + r(7)); c.lineTo(x0 + w / 2, y0 + 96 + r(8));
  c.lineTo(x0 + r(9), y0 + 92 + r(10)); c.lineTo(x0 - 16, y0 + 46); c.closePath(); c.fill();
  c.globalAlpha = alpha;
  if (grow > .85) {
    const n = [...txt].length, singDur = opt.sing ?? Math.min((b - a) * .85, n * .3), f = held ? 1 : clamp((t - a) / singDur);
    const x = 960 - total / 2;
    c.fillStyle = PAL.cream; c.fillText(txt, x, y);
    c.save(); c.beginPath(); c.rect(x - 2, y - 50, total * f + 2, 100); c.clip(); c.fillStyle = PAL.ochre; c.fillText(txt, x, y); c.restore();
  }
  c.restore();
}
