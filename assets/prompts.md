# AI 宣传素材生成记录

工具：内置 `image_gen.imagegen`，七次独立生成。生成原图保留在 Codex 默认图片目录，项目交付 WebP 版本（quality 88）。无参考图片，无透明背景。

## 所有图片的共同约束

Use case: product-mockup. Asset type: wide landing page hero / square category image for Bashi Snack Shop. Consistent polished studio lighting, tactile realism, punchy orange accents, youthful cheerful food campaign. No lettering, no logos, no watermarks, no borders. This is a creative illustration, not documentary inventory.

## 各素材提示词

- `hero.webp`: A lavish playful still life of snacks spilling from a tilted orange paper grocery bag, potato chips, pretzel twists, wafer biscuits, chocolate squares, fruit gummy candies, cashews and orange soda bottle. A few pieces float in the air. Three-quarter view, richly detailed appetizing editorial food photography with playful art direction. Wide landscape composition, centered compact arrangement, warm pale butter yellow seamless background.
- `crisps.webp`: A sculptural heap of golden ridged potato chips and airy cheese puffs, a few pieces floating, on a warm pale peach seamless background.
- `sweets.webp`: A playful pile of glossy colorful fruit gummy bears, bright wrapped candies and a few chocolate squares, on a soft pastel pink seamless background.
- `nuts.webp`: A rich pile of cashews, almonds, walnuts and pistachios, appetizing natural texture, on a soft sage green seamless background.
- `bakery.webp`: A playful stack of golden butter cookies, wafer biscuits and a small sliced sponge cake, on a warm pale yellow seamless background.
- `bites.webp`: A still life of spicy Chinese snack bites: dried tofu cubes, sesame rice crackers and spicy broad beans, on a pale lavender seamless background.
- `drinks.webp`: A joyful still life of unbranded orange soda bottle, lemon sparkling water glass and peach drink bottle, condensation and fresh orange slices, on a soft sky blue seamless background.

`location.png` 是用户提供的地图截图，仅作本地参考，已被 Git 排除，也不在网页显示。`favicon.svg` 为代码绘制的文字图标。

## 第二版：滚动场景与手绘字形

所有素材继续使用内置 `image_gen.imagegen`，保存为 WebP（quality 90）。透明素材保留 alpha。

- `map-v2.webp`：以用户地图截图为参考，重新绘制奶油色纸张、橙色道路、深咖描边和半调纹理的潮趣手绘区域图。保留天府大道南段在左侧、A馆在其东侧、B馆在下方、华府大道在南侧的相对关系；只使用“成都远大购物中心 A馆”“天府大道南段”“华府大道”“B馆”文字。不推测铺位、路线、距离或坐标。
- `chip-bag.webp`：single sealed puffy orange foil potato chip bag, front view slightly turned, crimped top and bottom, tactile realistic foil creases, large cream abstract wavy stripe and small sun symbol, no brand or text, genuinely transparent background, fully visible object with margin.
- `chip-piece.webp`：one single golden ridged potato chip, macro salt texture, curved thin slice floating in air, warm studio lighting, genuinely transparent background, no other objects or text.
- `headline-v2.webp`：两行“零食选得多”“价格巴适得板”的潮流粗字，已被同系列第三版替代，不纳入 Git。
- `closing-v2.webp`：两行“开心很简单”“巴适就对了”；原创手绘中国街头潮流粗笔画，跳跃基线、不规则圆角与切口，奶油白字、深咖偏移阴影、橙黄星芒，透明背景，无其他文字。

## 第三版：以收尾字形作为统一参考

以下四张均把 `closing-v2.webp` 输入模型作为风格参考，要求同一粗笔刷字形体系、准确中文、深咖描边、奶油白字、橙黄偏移阴影、透明背景，不重复参考图原文。

- `brand-v3.webp`：单行“巴适零食”，横向紧凑排版，用于导航及页脚品牌。
- `about-v3.webp`：两行“把小快乐”“装进日常”，用于深色品牌故事舞台。
- `visit-v3.webp`：单行“走嘛，来逛一哈！”，用于到店区标题。
- `headline-v3.webp`：两行“零食选得多”“价格巴适得板”，要求与参考的圆润粗笔刷形态一致，不采用前版偏硬的斜角黑体，用于首屏。
