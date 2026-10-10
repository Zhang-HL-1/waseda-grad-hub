/* ==========================================================================
   日本修士备考 · 个人资源库  —— 交互主程序
   ========================================================================== */
(function () {
  'use strict';

  const LIB = window.LIB || {};
  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  /* ------------------------------------------------------------------ 状态 */
  const state = {
    view: 'rankings',
    schoolQuery: '',
    schoolType: 'all',
    campusSel: null,
    mapBox: 'japan'
  };

  /* ============================================================== 视图切换 */
  const VIEWS = {
    rankings: { label: '学校排名', nav: 'rankings' },
    schools:  { label: '研究科及专攻大全', nav: 'schools' },
    geo:      { label: '地理位置', nav: 'geo' }
  };

  function switchView(name, opts = {}) {
    if (!VIEWS[name]) name = 'rankings';
    state.view = name;
    $$('.view').forEach((v) => v.classList.toggle('is-active', v.dataset.view === name));
    $$('.nav-item').forEach((b) => b.classList.toggle('is-active', b.dataset.view === name));
    $('.crumb-cur').textContent = VIEWS[name].label;
    $('#scroll').scrollTop = 0;
    if (name === 'geo') { sizeMap(); animateBars(); }
    if (name === 'rankings') animateBars();
    if (location.hash.slice(1) !== name && !opts.silent) history.replaceState(null, '', '#' + name);
    document.title = VIEWS[name].label + ' · 日本修士备考个人资源库';
  }

  /* ================================================================ 动效工具 */
  function countUp(el, to, opts = {}) {
    const dur = opts.duration || 1100;
    const dec = opts.decimals || 0;
    const from = opts.from != null ? opts.from : Math.max(0, to - Math.ceil(to * 0.28));
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { el.textContent = to.toFixed(dec); return; }
    const t0 = performance.now();
    (function step(t) {
      const p = Math.min(1, (t - t0) / dur);
      const e = 1 - Math.pow(1 - p, 3);
      el.textContent = (from + (to - from) * e).toFixed(dec);
      if (p < 1) requestAnimationFrame(step);
    })(t0);
  }

  function animateBars(root = document) {
    $$('.bar > i[data-w]', root).forEach((bar, i) => {
      bar.style.width = '0';
      setTimeout(() => { bar.style.width = bar.dataset.w + '%'; }, 90 + i * 110);
    });
  }

  /* ============================================================== 模块一：排名 */
  function renderRankings() {
    const meta = LIB.meta || {};
    $('#rankSchoolName').textContent = meta.universityJa || '';
    $('#rankUpdated').textContent = '数据截至 ' + (meta.updated || '—');
    if (meta.rankingSource) {
      const a = $('#rankSourceLink');
      a.href = meta.rankingSource.url;
      a.textContent = meta.rankingSource.label + ' ↗';
    }

    // —— 主视觉
    const hero = LIB.hero || {};
    const m = (hero.metrics || []).map((x) => `
      <div class="hero-metric">
        <div class="row"><span>${esc(x.label)}</span><b>${esc(x.value)}</b></div>
        ${x.pct != null ? `<div class="bar"><i data-w="${x.pct}"></i></div>` : ''}
        ${x.note ? `<div class="row hero-note"><span>${esc(x.note)}</span></div>` : ''}
      </div>`).join('');

    $('#rankHero').innerHTML = `
      <div class="hero-left anim" style="--i:0">
        <h2>${esc(meta.universityJa || '')}</h2>
        <p class="hero-sub">${esc(meta.universityEn || '')} · ${esc(hero.kicker || '')}</p>
        <div class="hero-big">
          <span class="num" id="heroNum">0</span>
          <span class="unit">${esc(hero.unitLabel || '')}</span>
        </div>
        <span class="hero-label">${esc(hero.label || '')}</span>
        <p class="hero-caption">${esc(hero.caption || '')}</p>
        <div class="hero-links">
          ${(hero.links || []).map((l) => `<a class="mini-link" href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)} ↗</a>`).join('')}
        </div>
      </div>
      <div class="hero-right anim" style="--i:1">${m}</div>`;
    countUp($('#heroNum'), hero.rank || 0);

    // —— 榜单卡片
    $('#rankGrid').innerHTML = (LIB.rankings || []).map((r, i) => `
      <article class="rank-card anim" style="--i:${i + 2}" data-rank="${esc(r.id)}" tabindex="0" role="button"
               aria-label="${esc(r.title)} 详情">
        <div class="rank-card-top">
          <div>
            <div class="org">${esc(r.org)} · ${esc(r.year)}</div>
            <h3>${esc(r.title)}</h3>
          </div>
          <span class="rank-arrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7M9 7h8v8"/></svg></span>
        </div>
        <div class="rank-val"><span class="n">${esc(r.rankText || r.rank)}</span><span class="s">${esc(r.scope)}</span></div>
        <div class="rank-meta">${(r.tags || []).map((t) => `<span class="tag ${esc(t.k || '')}">${esc(t.v)}</span>`).join('')}</div>
        <p class="blurb">${esc(r.blurb)}</p>
      </article>`).join('');

    $$('#rankGrid .rank-card').forEach((card) => {
      const open = () => openRankDrawer(card.dataset.rank);
      card.addEventListener('click', open);
      card.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
    });

    // —— 国内坐标
    $('#rankContext').innerHTML = (LIB.contexts || []).map((c) => `
      <div class="ctx-cell">
        <div class="k">${esc(c.k)}</div>
        <div class="v">${esc(c.v)}</div>
        <div class="d">${esc(c.d)}</div>
      </div>`).join('');

    $('#navCountRank').textContent = (LIB.rankings || []).length;
  }

  function openRankDrawer(id) {
    const r = (LIB.rankings || []).find((x) => x.id === id);
    if (!r) return;
    openDrawer(`
      <div class="drawer-head">
        <p class="eyebrow">Ranking Detail</p>
        <h2>${esc(r.title)}</h2>
        <p class="dh-sub">${esc(r.org)} · ${esc(r.year)}</p>
        <button class="drawer-close" data-close aria-label="关闭"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg></button>
      </div>
      <div class="drawer-body">
        <div class="d-section">
          <h4>排名结果</h4>
          <div class="rank-val" style="margin-bottom:8px"><span class="n" style="font-size:44px">${esc(r.rankText || r.rank)}</span><span class="s">${esc(r.scope)}</span></div>
          <div class="rank-meta">${(r.tags || []).map((t) => `<span class="tag ${esc(t.k || '')}">${esc(t.v)}</span>`).join('')}</div>
        </div>
        <div class="d-section">
          <h4>口径说明</h4>
          <p class="d-note">${esc(r.detail || r.blurb)}</p>
        </div>
        <div class="d-section">
          <h4>备考视角</h4>
          <p class="d-note">${esc(r.advice || '')}</p>
        </div>
        <div class="d-section">
          <h4>官方出处</h4>
          <a class="d-link" href="${esc(r.url)}" target="_blank" rel="noopener">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M14 4h6v6M20 4 10 14M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></svg>
            打开官网页面
          </a>
        </div>
      </div>`);
  }

  /* ============================================================ 模块二：研究科 */
  function schoolTypes() {
    const map = new Map();
    (LIB.schools || []).forEach((s) => map.set(s.type, (map.get(s.type) || 0) + 1));
    return map;
  }

  function renderSchoolFilters() {
    const types = schoolTypes();
    const chips = [`<button class="chip is-active" data-type="all">全部<span class="c">${(LIB.schools || []).length}</span></button>`];
    types.forEach((n, t) => chips.push(`<button class="chip" data-type="${esc(t)}">${esc(t)}<span class="c">${n}</span></button>`));
    $('#schoolFilters').innerHTML = chips.join('');
    $$('#schoolFilters .chip').forEach((c) => c.addEventListener('click', () => {
      state.schoolType = c.dataset.type;
      $$('#schoolFilters .chip').forEach((x) => x.classList.toggle('is-active', x === c));
      renderSchoolGrid();
    }));
  }

  function programCount(s) { return (s.programs || []).length; }

  function renderSchoolGrid() {
    const q = state.schoolQuery.trim().toLowerCase();
    const list = (LIB.schools || []).filter((s) => {
      if (state.schoolType !== 'all' && s.type !== state.schoolType) return false;
      if (!q) return true;
      const hay = [s.name, s.en, s.kana || '', s.type, s.summary || '', ...(s.programs || []).map((p) => p.name + ' ' + (p.en || '') + ' ' + (p.degree || ''))]
        .join(' ').toLowerCase();
      return hay.includes(q);
    });

    $('#schoolEmpty').hidden = list.length > 0;
    $('#schoolGrid').innerHTML = list.map((s, i) => {
      const progs = s.programs || [];
      const shown = progs.slice(0, 5);
      return `
      <article class="school-card anim" style="--i:${i % 12}" data-id="${esc(s.id)}" tabindex="0" role="button">
        <div class="school-card-top">
          <div>
            <h3>${esc(s.name)}</h3>
            <p class="en">${esc(s.en)}</p>
          </div>
          <span class="school-open"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7M9 7h8v8"/></svg></span>
        </div>
        <div class="rank-meta">
          <span class="tag ${s.type === '専門職大学院' ? 'blue' : (s.type === '募集停止' ? '' : 'warm')}">${esc(s.type)}</span>
          ${s.pending ? '<span class="tag gold">目录待复核</span>' : ''}
        </div>
        <div class="prog-chips">
          ${shown.map((p) => `<span class="tag green">${esc(p.name)}</span>`).join('')}
          ${progs.length > shown.length ? `<span class="tag">+${progs.length - shown.length}</span>` : ''}
        </div>
        <div class="foot">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z"/><circle cx="12" cy="10" r="2.5"/></svg>
          <span>${esc((s.campusNames || []).join(' · ') || '校区待确认')}</span>
          <span class="prog-count">${programCount(s)} 专攻 / 课程</span>
        </div>
      </article>`;
    }).join('');

    $$('#schoolGrid .school-card').forEach((card) => {
      const open = () => openSchoolDrawer(card.dataset.id);
      card.addEventListener('click', open);
      card.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
    });
  }

  function openSchoolDrawer(id) {
    const s = (LIB.schools || []).find((x) => x.id === id);
    if (!s) return;
    const progs = s.programs || [];
    openDrawer(`
      <div class="drawer-head">
        <p class="eyebrow">${esc(s.type)} · Graduate School</p>
        <h2>${esc(s.name)}</h2>
        <p class="dh-sub">${esc(s.en)}</p>
        <button class="drawer-close" data-close aria-label="关闭"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg></button>
      </div>
      <div class="drawer-body">
        ${s.summary ? `<div class="d-section"><h4>研究科概览</h4><p class="d-note">${esc(s.summary)}</p></div>` : ''}
        <div class="d-section">
          <h4>专攻 / 课程（${progs.length}）</h4>
          <div class="d-prog">
            ${progs.map((p, i) => `
              <div class="d-prog-item" style="--i:${i}">
                <div class="pt"><strong>${esc(p.name)}</strong>${p.pending ? '<span class="tag gold">待复核</span>' : (p.en ? `<span class="tag">${esc(p.en)}</span>` : '')}</div>
                ${p.degree ? `<div class="deg">学位：${esc(p.degree)}</div>` : ''}
                ${p.desc ? `<p class="pdesc">${esc(p.desc)}</p>` : ''}
              </div>`).join('')}
          </div>
        </div>
        <div class="d-section">
          <h4>基本信息</h4>
          <dl class="kv">
            <dt>所在校区</dt><dd>${esc((s.campusNames || []).join(' / ') || '—')}</dd>
            <dt>类别</dt><dd>${esc(s.type)}</dd>
            ${s.term ? `<dt>修业年限</dt><dd>${esc(s.term)}</dd>` : ''}
            <dt>复核状态</dt><dd>${s.pending ? '<span class="tag gold">部分条目待官网复核</span>' : '已按官网页面整理'}</dd>
            ${s.note ? `<dt>备考备注</dt><dd>${esc(s.note)}</dd>` : ''}
          </dl>
        </div>
        <div class="d-section">
          <h4>官方入口</h4>
          <a class="d-link" href="${esc(s.url)}" target="_blank" rel="noopener">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M14 4h6v6M20 4 10 14M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></svg>
            研究科官网
          </a>
        </div>
      </div>`);
  }

  /* ============================================================ 模块三：地理 */
  const PROJ = (() => {
    const box = (window.JAPAN_MAP && window.JAPAN_MAP.box) || { lon0: 122.4, lon1: 146.6, lat0: 23.8, lat1: 46.2 };
    const w = (window.JAPAN_MAP && window.JAPAN_MAP.w) || 1000;
    const merc = (lat) => (Math.log(Math.tan(Math.PI / 4 + (lat * Math.PI) / 360)) * 180) / Math.PI;
    const top = merc(box.lat1);
    const scale = w / (box.lon1 - box.lon0);
    return {
      box, merc, top, scale, w,
      x: (lon) => (lon - box.lon0) * scale,
      y: (lat) => (top - merc(lat)) * scale,
      h: (top - merc(box.lat0)) * scale
    };
  })();

  const ZOOM = {
    japan: null,
    kanto: { lon0: 138.3, lon1: 141.3, lat0: 34.5, lat1: 36.8 },
    tokyo: { lon0: 139.44, lon1: 139.86, lat0: 35.60, lat1: 35.88 }
  };
  const JAPAN_BOX = { lon0: PROJ.box.lon0, lon1: PROJ.box.lon1, lat0: PROJ.box.lat0, lat1: PROJ.box.lat1 };

  /* 选中校区时缩放到所在都道府县范围（保留地理上下文，而不是贴脸放大） */
  const REGION = {
    '東京都': { lon0: 139.44, lon1: 139.88, lat0: 35.58, lat1: 35.90, key: 'focus' },
    '埼玉県': { lon0: 139.08, lon1: 139.62, lat0: 35.70, lat1: 36.30, key: 'focus' },
    '福岡県': { lon0: 130.52, lon1: 130.92, lat0: 33.79, lat1: 34.00, key: 'focus' }
  };

  let curBox = null;      // 当前投影视窗（经纬度）
  let zoomAnim = null;

  function boxToViewBox(b) {
    const x0 = PROJ.x(b.lon0), x1 = PROJ.x(b.lon1);
    const y0 = PROJ.y(b.lat1), y1 = PROJ.y(b.lat0);
    return { x: x0, y: y0, w: x1 - x0, h: y1 - y0 };
  }

  function renderPrefs() {
    const paths = (window.JAPAN_MAP && window.JAPAN_MAP.paths) || [];
    $('#mapPrefs').innerHTML = paths.map((p) => `<path d="${p.d}"><title>${esc(p.name)}</title></path>`).join('');
  }

  /* 经纬网：让空白区域也有信息密度 */
  function renderGrid() {
    const lines = [];
    for (let lat = 25; lat <= 45; lat += 5) {
      const y = PROJ.y(lat);
      lines.push(`<line x1="${PROJ.x(124)}" y1="${y.toFixed(1)}" x2="${PROJ.x(146.4)}" y2="${y.toFixed(1)}"></line>`);
      lines.push(`<text x="${(PROJ.x(124) + 6).toFixed(1)}" y="${(y - 4).toFixed(1)}">${lat}°N</text>`);
    }
    for (let lon = 125; lon <= 145; lon += 5) {
      const x = PROJ.x(lon);
      lines.push(`<line x1="${x.toFixed(1)}" y1="${PROJ.y(24).toFixed(1)}" x2="${x.toFixed(1)}" y2="${PROJ.y(45.8).toFixed(1)}"></line>`);
      lines.push(`<text x="${(x + 4).toFixed(1)}" y="${(PROJ.y(24) - 4).toFixed(1)}">${lon}°E</text>`);
    }
    $('#mapGrid').innerHTML = lines.join('');
  }

  /* 圆点保持“屏幕尺寸恒定”：r 与视野宽度成正比 */
  function pinSize() {
    const vb = boxToViewBox(curBox || JAPAN_BOX);
    return Math.min(5.2, Math.max(0.16, vb.w * 0.0044));
  }

  /* 同一视野内相互重叠的校区 → 聚合为一个徽标，点击后放大 */
  function clusterCampuses() {
    const r = pinSize();
    const gap = Math.max(r * 2.6, 1.2);
    const pts = (LIB.campuses || []).map((c) => ({ c, x: PROJ.x(c.lng), y: PROJ.y(c.lat) }));
    const used = new Set(), groups = [];
    pts.forEach((p, i) => {
      if (used.has(i)) return;
      const g = [p]; used.add(i);
      pts.forEach((q, j) => {
        if (used.has(j)) return;
        if (Math.hypot(p.x - q.x, p.y - q.y) < gap) { g.push(q); used.add(j); }
      });
      groups.push(g);
    });
    return { groups, r };
  }

  function drawPins() {
    const { groups, r } = clusterCampuses();
    const out = [];
    groups.forEach((g) => {
      if (g.length === 1) {
        const c = g[0].c, x = g[0].x, y = g[0].y;
        const active = state.campusSel === c.id;
        const sub = c.level === 'sub';
        const fs = r * 2.5, halo = r * 0.75;
        out.push(`<g class="pin ${sub ? 'sub' : ''} ${active ? 'is-active' : ''}" data-id="${esc(c.id)}" transform="translate(${x.toFixed(1)},${y.toFixed(1)})">
          <circle class="ring" r="${(r * 1.3).toFixed(2)}"></circle>
          <circle class="dot" r="${r.toFixed(2)}"></circle>
          <text class="label" x="${(r * 2).toFixed(2)}" y="${(r * 0.62).toFixed(2)}"
                font-size="${fs.toFixed(2)}" stroke-width="${halo.toFixed(2)}">${esc(c.name.replace('キャンパス', ''))}</text>
        </g>`);
      } else {
        const cx = g.reduce((s, p) => s + p.x, 0) / g.length;
        const cy = g.reduce((s, p) => s + p.y, 0) / g.length;
        const prefs = Array.from(new Set(g.map((p) => p.c.pref)));
        const label = prefs.join('・') + 'エリア';
        const ids = g.map((p) => p.c.id).join(',');
        out.push(`<g class="cluster" data-ids="${esc(ids)}" transform="translate(${cx.toFixed(1)},${cy.toFixed(1)})">
          <circle class="halo" r="${(r * 3.8).toFixed(2)}"></circle>
          <circle class="core" r="${(r * 1.95).toFixed(2)}"></circle>
          <text class="cnt" y="${(r * 0.62).toFixed(2)}" font-size="${(r * 1.7).toFixed(2)}">${g.length}</text>
          <text class="clabel" y="${(-r * 3.3).toFixed(2)}" font-size="${(r * 2.3).toFixed(2)}"
                stroke-width="${(r * 0.7).toFixed(2)}">${label}</text>
        </g>`);
      }
    });
    $('#mapPins').innerHTML = out.join('');

    $$('#mapPins .pin').forEach((p) => {
      p.addEventListener('click', () => selectCampus(p.dataset.id, { openBubble: true }));
      p.addEventListener('mouseenter', () => showTip(p.dataset.id));
      p.addEventListener('mouseleave', hideTip);
    });
    $$('#mapPins .cluster').forEach((el) => {
      el.addEventListener('click', () => {
        const ids = el.dataset.ids.split(',');
        const cs = ids.map((id) => (LIB.campuses || []).find((c) => c.id === id)).filter(Boolean);
        const lons = cs.map((c) => c.lng), lats = cs.map((c) => c.lat);
        const pad = 0.03;
        state.mapBox = 'focus'; syncZoomChips('focus');
        animateBox({
          lon0: Math.min(...lons) - pad, lon1: Math.max(...lons) + pad,
          lat0: Math.min(...lats) - pad, lat1: Math.max(...lats) + pad
        });
      });
    });
  }

  function applyBox(b) {
    curBox = b;
    const vb = boxToViewBox(b);
    $('#japanMap').setAttribute('viewBox', `${vb.x.toFixed(1)} ${vb.y.toFixed(1)} ${vb.w.toFixed(1)} ${vb.h.toFixed(1)}`);
    drawPins();
  }

  function animateBox(target) {
    if (zoomAnim) cancelAnimationFrame(zoomAnim);
    const from = Object.assign({}, curBox);
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { applyBox(target); return; }
    const t0 = performance.now(), dur = 720;
    (function step(t) {
      const p = Math.min(1, (t - t0) / dur);
      const e = p < .5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
      const b = {};
      ['lon0', 'lon1', 'lat0', 'lat1'].forEach((k) => { b[k] = from[k] + (target[k] - from[k]) * e; });
      applyBox(b);
      if (p < 1) zoomAnim = requestAnimationFrame(step); else zoomAnim = null;
    })(t0);
  }

  function sizeMap() {
    // SVG 尺寸交给 CSS，这里只按当前视野重绘（缩放比变化时圆点跟着变）
    applyBox(curBox ? Object.assign({}, curBox) : Object.assign({}, JAPAN_BOX));
  }

  function selectCampus(id, opts = {}) {
    state.campusSel = id;
    const c = (LIB.campuses || []).find((x) => x.id === id);
    if (!c) return;
    $$('#mapPins .pin').forEach((p) => p.classList.toggle('is-active', p.dataset.id === id));
    $$('.campus-item').forEach((el) => {
      const on = el.dataset.id === id;
      el.classList.toggle('is-active', on);
      if (on && opts.scroll !== false) el.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    });
    renderBubble(c);
    if (opts.zoom !== false) {
      const box = REGION[c.pref] || ZOOM.tokyo;
      const same = curBox && Math.abs(curBox.lon0 - box.lon0) < 1e-6 && Math.abs(curBox.lat0 - box.lat0) < 1e-6;
      state.mapBox = 'focus';
      syncZoomChips('focus');
      if (!same) animateBox(box);
    }
  }

  function syncZoomChips(which) {
    $$('.map-actions .chip').forEach((c) => c.classList.toggle('is-active', c.dataset.bbox === which));
  }

  function renderBubble(c) {
    const wrap = $('#mapWrap');
    let b = $('.map-bubble', wrap);
    if (!b) { b = document.createElement('div'); b.className = 'map-bubble'; wrap.appendChild(b); }
    b.innerHTML = `
      <button class="mb-close" aria-label="关闭">×</button>
      <strong>${esc(c.name)}</strong>
      <span class="mb-addr">${esc(c.addr)}</span>
      <span class="mb-access">${esc((c.access || []).map((a) => a.v).join(' / '))}</span>
      <button class="mb-more" data-id="${esc(c.id)}">查看完整信息</button>`;
    b.hidden = false;
    b.classList.add('is-in');
    $('.mb-close', b).addEventListener('click', () => { b.hidden = true; });
    $('.mb-more', b).addEventListener('click', () => openCampusDrawer(c.id));
  }

  function openCampusDrawer(id) {
    const c = (LIB.campuses || []).find((x) => x.id === id);
    if (!c) return;
    openDrawer(`
      <div class="drawer-head">
        <p class="eyebrow">Campus · ${esc(c.level === 'sub' ? '专门设施' : '主要校区')}</p>
        <h2>${esc(c.name)}</h2>
        <p class="dh-sub">${esc(c.en)}</p>
        <button class="drawer-close" data-close aria-label="关闭"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg></button>
      </div>
      <div class="drawer-body">
        <div class="d-section">
          <h4>地址</h4>
          <dl class="kv">
            <dt>所在地</dt><dd>${esc(c.addr)}</dd>
            <dt>都道府县</dt><dd>${esc(c.pref || '')}</dd>
            <dt>坐标</dt><dd>${c.lat.toFixed(4)}, ${c.lng.toFixed(4)}（示意）</dd>
          </dl>
        </div>
        <div class="d-section">
          <h4>交通方式</h4>
          <div class="d-access">
            ${(c.access || []).map((a) => `<div class="line"><span class="k">${esc(a.k)}</span><span>${esc(a.v)}</span></div>`).join('')}
          </div>
        </div>
        ${(c.schools || []).length ? `<div class="d-section">
          <h4>在此校区的研究科 / 机构</h4>
          <div class="prog-chips">${c.schools.map((s) => `<span class="tag warm">${esc(s)}</span>`).join('')}</div>
        </div>` : ''}
        ${c.note ? `<div class="d-section"><h4>备注</h4><p class="d-note">${esc(c.note)}</p></div>` : ''}
        <div class="d-section">
          <h4>官方页面</h4>
          <a class="d-link" href="${esc(c.url)}" target="_blank" rel="noopener">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M14 4h6v6M20 4 10 14M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></svg>
            官网交通アクセス页
          </a>
        </div>
      </div>`);
  }

  function showTip(id) {
    const c = (LIB.campuses || []).find((x) => x.id === id);
    const tip = $('#mapTip');
    if (!c) return;
    tip.innerHTML = `<strong>${esc(c.name)}</strong> · ${esc((c.access || [])[0] ? c.access[0].v : '')}`;
    tip.hidden = false;
  }
  function hideTip() { $('#mapTip').hidden = true; }

  function renderCampusList() {
    // 地图左上角统计：按都道府县统计校区数量
    const cs = LIB.campuses || [];
    const byPref = {};
    cs.forEach((c) => { const k = (c.pref || '').slice(0, 3); byPref[k] = (byPref[k] || 0) + 1; });
    const total = $('#miTotal'); if (total) total.textContent = cs.length + ' 处';
    const list = $('#miList');
    if (list) {
      list.innerHTML = Object.entries(byPref).sort((a, b) => b[1] - a[1])
        .map(([k, v]) => `<li><i></i>${esc(k)}<b>${v}</b></li>`).join('');
    }

    $('#campusList').innerHTML = (LIB.campuses || []).map((c, i) => `
      <article class="campus-item anim" style="--i:${i % 10}" data-id="${esc(c.id)}" tabindex="0" role="button">
        <div class="ci-top">
          <h4>${esc(c.name.replace('キャンパス', ''))}</h4>
          <span class="ci-en">${esc(c.enShort || c.en)}</span>
        </div>
        <p class="addr">${esc(c.addr)}</p>
        <div class="ci-tags">
          <span class="tag ${c.level === 'sub' ? 'blue' : 'warm'}">${esc(c.level === 'sub' ? '专门设施' : '主要校区')}</span>
          ${(c.schools || []).slice(0, 3).map((s) => `<span class="tag">${esc(s)}</span>`).join('')}
        </div>
        <p class="ci-access">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 8v4l3 2"/></svg>
          <span>${esc((c.access || [])[0] ? c.access[0].k + '：' + c.access[0].v : '')}</span>
        </p>
      </article>`).join('');

    $$('.campus-item').forEach((el) => {
      const go = () => { selectCampus(el.dataset.id, { openBubble: true, scroll: false }); openCampusDrawer(el.dataset.id); };
      el.addEventListener('click', go);
      el.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); } });
    });
  }

  function renderGeo() {
    $('#statCampusCount').textContent = (LIB.campuses || []).length;
    $('#navCountCampus').textContent = (LIB.campuses || []).length;
    renderGrid();
    renderPrefs();
    renderCampusList();
    applyBox(Object.assign({}, JAPAN_BOX));
    $$('.map-actions .chip').forEach((chip) => chip.addEventListener('click', () => {
      const key = chip.dataset.bbox;
      state.mapBox = key;
      syncZoomChips(key);
      const b = ZOOM[key];
      animateBox(b || Object.assign({}, JAPAN_BOX));
      if (key !== 'focus') {
        state.campusSel = null;
        $$('#mapPins .pin').forEach((p) => p.classList.remove('is-active'));
      }
      const bub = $('.map-bubble'); if (bub) bub.hidden = true;
    }));
  }

  /* ================================================================ 抽屉控制 */
  let lastFocus = null;
  function openDrawer(html) {
    lastFocus = document.activeElement;
    $('#drawerInner').innerHTML = html;
    const d = $('#drawer'), bd = $('#drawerBackdrop');
    bd.hidden = false;
    requestAnimationFrame(() => { bd.classList.add('is-open'); d.classList.add('is-open'); });
    d.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    const close = $('[data-close]', d);
    if (close) close.addEventListener('click', closeDrawer);
    if (close) close.focus({ preventScroll: true });
  }
  function closeDrawer() {
    const d = $('#drawer'), bd = $('#drawerBackdrop');
    d.classList.remove('is-open'); bd.classList.remove('is-open');
    d.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    setTimeout(() => { bd.hidden = true; $('#drawerInner').innerHTML = ''; }, 340);
    if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
  }

  /* ================================================================ 顶部搜索 */
  function wireSearch() {
    const top = $('#topSearch'), school = $('#schoolSearch');
    const apply = (val, fromTop) => {
      state.schoolQuery = val;
      if (fromTop) school.value = val;
      if (val && state.view !== 'schools') switchView('schools');
      renderSchoolGrid();
    };
    top.addEventListener('input', () => apply(top.value, true));
    top.addEventListener('focus', () => { if (top.value) switchView('schools'); });
    school.addEventListener('input', () => { state.schoolQuery = school.value; if (top.value !== school.value) top.value = school.value; renderSchoolGrid(); });
    document.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); top.focus(); top.select(); }
      if (e.key === 'Escape') {
        if ($('#drawer').classList.contains('is-open')) closeDrawer();
        else if (document.activeElement === top || document.activeElement === school) { top.value = ''; school.value = ''; apply('', true); document.activeElement.blur(); }
      }
      if (e.key === '/' && !/^(INPUT|TEXTAREA)$/.test(document.activeElement.tagName)) { e.preventDefault(); top.focus(); }
    });
  }

  /* ==================================================================== 启动 */
  function boot() {
    // 数据文件缺失时的兜底提示（避免出现空白页）
    if (!(LIB.schools || []).length && !(LIB.campuses || []).length && !(LIB.rankings || []).length) {
      $$('.view').forEach((v) => {
        v.innerHTML = '<div class="empty-state" style="padding:80px 20px">' +
          '<h2 style="font-size:20px;margin-bottom:10px">数据文件未加载</h2>' +
          '<p>请确认 assets/js/data.js 与 assets/js/map-data.js 可访问；建议通过 HTTP 服务打开，而不是直接双击 HTML 文件。</p></div>';
      });
      return;
    }

    // 研究科 → 校区名称（用于卡片展示）
    const byId = {};
    (LIB.campuses || []).forEach((c) => { byId[c.id] = c; });
    (LIB.schools || []).forEach((s) => {
      s.campusNames = (s.campusIds || []).map((id) => (byId[id] ? byId[id].name.replace('キャンパス', '') : id));
    });

    renderRankings();
    renderSchoolFilters();
    renderSchoolGrid();
    renderGeo();
    wireSearch();

    $('#statSchoolCount').textContent = (LIB.schools || []).length;
    $('#statProgramCount').textContent = (LIB.schools || []).reduce((n, s) => n + (s.programs || []).length, 0);
    $('#navCountSchool').textContent = (LIB.schools || []).length;

    $$('.nav-item').forEach((b) => b.addEventListener('click', () => {
      switchView(b.dataset.view);
      if (innerWidth <= 980) $('.app').classList.remove('nav-open');
    }));
    $('#menuBtn').addEventListener('click', () => $('.app').classList.toggle('nav-open'));
    $('#drawerBackdrop').addEventListener('click', closeDrawer);
    addEventListener('resize', () => sizeMap());
    addEventListener('hashchange', () => switchView(location.hash.slice(1), { silent: true }));

    switchView(location.hash.slice(1) || 'rankings', { silent: true });
    setTimeout(() => animateBars(), 260);

    // 深链：?open=<研究科 id> 或 ?open=<校区 id> 直接打开详情
    const openId = new URLSearchParams(location.search).get('open');
    if (openId) {
      if ((LIB.schools || []).some((s) => s.id === openId)) { switchView('schools'); openSchoolDrawer(openId); }
      else if ((LIB.campuses || []).some((c) => c.id === openId)) { switchView('geo'); selectCampus(openId); openCampusDrawer(openId); }
    }
  }

  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', boot) : boot();
})();
