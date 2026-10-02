// Light/dark: dark is the app's own look, so it is the default. Follow the OS
// only when it asks for light, and remember an explicit pick. Storage can be
// blocked (private windows), so every access is guarded.
(function () {
  var root = document.documentElement;
  var KEY = 'clipforge-theme';
  var saved = null;
  try { saved = localStorage.getItem(KEY); } catch (e) {}
  var media = window.matchMedia('(prefers-color-scheme: light)');
  function apply(dark) { root.classList.toggle('dark', dark); }
  apply(saved ? saved === 'dark' : !media.matches);
  media.addEventListener('change', function (e) {
    var pinned = null;
    try { pinned = localStorage.getItem(KEY); } catch (err) {}
    if (!pinned) apply(!e.matches);
  });
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('.theme-toggle');
    if (!btn) return;
    var dark = !root.classList.contains('dark');
    apply(dark);
    try { localStorage.setItem(KEY, dark ? 'dark' : 'light'); } catch (err) {}
  });
})();
