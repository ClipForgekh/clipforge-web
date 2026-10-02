// The hero's batch sheet: one recipe, 200 outputs. Tiles are drawn here so
// the HTML stays readable; the run plays once, and visitors who prefer
// reduced motion see the finished batch straight away.
(function () {
  var TOTAL = 200;
  var sheet = document.querySelector('[data-batch-sheet]');
  if (!sheet) return;
  var count = document.querySelector('[data-batch-count]');
  var status = document.querySelector('[data-batch-status]');
  var file = document.querySelector('[data-batch-file]');

  // Each output gets a different track from the audio group, so each tile
  // carries one of five tints: the visible proof that 200 videos differ.
  // Seeded, so the sheet looks the same on every visit.
  var seed = 7;
  function rand() {
    seed = (seed + 0x6D2B79F5) | 0;
    var r = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  }
  var frag = document.createDocumentFragment();
  for (var i = 0; i < TOTAL; i++) {
    var t = document.createElement('span');
    t.className = 'tile';
    t.dataset.track = String(Math.floor(rand() * 5));
    frag.appendChild(t);
  }
  sheet.appendChild(frag);
  var tiles = sheet.children;

  function name(n) { return 'video_' + String(n).padStart(3, '0') + '.mp4'; }
  function finish() {
    for (var i = 0; i < TOTAL; i++) tiles[i].classList.add('done');
    count.textContent = String(TOTAL);
    file.textContent = name(TOTAL);
    status.textContent = 'Done. Metadata verified on every file.';
  }

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { finish(); return; }

  var done = 0;
  var start = null;
  var DURATION = 5200;
  function step(ts) {
    if (start === null) start = ts;
    // Ease-out: the queue starts fast and settles, like a real run's last files.
    var p = Math.min(1, (ts - start) / DURATION);
    var target = Math.round(TOTAL * (1 - Math.pow(1 - p, 2.2)));
    while (done < target) { tiles[done].classList.add('done'); done++; }
    count.textContent = String(done);
    if (done > 0) file.textContent = name(done);
    if (p < 1) requestAnimationFrame(step); else finish();
  }
  // Start when the sheet is on screen, so the run is actually seen.
  var io = new IntersectionObserver(function (entries) {
    if (!entries[0].isIntersecting) return;
    io.disconnect();
    setTimeout(function () { requestAnimationFrame(step); }, 500);
  }, { threshold: 0.15 });
  io.observe(sheet);
})();
