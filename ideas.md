# SILLAGE — 设计方案探索

## 方案一：Apothecary Archive（药剂师档案）

<response>
<text>
<idea>
**Design Movement**: 新包豪斯主义 × 实验室美学
**Core Principles**:
1. 极简克制的黑白灰底色，用单一金色作为唯一点缀
2. 所有文字排版以网格为基础，但局部打破网格制造张力
3. 将香水的成分/配方以"实验室档案"的形式呈现
4. 大量留白，让 3D 模型成为绝对主角

**Color Philosophy**: 近乎白色的米色背景 (#F5F0E8)，炭黑文字，金铜色 (#B8935A) 作为唯一强调色。传达"古老配方遇见现代工艺"的感觉。

**Layout Paradigm**: 垂直滚动驱动，每个香水系列占据一个全屏"章节"。左侧固定导航标尺，右侧内容区域。标题文字极大（10vw+），正文极小，形成强烈对比。

**Signature Elements**:
1. 细线条分隔符，模拟实验室记录纸
2. 配方成分以百分比条形图展示（类似 silencio.es 的营养成分表）
3. 3D 香水瓶在滚动时缓慢旋转和漂浮

**Interaction Philosophy**: 鼠标悬停时香水瓶轻微倾斜，点击时发出轻微的玻璃碰撞音效

**Animation**: 文字按字符逐个出现；3D 瓶子随滚动位置改变旋转角度和位置；章节切换时有轻微的模糊过渡

**Typography System**: 主标题使用 Cormorant Garamond（衬线，优雅），正文使用 DM Mono（等宽，实验室感），标签使用 Letter Spacing 极大的 Helvetica
</idea>
</text>
<probability>0.08</probability>
</response>

---

## 方案二：Sensory Cartography（感官制图）← 选定方案

<response>
<text>
<idea>
**Design Movement**: 极简主义 × 奢侈品美学 × 创意编程
**Core Principles**:
1. 近乎纯白的背景，让香水瓶的 3D 渲染成为唯一视觉焦点
2. 将香水体验"商品化"——模仿高端精品店的标签设计，但用数字化的方式呈现
3. 每款香水都有自己的"感官档案"，包含香调、浓度、持久度等数据
4. 滚动驱动的叙事：从"开瓶"到"香气扩散"到"留香"，模拟真实的嗅觉体验过程

**Color Philosophy**: 主色调为接近白色的米灰 (#EBEBEB)，文字为深炭色 (#1A1A1A)，唯一强调色为一种深沉的琥珀金 (#C4975A)。整体传达"克制的奢华"。

**Layout Paradigm**: 仿照 silencio.es 的侧边信息栏设计。左侧固定一个竖排的品牌信息条，主内容区域垂直滚动。每个香水系列有一个"产品标签"卡片，设计成高端精品的吊牌/标签样式。

**Signature Elements**:
1. 产品标签卡片（模仿奢侈品吊牌），包含香调成分的"配方表"
2. 3D 香水瓶漂浮在视口中央，随滚动旋转
3. 顶部跑马灯文字（类似 silencio.es 的 "© Welcome to silencio store"）

**Interaction Philosophy**: 进入页面时有一个"开瓶"仪式感动画；点击标签时发出轻微的纸张翻动声；自定义光标为一个小圆点

**Animation**: GSAP ScrollTrigger 驱动所有动画；SplitText 实现文字逐字出现；3D 瓶子随鼠标移动轻微倾斜

**Typography System**: 主标题使用 Cormorant Garamond Italic（衬线斜体，奢华感），副标题使用 Neue Haas Grotesk 或 DM Sans（现代无衬线），数据/标签使用 DM Mono（等宽，精准感）
</idea>
</text>
<probability>0.07</probability>
</response>

---

## 方案三：Volatile Matter（挥发物质）

<response>
<text>
<idea>
**Design Movement**: 后现代解构主义 × 实验性排版
**Core Principles**:
1. 深色背景（近乎黑色），香水瓶的光泽和反射成为主要视觉元素
2. 文字排版刻意"破坏"——旋转、重叠、不对齐
3. 将香气的"挥发性"转化为视觉上的流动感和不稳定感
4. 粒子效果模拟香气分子扩散

**Color Philosophy**: 深黑背景 (#0A0A0A)，文字为近乎白色的米色 (#F0EDE8)，强调色为深紫红 (#8B2252) 和金色 (#D4AF37)。传达"黑暗、神秘、感官刺激"。

**Layout Paradigm**: 非线性布局，文字块随机分布在页面上，用视觉重量引导阅读顺序。3D 场景占据整个背景层。

**Signature Elements**:
1. 粒子系统模拟香气扩散（Three.js Points）
2. 文字在滚动时解体和重组
3. 深色玻璃质感的 UI 元素（glassmorphism）

**Interaction Philosophy**: 鼠标移动时粒子跟随，创造"触摸香气"的幻觉

**Animation**: 复杂的粒子动画；文字解体重组；3D 瓶子在深色背景中发光

**Typography System**: 主标题使用 Editorial New（大号衬线）；正文使用 Grotesk；数字使用 Tabular Numbers
</idea>
</text>
<probability>0.06</probability>
</response>

---

## 选定方案：方案二「Sensory Cartography（感官制图）」

选择理由：
- 与 silencio.es 的视觉语言最为接近（白色背景、产品标签、侧边信息栏）
- 香水品牌的高端定位与极简奢华美学高度契合
- 技术实现上可以充分复用 silencio.es 的核心技术（GSAP + Three.js）
- 产品标签的"配方表"设计既有创意又有差异化
