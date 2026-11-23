/* Paper Reading — Halloween Costume Edition
 * Standalone static app, no build step, no network dependency except
 * YouTube embeds the user explicitly adds. State that must survive a
 * reload (theme, favourites, personal notes) lives in localStorage.
 * Highlights mark the AUTHOR's words; notes are the reader's/AI's
 * inference and are always shown separately. */

'use strict';

/* ---- Sample paper (demo excerpt, rewritten summary paragraphs) ---- */
const SAMPLE = [
  {
    id: 1,
    en: [
      { t: 'argument', text: 'Maternal obesity impairs oocyte quality across generations.' },
      { t: null, text: ' Previous work showed that the daughters of obese mothers carry epigenetic changes in their eggs, but the mechanism linking a mother\u2019s metabolism to her granddaughters\u2019 fertility was unclear.' },
    ],
    zh: '母体肥胖会跨代损害卵母细胞质量。此前研究发现，肥胖母亲的女儿其卵子带有表观遗传改变，但母亲代谢与孙女辈生育力之间的机制并不清楚。',
    note: '论点：全文的中心主张。先讲“跨代”这个结论，再引出机制未知——这是引言的标准开场。',
  },
  {
    id: 2,
    en: [
      { t: 'concept', text: 'Melatonin is a circadian hormone with antioxidant activity' },
      { t: null, text: ' that can cross the blood\u2013follicle barrier and act directly on the oocyte.' },
    ],
    zh: '褪黑素是一种具有抗氧化活性的昼夜节律激素，可以穿过血—卵泡屏障直接作用于卵母细胞。',
    note: '概念：先定义褪黑素是什么、凭什么能起作用，为后面的干预实验铺路。',
  },
  {
    id: 3,
    en: [
      { t: 'method', text: 'Obese female mice were given melatonin in drinking water for four weeks before mating.' },
      { t: null, text: ' Oocytes were collected and profiled by whole-genome bisulfite sequencing, and the F2 generation was followed for fertility.' },
    ],
    zh: '肥胖雌鼠在交配前四周饮用水中添加褪黑素。收集卵母细胞做全基因组亚硫酸氢盐测序，并追踪 F2 代的生育力。',
    note: '方法：干预（褪黑素）+ 读出（甲基化测序）+ 跨代追踪，三件套缺一不可。',
  },
  {
    id: 4,
    en: [
      { t: 'evidence', text: 'Melatonin restored DNMT expression and reduced abnormal methylation in oocytes by roughly half.' },
      { t: null, text: ' F2 females from treated mothers showed fertility close to controls.' },
    ],
    zh: '褪黑素恢复了 DNMT 的表达，使卵母细胞的异常甲基化减少了约一半。经处理的母亲所生的 F2 代雌鼠生育力接近对照组。',
    note: '证据：两个数字/结果互相印证——分子层面（甲基化）+ 表型层面（生育力）。',
    media: { kind: 'link', url: 'https://example.org/melatonin-oocyte-figure', label: '图 3 原始数据页（示例链接卡：站外资源未直接拉取，只做链接）' },
  },
  {
    id: 5,
    en: [
      { t: 'concession', text: 'The mouse model does not capture the full complexity of human obesity,' },
      { t: null, text: ' and the optimal melatonin dose for humans remains unknown. Even so, the study identifies a modifiable, transgenerational pathway worth testing in the clinic.' },
    ],
    zh: '小鼠模型无法完全反映人类肥胖的复杂性，人类褪黑素的最佳剂量也仍未知。即便如此，本研究找到了一条可干预的跨代表观遗传通路，值得在临床上进一步验证。',
    note: '让步：先承认局限（动物模型、剂量未知），再收回结论——让步不是认输，是让结论更可信。',
  },
];

const SKELETON = [
  '问题：母体肥胖为什么会跨代损害卵母细胞质量？',
  '背景：褪黑素能穿过血—卵泡屏障，直接作用于卵母细胞。',
  '方法：肥胖雌鼠饮水加褪黑素 4 周 → 甲基化测序 → 追踪 F2 代。',
  '结果：DNMT 表达恢复，异常甲基化减半，F2 生育力接近对照。',
  '让步：小鼠模型 ≠ 人类，剂量未知。',
  '结论：一条可干预的跨代表观遗传通路，值得临床验证。',
];

const HIGHLIGHT_TYPES = ['argument', 'concept', 'evidence', 'concession', 'method'];
const TYPE_LABEL = { argument: '论点', concept: '概念', evidence: '证据', concession: '让步', method: '方法' };

