// Reads releases.json. While it lists no release, the page keeps its
// "not released yet" state; once one exists, each platform gets its button.
(function () {
  fetch('releases.json', { cache: 'no-store' })
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(function (data) {
      var latest = data && data.releases && data.releases[0];
      if (!latest) return;
      document.querySelector('[data-release-lede]').textContent =
        'ClipForge ' + latest.version + ', released ' + latest.date + '.';
      document.querySelectorAll('[data-platform]').forEach(function (card) {
        var file = latest.files && latest.files[card.dataset.platform];
        var state = card.querySelector('[data-state]');
        if (!file) { state.lastChild.textContent = 'Not available for this version'; return; }
        var a = document.createElement('a');
        a.className = 'btn btn-primary';
        a.href = file.url;
        a.textContent = 'Download ' + file.label;
        state.replaceWith(a);
      });
    })
    .catch(function () {});
})();
