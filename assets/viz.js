<script>
(function () {
  var NS = 'http://www.w3.org/2000/svg';
  var C = { magneto:'#2563eb', fluid:'#0891b2', optical:'#9333ea', reacting:'#ea580c', control:'#059669', vision:'#db2777',
            journal:'#2563eb', conference:'#f59e0b', preprint:'#10b981' };
  var THEMES = [
    {id:'magneto', name:'Magneto-mechanical'}, {id:'control', name:'Control & data-driven'},
    {id:'fluid', name:'Fluid–structure'}, {id:'optical', name:'Optical–molecular'},
    {id:'vision', name:'Vision-based sensing'}, {id:'reacting', name:'Reacting flows (emerging)', emerging:true}
  ];
  var PROJECTS = [
    {id:'maglev', name:'Magnetic levitation', theme:'magneto'}, {id:'mr', name:'Smart materials (MR fluid)', theme:'magneto'},
    {id:'datadriven', name:'Data-driven control', theme:'control'},
    {id:'soft-robotics', name:'Soft robotics', theme:'fluid'}, {id:'biosensor', name:'Sandwich biosensor', theme:'optical'},
    {id:'vehiclechase', name:'Vision-based tracking', theme:'vision'}, {id:'realtime', name:'Real-time rotor dynamics', theme:'magneto'}, {id:'undergraduate', name:'Undergraduate projects', theme:'control'}
  ];
  var PAPERS = [
    {id:'sil', short:'SIL maglev simulation', year:2026, type:'conference', project:'maglev', authors:['T. H. Nehal','S. M. Ahmad']},
    {id:'meas', short:'AMB sensing review', year:2025, type:'journal', project:'maglev', authors:['T. H. Nehal','M. Ahmad','M. Shafiullah','A. Islam']},
    {id:'access', short:'AMB optimization review', year:2025, type:'journal', project:'maglev', authors:['T. H. Nehal','W. M. Hamanah','M. A. Abido']},
    {id:'comsol', short:'COMSOL adaptive depth control', year:2026, type:'conference', project:'datadriven', authors:['T. H. Nehal','M. H. I. Nasution','S. El-Ferik']},
    {id:'soft', short:'Soft manipulator vibration', year:2026, type:'journal', project:'soft-robotics', authors:['S. J. Maliha','T. H. Nehal','S. Ahmed','M. H. Hasan']},
    {id:'uav', short:'UAV chase tracking', year:2025, type:'preprint', project:'vehiclechase', authors:['T. H. Nehal']},
    {id:'ens', short:'Ensemble decision trees', year:2025, type:'journal', project:'datadriven', authors:['M. Azad','T. H. Nehal','M. Moshkov']},
    {id:'ecce', short:'Small medical datasets', year:2023, type:'conference', project:null, authors:['T. H. Nehal','A. A. Khan','S. A. Shifa','L. Saiyara','U. Hossain','A. K. M. E. Islam']}
  ];
  var EVENTS = [
    {y:2023, t:'Paper: small medical datasets (ECCE)', c:'control'},
    {y:2025, t:'Paper: ensemble decision trees (Computing)', c:'control'},
    {y:2025, t:'Review: AMB optimization (IEEE Access)', c:'magneto'},
    {y:2025, t:'Review: AMB sensing (Measurement)', c:'magneto'},
    {y:2025, t:'Preprint: UAV chase tracking', c:'vision'},
    {y:2025, t:'MSc completed (Dec)', c:'milestone'},
    {y:2026, t:'Paper: soft manipulator vibration (DUJS)', c:'fluid'},
    {y:2026, t:'IEEE SSD: maglev SIL simulation', c:'magneto'},
    {y:2026, t:'IEEE SSD: COMSOL adaptive control', c:'control'},
    {y:2026, t:'PhD studies begin', c:'milestone'}
  ];
  var SKILLS = [
    {cat:'Modeling & simulation', c:'#2563eb', items:['MATLAB / Simulink','COMSOL','Software-in-the-loop']},
    {cat:'Control & identification', c:'#059669', items:['Cascaded control','Model-reference adaptive control','System identification']},
    {cat:'Programming', c:'#9333ea', items:['Python','C / C++']},
    {cat:'Machine learning', c:'#db2777', items:['PyTorch','Decision-tree ensembles']},
    {cat:'Hardware & instrumentation', c:'#ea580c', items:['Arduino','STM32','Test-rig design','Sensing']}
  ];

  function el(n, a, p) { var e = document.createElementNS(NS, n); for (var k in a) e.setAttribute(k, a[k]); if (p) p.appendChild(e); return e; }
  function txt(p, s, a) { var t = el('text', a, p); t.textContent = s; return t; }
  function root(node) { return (node.getAttribute('data-root') || ''); }
  function pcolor(id) { var p = PROJECTS.filter(function (x) { return x.id === id; })[0]; return p ? C[p.theme] : '#94a3b8'; }

  // ---- Research map ----
  function map(node) {
    var r = root(node), W = 1000, row = 54, rows = Math.max(THEMES.length, PROJECTS.length, PAPERS.length), H = rows * row + 60;
    var svg = el('svg', {viewBox:'0 0 '+W+' '+H, role:'img', 'aria-label':'Map linking research themes to projects to papers'}, null);
    var col = {t:{x:0,w:230}, p:{x:385,w:230}, a:{x:770,w:230}};
    var y = function (i, n) { return 40 + i * ((H - 70) / Math.max(n - 1, 1)); };
    [['Themes',col.t],['Projects',col.p],['Papers',col.a]].forEach(function (h) { txt(svg, h[0], {x:h[1].x, y:16, 'font-size':13, 'font-weight':700, fill:'currentColor', opacity:.55}); });
    var pos = {};
    THEMES.forEach(function (t, i) { pos['t'+t.id] = y(i, THEMES.length); });
    PROJECTS.forEach(function (p, i) { pos['p'+p.id] = y(i, PROJECTS.length); });
    var pap = PAPERS.slice().sort(function (a, b) { var ia = PROJECTS.findIndex(function (p) { return p.id === a.project; }), ib = PROJECTS.findIndex(function (p) { return p.id === b.project; }); return (ia<0?99:ia) - (ib<0?99:ib); });
    pap.forEach(function (a, i) { pos['a'+a.id] = y(i, pap.length); });
    function link(x1, y1, x2, y2, color, dash) {
      var m = (x1 + x2) / 2;
      el('path', {d:'M'+x1+','+y1+' C'+m+','+y1+' '+m+','+y2+' '+x2+','+y2, fill:'none', stroke:color, 'stroke-width':2.5, opacity:.55, 'stroke-dasharray':dash||''}, svg);
    }
    PROJECTS.forEach(function (p) { link(col.t.x+col.t.w, pos['t'+p.theme], col.p.x, pos['p'+p.id], C[p.theme]); });
    PAPERS.forEach(function (a) {
      if (a.project) link(col.p.x+col.p.w, pos['p'+a.project], col.a.x, pos['a'+a.id], pcolor(a.project));
      else link(col.t.x+col.t.w, pos['tcontrol'], col.a.x, pos['a'+a.id], C.control, '5 5');
    });
    function box(x, w, yy, label, color, href, dashed, sub) {
      var g = el('g', {}, svg), a = href ? el('a', {href:href}, g) : g;
      a = href ? a : g;
      el('rect', {x:x, y:yy-18, width:w, height:36, rx:10, fill:color, 'fill-opacity':dashed?.08:.16, stroke:color, 'stroke-width':2, 'stroke-dasharray':dashed?'5 4':''}, a);
      txt(a, label, {x:x+12, y:yy+(sub?-1:5), 'font-size':13, 'font-weight':600, fill:'currentColor'});
      if (sub) txt(a, sub, {x:x+12, y:yy+13, 'font-size':10.5, fill:'currentColor', opacity:.6});
    }
    THEMES.forEach(function (t) { box(col.t.x, col.t.w, pos['t'+t.id], t.name, C[t.id], null, t.emerging); });
    PROJECTS.forEach(function (p) { box(col.p.x, col.p.w, pos['p'+p.id], p.name, C[p.theme], r+'projects/'+p.id+'/index.html'); });
    pap.forEach(function (a) { box(col.a.x, col.a.w, pos['a'+a.id], a.short, pcolor(a.project), r+'publications/index.html', false, a.year+' · '+a.type); });
    node.appendChild(svg);
  }
  // ---- Timeline ----
  function timeline(node) {
    var years = [2023, 2024, 2025, 2026], h = '<div class="tl-grid">';
    years.forEach(function (yr) {
      h += '<div class="tl-col"><div class="tl-year">'+yr+'</div>';
      var ev = EVENTS.filter(function (e) { return e.y === yr; });
      if (!ev.length) h += '<div class="tl-empty">—</div>';
      ev.forEach(function (e) { h += '<div class="tl-ev" style="--c:'+(C[e.c]||'#334155')+'">'+e.t+'</div>'; });
      h += '</div>';
    });
    node.innerHTML = h + '</div>';
  }
  // ---- Publication charts ----
  function pubs(node) {
    var years = [2023, 2024, 2025, 2026], types = ['journal','conference','preprint'];
    var W = 520, H = 280, L = 36, B = 40, max = 4, bw = 70, gap = (W - L - years.length * bw) / (years.length + 1);
    var svg = el('svg', {viewBox:'0 0 '+W+' '+H, role:'img', 'aria-label':'Publications per year by type'}, null);
    for (var g = 0; g <= max; g++) { var gy = H - B - g * (H - B - 20) / max; el('line', {x1:L, x2:W, y1:gy, y2:gy, stroke:'currentColor', opacity:.12}, svg); txt(svg, g, {x:L-8, y:gy+4, 'text-anchor':'end', 'font-size':11, fill:'currentColor', opacity:.6}); }
    years.forEach(function (yr, i) {
      var x = L + gap + i * (bw + gap), acc = 0;
      types.forEach(function (t) {
        var n = PAPERS.filter(function (p) { return p.year === yr && p.type === t; }).length; if (!n) return;
        var h = n * (H - B - 20) / max, yy = H - B - acc - h; acc += h;
        el('rect', {x:x, y:yy, width:bw, height:h-2, rx:6, fill:C[t]}, svg);
        txt(svg, n, {x:x+bw/2, y:yy+h/2+4, 'text-anchor':'middle', 'font-size':13, 'font-weight':700, fill:'#fff'});
      });
      txt(svg, yr, {x:x+bw/2, y:H-16, 'text-anchor':'middle', 'font-size':13, fill:'currentColor'});
    });
    var wrap = document.createElement('div'); wrap.className = 'viz-card'; wrap.appendChild(svg);
    var lg = document.createElement('div'); lg.className = 'viz-legend';
    types.forEach(function (t) { lg.innerHTML += '<span><i style="background:'+C[t]+'"></i>'+t+'</span>'; });
    wrap.appendChild(lg); node.appendChild(wrap);
  }
  // ---- Collaboration network ----
  function network(node) {
    var me = 'T. H. Nehal', W = 520, H = 420, cx = W/2, cy = H/2, R = 165;
    var names = []; PAPERS.forEach(function (p) { p.authors.forEach(function (a) { if (a !== me && names.indexOf(a) < 0) names.push(a); }); });
    var pos = {}; pos[me] = [cx, cy];
    names.forEach(function (n, i) { var a = -Math.PI/2 + 2*Math.PI*i/names.length; pos[n] = [cx + R*Math.cos(a), cy + R*Math.sin(a)]; });
    var svg = el('svg', {viewBox:'0 0 '+W+' '+H, role:'img', 'aria-label':'Co-author network'}, null);
    PAPERS.forEach(function (p) {
      for (var i = 0; i < p.authors.length; i++) for (var j = i+1; j < p.authors.length; j++) {
        var a = pos[p.authors[i]], b = pos[p.authors[j]], touch = p.authors[i] === me || p.authors[j] === me;
        el('line', {x1:a[0], y1:a[1], x2:b[0], y2:b[1], stroke:C[p.type], 'stroke-width':touch?2:1.5, opacity:touch?.55:.3}, svg);
      }
    });
    names.forEach(function (n) {
      var p = pos[n], right = p[0] > cx;
      el('circle', {cx:p[0], cy:p[1], r:8, fill:'#64748b', stroke:'#fff', 'stroke-width':2}, svg);
      txt(svg, n, {x:p[0] + (Math.abs(p[0]-cx) < 20 ? 0 : (right ? 13 : -13)), y:p[1] + (Math.abs(p[0]-cx) < 20 ? (p[1] < cy ? -14 : 22) : 4), 'text-anchor':Math.abs(p[0]-cx) < 20 ? 'middle' : (right ? 'start' : 'end'), 'font-size':11, fill:'currentColor'});
    });
    el('circle', {cx:cx, cy:cy, r:20, fill:'#0f4c81', stroke:'#fff', 'stroke-width':3}, svg);
    txt(svg, 'TH', {x:cx, y:cy+5, 'text-anchor':'middle', 'font-size':13, 'font-weight':700, fill:'#fff'});
    var wrap = document.createElement('div'); wrap.className = 'viz-card'; wrap.appendChild(svg);
    var lg = document.createElement('div'); lg.className = 'viz-legend';
    lg.innerHTML = '<span><i style="background:'+C.journal+'"></i>journal</span><span><i style="background:'+C.conference+'"></i>conference</span><span><i style="background:'+C.preprint+'"></i>preprint</span><span>Co-author network</span>';
    wrap.appendChild(lg); node.appendChild(wrap);
  }
  // ---- Skills ----
  function skills(node) {
    var h = '<div class="skill-grid">';
    SKILLS.forEach(function (s) {
      h += '<div class="skill-card" style="--c:'+s.c+'"><div class="skill-cat">'+s.cat+'</div><div class="skill-chips">';
      s.items.forEach(function (i) { h += '<span>'+i+'</span>'; });
      h += '</div></div>';
    });
    node.innerHTML = h + '</div>';
  }
  var F = {map:map, timeline:timeline, pubs:pubs, network:network, skills:skills};
  document.querySelectorAll('[data-viz]').forEach(function (n) { var f = F[n.getAttribute('data-viz')]; if (f) f(n); });
})();
</script>