/* ---- State (localStorage) ---- */
const store = {
  get(key, fallback) {
    try { const v = JSON.parse(localStorage.getItem(key)); return v === null ? fallback : v; } catch (e) { return fallback; }
  },
  set(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* private mode: ignore */ } },
};

let paragraphs = SAMPLE.map((p) => ({ ...p, media: p.media ? { ...p.media } : null }));
let activeFilters = new Set(HIGHLIGHT_TYPES);
let favOnly = false;
let favourites = new Set(store.get('prh-favourites', []));
let personalNotes = store.get('prh-notes', {});
let shortPosts = store.get('prh-shortposts', []);

/* ---- Helpers ---- */
const $ = (sel) => document.querySelector(sel);
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function youtubeId(url) {
  const m = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{6,})/);
  return m ? m[1] : null;
}

function mediaHtml(media) {
  if (!media) return '';
  if (media.kind === 'youtube') {
    const id = youtubeId(media.url);
    if (!id) return '<a class="link-card" href="' + esc(media.url) + '" target="_blank" rel="noopener">🔗 ' + esc(media.label || media.url) + '</a>';
    return '<div class="media"><p class="media-label">' + esc(media.label || 'YouTube') + '</p>' +
      '<iframe src="https://www.youtube-nocookie.com/embed/' + id + '" title="YouTube video" allowfullscreen loading="lazy"></iframe></div>';
  }
  if (media.kind === 'image') {
    return '<div class="media"><p class="media-label">' + esc(media.label || '图片') + '</p><img src="' + esc(media.url) + '" alt=""></div>';
  }
  if (media.kind === 'video') {
    return '<div class="media"><p class="media-label">' + esc(media.label || '视频') + '</p><video src="' + esc(media.url) + '" controls preload="metadata"></video></div>';
  }
  return '<div class="media"><a class="link-card" href="' + esc(media.url) + '" target="_blank" rel="noopener">🔗 ' + esc(media.label || media.url) + '</a></div>';
}

