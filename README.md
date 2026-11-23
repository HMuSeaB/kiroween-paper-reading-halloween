# 论文阅读 · 万圣节换装版 — Paper Reading, Halloween Costume

Kiroween 2026 · Costume Contest submission scaffold.
给双栏批注论文阅读空间做万圣节换装：功能不变，一键换上万圣节夜晚主题。

## 一句话

保留双栏批注、双语对照、五色高亮、逐段评注和全文逻辑骨架，
加一个一键万圣节换装开关（南瓜橙 + 黑夜底 + 蝙蝠/南瓜动画），
所有阅读功能在两种主题下都能用。

## 怎么打开（不用装任何东西）

```bash
cd kiroween-paper-reading-halloween
python3 -m http.server 8000
# 浏览器打开 http://localhost:8000/
```

也可以直接双击 `index.html` 打开。没有构建步骤，没有后端，
没有网络依赖（除了用户自己添加的 YouTube 嵌入）。

## 功能

- **双栏批注**：左栏双语原文 + 翻译，右栏逐段评注；底部全文逻辑骨架
- **五色高亮**：论点 / 概念 / 证据 / 让步 / 方法；按颜色筛选，点一下变暗，再点恢复
- **原文模式**：只显示原文，隐藏翻译和评注栏
- **收藏 + 个人笔记**：每段可收藏、写笔记，存在浏览器 localStorage 里
- **导入论文**：贴文本，按空行分段导入
- **轻量导入推文 / 短帖**：只取主帖全文，不追评论区，生成短帖卡 + 一句话摘要
- **媒体支持**：YouTube 链接用官方嵌入；图片/视频直链直接显示；
  取不到的媒体只做链接卡，绝不用占位图
- **万圣节换装**：一键切换夜晚主题，南瓜橙配色、月亮、飞舞的蝙蝠、
  漂浮的南瓜；主题选择会记住

## 示例内容

首页预载了一篇 5 段的演示论文（母体肥胖—褪黑素—卵母细胞甲基化主题的
改写摘要段落），打开就能演示，不用先贴文本。

## 怎么用 Kiro 做的

这个项目按 Kiro 的 spec-driven 流程组织，仓库根目录的 `.kiro/` 就是证明：

- **Spec**：`.kiro/specs/paper-reading-halloween/` 里有 `requirements.md`（19 条需求）、`design.md`（架构与主题切换设计）和 `tasks.md`（分阶段任务清单），先定需求和设计再动手，换装只改表现层，不动阅读逻辑。
- **Steering**：`.kiro/steering/product.md` 定了产品原则：原文优先、评注不等于作者原话、五色高亮固定、绝不用占位图、换装只是表现层。
- **Hooks**：`.kiro/hooks/format-on-save.json` 配了保存时自动检查，跑 `scripts/check.sh` 验 JS 语法、五色高亮类名、`.kiro/` 是否在位和交付物是否齐全。

Kiro IDE 是主力工具，用它按上面这套 spec、steering、hooks 来做这个万圣节换装版。

## 项目结构

```
index.html          入口
styles.css          日常主题 + 万圣节夜晚主题
app.js              渲染、筛选、收藏、笔记、导入、媒体、换装
.kiro/
  specs/paper-reading-halloween/
    requirements.md 设计需求（spec-driven 的起点）
    design.md       技术设计
    tasks.md        任务清单（已完成 / 待办）
  steering/product.md   产品原则（给 Kiro 的长期指令）
  hooks/            保存时自动检查（格式 + 链接检查）
LICENSE             MIT
```

## 部署

纯静态文件，可直接部署到 Cloudflare Pages / GitHub Pages / Vercel，
或任何静态托管。提交到 Devpost 时需要公开 GitHub 仓库 + 在线地址。

## 许可

MIT — 见 `LICENSE`。
