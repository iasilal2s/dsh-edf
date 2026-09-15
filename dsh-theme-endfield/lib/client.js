window.__ModuleLoader__.load({
	id: "dsh-theme-endfield",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		/** Inlined from src/endfield.css. */
		const ENDFIELD_CSS = "/* ==========================================================================\n   dsh-theme-endfield — “明日方舟：终末地”风格深色皮肤\n   --------------------------------------------------------------------------\n   设计语言（Endfield field-engineering system）：\n     · 灰黑 #1a1a1a 平涂底 / 纸白 #f0f0f0 / 信号黄 #fffa00 / 校验绿 #00ffa2\n     · 地形等高线是唯一的背景纹理，底面上不铺任何条纹或网格\n     · 直角与小圆角几何、1px 结构线、切角面板、边角括号\n     · 等宽数据、大写微小标签、层次扁平（无玻璃感、无重阴影）\n     · 单一强调色：信号黄只用于选中 / 进度 / 主操作 / 计曲线\n   本文件由 scripts/build.mjs 内联进 lib/client.js，不单独发布。\n   ========================================================================== */\n\n/* ── 1. 基础量：字体、几何、信号色 ─────────────────────────────────────── */\nhtml:root {\n  /* 全站圆弧：圆角形状用真正的圆弧（round），控件与面板都用大圆角。 */\n  --dsw-corner-shape: round;\n\n  /* 技术感字体栈：界面用系统无衬线，数据用等宽。 */\n  --dsw-font-family: \"Segoe UI Variable Text\", \"Segoe UI\", \"Microsoft YaHei UI\",\n    \"PingFang SC\", \"Hiragino Sans GB\", system-ui, sans-serif;\n  --ds-font-family-code: \"Cascadia Mono\", \"JetBrains Mono\", \"SFMono-Regular\",\n    Consolas, \"Microsoft YaHei UI\", monospace;\n\n  --ef-signal: #fffa00;\n  --ef-signal-soft: rgb(255 250 0 / 42%);\n  --ef-ink: #0c0c0c;\n  --ef-line: rgb(240 240 240 / 15%);\n  --ef-line-strong: rgb(240 240 240 / 28%);\n  --ef-radius: 10px;\n  --ef-radius-panel: 16px;\n  --ef-fillet: 34px;\n  --ef-fillet-overlap: 16px;\n  /* 主背景色（侧栏左上角切块露出的就是它）；浅色变体里会被覆盖。 */\n  --ef-page: #1a1a1a;\n\n  accent-color: var(--ef-signal);\n  caret-color: var(--ef-signal);\n  /* 深色专用：原生控件与滚动条不跟随偏好设置回到浅色。 */\n  color-scheme: dark !important;\n}\n\n/* 读数字段等宽对齐：索引、耗时、token 计数。 */\nbody {\n  font-variant-numeric: tabular-nums;\n}\n\n/* 阴影层级整体压平，改为“描边 + 极浅投影”的工程图纸感。 */\nbody,\nbody * {\n  --dsw-shadow-lv1: 0 1px 3px rgb(0 0 0 / 45%);\n  --dsw-shadow-lv2: 0 4px 12px rgb(0 0 0 / 45%);\n  --dsw-shadow-lv3: 0 0 0 0.5px rgb(240 240 240 / 10%), 0 16px 40px rgb(0 0 0 / 55%);\n  --dsw-elevation-stroke-color: rgb(240 240 240 / 20%);\n  --dsw-linear-gradient-think: linear-gradient(180deg, #fffa00 20%, transparent 100%);\n  --dsw-linear-think-select: linear-gradient(180deg, #fff9c9 20%, transparent 100%);\n}\n\n/* ── 2. 焦点、选区、滚动条 ─────────────────────────────────────────────── */\n:focus-visible {\n  outline: 2px solid var(--ef-signal) !important;\n  outline-offset: 2px !important;\n}\n\n::selection {\n  background: rgb(255 250 0 / 88%);\n  color: var(--ef-ink);\n}\n\n/* 方形滚动条滑块（去圆角），宽度沿用主题令牌。 */\n::-webkit-scrollbar-thumb {\n  border-radius: 0 !important;\n}\n\n/* ── 3. 圆弧几何：控件、代码、行 ───────────────────────────────────────── */\n:where(\n  button,\n  input,\n  textarea,\n  select,\n  summary,\n  pre,\n  code,\n  kbd,\n  samp,\n  [role=\"tab\"],\n  [role=\"tablist\"],\n  [role=\"textbox\"],\n  [class*=\"_sessionRow\"],\n  [class*=\"_projectRow\"],\n  [class*=\"_panelRow\"],\n  [class*=\"_modelRow\"],\n  [class*=\"_newSession\"]\n) {\n  border-radius: var(--ef-radius) !important;\n}\n\n/* 代码块：右侧圆弧，左侧留一条信号黄书脊。 */\n:where(pre) {\n  border-radius: 0 var(--ef-radius) var(--ef-radius) 0 !important;\n}\n\n/* ── 4. 面板：一层描边 + 切角，取消玻璃模糊 ───────────────────────────── */\n:where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], [role=\"listbox\"], [role=\"tooltip\"]) {\n  border: 1px solid var(--ef-line-strong) !important;\n  border-radius: var(--ef-radius-panel) !important;\n  background-image: linear-gradient(180deg, rgb(255 255 255 / 3%), rgb(0 0 0 / 16%)) !important;\n  box-shadow:\n    0 0 0 0.5px rgb(0 0 0 / 55%),\n    0 20px 46px rgb(0 0 0 / 55%) !important;\n  backdrop-filter: none !important;\n}\n\n/* 弹窗（设置等）的 DOM 落在**侧栏子树**里——所以它继承了黄栏那套\n   「标签令牌 = 墨色」的反相。浅色变体下正好是对的（墨字白面），\n   深色变体下就成了墨字压在暗面板上，看着\"很黑、什么都看不见\"。\n   这里把页面级的文字/边框/交互令牌恢复回来（深色取值；浅色在第 10 节覆盖）。 */\n:where([role=\"dialog\"], [role=\"alertdialog\"]) {\n  color: #f2f2f0;\n\n  --dsw-alias-label-primary: #f2f2f0;\n  --dsw-alias-label-secondary: #bcbcb6;\n  --dsw-alias-label-tertiary: #94948e;\n  --dsw-alias-label-caption: #63635e;\n  --dsw-alias-label-primary-inverted: #0c0c0b;\n  --dsw-alias-label-primary-foreground: #0c0c0b;\n  --dsw-alias-brand-primary: #fffa00;\n  --dsw-alias-brand-text: #fffa00;\n  --dsw-alias-interactive-bg-hover: rgb(240 240 240 / 7%);\n  --dsw-alias-interactive-bg-active: rgb(240 240 240 / 13%);\n  --dsw-alias-border-l1: rgb(240 240 240 / 9%);\n  --dsw-alias-border-l2: rgb(240 240 240 / 15%);\n  --dsw-alias-border-l3: rgb(240 240 240 / 24%);\n  --dsw-alias-border-l4: rgb(240 240 240 / 36%);\n  --dsw-alias-bg-module-platform: rgb(240 240 240 / 8%);\n}\n\n/* 输入区：整块弧形浅灰面（比底面亮一档的灰，不与背景抢对比），\n   左侧一道信号黄短条作为唯一的强调。 */\n[data-composer-card] {\n  position: relative;\n  corner-shape: round !important;\n  border: 1px solid rgb(255 255 255 / 8%) !important;\n  border-radius: 20px !important;\n  background: linear-gradient(180deg, #3a3a3a 0%, #313131 100%) !important;\n  box-shadow: 0 12px 32px rgb(0 0 0 / 38%) !important;\n\n  /* 浅灰面上的文字层级整体提亮，保证占位符与标签仍然清楚。 */\n  --dsw-alias-label-primary: #f5f5f5;\n  --dsw-alias-label-secondary: #d4d4d4;\n  --dsw-alias-label-tertiary: #adadad;\n  --dsw-alias-label-caption: #949494;\n  --dsw-alias-label-primary-foreground: #141414;\n  --dsw-alias-interactive-bg-hover: rgb(255 255 255 / 10%);\n  --dsw-alias-interactive-bg-active: rgb(255 255 255 / 16%);\n  --dsw-alias-border-l1: rgb(255 255 255 / 10%);\n  --dsw-alias-border-l2: rgb(255 255 255 / 16%);\n  --dsw-alias-border-l3: rgb(255 255 255 / 22%);\n  --dsw-alias-border-l4: rgb(255 255 255 / 30%);\n}\n\n/* 输入区不再有黄色线条：整块就是一块弧形浅灰面。 */\n[data-composer-card]::after {\n  content: none;\n}\n\n/* 输入区内的按钮（+、模型、发送）改成圆形，与弧形面板同一语言。 */\n[data-composer-card] :where(button) {\n  corner-shape: round !important;\n  border-radius: 999px !important;\n}\n\n/* 发送键：浅灰面上的纸白圆钮 + 墨色图标（主操作不靠黄色也认得出）。 */\n[data-composer-card] :where(button[class*=\"_primary\"]) {\n  background: #f0f0f0 !important;\n  color: #141414 !important;\n}\n\n/* 输入区内的焦点环用纸白，避免焦点时在聊天框周围出现一圈黄色。 */\n[data-composer-card] :focus-visible {\n  outline-color: rgb(255 255 255 / 60%) !important;\n}\n\n/* 输入区内的芯片（工作区、模型、权限）：小胶囊，悬停也只是提亮描边。 */\n[data-composer-chip] {\n  corner-shape: round !important;\n  border: 1px solid rgb(255 255 255 / 14%) !important;\n  border-radius: 999px !important;\n  background: rgb(255 255 255 / 4%) !important;\n}\n\n[data-composer-chip]:hover {\n  border-color: rgb(255 255 255 / 34%) !important;\n}\n\n/* 用户气泡：同样是弧形浅灰面。 */\n:where([class*=\"_bubble\"]) {\n  corner-shape: round !important;\n}\n\n/* 输入区下方的状态条（tokens / 模型 / 权限）做成仪表带。 */\n[data-composer-stats] {\n  font-family: var(--ds-font-family-code) !important;\n  letter-spacing: 0.04em;\n}\n\n/* ── 5. 导航与列表：选中即信号条 ───────────────────────────────────────── */\n:where(\n  [class*=\"_sessionRow\"][class*=\"_selected\"],\n  [class*=\"_panelActive\"],\n  [class*=\"_rowActive\"],\n  [class*=\"_optionSelected\"]\n) {\n  background: linear-gradient(90deg, rgb(255 250 0 / 9%), transparent 72%) !important;\n  box-shadow: inset 2px 0 0 var(--ef-signal) !important;\n}\n\n/* 侧栏“新会话”：主操作用信号黄描边，悬停反相。 */\n[class*=\"_newSession\"] {\n  border: 1px solid rgb(13 13 12 / 45%) !important;\n  background: transparent !important;\n  color: #0d0d0c !important;\n}\n\n[class*=\"_newSession\"]:hover {\n  background: #0d0d0c !important;\n  color: var(--ef-signal) !important;\n}\n\n/* 品牌字标：大写 + 字距，像设备铭牌。 */\n[class*=\"_brandName\"] {\n  text-transform: uppercase;\n  letter-spacing: 0.12em !important;\n}\n\n/* 微小标签统一加字距（中文标签表现为字间透气，拉丁文字为大写微标签）。 */\n:where([class*=\"_eyebrow\"], [class*=\"_groupTitle\"], [class*=\"_panelTitle\"], [class*=\"_sectionTitle\"]) {\n  text-transform: uppercase;\n  letter-spacing: 0.1em !important;\n}\n\n/* ── 6. 内容区：表格与代码的工程制图感 ─────────────────────────────────── */\n:where(table) {\n  border-collapse: collapse;\n}\n\n:where(th) {\n  text-transform: uppercase;\n  letter-spacing: 0.08em;\n  border-bottom: 1px solid var(--ef-line-strong) !important;\n}\n\n:where(pre) {\n  border: 1px solid var(--ef-line) !important;\n  border-left: 2px solid var(--ef-signal-soft) !important;\n  border-radius: 0 var(--ef-radius) var(--ef-radius) 0 !important;\n}\n\n/* 外观偏好方块（浅色 / 深色 / 跟随系统）：选中态用信号黄描边。 */\n[class*=\"_themeCube\"][class*=\"_selected\"] {\n  border-color: var(--ef-signal) !important;\n  background: rgb(255 250 0 / 8%) !important;\n  box-shadow: inset 0 0 0 1px rgb(255 250 0 / 35%) !important;\n}\n\n:where(h1, h2, h3) {\n  letter-spacing: 0.01em;\n}\n\n/* ── 7. 界面外框：等高线场、扫描线、四角括号 ────────────────────────────── */\n[data-endfield-chrome] {\n  position: fixed;\n  inset: 0;\n  z-index: 2147483000;\n  pointer-events: none;\n  contain: strict;\n}\n\n/* 等高线场（主界面）：贴着视口四周的地形线 + 两处落在画面内的山头；\n   径向遮罩只把中间压淡（不是抹掉），每 5 条一条信号黄「计曲线」，\n   整体 120s 极慢漂移。 */\n[data-ef=\"contour\"] {\n  position: absolute;\n  inset: -3%;\n  -webkit-mask-image: radial-gradient(124% 106% at 50% 46%, rgb(0 0 0 / 20%) 26%, #000 88%);\n  mask-image: radial-gradient(124% 106% at 50% 46%, rgb(0 0 0 / 20%) 26%, #000 88%);\n  animation: ef-drift 120s ease-in-out infinite alternate;\n}\n\n[data-ef=\"contour\"] svg {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n\n[data-ef=\"contour\"] path {\n  fill: none;\n  stroke: rgb(240 240 240 / 11%);\n  /* 等高线加粗：1px 在深底/纸白底上都偏细，读不出“地形”的感觉。\n     计曲线再粗一档——真实地形图里索引等高线本来就画得更重。 */\n  stroke-width: 1.7;\n  vector-effect: non-scaling-stroke;\n}\n\n[data-ef=\"contour\"] path[data-ef-index] {\n  stroke: rgb(255 250 0 / 20%);\n  stroke-width: 2.4;\n}\n\n@keyframes ef-drift {\n  from {\n    transform: translate3d(0, 0, 0) scale(1);\n  }\n  to {\n    transform: translate3d(-16px, -11px, 0) scale(1.015);\n  }\n}\n\n/* 底面上只有一片极浅的四周压暗，没有条纹、网格或辉光：\n   等高线是画面里唯一的纹理。 */\n[data-ef=\"wash\"] {\n  position: absolute;\n  inset: 0;\n  background-image: radial-gradient(132% 124% at 50% 46%, transparent 58%, rgb(0 0 0 / 24%) 100%);\n}\n\n[data-ef=\"frame\"] {\n  position: absolute;\n  inset: 6px;\n  border: 1px solid rgb(240 240 240 / 8%);\n  border-radius: 14px;\n}\n\n/* 侧栏与顶部黄带的连接处：内凹圆弧（concave fillet）。\n   黄栏在左、黄带在上，二者在内容区左上角形成一个 90° 内角；\n   这里补一块四分之一圆把它抹成圆弧，黄色因此是「流」过去的。\n   元素向上多留一段实色黄，盖住黄带尾部的渐隐区——否则圆弧与黄带之间\n   会露出一道底色空隙。 */\n[data-endfield-chrome] [data-ef=\"fillet\"] {\n  display: none;\n  position: absolute;\n  left: var(--ef-rail-w, 0px);\n  top: calc(var(--ef-band-h, 0px) - var(--ef-fillet-overlap, 16px));\n  width: var(--ef-fillet);\n  height: calc(var(--ef-fillet) + var(--ef-fillet-overlap, 16px));\n  background-image: radial-gradient(\n    circle var(--ef-fillet) at 100% 100%,\n    rgb(255 250 0 / 0%) calc(100% - 1px),\n    var(--ef-signal) 100%\n  );\n}\n\n[data-endfield-chrome][data-shell-yellow] [data-ef=\"fillet\"] {\n  display: block;\n}\n\n[data-ef=\"corner\"] {\n  position: absolute;\n  width: 15px;\n  height: 15px;\n  border: 0 solid var(--ef-signal);\n  animation: ef-breathe 2.4s var(--ds-ease-in-out, ease-in-out) infinite;\n}\n\n[data-ef=\"corner\"][data-side=\"tl\"] {\n  top: 5px;\n  left: 5px;\n  border-top-width: 1px;\n  border-left-width: 1px;\n}\n\n[data-ef=\"corner\"][data-side=\"tr\"] {\n  top: 5px;\n  right: 5px;\n  border-top-width: 1px;\n  border-right-width: 1px;\n}\n\n[data-ef=\"corner\"][data-side=\"bl\"] {\n  bottom: 5px;\n  left: 5px;\n  border-bottom-width: 1px;\n  border-left-width: 1px;\n}\n\n[data-ef=\"corner\"][data-side=\"br\"] {\n  right: 5px;\n  bottom: 5px;\n  border-right-width: 1px;\n  border-bottom-width: 1px;\n}\n\n@keyframes ef-breathe {\n  0%,\n  100% {\n    opacity: 0.5;\n  }\n  50% {\n    opacity: 1;\n  }\n}\n\n/* ── 8. 开屏动画（官方站点式：深色装载屏 → 满屏信号黄擦除 → 界面） ──────── */\n[data-endfield-splash] {\n  position: fixed;\n  inset: 0;\n  z-index: 2147483100;\n  overflow: hidden;\n  cursor: default;\n  user-select: none;\n  background: #1a1a1a;\n  color-scheme: dark;\n  font-family: var(--dsw-font-family);\n  /* 溶解用的遮罩常驻在整层上（默认左对齐 = 完全不透明），\n     最后一段把它整体向右推：遮罩右端的透明区从**右侧**进入，\n     于是黄色连同装载屏从右往左化掉，露出下面的界面。 */\n  -webkit-mask-image: linear-gradient(90deg, #000 0%, #000 50%, rgb(0 0 0 / 0%) 100%);\n  mask-image: linear-gradient(90deg, #000 0%, #000 50%, rgb(0 0 0 / 0%) 100%);\n  -webkit-mask-size: 200% 100%;\n  mask-size: 200% 100%;\n  -webkit-mask-repeat: no-repeat;\n  mask-repeat: no-repeat;\n  -webkit-mask-position: 0% 0;\n  mask-position: 0% 0;\n}\n\n[data-endfield-splash][data-phase=\"done\"] {\n  display: none;\n}\n\n/* 底部读表：等宽 + 大字距，只在装载屏出现。 */\n[data-endfield-splash] [data-ef=\"s-readout\"] {\n  position: absolute;\n  left: 26px;\n  bottom: 22px;\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  font-family: var(--ds-font-family-code);\n  font-size: 10px;\n  font-weight: 500;\n  letter-spacing: 0.16em;\n  color: rgb(240 240 240 / 52%);\n  text-transform: uppercase;\n}\n\n[data-ef=\"s-dots\"] {\n  display: inline-flex;\n  gap: 4px;\n}\n\n[data-ef=\"s-dots\"] i {\n  width: 11px;\n  height: 4px;\n  background: rgb(240 240 240 / 20%);\n  transition: background-color 140ms linear;\n  transition-delay: calc(var(--i) * 45ms);\n}\n\n/* 装载中：五格跑动指示（steps 让它是“仪表”而不是缓动）。 */\n[data-endfield-splash]:not([data-phase]) [data-ef=\"s-dots\"] i {\n  animation: ef-s-chase 1s steps(1, end) infinite;\n  animation-delay: calc(var(--i) * 110ms);\n}\n\n/* 就绪：五格依次点亮为信号黄。 */\n[data-endfield-splash][data-phase] [data-ef=\"s-dots\"] i {\n  background: var(--ef-signal);\n}\n\n@keyframes ef-s-chase {\n  0% {\n    background: var(--ef-signal);\n  }\n  20%,\n  100% {\n    background: rgb(240 240 240 / 20%);\n  }\n}\n\n/* 装载屏的等高线场：以字标所在的山头为中心，逐圈「测绘」绘制出来。 */\n[data-ef=\"s-contour\"] {\n  position: absolute;\n  inset: 0;\n}\n\n[data-ef=\"s-contour\"] svg {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n\n[data-ef=\"s-contour\"] path {\n  fill: none;\n  stroke: rgb(240 240 240 / 11%);\n  /* 与主界面等高线同调加粗，计曲线更重。 */\n  stroke-width: 1.5;\n  vector-effect: non-scaling-stroke;\n}\n\n[data-ef=\"s-contour\"] path[data-ef-index] {\n  stroke: rgb(255 250 0 / 19%);\n  stroke-width: 2.1;\n}\n\n/* pathLength=\"1\" 让每条线共享同一套 dash 动画：一条等高线自绘而出。 */\n[data-ef=\"s-contour\"] svg[data-draw] path {\n  stroke-dasharray: 1;\n  stroke-dashoffset: 1;\n  animation: ef-s-draw 900ms cubic-bezier(0.33, 0, 0.2, 1) both;\n}\n\n@keyframes ef-s-draw {\n  to {\n    stroke-dashoffset: 0;\n  }\n}\n\n/* 装载屏底面同样保持平涂：只有一片极浅的四周压暗，让等高线自己跑出来。 */\n[data-ef=\"s-wash\"] {\n  position: absolute;\n  inset: 0;\n  background-image: radial-gradient(122% 104% at 50% 46%, transparent 52%, rgb(0 0 0 / 30%) 100%);\n}\n\n/* 标定线：一条横贯屏幕的 1px 结构线 + 扫过的信号黄段。 */\n[data-ef=\"s-scan\"] {\n  position: absolute;\n  top: 50%;\n  left: 0;\n  width: 100%;\n  height: 1px;\n  background: rgb(240 240 240 / 10%);\n}\n\n[data-ef=\"s-scan\"]::after {\n  content: \"\";\n  position: absolute;\n  top: -1px;\n  left: 0;\n  width: 180px;\n  height: 3px;\n  background: linear-gradient(90deg, transparent, var(--ef-signal) 62%, #fff8b0);\n  transform: translateX(-180px);\n  animation: ef-s-scan 620ms cubic-bezier(0.22, 0.8, 0.2, 1) 60ms both;\n}\n\n@keyframes ef-s-scan {\n  from {\n    transform: translateX(-180px);\n  }\n  to {\n    transform: translateX(calc(100vw + 180px));\n  }\n}\n\n/* 四角括号：装载屏上更大，逐个“扣上”。 */\n[data-ef=\"s-corner\"] {\n  position: absolute;\n  width: 26px;\n  height: 26px;\n  border: 0 solid var(--ef-signal);\n  opacity: 0;\n  animation: ef-s-snap 220ms cubic-bezier(0.22, 0.8, 0.2, 1) both;\n}\n\n[data-ef=\"s-corner\"][data-side=\"tl\"] {\n  top: 18px;\n  left: 18px;\n  border-top-width: 1px;\n  border-left-width: 1px;\n  animation-delay: 120ms;\n}\n\n[data-ef=\"s-corner\"][data-side=\"tr\"] {\n  top: 18px;\n  right: 18px;\n  border-top-width: 1px;\n  border-right-width: 1px;\n  animation-delay: 190ms;\n}\n\n[data-ef=\"s-corner\"][data-side=\"bl\"] {\n  bottom: 18px;\n  left: 18px;\n  border-bottom-width: 1px;\n  border-left-width: 1px;\n  animation-delay: 260ms;\n}\n\n[data-ef=\"s-corner\"][data-side=\"br\"] {\n  right: 18px;\n  bottom: 18px;\n  border-right-width: 1px;\n  border-bottom-width: 1px;\n  animation-delay: 330ms;\n}\n\n@keyframes ef-s-snap {\n  from {\n    opacity: 0;\n    transform: scale(1.9);\n  }\n  to {\n    opacity: 1;\n    transform: none;\n  }\n}\n\n/* 中央字标：CJK 主标 + 拉丁微标签 + 信号棱形，横向遮罩揭示。\n   整体略高于中线，让 50% 处的标定线成为字标的下基线。 */\n[data-ef=\"s-mark\"] {\n  position: absolute;\n  top: 45%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 14px;\n}\n\n[data-ef=\"s-prism\"] {\n  width: 9px;\n  height: 9px;\n  background: var(--ef-signal);\n  transform: rotate(45deg);\n  animation: ef-s-prism 320ms cubic-bezier(0.22, 0.8, 0.2, 1) 180ms both;\n}\n\n@keyframes ef-s-prism {\n  from {\n    opacity: 0;\n    transform: rotate(45deg) scale(0.2);\n  }\n  to {\n    opacity: 1;\n    transform: rotate(45deg) scale(1);\n  }\n}\n\n[data-ef=\"s-title\"] {\n  font-size: clamp(26px, 3.2vw, 44px);\n  font-weight: 600;\n  line-height: 1.15;\n  letter-spacing: 0.14em;\n  color: #f0f0f0;\n  clip-path: inset(0 100% 0 0);\n  animation: ef-s-reveal 640ms cubic-bezier(0.22, 0.8, 0.2, 1) 240ms both;\n}\n\n[data-ef=\"s-sub\"] {\n  font-family: var(--ds-font-family-code);\n  font-size: 10px;\n  letter-spacing: 0.42em;\n  color: rgb(240 240 240 / 46%);\n  text-transform: uppercase;\n  clip-path: inset(0 100% 0 0);\n  animation: ef-s-reveal 520ms cubic-bezier(0.22, 0.8, 0.2, 1) 420ms both;\n}\n\n@keyframes ef-s-reveal {\n  from {\n    clip-path: inset(0 100% 0 0);\n  }\n  to {\n    clip-path: inset(0 0 0 0);\n  }\n}\n\n/* 满屏信号黄揭示，三段式：\n   ① 从右上角出现、沿右缘竖直延伸到底；② 整体向左滑动铺满全屏；\n   ③ 渐变溶解（遮罩从左往右扫过 + 整体淡出），露出界面。 */\n[data-ef=\"s-wipe\"] {\n  position: absolute;\n  inset: 0;\n  background: var(--ef-signal);\n  /* 起始状态：右缘 10% 宽的窄柱，还未向下延伸。 */\n  clip-path: inset(0 0 100% 90%);\n}\n\n/* ① 竖直延伸：右缘 10% 宽（约十分之一屏）的黄柱自上而下长出来。 */\n[data-endfield-splash][data-phase=\"wipe-rise\"] [data-ef=\"s-wipe\"] {\n  animation: ef-s-rise 240ms cubic-bezier(0.33, 0, 0.2, 1) both;\n}\n\n/* ② 整块向左滑动，直到铺满全屏。 */\n[data-endfield-splash][data-phase=\"wipe-slide\"] [data-ef=\"s-wipe\"] {\n  animation: ef-s-slide 340ms cubic-bezier(0.4, 0, 0.2, 1) both;\n}\n\n/* ③ 渐变溶解：整层（黄幕 + 装载屏）从右往左被遮罩化掉。 */\n[data-endfield-splash][data-phase=\"wipe-dissolve\"] {\n  animation: ef-s-dissolve 380ms cubic-bezier(0.4, 0, 0.2, 1) both;\n}\n\n@keyframes ef-s-rise {\n  from {\n    clip-path: inset(0 0 100% 90%);\n  }\n  to {\n    clip-path: inset(0 0 0 90%);\n  }\n}\n\n@keyframes ef-s-slide {\n  from {\n    clip-path: inset(0 0 0 90%);\n  }\n  to {\n    clip-path: inset(0 0 0 0);\n  }\n}\n\n@keyframes ef-s-dissolve {\n  from {\n    opacity: 1;\n    -webkit-mask-position: 0% 0;\n    mask-position: 0% 0;\n  }\n  to {\n    opacity: 0;\n    -webkit-mask-position: 100% 0;\n    mask-position: 100% 0;\n  }\n}\n\n/* 黄幕上的墨色字标“残影”：窄柱阶段放不下，等黄幕滑开到中间才淡入。 */\n[data-ef=\"s-ghost\"] {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  font-size: clamp(26px, 3.2vw, 44px);\n  font-weight: 600;\n  letter-spacing: 0.14em;\n  white-space: nowrap;\n  opacity: 0;\n  color: rgb(12 12 12 / 22%);\n}\n\n[data-endfield-splash][data-phase=\"wipe-slide\"] [data-ef=\"s-ghost\"],\n[data-endfield-splash][data-phase=\"wipe-dissolve\"] [data-ef=\"s-ghost\"] {\n  animation: ef-s-ghost 300ms ease-out 120ms both;\n}\n\n@keyframes ef-s-ghost {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n\n/* 装载屏出现的整体节奏。 */\n[data-ef=\"s-readout\"] {\n  animation: ef-s-fade 300ms ease-out 520ms both;\n}\n\n@keyframes ef-s-fade {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n\n/* ── 9. 信号黄侧栏 + 顶部黄带（黄色从侧栏平滑漫过页面顶部） ─────────────── */\n\n/* 侧栏整列换成信号黄。该作用域内把文字/交互/边框令牌整体反相成墨色：\n   子元素读 var() 时自然解析成深色，不必逐组件改规则。\n\n   但字标那一行不在黄块里：侧栏根容器的底色改成主背景色，黄色只画在一条\n   大半径圆弧以内（圆心在左上远处，所以弧线右高左低）。于是左上角露出主背景，\n   黄块与暗底之间是一条平滑圆弧，而不是硬切。 */\n[class*=\"sidebarCol\"] {\n  background-image: linear-gradient(180deg, #fffa00 0%, #f6f000 100%) !important;\n  border-right: 1px solid rgb(13 13 12 / 22%) !important;\n\n  --dsw-specific-sidebar-fill: #fffa00;\n  --dsw-alias-label-primary: #0d0d0c;\n  --dsw-alias-label-secondary: rgb(13 13 12 / 78%);\n  --dsw-alias-label-tertiary: rgb(13 13 12 / 60%);\n  --dsw-alias-label-caption: rgb(13 13 12 / 48%);\n  --dsw-alias-label-primary-dimmed: rgb(13 13 12 / 72%);\n  --dsw-alias-label-primary-inverted: #fffa00;\n  --dsw-alias-label-primary-foreground: #0d0d0c;\n  --dsw-alias-brand-primary: #0d0d0c;\n  --dsw-alias-brand-text: #0d0d0c;\n  --dsw-alias-interactive-bg-hover: rgb(13 13 12 / 10%);\n  --dsw-alias-interactive-bg-active: rgb(13 13 12 / 16%);\n  --dsw-alias-interactive-bg-hover-solid: rgb(13 13 12 / 14%);\n  --dsw-alias-border-l1: rgb(13 13 12 / 14%);\n  --dsw-alias-border-l2: rgb(13 13 12 / 20%);\n  --dsw-alias-border-l3: rgb(13 13 12 / 28%);\n  --dsw-alias-border-l4: rgb(13 13 12 / 40%);\n  --dsw-alias-bg-module-platform: rgb(13 13 12 / 12%);\n  --dsw-alias-button-elevated-fill: transparent;\n  --dsw-alias-button-floating-hover: rgb(13 13 12 / 12%);\n  --dsh-scrollbar-thumb: rgb(13 13 12 / 24%);\n  --dsh-scrollbar-thumb-hover: rgb(13 13 12 / 38%);\n  --dsw-alias-scrollbar-bg-l2: rgb(13 13 12 / 24%);\n  --dsw-alias-scrollbar-hover-l2: rgb(13 13 12 / 38%);\n}\n\n/* 侧栏左上角是**圆角**（凸向角、圆心在黄块内侧的 76px 四分之一圆），\n   不是\"从角上挖掉一个圆\"——那种凹口方向是反的。\n   画法：外层 `sidebarCol` 铺主背景色，内层根容器铺黄色并给一个 `border-top-left-radius`，\n   圆角切掉的那块自然露出外层的主背景色。两层都**不用伪元素、不加定位、不建层叠上下文**\n   （加了会把设置浮层 z-index:1000 困在侧栏子树里，被后面的会话列盖住）。\n   半径取 76px 是量出来的上限：圆弧在 x=20px（字标图标左缘）处只有 ≈25px 高，\n   正好从图标上方擦过，所以不需要移动任何内容。 */\n[class*=\"sidebarCol\"] {\n  background-color: var(--ef-page) !important;\n  background-image: none !important;\n}\n\n[class*=\"sidebarCol\"] > * > [class*=\"_root\"] {\n  background-color: transparent !important;\n  background-image: linear-gradient(180deg, #fffa00 0%, #f6f000 100%) !important;\n  border-top-left-radius: 76px;\n}\n\n/* 新会话按钮：去掉外圈描边，只留文字与图标。 */\n[class*=\"_newSession\"] {\n  border: 0 !important;\n  background: transparent !important;\n  color: #0d0d0c !important;\n}\n\n/* 黄底上的选中行：信号条反相成墨色。 */\n[class*=\"sidebarCol\"]\n  :where([class*=\"_sessionRow\"][class*=\"_selected\"], [class*=\"_rowActive\"], [class*=\"_panelActive\"]) {\n  background: linear-gradient(90deg, rgb(13 13 12 / 14%), rgb(13 13 12 / 4%) 72%, transparent) !important;\n  box-shadow: inset 2px 0 0 #0d0d0c !important;\n}\n\n/* 顶部黄带：把平涂的黄直接画在头部自己的背景上（内容自然压在黄之上），\n   不用伪元素、不加定位——同样是为了不制造层叠上下文。\n   会话头部浮在滚动区之上，所以黄带必须不透明：穿过头部的内容被干净地盖住。 */\nheader[class*=\"_header\"]:has([class*=\"_tabs\"]) {\n  /* color 是继承下来的「计算值」，光重绑令牌不会给子元素重新着色，\n     所以这里直接把整条黄带的文字色定成墨色。 */\n  color: #0d0d0c;\n  background-color: var(--ef-signal) !important;\n  background-image: none !important;\n  border-bottom-color: rgb(13 13 12 / 18%) !important;\n\n  --dsw-alias-label-primary: #0d0d0c;\n  --dsw-alias-label-secondary: rgb(13 13 12 / 78%);\n  --dsw-alias-label-tertiary: rgb(13 13 12 / 60%);\n  --dsw-alias-label-caption: rgb(13 13 12 / 48%);\n  --dsw-alias-label-primary-inverted: #fffa00;\n  --dsw-alias-label-primary-foreground: #0d0d0c;\n  --dsw-alias-brand-primary: #0d0d0c;\n  --dsw-alias-brand-text: #0d0d0c;\n  --dsw-alias-interactive-bg-hover: rgb(13 13 12 / 10%);\n  --dsw-alias-interactive-bg-active: rgb(13 13 12 / 16%);\n  --dsw-alias-border-l1: rgb(13 13 12 / 14%);\n  --dsw-alias-border-l2: rgb(13 13 12 / 20%);\n  --dsw-alias-border-l3: rgb(13 13 12 / 28%);\n  --dsw-alias-border-l4: rgb(13 13 12 / 40%);\n  --dsw-alias-bg-module-platform: rgb(13 13 12 / 12%);\n}\n\n/* 黄底上的激活页签：只保留一条笔直的墨色横线（应用自带的 ::after 指示条），\n   去掉多余的圆角形状与内阴影。 */\nheader[class*=\"_header\"] :where([class*=\"_tab\"]) {\n  background: transparent !important;\n}\n\nheader[class*=\"_header\"] :where([class*=\"_tab\"])::after {\n  background: #0d0d0c !important;\n  border-radius: 0 !important;\n}\n\nheader[class*=\"_header\"] :where([class*=\"_tabActive\"], [class*=\"_viewTabActive\"]) {\n  color: #0d0d0c !important;\n  box-shadow: none !important;\n}\n\n/* 视口左侧的角标：上面那个落在暗底上，用信号黄；\n   下面那个仍在黄栏上，用墨色。 */\n[data-ef=\"corner\"][data-side=\"bl\"] {\n  border-color: rgb(13 13 12 / 55%);\n}\n\n/* ── 10. 浅色主背景变体（默认）────────────────────────────────────────────\n   配色层把两条中性色阶整条镜像，于是「深色模式」的别名映射落在浅底深字上；\n   这里只补样式表里写死的那些颜色（它们不是令牌，镜像管不到）：\n   结构线、等高线、外框/角标、面板、输入框、气泡、焦点环。\n   深色变体（`data-endfield-surface=\"dark\"`）沿用第 1–9 节的原始值。 */\nhtml[data-endfield-surface=\"light\"] {\n  --ef-line: rgb(20 20 20 / 20%);\n  --ef-line-strong: rgb(20 20 20 / 34%);\n  /* 侧栏左上角切块露出的“主背景”，在浅色变体里就是纸白底。 */\n  --ef-page: #f2f2f0;\n  /* 浅底上原生控件与滚动条要跟着变浅。 */\n  color-scheme: light !important;\n}\n\n/* 结构线：全局的 1px 细线从纸白换成墨色。 */\nhtml[data-endfield-surface=\"light\"] :where(th) {\n  border-bottom-color: var(--ef-line-strong) !important;\n}\n\nhtml[data-endfield-surface=\"light\"] :where(pre) {\n  border-color: var(--ef-line) !important;\n  border-left-color: rgb(176 164 0 / 70%) !important;\n}\n\n/* 面板（对话框/菜单/提示）：纸白面 + 墨色描边 + 更实的投影。\n   浅底上如果只做“比底色深一点”，浮层会和背景糊在一起，看着像没反应。\n   令牌也要一并恢复成页面级（弹窗 DOM 在侧栏子树里，默认会继承黄栏的墨色反相）。 */\nhtml[data-endfield-surface=\"light\"]\n  :where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], [role=\"listbox\"], [role=\"tooltip\"]) {\n  border: 1px solid var(--ef-line-strong) !important;\n  background-color: #ffffff !important;\n  background-image: none !important;\n  box-shadow:\n    0 0 0 0.5px rgb(20 20 20 / 18%),\n    0 22px 48px rgb(20 20 20 / 22%) !important;\n}\n\nhtml[data-endfield-surface=\"light\"] :where([role=\"dialog\"], [role=\"alertdialog\"]) {\n  color: #131312;\n\n  --dsw-alias-label-primary: #131312;\n  --dsw-alias-label-secondary: #3a3a38;\n  --dsw-alias-label-tertiary: #565654;\n  --dsw-alias-label-caption: #6f6f6c;\n  --dsw-alias-label-primary-inverted: #f2f2f0;\n  --dsw-alias-label-primary-foreground: #f2f2f0;\n  --dsw-alias-brand-primary: #b0ab00;\n  --dsw-alias-brand-text: #8a8600;\n  --dsw-alias-interactive-bg-hover: rgb(20 20 20 / 9%);\n  --dsw-alias-interactive-bg-active: rgb(20 20 20 / 15%);\n  --dsw-alias-border-l1: rgb(20 20 20 / 18%);\n  --dsw-alias-border-l2: rgb(20 20 20 / 26%);\n  --dsw-alias-border-l3: rgb(20 20 20 / 34%);\n  --dsw-alias-border-l4: rgb(20 20 20 / 46%);\n  --dsw-alias-bg-module-platform: #e4e4e1;\n}\n\n/* 等高线：浅底上用墨色细线，计曲线用更深的信号黄，否则看不见。 */\nhtml[data-endfield-surface=\"light\"] [data-ef=\"contour\"] path {\n  stroke: rgb(20 20 20 / 20%);\n}\n\nhtml[data-endfield-surface=\"light\"] [data-ef=\"contour\"] path[data-ef-index] {\n  stroke: rgb(122 108 0 / 72%);\n}\n\n/* 四周压暗在浅底上要轻得多。 */\nhtml[data-endfield-surface=\"light\"] [data-ef=\"wash\"] {\n  background-image: radial-gradient(132% 124% at 50% 46%, transparent 58%, rgb(20 20 20 / 8%) 100%);\n}\n\n/* 视口外框与四角括号：浅底上全部改用墨色。 */\nhtml[data-endfield-surface=\"light\"] [data-ef=\"frame\"] {\n  border-color: rgb(20 20 20 / 22%);\n}\n\nhtml[data-endfield-surface=\"light\"] [data-ef=\"corner\"] {\n  border-color: rgb(20 20 20 / 55%);\n}\n\n/* ── 开屏动画也跟着变浅：纸白装载屏 + 墨色等高线/文字 ─────────────────── */\nhtml[data-endfield-surface=\"light\"] [data-endfield-splash] {\n  background: #f2f2f0;\n}\n\nhtml[data-endfield-surface=\"light\"] [data-ef=\"s-contour\"] path {\n  stroke: rgb(20 20 20 / 16%);\n}\n\nhtml[data-endfield-surface=\"light\"] [data-ef=\"s-contour\"] path[data-ef-index] {\n  stroke: rgb(122 108 0 / 62%);\n}\n\nhtml[data-endfield-surface=\"light\"] [data-ef=\"s-scan\"] {\n  background: rgb(20 20 20 / 14%);\n}\n\nhtml[data-endfield-surface=\"light\"] [data-ef=\"s-corner\"] {\n  border-color: rgb(20 20 20 / 55%);\n}\n\nhtml[data-endfield-surface=\"light\"] [data-ef=\"s-title\"] {\n  color: #131312;\n}\n\nhtml[data-endfield-surface=\"light\"] [data-ef=\"s-sub\"],\nhtml[data-endfield-surface=\"light\"] [data-endfield-splash] [data-ef=\"s-readout\"] {\n  color: rgb(19 19 18 / 62%);\n}\n\nhtml[data-endfield-surface=\"light\"] [data-ef=\"s-dots\"] i {\n  background: rgb(20 20 20 / 22%);\n}\n\nhtml[data-endfield-surface=\"light\"] [data-ef=\"s-grid\"] {\n  background-image: radial-gradient(122% 104% at 50% 46%, transparent 52%, rgb(20 20 20 / 10%) 100%);\n}\n\n/* 输入区：浅底上改成纸白面板 + 墨色描边，内部文字改回墨色层级。 */\nhtml[data-endfield-surface=\"light\"] [data-composer-card] {\n  border-color: var(--ef-line-strong) !important;\n  background: linear-gradient(180deg, #ffffff 0%, #f4f4f2 100%) !important;\n  box-shadow:\n    0 0 0 0.5px rgb(20 20 20 / 10%),\n    0 10px 26px rgb(20 20 20 / 12%) !important;\n\n  --dsw-alias-label-primary: #141414;\n  --dsw-alias-label-secondary: #3a3a38;\n  --dsw-alias-label-tertiary: #565654;\n  --dsw-alias-label-caption: #6f6f6c;\n  --dsw-alias-label-primary-foreground: #f2f2f0;\n  --dsw-alias-interactive-bg-hover: rgb(20 20 20 / 7%);\n  --dsw-alias-interactive-bg-active: rgb(20 20 20 / 12%);\n  --dsw-alias-border-l1: rgb(20 20 20 / 12%);\n  --dsw-alias-border-l2: rgb(20 20 20 / 18%);\n  --dsw-alias-border-l3: rgb(20 20 20 / 26%);\n  --dsw-alias-border-l4: rgb(20 20 20 / 36%);\n}\n\nhtml[data-endfield-surface=\"light\"] [data-composer-card] :where(button[class*=\"_primary\"]) {\n  background: #141414 !important;\n  color: #f2f2f0 !important;\n}\n\nhtml[data-endfield-surface=\"light\"] [data-composer-card] :focus-visible {\n  outline-color: rgb(20 20 20 / 45%) !important;\n}\n\nhtml[data-endfield-surface=\"light\"] [data-composer-chip] {\n  border-color: rgb(20 20 20 / 16%) !important;\n  background: rgb(20 20 20 / 4%) !important;\n}\n\nhtml[data-endfield-surface=\"light\"] [data-composer-chip]:hover {\n  border-color: rgb(20 20 20 / 34%) !important;\n}\n\n/* 用户气泡的文字在浅色变体里已经是墨色（令牌镜像），这里只确保发送键图标跟着走。 */\nhtml[data-endfield-surface=\"light\"] [data-composer-chip] :where(svg) {\n  color: inherit;\n}\n\n/* 光标（输入栏里的闪烁竖线）：浅色变体下默认是白的，在纸白输入框上看不见，\n   换成**深暗金** `#6f6a00`（信号黄的暗调，对比度约 5.5:1）：色相仍在黄色家族里，\n   但在纸白底上足够沉、一眼能看见；越接近 `#fffa00` 越糊。 */\nhtml[data-endfield-surface=\"light\"] :where(input, textarea, [contenteditable], [contenteditable=\"true\"]) {\n  caret-color: #6f6a00;\n}\n\nhtml[data-endfield-surface=\"light\"] [data-composer-card] :where(input, textarea, [contenteditable], [contenteditable=\"true\"]) {\n  caret-color: #6f6a00 !important;\n}\n\n/* 无障碍：尊重系统的“减少动态效果”。 */\n@media (prefers-reduced-motion: reduce) {\n  [data-ef=\"corner\"] {\n    animation: none;\n    opacity: 0.85;\n  }\n\n  /* 等高线场静止（纹理保留，只去掉漂移）。 */\n  [data-ef=\"contour\"] {\n    animation: none;\n  }\n\n  /* 开屏动画整体降级为静态一帧（脚本同时会跳过整段过场）。 */\n  [data-endfield-splash] *,\n  [data-endfield-splash] {\n    animation-duration: 1ms !important;\n    animation-delay: 0ms !important;\n  }\n}\n";
		/**
		 * Endfield palette — the patch layer this theme applies to the DSH design
		 * system (fragment: concatenated into `lib/client.js` by `scripts/build.mjs`).
		 *
		 * Strategy: the shipped stylesheets derive almost every `--dsw-alias-*` value
		 * from a `--dsw-static-*` ramp, so the theme redefines the *ramps* (hue and
		 * cast) and only overrides the handful of aliases whose semantics change —
		 * chiefly the brand/signal colour, which becomes Endfield signal yellow.
		 *
		 * Two surface variants come out of the same ramps:
		 *   · `TOKENS`       — dark surfaces (ink background, paper text).
		 *   · `TOKENS_LIGHT` — light surfaces: the two *neutral* families are mirrored
		 *                      stop-for-stop, so the dark-mode alias mapping
		 *                      (text = bluish-50, base = bluish-950) lands on dark text
		 *                      over a light paper background, while every semantic
		 *                      colour (signal yellow, verified green, caution, alert)
		 *                      keeps its meaning. Literal (non-ramp) aliases are
		 *                      restated in `ALIASES_LIGHT`.
		 * The plugin picks one at runtime — see `surfaceMode()` in `src/plugin.js`.
		 *
		 * The palette mode attribute stays pinned to `dark`, because the ramps above
		 * are authored for the dark-mode alias mapping: surface lightness comes from
		 * which variant is active, not from the mode flag.
		 */

		/** The registry requires both palette modes per token; the mode flag is pinned. */
		const pair = (value) => ({ light: value, dark: value })

		/** Static ramps: family -> stop -> value, authored for dark surfaces. */
		const RAMP = {
		  // Neutral ink/paper ramp: the app's surfaces, text, and hairlines.
		  'neutral-bluish': {
		    '00': '#ffffff',
		    '50': '#f2f2f0',
		    '60': '#f7f7f5',
		    '75': '#ececea',
		    '100': '#e2e2df',
		    '150': '#d8d8d4',
		    '200': '#cbcbc6',
		    '300': '#bcbcb6',
		    '400': '#94948e',
		    '500': '#7b7b76',
		    '600': '#63635e',
		    '700': '#4a4a46',
		    '750': '#383835',
		    '800': '#2b2b28',
		    '850': '#232320',
		    '875': '#1d1d1b',
		    '900': '#181816',
		    '950': '#131312',
		    '1000': '#0c0c0b',
		  },
		  // Pure neutral ramp: scrollbars, tool-bar fills, inline code.
		  'neutral': {
		    '00': '#ffffff',
		    '50': '#f7f7f5',
		    '100': '#eeeeec',
		    '150': '#e4e4e1',
		    '200': '#d7d7d3',
		    '250': '#c9c9c5',
		    '300': '#b8b8b3',
		    '400': '#8d8d88',
		    '500': '#6f6f6a',
		    '550': '#5d5d58',
		    '600': '#4b4b47',
		    '700': '#383835',
		    '800': '#282826',
		    '850': '#212120',
		    '900': '#161615',
		    '1000': '#000000',
		  },
		  // The product/brand ramp becomes signal yellow: links, active state, progress.
		  'deepseek': {
		    '50': '#fffdf0',
		    '100': '#fff9c9',
		    '200': '#fff383',
		    '300': '#ffec3d',
		    '400': '#fffa00',
		    '450': '#f0ea00',
		    '500': '#d6d100',
		    '600': '#b0ab00',
		    '700-delete': '#8b8700',
		    '800': '#3a380f',
		    '900': '#2a280d',
		  },
		  // Cool-neutral steel: the ramp the light palette tints labels with. Kept
		  // desaturated so it never fights the single signal colour.
		  'blue': {
		    '50': '#eef0ef',
		    '50p': '#eaeceb',
		    '75': '#e4e7e5',
		    '100': '#d6d9d7',
		    '300': '#a1a6a3',
		    '400': '#828884',
		    '450': '#727874',
		    '500': '#616763',
		    '600': '#4f5551',
		    '800': '#292e2b',
		    '900': '#1d211f',
		    '950': '#141816',
		  },
		  // Verified / online state only.
		  'green': {
		    '100': '#d3fff0',
		    '400': '#00ffa2',
		    '500': '#00d98a',
		    '900': '#0d3227',
		  },
		  // Caution state.
		  'amber': {
		    '100': '#ffe9c7',
		    '400': '#ffb020',
		    '500': '#ee9b1e',
		    '600': '#d1830f',
		    '900': '#33260f',
		  },
		  // Alert state.
		  'red': {
		    '50': '#fff0ee',
		    '100': '#ffdedb',
		    '400': '#ff6b60',
		    '500': '#ff4438',
		    '600': '#e63528',
		    '900': '#3a1512',
		  },
		}

		/**
		 * Alias overrides: only the semantic values that must differ from the ramp
		 * mapping. Everything else follows the ramps above.
		 */
		const ALIASES = {
		  // Primary action = signal yellow (the shipped palette makes it a neutral).
		  '--dsw-alias-brand-primary': '#fffa00',
		  '--dsw-alias-brand-text': '#fffa00',
		  '--dsw-alias-button-primary-hover': '#f2ed00',
		  '--dsw-alias-button-primary-dimmed': '#55510f',

		  // Utility dock: the sidebar is the signal-yellow rail (its stylesheet scope
		  // re-binds every label/border token to ink, see src/endfield.css §10).
		  '--dsw-specific-sidebar-fill': '#fffa00',

		  // Chat surfaces: the user bubble is the chat surface (light variant below).
		  '--dsw-specific-bubble': '#3a3a3a',
		  '--dsw-specific-bubble-highlight': '#454545',

		  // Hairlines: Endfield draws structure with visible 1px rules.
		  '--dsw-alias-border-l1': 'rgb(240 240 240 / 9%)',
		  '--dsw-alias-border-l2': 'rgb(240 240 240 / 15%)',
		  '--dsw-alias-border-l2-darkmode-thin': 'rgb(240 240 240 / 9%)',
		  '--dsw-alias-border-l3': 'rgb(240 240 240 / 24%)',
		  '--dsw-alias-border-l4': 'rgb(240 240 240 / 36%)',
		  '--dsw-alias-border-inverted': 'rgb(240 240 240 / 9%)',
		  '--dsw-alias-border-inverted2': 'rgb(240 240 240 / 12%)',

		  // Interaction tints: neutral by default, signal yellow for accent surfaces.
		  '--dsw-alias-interactive-bg-hover': 'rgb(240 240 240 / 7%)',
		  '--dsw-alias-interactive-bg-active': 'rgb(240 240 240 / 13%)',
		  '--dsw-alias-interactive-bg-hover-accent': 'rgb(255 250 0 / 12%)',
		  '--dsw-alias-interactive-bg-hover-danger': 'rgb(255 107 96 / 14%)',

		  // Masks and skeletons.
		  '--dsw-alias-bg-mask-1': 'rgb(8 8 8 / 50%)',
		  '--dsw-alias-bg-mask-drop': 'rgb(26 26 26 / 80%)',
		  '--dsw-alias-bg-skeleton': 'rgb(240 240 240 / 6%)',

		  // Floating toolbars over the stage stay translucent charcoal.
		  '--dsw-alias-button-tool-bar-fill': 'rgb(94 94 94 / 55%)',
		  '--dsw-alias-button-tool-bar-hover': 'rgb(94 94 94 / 72%)',
		  '--dsw-alias-button-tool-bar-fill-invisible': 'rgb(26 26 26 / 45%)',

		  /*
		   * Text tiers and tile surfaces, stated for the ink background. A layer must
		   * carry a value for *both* modes, so the light variant restates these rather
		   * than introducing tokens the dark slot would leave undefined. Values match
		   * what the dark alias mapping derives from the ramps above, so the dark
		   * surface is unchanged.
		   */
		  '--dsw-alias-label-primary': '#f2f2f0',
		  '--dsw-alias-label-secondary': '#bcbcb6',
		  '--dsw-alias-label-tertiary': '#94948e',
		  '--dsw-alias-label-caption': '#63635e',
		  '--dsw-alias-label-primary-inverted': '#0c0c0b',
		  '--dsw-alias-label-primary-foreground': '#0c0c0b',
		  '--dsw-alias-bg-module-platform': 'rgb(240 240 240 / 8%)',

		  /*
		   * Elevation on the ink surface. The mirrored ramps can't be lifted directly
		   * (the light surface derives its own layers from the opposite stops), so the
		   * three panel layers are stated here instead: the ramp values sit within a
		   * few percent of the base and a dialog would read as one black slab.
		   */
		  '--dsw-alias-bg-layer-1': '#232321',
		  '--dsw-alias-bg-layer-2': '#2a2a28',
		  '--dsw-alias-bg-layer-3': '#333330',

		  // Warning labels need more lift than the ramp's caution stop gives them.
		  '--dsw-alias-state-warn-label': '#ffc14d',

		  // Scrollbar thumbs: neutral grey, squared in the stylesheet.
		  '--dsw-alias-scrollbar-hover-l1': '#5f5f5f',
		  '--dsw-alias-scrollbar-hover-l2': '#6f6f6f',
		}

		/** Families whose ramp is mirrored for the light surface variant. */
		const SURFACE_FAMILIES = ['neutral-bluish', 'neutral']

		/**
		 * Aliases that are literal colours rather than ramp references, so they must be
		 * restated for a light surface: white-alpha becomes ink-alpha, and the chat
		 * surfaces become light greys.
		 */
		const ALIASES_LIGHT = {
		  '--dsw-alias-border-l1': 'rgb(20 20 20 / 18%)',
		  '--dsw-alias-border-l2': 'rgb(20 20 20 / 26%)',
		  '--dsw-alias-border-l2-darkmode-thin': 'rgb(20 20 20 / 18%)',
		  '--dsw-alias-border-l3': 'rgb(20 20 20 / 34%)',
		  '--dsw-alias-border-l4': 'rgb(20 20 20 / 46%)',
		  '--dsw-alias-border-inverted': 'rgb(20 20 20 / 18%)',
		  '--dsw-alias-border-inverted2': 'rgb(20 20 20 / 22%)',
		  '--dsw-alias-interactive-bg-hover': 'rgb(20 20 20 / 9%)',
		  '--dsw-alias-interactive-bg-active': 'rgb(20 20 20 / 15%)',
		  '--dsw-alias-interactive-bg-hover-accent': 'rgb(176 164 0 / 26%)',
		  '--dsw-alias-interactive-bg-hover-danger': 'rgb(198 50 40 / 14%)',
		  '--dsw-alias-bg-mask-1': 'rgb(20 20 20 / 38%)',
		  '--dsw-alias-bg-mask-drop': 'rgb(244 244 242 / 82%)',
		  '--dsw-alias-bg-skeleton': 'rgb(20 20 20 / 9%)',
		  '--dsw-alias-button-tool-bar-fill': 'rgb(244 244 242 / 82%)',
		  '--dsw-alias-button-tool-bar-hover': 'rgb(244 244 242 / 94%)',
		  '--dsw-alias-button-tool-bar-fill-invisible': 'rgb(244 244 242 / 62%)',
		  '--dsw-alias-state-warn-label': '#8f5a00',
		  '--dsw-alias-scrollbar-hover-l1': '#8f8f8f',
		  '--dsw-alias-scrollbar-hover-l2': '#7c7c7c',
		  '--dsw-specific-bubble': '#e6e6e3',
		  '--dsw-specific-bubble-highlight': '#dbdbd7',

		  /* Text tiers again, deeper than the mirrored ramp: on a paper background the
		     mirrored "caption/tertiary" stops land around #94/#63 and read as washed
		     out, so the light variant states them explicitly. */
		  '--dsw-alias-label-primary': '#131312',
		  '--dsw-alias-label-secondary': '#3a3a38',
		  '--dsw-alias-label-tertiary': '#565654',
		  '--dsw-alias-label-caption': '#6f6f6c',
		  '--dsw-alias-label-primary-inverted': '#f2f2f0',
		  '--dsw-alias-label-primary-foreground': '#f2f2f0',
		  /* Chip/tile surfaces need one visible step below the paper background. */
		  '--dsw-alias-bg-module-platform': '#e4e4e1',
		}

		/**
		 * Mirror one ramp family stop-for-stop (00 ↔ 1000, 50 ↔ 950, …).
		 *
		 * The stop names must be sorted *numerically* first: JavaScript orders
		 * integer-like keys (`"50"`, `"100"`, …) ascending ahead of other string keys,
		 * so `"00"` comes last in `Object.keys` and a naive index mirror pairs every
		 * stop with the wrong partner.
		 */
		function mirrorFamily(stops) {
		  const entries = Object.entries(stops)
		    .map(([stop, value]) => [Number.parseInt(stop, 10), stop, value])
		    .sort((left, right) => left[0] - right[0])
		  const mirrored = {}
		  for (let index = 0; index < entries.length; index += 1) {
		    mirrored[entries[index][1]] = entries[entries.length - 1 - index][2]
		  }
		  return mirrored
		}

		/**
		 * Build one override layer.
		 * @param aliases - literal alias values for this surface variant.
		 * @param mirror - whether to mirror the surface ramps (light surfaces).
		 * @returns token-name → `{ light, dark }` pairs.
		 */
		function buildTokens(aliases, mirror) {
		  const tokens = {}
		  for (const [family, stops] of Object.entries(RAMP)) {
		    const resolved = mirror && SURFACE_FAMILIES.includes(family) ? mirrorFamily(stops) : stops
		    for (const [stop, value] of Object.entries(resolved)) tokens[`--dsw-static-${family}-${stop}`] = pair(value)
		  }
		  for (const [token, value] of Object.entries(aliases)) tokens[token] = pair(value)
		  return tokens
		}

		/** Dark-surface layer: ink background, paper text. */
		const TOKENS = buildTokens(ALIASES, false)

		/** Light-surface layer: paper background, ink text. */
		const TOKENS_LIGHT = buildTokens({ ...ALIASES, ...ALIASES_LIGHT }, true)

		/**
		 * Fold the two surface layers into a single layer whose `light` and `dark`
		 * slots carry the light-surface and dark-surface values. The theme service
		 * picks a slot by the *active theme's* colour scheme, so registering this one
		 * layer makes the skin follow 设置 → 外观 (light / dark / system) with no
		 * re-registration — re-registering from a `theme/change` handler would publish
		 * again from inside the emit and throw.
		 *
		 * @param dark - tokens for the dark surface.
		 * @param light - tokens for the light surface.
		 * @returns one layer: every token carrying both surface values.
		 */
		function combineSurfaces(dark, light) {
		  const combined = {}
		  for (const name of new Set([...Object.keys(dark), ...Object.keys(light)])) {
		    /* A token may exist in only one layer (the light variant adds a few), so
		       each slot falls back to whichever layer defines it. */
		    const darkModes = dark[name] ?? light[name]
		    const lightModes = light[name] ?? dark[name]
		    combined[name] = { light: lightModes.light, dark: darkModes.dark }
		  }
		  return combined
		}

		/** One layer pinned to a single surface variant (the A/B switch). */
		function pinnedTokens(variant) {
		  const source = variant === 'dark' ? TOKENS : TOKENS_LIGHT
		  const pinned = {}
		  for (const [name, modes] of Object.entries(source)) pinned[name] = pair(modes.dark)
		  return pinned
		}
		/**
		 * dsh-theme-endfield — browser half (fragment: concatenated into
		 * `lib/client.js` by `scripts/build.mjs`).
		 *
		 * The bundle requires nothing from the module table: it is pure DOM + the
		 * client theme service, so it cannot fail on an unresolved external and works
		 * in every Web carrier.
		 */

		/** Package id: owns the style tag, the token layer, the chrome node. */
		const SOURCE = 'dsh-theme-endfield'

		/** Cordis plugin name. */
		const name = 'theme-endfield'

		/** Required service: ui-theme's runtime (token override layers). */
		const inject = ['theme']

		/** Body attribute selecting the dark base palette in the token stylesheets. */
		const DARK_ATTRIBUTE = 'data-ds-dark-theme'

		/** Root attribute naming the active surface variant (drives the light overrides). */
		const SURFACE_ATTRIBUTE = 'data-endfield-surface'

		/** Default surface variant when the user has expressed no preference. */
		const SURFACE_DEFAULT = 'light'

		/** Marks the one-time preference seed (see `apply`). */
		const PREFERENCE_SEED_KEY = 'dsh-endfield-surface-seeded'

		/** Splash timing budget (ms): reveal floor, readiness ceiling, phase lengths. */
		const SPLASH_MIN_VISIBLE = 1150
		const SPLASH_SKIP_FLOOR = 420
		const SPLASH_MAX_WAIT = 6000
		const SPLASH_FILL_HOLD = 140
		const SPLASH_WIPE_RISE = 240
		const SPLASH_WIPE_SLIDE = 340
		const SPLASH_WIPE_DISSOLVE = 380

		/**
		 * Whether the user opted out for this browser: `?endfield=off` on the URL or
		 * `localStorage['dsh-endfield'] = 'off'` (a recovery hatch that needs no
		 * plugin reload). Any storage/URL failure means "not disabled".
		 * @returns true when the skin must not install.
		 */
		function isDisabled() {
		  try {
		    if (new URLSearchParams(location.search).get('endfield') === 'off') return true
		    return localStorage.getItem('dsh-endfield') === 'off'
		  } catch {
		    return false
		  }
		}

		/**
		 * Whether the opening animation is switched off for this browser:
		 * `?endfield=splash-off` or `localStorage['dsh-endfield-splash'] = 'off'`.
		 * @returns true when the splash must be skipped.
		 */
		function isSplashDisabled() {
		  try {
		    if (new URLSearchParams(location.search).get('endfield') === 'splash-off') return true
		    return localStorage.getItem('dsh-endfield-splash') === 'off'
		  } catch {
		    return false
		  }
		}

		/** Whether the user asked the operating system for reduced motion. */
		function prefersReducedMotion() {
		  try {
		    return matchMedia('(prefers-reduced-motion: reduce)').matches
		  } catch {
		    return false
		  }
		}

		/**
		 * Which surface variant to paint: `light` (paper background, ink text) or
		 * `dark` (the original ink background).
		 *
		 * `?endfield=dark-surface` / `?endfield=light-surface`, then
		 * `localStorage['dsh-endfield-surface']` pin one explicitly (an A/B switch that
		 * survives everything else). Without a pin the variant follows the theme
		 * preference the Settings → 外观 row writes, resolved through
		 * {@link surfaceForPreference}.
		 *
		 * @returns the pinned variant, or undefined when the preference decides.
		 */
		function pinnedSurface() {
		  try {
		    const param = new URLSearchParams(location.search).get('endfield')
		    if (param === 'dark-surface') return 'dark'
		    if (param === 'light-surface') return 'light'
		    const stored = localStorage.getItem('dsh-endfield-surface')
		    if (stored === 'dark' || stored === 'light') return stored
		  } catch {
		    /* fall through: nothing pinned */
		  }
		  return undefined
		}

		/**
		 * Map a durable theme preference onto a surface variant.
		 * @param preference - `light`, `dark`, or `system`.
		 * @returns the matching variant, or undefined for an unknown preference.
		 */
		function surfaceForPreference(preference) {
		  if (preference === 'dark') return 'dark'
		  if (preference === 'light') return 'light'
		  if (preference === 'system') {
		    try {
		      return matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
		    } catch {
		      return undefined
		    }
		  }
		  return undefined
		}

		/**
		 * The surface variant the active theme asks for. Reading `active.colorScheme`
		 * covers `system` too, because the theme service already resolved it.
		 * @param ctx - client context carrying the theme service.
		 * @returns `light` or `dark`.
		 */
		function currentSurface(ctx) {
		  try {
		    const snapshot = ctx.theme.getTheme()
		    const scheme = snapshot.active?.colorScheme
		    if (scheme === 'light' || scheme === 'dark') return scheme
		    return surfaceForPreference(snapshot.preference) ?? SURFACE_DEFAULT
		  } catch {
		    return SURFACE_DEFAULT
		  }
		}

		/* ── 等高线场（终末地的地形／测绘语言） ──────────────────────────────────── */

		/**
		 * Terrain peaks, in the generated SVG's 1600×1000 user space:
		 * `[cx, cy, rx, ry, levels, seed]`. The main-UI field hugs the viewport edges
		 * so the centre stays clean for content; the splash field is centred.
		 */
		const CONTOUR_FIELD_UI = [
		  [-130, 520, 250, 330, 9, 0.4],
		  [1570, 110, 300, 250, 8, 2.1],
		  [1420, 990, 330, 220, 7, 4.3],
		  [230, 1070, 260, 180, 6, 5.9],
		  /* Two summits sit inside the viewport so the motif survives the centre mask:
		     the lower-left of the content field and the upper-right header corner. */
		  [560, 880, 170, 120, 10, 2.6],
		  [1310, 150, 150, 110, 7, 3.9],
		]
		const CONTOUR_FIELD_SPLASH = [
		  [800, 470, 300, 230, 11, 1.2],
		  [1230, 760, 250, 170, 7, 3.4],
		  [400, 780, 210, 145, 6, 5.1],
		  [1580, 100, 230, 170, 5, 0.7],
		]

		/**
		 * Sample one closed contour ring. The radius is a small harmonic sum, so nested
		 * rings read as terrain instead of concentric circles; the centre drifts a
		 * little per level, the way real contours lean into a slope. Deterministic —
		 * the same peaks produce the same map on every load.
		 *
		 * @param cx - summit x in user space.
		 * @param cy - summit y in user space.
		 * @param rx - summit radius along x.
		 * @param ry - summit radius along y.
		 * @param level - ring index, 0 at the summit.
		 * @param seed - per-peak phase offset.
		 * @param steps - samples per ring.
		 * @returns one closed SVG path.
		 */
		function contourRing(cx, cy, rx, ry, level, seed, steps) {
		  const phase = seed + level * 0.46
		  const scale = 0.34 + 0.15 * level
		  const points = []
		  for (let i = 0; i <= steps; i += 1) {
		    const angle = (i / steps) * Math.PI * 2
		    const wobble =
		      1 +
		      0.17 * Math.sin(angle * 3 + phase) +
		      0.09 * Math.sin(angle * 5 - phase * 1.7) +
		      0.05 * Math.sin(angle * 2 + phase * 0.8)
		    const x = cx + Math.cos(angle) * rx * scale * wobble + level * 2.2
		    const y = cy + Math.sin(angle) * ry * scale * wobble - level * 1.4
		    points.push(`${x.toFixed(1)},${y.toFixed(1)}`)
		  }
		  return `M${points.join('L')}Z`
		}

		/**
		 * Render one contour field as an inline SVG. Every fifth ring is an *index
		 * contour* (the brighter, surveyed line on a real map) and carries a marker
		 * attribute the stylesheets colour; rings are ordered summit-first so the
		 * splash can draw the map outward from each peak.
		 *
		 * @param peaks - the peak table to render.
		 * @param options - `steps` samples per ring and whether rings animate in.
		 * @returns SVG markup for one contour layer.
		 */
		function contourSvg(peaks, options) {
		  const steps = options.steps
		  const paths = []
		  let order = 0
		  for (const [cx, cy, rx, ry, levels, seed] of peaks) {
		    for (let level = 0; level < levels; level += 1) {
		      const index = level % 5 === 0 ? ' data-ef-index=""' : ''
		      const delay = options.draw === true ? ` style="animation-delay:${String(order * 22)}ms"` : ''
		      /* pathLength="1" normalizes every ring to one unit, so a single
		         `stroke-dasharray: 1` rule draws any ring regardless of its real length. */
		      paths.push(
		        `<path d="${contourRing(cx, cy, rx, ry, level, seed, steps)}" pathLength="1"${index}${delay}/>`,
		      )
		      order += 1
		    }
		  }
		  const classes = options.draw === true ? ' data-draw=""' : ''
		  return (
		    '<svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice" aria-hidden="true"' +
		    `${classes}>${paths.join('')}</svg>`
		  )
		}
		/**
		 * Install this plugin's own stylesheet, replacing any stale copy. Owned by the
		 * fiber through `ctx.effect`, so unloading or HMR removes it (the HMR driver
		 * also drops `style[data-plugin]` tags it owns).
		 * @returns the created style element.
		 */
		function installStyle() {
		  for (const stale of document.querySelectorAll(`style[data-plugin="${SOURCE}"]`)) stale.remove()
		  const tag = document.createElement('style')
		  tag.dataset.plugin = SOURCE
		  tag.dataset.pluginCss = `${SOURCE}/endfield.css`
		  tag.textContent = ENDFIELD_CSS
		  document.head.appendChild(tag)
		  return tag
		}

		/**
		 * Install the decorative chrome layer: a topographic contour field masked to
		 * the viewport periphery, one flat wash for the edges, a rounded 1px viewport
		 * frame, four corner brackets, and the concave fillet that rounds the junction
		 * where the yellow rail meets the yellow top band. Purely presentational —
		 * `aria-hidden`, `pointer-events: none`, appended beside the React root so no
		 * render pass can reclaim it. The surface carries no stripes or grid: the
		 * contour field is the only texture on screen.
		 * @returns the created chrome container.
		 */
		function installChrome() {
		  const existing = document.querySelector('[data-endfield-chrome]')
		  if (existing !== null) existing.remove()
		  const root = document.createElement('div')
		  root.setAttribute('data-endfield-chrome', '')
		  root.setAttribute('aria-hidden', 'true')
		  root.innerHTML =
		    `<div data-ef="contour">${contourSvg(CONTOUR_FIELD_UI, { steps: 128 })}</div>` +
		    '<div data-ef="wash"></div><div data-ef="frame"></div>' +
		    '<i data-ef="fillet"></i>' +
		    '<i data-ef="corner" data-side="tl"></i><i data-ef="corner" data-side="tr"></i>' +
		    '<i data-ef="corner" data-side="bl"></i><i data-ef="corner" data-side="br"></i>'
		  document.body.appendChild(root)
		  return root
		}

		/**
		 * Publish the shell's live geometry as CSS variables, so the fillet sits
		 * exactly on the junction of the sidebar and the top band: both the rail width
		 * and the band height are user-adjustable (the sidebar column is draggable, the
		 * header gains rows).
		 *
		 * The chrome installs *before* the shell renders, so the first measurement is
		 * always empty; a low-frequency poll (writing only when a value actually
		 * changes) covers the initial render, a session switch remounting the header,
		 * and a sidebar drag, without a ResizeObserver needing to re-attach.
		 *
		 * @param root - the chrome container to flag when both measurements exist.
		 * @returns the disposer stopping the poll and the resize listener.
		 */
		function watchShellMetrics(root) {
		  let last = ''
		  const sync = () => {
		    const sidebar = document.querySelector('[class*="sidebarCol"]')
		    const header = document.querySelector('header[class*="_header"]:has([class*="_tabs"])')
		    const rail = sidebar === null ? 0 : Math.round(sidebar.getBoundingClientRect().width)
		    const band = header === null ? 0 : Math.round(header.getBoundingClientRect().height)
		    const key = `${String(rail)}x${String(band)}`
		    if (key === last) return
		    last = key
		    const style = document.documentElement.style
		    style.setProperty('--ef-rail-w', `${String(rail)}px`)
		    style.setProperty('--ef-band-h', `${String(band)}px`)
		    root.toggleAttribute('data-shell-yellow', rail > 0 && band > 0)
		  }
		  sync()
		  const timer = setInterval(sync, 600)
		  window.addEventListener('resize', sync)
		  return () => {
		    clearInterval(timer)
		    window.removeEventListener('resize', sync)
		  }
		}

		/**
		 * Install the opening animation: a near-black loading screen (grid, calibration
		 * sweep, corner brackets, wordmark masked in, monospace readout with a
		 * five-block activity indicator) that ends in a full-bleed signal-yellow wipe
		 * into the shell — the sequence the official Endfield site opens with.
		 *
		 * Every line of text on it is real: the product tagline the welcome screen
		 * already shows, plus the boot manifest's own revision and client-module count.
		 * The indicator fills when the shell has actually rendered, never on a timer,
		 * and the whole overlay is removed afterwards; a click, keypress or wheel skips
		 * straight to the wipe, and `prefers-reduced-motion` skips the animation.
		 *
		 * @returns the disposer removing the overlay and its timers.
		 */
		function installSplash() {
		  const boot = globalThis.__DSH_BOOT__
		  const entries = Array.isArray(boot?.entries) ? boot.entries.length : undefined
		  const rawRev = boot?.rev
		  const rev = typeof rawRev === 'string' && /^[0-9a-zA-Z_-]{1,32}$/.test(rawRev) ? rawRev.slice(0, 12) : undefined
		  const readout = [
		    entries === undefined ? undefined : `MODULES ${String(entries)}`,
		    rev === undefined ? undefined : `REV ${rev}`,
		  ]
		    .filter((part) => part !== undefined)
		    .join(' · ')

		  const root = document.createElement('div')
		  root.setAttribute('data-endfield-splash', '')
		  root.setAttribute('aria-hidden', 'true')
		  root.innerHTML =
		    `<div data-ef="s-contour">${contourSvg(CONTOUR_FIELD_SPLASH, { steps: 128, draw: true })}</div>` +
		    '<div data-ef="s-wash"></div><div data-ef="s-scan"></div>' +
		    '<i data-ef="s-corner" data-side="tl"></i><i data-ef="s-corner" data-side="tr"></i>' +
		    '<i data-ef="s-corner" data-side="bl"></i><i data-ef="s-corner" data-side="br"></i>' +
		    '<div data-ef="s-mark"><span data-ef="s-prism"></span>' +
		    '<span data-ef="s-title"></span>' +
		    '<span data-ef="s-sub">DeepSeek Harness</span></div>' +
		    '<div data-ef="s-readout"><span data-ef="s-dots"><i style="--i:0"></i><i style="--i:1"></i>' +
		    '<i style="--i:2"></i><i style="--i:3"></i><i style="--i:4"></i></span>' +
		    `<span>${readout}</span></div>` +
		    '<div data-ef="s-wipe"><span data-ef="s-ghost"></span></div>'
		  document.body.appendChild(root)

		  /* All three text nodes are written through textContent: the fallback wordmark
		     is the document title, and the tagline is read out of the rendered hero. */
		  const titleSeat = root.querySelector('[data-ef="s-title"]')
		  const ghostSeat = root.querySelector('[data-ef="s-ghost"]')
		  const setMark = (text) => {
		    titleSeat.textContent = text
		    ghostSeat.textContent = text
		  }
		  setMark((document.title || '').trim() || 'DeepSeek Harness')
		  /** Adopt the shell's own welcome tagline once the hero exists (localized). */
		  const adoptTagline = () => {
		    const group = document.querySelector('[class*="_titleGroup"]')
		    const text = group?.firstElementChild?.textContent?.trim()
		    if (text === undefined || text === '' || text.length > 32) return false
		    setMark(text)
		    return true
		  }

		  const started = performance.now()
		  const timers = new Set()
		  let poll
		  let finished = false

		  const later = (run, delay) => {
		    const timer = setTimeout(() => {
		      timers.delete(timer)
		      run()
		    }, delay)
		    timers.add(timer)
		  }
		  const stopPolling = () => {
		    if (poll === undefined) return
		    clearInterval(poll)
		    poll = undefined
		  }
		  /** Remove the overlay and every pending timer this fiber owns. */
		  const finish = () => {
		    if (finished) return
		    finished = true
		    stopPolling()
		    for (const timer of timers) clearTimeout(timer)
		    timers.clear()
		    root.remove()
		  }
		  /** Start the yellow reveal, no earlier than the reveal floor. */
		  const toWipe = (skipped) => {
		    if (finished || root.dataset.phase !== undefined) return
		    const floor = skipped === true ? SPLASH_SKIP_FLOOR : SPLASH_MIN_VISIBLE
		    const elapsed = performance.now() - started
		    if (elapsed < floor) {
		      later(() => {
		        toWipe(skipped)
		      }, floor - elapsed)
		      return
		    }
		    root.dataset.phase = 'wipe-rise'
		    later(() => {
		      root.dataset.phase = 'wipe-slide'
		    }, SPLASH_WIPE_RISE + SPLASH_FILL_HOLD)
		    later(() => {
		      root.dataset.phase = 'wipe-dissolve'
		    }, SPLASH_WIPE_RISE + SPLASH_FILL_HOLD + SPLASH_WIPE_SLIDE)
		    later(() => {
		      root.dataset.phase = 'done'
		      finish()
		    }, SPLASH_WIPE_RISE + SPLASH_FILL_HOLD + SPLASH_WIPE_SLIDE + SPLASH_WIPE_DISSOLVE)
		  }
		  /** The shell has rendered when the root seat holds a child (or a frame exists). */
		  const shellRendered = () => {
		    const host = document.getElementById('root')
		    if (host !== null && host.childElementCount > 0) return true
		    return document.querySelector('[class*="_frame"], main') !== null
		  }
		  /** Adopt the hero tagline while waiting; the shell renders it as it mounts. */
		  const check = () => {
		    if (finished || !shellRendered()) {
		      adoptTagline()
		      return
		    }
		    adoptTagline()
		    stopPolling()
		    toWipe(false)
		  }
		  const skip = () => {
		    stopPolling()
		    toWipe(true)
		  }
		  for (const type of ['pointerdown', 'keydown', 'wheel']) {
		    root.addEventListener(type, skip, { passive: true })
		  }

		  check()
		  poll = setInterval(check, 120)
		  later(() => {
		    stopPolling()
		    toWipe(false)
		  }, SPLASH_MAX_WAIT)
		  return finish
		}

		/**
		 * Pin the *palette mode* to dark.
		 *
		 * The palette attribute and `color-scheme` are asserted on the DOM rather than
		 * by re-writing the preference: the durable settings read lands *after* the
		 * first plugins activate, so a stored `light` preference is adopted back and
		 * would otherwise render the base sheets' light alias mapping under this skin.
		 * The stored preference is deliberately left alone — it is what 设置 → 外观
		 * writes, and the surface variant follows it (see the surface layer in
		 * `apply`).
		 *
		 * @param ctx - client context carrying the theme service.
		 * @returns the disposer releasing the mutation observer.
		 */
		function pinPalette(ctx) {
		  const assertDark = () => {
		    const body = document.body
		    if (!body.hasAttribute(DARK_ATTRIBUTE)) body.setAttribute(DARK_ATTRIBUTE, '')
		    if (document.documentElement.style.colorScheme !== 'dark') {
		      document.documentElement.style.colorScheme = 'dark'
		    }
		  }
		  assertDark()
		  ctx.on('theme/change', assertDark)
		  /** The presenter retracts the attribute on any non-dark snapshot; put it back. */
		  const observer = new MutationObserver(assertDark)
		  observer.observe(document.body, { attributes: true, attributeFilter: [DARK_ATTRIBUTE] })
		  return () => {
		    observer.disconnect()
		  }
		}

		/**
		 * Plugin body: palette layer, stylesheet, chrome, opening animation, dark pin,
		 * and the debug surface used by the visual checks in the README.
		 * @param ctx - client cordis context.
		 */
		function apply(ctx) {
		  if (isDisabled()) {
		    ctx.logger.info('theme-endfield: disabled by request (?endfield=off / dsh-endfield=off)')
		    return
		  }
		  /*
		   * One-time: adopt the light look as the durable preference, so Settings →
		   * 外观 shows 浅色 selected and the skin agrees with it. Afterwards the row is
		   * the user's to drive — the surface layer below follows every change.
		   */
		  try {
		    if (pinnedSurface() === undefined && localStorage.getItem(PREFERENCE_SEED_KEY) === null) {
		      localStorage.setItem(PREFERENCE_SEED_KEY, '1')
		      ctx.theme.setTheme(SURFACE_DEFAULT)
		    }
		  } catch (error) {
		    ctx.logger.warn(`theme-endfield: could not seed the preference: ${String(error)}`)
		  }
		  ctx.effect(() => {
		    const tag = installStyle()
		    return () => {
		      tag.remove()
		    }
		  }, 'theme-endfield: stylesheet')
		  ctx.effect(() => {
		    const root = installChrome()
		    const stopWatching = watchShellMetrics(root)
		    return () => {
		      stopWatching()
		      root.remove()
		    }
		  }, 'theme-endfield: chrome layer')
		  /*
		   * Palette layer: one layer whose two mode slots carry the two surfaces, so
		   * 设置 → 外观 (light / dark / system) switches the skin with no
		   * re-registration — the theme service picks the slot by the active theme's
		   * colour scheme. An explicit A/B pin collapses it to a single variant.
		   */
		  const pinned = pinnedSurface()
		  ctx.effect(
		    () =>
		      ctx.theme.overrideTokens(
		        SOURCE,
		        pinned === undefined ? combineSurfaces(TOKENS, TOKENS_LIGHT) : pinnedTokens(pinned),
		      ),
		    'theme-endfield: palette layer',
		  )
		  /*
		   * `data-endfield-surface` drives the stylesheet's light-variant overrides
		   * (contours, frame, panels, splash). Attribute only — no theme writes, so this
		   * can safely run from a `theme/change` handler.
		   */
		  ctx.effect(() => {
		    const paint = () => {
		      document.documentElement.setAttribute(SURFACE_ATTRIBUTE, pinned ?? currentSurface(ctx))
		    }
		    paint()
		    const off = ctx.on('theme/change', paint)
		    return () => {
		      off()
		      document.documentElement.removeAttribute(SURFACE_ATTRIBUTE)
		    }
		  }, 'theme-endfield: surface attribute')
		  ctx.effect(() => pinPalette(ctx), 'theme-endfield: palette pin')
		  if (!isSplashDisabled() && !prefersReducedMotion()) {
		    ctx.effect(() => installSplash(), 'theme-endfield: opening animation')
		  }
		  window.__dshEndfield = {
		    source: SOURCE,
		    surface: () => document.documentElement.getAttribute(SURFACE_ATTRIBUTE),
		    snapshot: () => ctx.theme.getTheme(),
		    set: (id) => ctx.theme.setTheme(id),
		    splash: () => {
		      document.querySelector('[data-endfield-splash]')?.remove()
		      return installSplash()
		    },
		  }
		}
		exports.apply = apply;
		exports.inject = inject;
		exports.name = name;
		return module.exports;
	}
});
