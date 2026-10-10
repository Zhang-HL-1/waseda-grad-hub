// CDP 冒烟测试：在无头 Chrome 中执行页面交互并回报结果
const { spawn } = require('child_process');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = 9333;
const URL = process.argv[2] || 'http://127.0.0.1:8788/#rankings';
const W = process.argv[3] || '1500,1080';

const chrome = spawn(CHROME, [
  '--headless=new', '--disable-gpu', '--no-sandbox', '--disable-crash-reporter', '--disable-breakpad',
  `--remote-debugging-port=${PORT}`, `--window-size=${W}`, `--user-data-dir=/tmp/cdp-smoke-${process.pid}`, URL
], { stdio: 'ignore' });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function main() {
  let target = null;
  for (let i = 0; i < 40 && !target; i++) {
    await sleep(500);
    try {
      const list = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
      target = list.find((t) => t.type === 'page' && t.webSocketDebuggerUrl);
    } catch (e) { /* retry */ }
  }
  if (!target) throw new Error('no debug target');

  const ws = new WebSocket(target.webSocketDebuggerUrl);
  let id = 0;
  const pending = new Map();
  await new Promise((res) => ws.addEventListener('open', res));
  ws.addEventListener('message', (ev) => {
    const m = JSON.parse(ev.data);
    if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); }
  });
  const send = (method, params = {}) => new Promise((res) => {
    const mid = ++id;
    pending.set(mid, res);
    ws.send(JSON.stringify({ id: mid, method, params }));
  });
  const evaluate = async (expr) => {
    const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
    if (r.result && r.result.exceptionDetails) return { error: r.result.exceptionDetails.text };
    return r.result && r.result.result ? r.result.result.value : null;
  };

  // 等待页面初始化完成
  for (let i = 0; i < 30; i++) {
    const ready = await evaluate("!!(window.LIB && document.querySelectorAll('#schoolGrid .school-card').length)");
    if (ready === true) break;
    await sleep(400);
  }
  await sleep(400);
  const out = {};

  out.page = await evaluate(`({title:document.title, w:innerWidth, sw:document.documentElement.scrollWidth, view:document.querySelector('.view.is-active').dataset.view})`);
  out.counts = await evaluate(`({
    schools: document.querySelectorAll('#schoolGrid .school-card').length,
    ranks: document.querySelectorAll('#rankGrid .rank-card').length,
    campusItems: document.querySelectorAll('.campus-item').length,
    pins: document.querySelectorAll('#mapPins .pin, #mapPins .cluster').length,
    prefs: document.querySelectorAll('#mapPrefs path').length
  })`);

  // 搜索过滤
  out.search = await evaluate(`(() => {
    const el = document.querySelector('#schoolSearch');
    el.value = '情報'; el.dispatchEvent(new Event('input', {bubbles:true}));
    const n1 = document.querySelectorAll('#schoolGrid .school-card').length;
    el.value = ''; el.dispatchEvent(new Event('input', {bubbles:true}));
    return {matchInfo: n1, restored: document.querySelectorAll('#schoolGrid .school-card').length};
  })()`);

  // 类型筛选
  out.filter = await evaluate(`(() => {
    const chip = [...document.querySelectorAll('#schoolFilters .chip')].find(c => c.dataset.type === '専門職大学院');
    chip.click();
    const n = document.querySelectorAll('#schoolGrid .school-card').length;
    document.querySelector('#schoolFilters .chip[data-type="all"]').click();
    return {docchi: n};
  })()`);

  // 抽屉
  out.drawer = await evaluate(`(async () => {
    document.querySelector('#schoolGrid .school-card').click();
    await new Promise(r => setTimeout(r, 500));
    const open = document.querySelector('#drawer').classList.contains('is-open');
    const title = document.querySelector('#drawerInner h2')?.textContent;
    document.querySelector('#drawer .drawer-close').click();
    await new Promise(r => setTimeout(r, 500));
    return {open, title, closed: !document.querySelector('#drawer').classList.contains('is-open')};
  })()`);

  // 视图切换
  out.views = await evaluate(`(async () => {
    const res = {};
    for (const v of ['geo','rankings','schools']) {
      document.querySelector('.nav-item[data-view="'+v+'"]').click();
      await new Promise(r => setTimeout(r, 260));
      const active = document.querySelector('.view.is-active').dataset.view;
      res[v] = {active, hash: location.hash, crumb: document.querySelector('.crumb-current')?.textContent};
    }
    return res;
  })()`);

  // 地图缩放芯片
  out.mapZoom = await evaluate(`(async () => {
    document.querySelector('.nav-item[data-view="geo"]').click();
    await new Promise(r => setTimeout(r, 300));
    const before = document.querySelector('#japanMap').getAttribute('viewBox');
    document.querySelector('.map-actions .chip[data-bbox="tokyo"]').click();
    await new Promise(r => setTimeout(r, 1100));
    const after = document.querySelector('#japanMap').getAttribute('viewBox');
    return {before, after, changed: before !== after};
  })()`);

  // 横向溢出检测
  out.overflow = await evaluate(`(() => {
    const w = document.documentElement.clientWidth;
    const bad = [...document.querySelectorAll('body *')].filter(el => el.getBoundingClientRect().right > w + 2)
      .slice(0, 8).map(el => el.className && typeof el.className === 'string' ? el.className : el.tagName);
    return {clientWidth: w, scrollWidth: document.documentElement.scrollWidth, offenders: bad};
  })()`);

  console.log(JSON.stringify(out, null, 2));
  ws.close();
  chrome.kill();
  process.exit(0);
}

main().catch((e) => { console.error('SMOKE FAIL', e.message); chrome.kill(); process.exit(1); });
