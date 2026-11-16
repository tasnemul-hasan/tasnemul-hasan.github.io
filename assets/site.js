<script>
(function () {
  // Publication filter
  var bar = document.querySelector('.pub-filters');
  if (bar) {
    var items = document.querySelectorAll('.pub-list .pub');
    bar.addEventListener('click', function (e) {
      var b = e.target.closest('button');
      if (!b) return;
      bar.querySelectorAll('button').forEach(function (x) { x.classList.remove('active'); });
      b.classList.add('active');
      var t = b.dataset.type;
      items.forEach(function (it) { it.hidden = !(t === 'all' || it.dataset.type === t); });
    });
  }
  // Category filter (research portfolio)
  document.querySelectorAll('[data-filter-bar]').forEach(function (bar) {
    var cards = document.querySelectorAll(bar.dataset.target);
    bar.querySelectorAll('button').forEach(function (x) { x.setAttribute('aria-pressed', x.classList.contains('active')); });
    bar.addEventListener('click', function (e) {
      var b = e.target.closest('button');
      if (!b) return;
      bar.querySelectorAll('button').forEach(function (x) { x.classList.remove('active'); x.setAttribute('aria-pressed', 'false'); });
      b.classList.add('active');
      b.setAttribute('aria-pressed', 'true');
      var c = b.dataset.cat;
      cards.forEach(function (card) {
        card.hidden = !(c === 'all' || (card.dataset.cats || '').split('|').indexOf(c) >= 0);
      });
    });
  });
})();
</script>