function detectMedia(url) {
  if (youtubeId(url)) return { kind: 'youtube', url, label: 'YouTube 视频（官方嵌入）' };
  if (/\.(png|jpe?g|gif|webp|svg)(\?|#|$)/i.test(url)) return { kind: 'image', url, label: '图片' };
  if (/\.(mp4|webm|mov)(\?|#|$)/i.test(url)) return { kind: 'video', url, label: '视频' };
  return { kind: 'link', url, label: '站外链接（未直接拉取，只做链接卡）' };
}

/* ---- Rendering ---- */
function renderReader() {
  const reader = $('#reader');
  reader.innerHTML = '';
  let shown = 0;
  paragraphs.forEach((p) => {
    if (favOnly && !favourites.has(p.id)) return;
    shown += 1;
    const article = document.createElement('article');
    article.className = 'para' + (favourites.has(p.id) ? ' fav' : '');
    article.id = 'para-' + p.id;

    const enHtml = p.en.map((seg) => {
      if (!seg.t) return esc(seg.text);
      const dim = activeFilters.has(seg.t) ? '' : ' hl-dim';
      return '<mark class="hl-' + seg.t + dim + '" title="' + TYPE_LABEL[seg.t] + '">' + esc(seg.text) + '</mark>';
    }).join('');

    article.innerHTML =
      '<div class="para-left">' +
        '<p class="para-no">§' + p.id + '</p>' +
        '<p class="para-en">' + enHtml + '</p>' +
        '<p class="para-zh">' + esc(p.zh) + '</p>' +
        mediaHtml(p.media) +
      '</div>' +
      '<div class="para-right">' +
        '<h3>逐段评注</h3>' +
        '<p class="note-text">' + esc(p.note) + '<span class="tag">评注 = AI 推断，与作者原话分开</span></p>' +
        '<div class="para-actions">' +
          '<button class="mini-btn fav-btn" type="button" aria-pressed="' + favourites.has(p.id) + '">' + (favourites.has(p.id) ? '★ 已收藏' : '☆ 收藏') + '</button>' +
        '</div>' +
        '<textarea class="personal-note" rows="2" placeholder="我的笔记……" data-para="' + p.id + '">' + esc(personalNotes[p.id] || '') + '</textarea>' +
      '</div>';

    article.querySelector('.fav-btn').addEventListener('click', () => {
      if (favourites.has(p.id)) favourites.delete(p.id); else favourites.add(p.id);
      store.set('prh-favourites', Array.from(favourites));
      renderReader();
    });
    article.querySelector('.personal-note').addEventListener('input', (e) => {
      personalNotes[p.id] = e.target.value;
      store.set('prh-notes', personalNotes);
    });
    reader.appendChild(article);
  });
  $('#paraCount').textContent = '共 ' + paragraphs.length + ' 段 · 显示 ' + shown + ' 段';
  renderSkeleton();
  renderShortPosts();
}

function renderSkeleton() {
  $('#skeletonList').innerHTML = SKELETON.map((s) => '<li>' + esc(s) + '</li>').join('');
}

function renderShortPosts() {
  const box = $('#shortPosts');
  box.innerHTML = shortPosts.map((sp, i) =>
    '<article class="short-post"><p class="summary">一句话摘要：' + esc(sp.summary) + '</p>' +
    '<p>' + esc(sp.text) + '</p>' +
    '<p class="source">来源：' + esc(sp.source) + '</p>' +
    '<button class="mini-btn" type="button" data-remove="' + i + '">删除</button></article>'
  ).join('');
  box.querySelectorAll('[data-remove]').forEach((btn) => {
    btn.addEventListener('click', () => {
      shortPosts.splice(Number(btn.dataset.remove), 1);
      store.set('prh-shortposts', shortPosts);
      renderShortPosts();
    });
  });
}

/* ---- Theme / mode switches ---- */
function applyTheme() {
  const on = store.get('prh-halloween', false);
  document.body.classList.toggle('halloween', on);
  const btn = $('#costumeBtn');
  btn.setAttribute('aria-pressed', String(on));
  btn.textContent = on ? '🎃 已换装 · 点我换回' : '🎃 万圣节换装';
}
function applyOriginalMode() {
  const on = store.get('prh-original', false);
  document.body.classList.toggle('original-only', on);
  $('#originalBtn').setAttribute('aria-pressed', String(on));
}

/* ---- Events ---- */
document.addEventListener('DOMContentLoaded', () => {
  applyTheme();
  applyOriginalMode();
  renderReader();

  $('#costumeBtn').addEventListener('click', () => {
    store.set('prh-halloween', !document.body.classList.contains('halloween'));
    applyTheme();
  });
  $('#originalBtn').addEventListener('click', () => {
    store.set('prh-original', !document.body.classList.contains('original-only'));
    applyOriginalMode();
  });

  document.querySelectorAll('#colorFilters .chip[data-filter]').forEach((chip) => {
    chip.addEventListener('click', () => {
      const f = chip.dataset.filter;
      if (activeFilters.has(f)) activeFilters.delete(f); else activeFilters.add(f);
      chip.setAttribute('aria-pressed', String(activeFilters.has(f)));
      renderReader();
    });
  });
  $('#showAllBtn').addEventListener('click', () => {
    activeFilters = new Set(HIGHLIGHT_TYPES);
    document.querySelectorAll('#colorFilters .chip[data-filter]').forEach((c) => c.setAttribute('aria-pressed', 'true'));
    renderReader();
  });
  $('#favOnly').addEventListener('change', (e) => { favOnly = e.target.checked; renderReader(); });

  $('#pasteBtn').addEventListener('click', () => {
    const text = $('#pasteText').value.trim();
    if (!text) return;
    const chunks = text.split(/\n\s*\n/).filter(Boolean);
    chunks.forEach((chunk) => {
      const id = paragraphs.length ? Math.max.apply(null, paragraphs.map((p) => p.id)) + 1 : 1;
      paragraphs.push({ id, en: [{ t: null, text: chunk }], zh: '（待翻译：粘贴的原文，翻译请自行补充或用 Kiro 生成）', note: '新导入的段落：尚未批注。', media: null });
    });
    $('#pasteText').value = '';
    renderReader();
    document.getElementById('para-' + paragraphs[paragraphs.length - 1].id).scrollIntoView({ behavior: 'smooth' });
  });

  $('#tweetBtn').addEventListener('click', () => {
    const text = $('#tweetText').value.trim();
    if (!text) return;
    const first = text.replace(/^https?:\/\/\S+\s*/, '').split(/[。！？.!?]/)[0].trim() || text.slice(0, 60);
    shortPosts.unshift({ text, summary: first, source: text.match(/^https?:\/\/\S+/) ? text.match(/^https?:\/\/\S+/)[0] : '粘贴的短帖正文' });
    store.set('prh-shortposts', shortPosts);
    $('#tweetText').value = '';
    renderShortPosts();
  });

  $('#mediaBtn').addEventListener('click', () => {
    const url = $('#mediaUrl').value.trim();
    const n = Number($('#mediaPara').value);
    const target = paragraphs.find((p) => p.id === n);
    if (!url || !target) return;
    target.media = detectMedia(url);
    $('#mediaUrl').value = '';
    renderReader();
    document.getElementById('para-' + n).scrollIntoView({ behavior: 'smooth' });
  });
});
