// dev_probe.js · temporary looks at the shared sets (not part of the film)
LOOPS.probeTea = t => {
  camBegin(1220, 720, 1.45);
  teaRoom(t, { actor: () => elder(1250, 940, 28, { ...feel('sad', t), view: 'q', noLegs: true }) });
  camEnd();
};
LOOPS.probeTea.len = 2;

LOOPS.probeWinter = t => {
  camBegin(960, 640, 1.0);
  winterTown(t, { lanterns: true, foreBank: false });
  zhao(900, bridgeY(900), 24, { ...feel('sad', t), view: 'q', flower: true, whiteStreak: true });
  horse(1250, bridgeY(1250), 28, t, {});
  camEnd();
};
LOOPS.probeWinter.len = 2;

LOOPS.probeCourt = t => {
  camBegin(960, 640, 1.0);
  courtyard(t, { horse: [1150, 880, 30, {}] });
  elder(700, 880, 26, { ...feel('hopeful', t), view: 'q' });
  camEnd();
};
LOOPS.probeCourt.len = 2;

LOOPS.probeEaves = t => {
  camBegin(960, 700, 1.1);
  eaves(t);
  young(860, 905, 15, { view: 'q' });
  xiao(1000, 905, 15, { view: 'q', flip: true });
  camEnd();
};
LOOPS.probeEaves.len = 2;
